---
title: "Encoding and Returning Large JSON in Golang"
date: 2020-04-19 16:30:00
categories:
- [web]
tags:
- golang
---

Go is speedy. Compilation takes seconds, and it does a great job of managing things concurrently. In my current job, I write a fair amount of backend services in Go and it's been working great for us.

One particular service was dedicated to pulling data from Postgres. The DB contained transactional data so it had millions of rows. One of the endpoints had to retrieve a subset of that data based on filters being passed. Depending on the query, the app could return a JSON array with thousands of objects.

I don't typically develop an application with performance at the forefront of my mind, I rather see it working first. However, as the data grew and that kind of queries became more common, it was clear we needed to make things more efficient under the hood. We identified two bottlenecks: getting data from the SQL query and encoding large JSON in the HTTP response. While the former bottleneck is more expected, the latter surprised me!

There is a toll when creating and sending large amounts of data. Here are some of the strategies we employed to mitigate this problem to great effect. Unfortunately, I'm not able to share the metrics with you so you can see how the improvements helped us. Funnily enough, getting metrics is the first part of this process.

## Getting Metrics

> "Premature optimization is the root of all evil" - Donald Knuth (supposedly)

Don't spend time on optimising how your JSON is encoded unless you know for certain that it's a problem. The app I was working on was one of many microservices that leveraged <a rel="nofollow noopener noreferrer" target="_blank" href="https://www.datadoghq.com/">Datadog</a> an expensive but useful monitoring tool. With Datadog we traced each request to give us insight on all the microservices that were used.

Datadog also has a neat ability called *spans*. Spans allow us to tag blocks of code as we see fit, further refining the metrics we have. I added spans for validating the request, performing the SQL query, encoding it as JSON and returning the response. Only then I decided to make a concerted effort into how JSON was encoded, as it took up nearly as much time as the SQL query itself.

There are many other alternatives to Datadog. You can use <a rel="nofollow noopener noreferrer" target="_blank" href="https://prometheus.io/">Promethues</a>, a popular Open Source metrics and monitoring tool. Go's built in <a a rel="nofollow noopener noreferrer" href="https://golang.org/doc/diagnostics.html#tracing">tracer</a> is quite useful as well. I didn't really know where to begin with the tracer but <a rel="nofollow noopener noreferrer" target="_blank" href="https://about.sourcegraph.com/go/an-introduction-to-go-tool-trace-rhys-hiltner">this article</a> really helped me understand how to use it.

Get your metrics first! Every time you iterate on a fix, use the metrics to confirm that an improvement was made.

Now let's look at some strategies we could use, starting with how we create our struct that stores data.

## Omitting Empty Fields

One of the quickest fixes would be to omit empty fields. When you have thousands of JSON objects in an array, it became a lot cheaper to omit null and default values (empty strings, integers that are 0 by default, etc). All it requires is adding `omitempty` to the JSON tag in the struct.

Nested structs cannot be omitted with `omitempty` when encoded. If the data you're marshalling has nested structs that you want to omit, you have to make the pointers. If the pointer to the struct is `nil`, it will be omitted. If you'd like to learn more about this behaviour, check out this useful <a rel="nofollow noopener noreferrer" target="_blank" href="https://www.sohamkamani.com/golang/2018-07-19-golang-omitempty/">blog post</a>.

Of course, the caveat is that the client application needs to be built so it can process the data even with missing fields. Once that's in your realm of customization, this can be some low hanging fruit.

In my case, the client was as flexible as I'd hope for it to be. There was a small improvement but if I could have omitted more data, we would have likely been better off. Since the frontend was a bit resistant to change, I did some more work on the backend. There are many ways to encode JSON.

## Using Different JSON Encoders

As the default encoder has some trouble, I turned to other encoders that make optimisations for large JSON. The most common optimisation tradeoff is easy of use. The most popular ones I looked at were:

- <a rel="nofollow noopener noreferrer" target="_blank" href="https://github.com/mailru/easyjson">easyjson</a>
- <a rel="nofollow noopener noreferrer" target="_blank" href="https://github.com/valyala/fastjson">fastjson</a>
- <a rel="nofollow noopener noreferrer" target="_blank" href="https://github.com/json-iterator/go">jsoniter</a>

They all do a good job, and you can check out <a rel="nofollow noopener noreferrer" target="_blank" href="https://yalantis.com/blog/speed-up-json-encoding-decoding/">this article</a> which does a comparison for those interested. I'd recommend doing your comparison, optimise for your use case.

I chose jsoniter as it provided a marked improvement and was very easy to use. They have a mode that's completely compatible with the Go's default JSON encoder, so you can quickly get performance gains with these two lines of code:

```golang
import "github.com/json-iterator/go"

var json = jsoniter.ConfigCompatibleWithStandardLibrary
```

There are other configurations which would provide much greater speed benefits, like the aptly named `jsoniter.ConfigFastest`. Take a look and see for yourself.

With the help of that module, we improved our data encoding speed. However, sending megabytes of data over the network still put a strain on our infrastructure. Data compression was the next step.

## Compressing Your JSON

Sending large files over a network is usually slow. We've done work to make the data we send smaller and smaller. This strategy which reduced our response times is as common as they come, and unfortunately not one of the first things that popped up in my head \- gzip the data. Go also includes support for gzip with the `compress/gzip` library out of the box.

We first checked the request headers to see if the client can accept gzipped responses. Here's a snippet that could help you do the same:

```golang
var gzipEnabled bool
acceptedEncodings := r.Header.Get("Accept-Encoding")
// The Accept-Encoding has comma separated values, we need to confirm that gzip
// is one of them
for _, encoding := range strings.Split(acceptedEncodings, ",") {
    if strings.ToLower(strings.TrimSpace(encoding)) == "gzip" {
        gzipEnabled = true
        // Set the encoding in the response
        w.Header().Set("Content-Encoding", "gzip")
    }
}
```

Now let's use that flag to encode our data with gzip compression:

```golang
if gzipEnabled {
    gz := gzip.NewWriter(w)
    err := json.NewEncoder(gz).Encode(yourDataObject)
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        w.Write([]byte(`{"error": "Error processing action"}`))
        return
    }
    gz.Close()
    return
}
```

JSON data that was once megabytes became kilobytes. Compressing your data is one of the single biggest improvements you can make to improve backend performance.

## Other Solutions

The collective performance gains were pretty good after compression. There are many other ways to improve performance.

For example, using jsoniter's fastest configuration, you can write your encoded data as a stream. This greatly reduces how much memory is used and overall performance as the data is sent in chunks. You can read more <a rel="nofollow noopener noreferrer" target="_blank" href="https://jsoniter.com/migrate-from-go-std.html#best-performance">here</a>.

Do your research, get metrics, test and deploy.

Happy optimising!
