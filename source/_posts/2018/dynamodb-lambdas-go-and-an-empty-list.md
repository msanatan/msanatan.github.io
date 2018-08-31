---
title: DynamoDB, Lamdbas, Go and an Empty List
date: 2018-08-31 17:45:00
categories:
- [api]
- [web]
tags:
- aws
- serverless
- go
- nosql
- dynamodb
---

Hello AWS Denizens,

Serverless architecture has come into the forefront as my workplace leverages
lambdas to great effect. Some of the projects we work at involve a variety of
AWS services like AppSync (GraphQL), DynamoDB and Cloudwatch to name a few.
While doing some API development, I ran into an issue setting up a lambda to
resolve a GraphQL query.

Here's the scenario:

* We got a GraphQL schema that defines an Item
* Item is stored in DynamoDB
* Item has many properties, including a property `subItems` of list type of SubItems
* We need to write a mutation for the `items` that adds a new element to `subItems`
  * We'll override the current list with the one we provide
* This logic will be used in a lambda written in Go for some preprocessing of data

I found this following helpful guide online that showed how to update a list
contained in a type like Item using the `SET` operator:
https://medium.com/@joshua.a.kahn/building-a-dynamodb-list-resolver-for-aws-appsync-eb42d30a8791.
Naturally, I thought it should be a simple matter of recreating the Velocity
logic in Go and I'd be OK.

## Problema Numero Uno
The first error told me I'm not able to add to a list that doesn't exist. NoSQL
is flexible but not magical. Velocity has lots of features to cater for this.
My first update expression was this:

```velocity
"SET subItems = list_append(subItems, :subItem)"
```

And was now this:

```velocity
"SET subItems = list_append(if_not_exists(subItems, :emptyList), :subItem)"`
```

Our attribute values are `:subItem`, a list with the new element, and
`:emptyList`, which is pretty self explanatory.

## Problema Numero Dos
If you're using the AWS Go SDK, you'll probably think to create an attribute
value that's an empty Go slice. Trust me, wont' work. By default, the SDK sets
empty lists to NULL (see here https://github.com/aws/aws-sdk-go/issues/682).
After playing around for a bit I was able to get an empty slice accepted:

```go
itemsArray := make([]SubItems, 1)
itemsArray[0] = subItemVariable

emptyList := make([]*dynamodb.AttributeValue, 0)

av, err := dynamodbattribute.MarshalMap(map[string]interface{}{
  ":subItems": itemsArray,
})
av[":emptyList"] = &dynamodb.AttributeValue{L: emptyList}
```

Seems that adding the empty slice after the initial data was marshalled works
just fine, once we use the same structs the MarshalMap function uses.

Happy hacking!
