---
title: Mock Servers with OpenAPI and API Sprout
date: 2019-07-18 00:36:00
categories:
- [web]
tags:
- golang
- openapi
---

Hey API developers!

This is a pretty quick post that could save you time like it did for me! In my current job we develop a lot of microservices, the majority being RESTful. For each microservice we define an [OpenAPI specification](https://swagger.io/specification/) \- a YAML file that describes the API. This is useful because we can think about our services at a pretty high level and figure out how they can communicate with each other without writing a line of code.

Large problems like the one we're tackling may require many microservices. There are merits and downsides for this architecture but those can be discussed in a different post. With limited resources, not all microservices can be developed at the same time.  Luckily with our OpenAPI file, it's easy to mock them!

Let's say we have a simple API definition that returns a requestor's IP address:

```yaml
openapi: 3.0.0

info:
  description: 'Provides clients with their public IP address'
  version: '1.0.0'
  title: 'IP Address API'
  contact:
    email: 'support@ipaddr.co'

paths:
  /v4:
    get:
      summary: 'Retrieve IPv4 address'
      responses:
        200:
          description: 'Return IP of user'
          content:
            application/json:
              schema:
                type: object
                items:
                  $ref: '#/components/schemas/IPAddress'
              example:
                ip: '234.21.235.206'
  /v6:
    get:
      summary: 'Retrieve IPv6 address'
      responses:
        200:
          description: 'Return IP of user'
          content:
            application/json:
              schema:
                type: object
                items:
                  $ref: '#/components/schemas/IPAddress'
              example:
                ip: 'e2ad:23d6:871b:ee97:1154:ed95:742f:3ef4'
  /health:
    get:
      summary: 'Check API availability'
      operationId: 'api.operational.health'
      responses:
        200:
          description: 'Transactions Repository is healthy'
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Health'
              example:
                message: 'OK'
components:
  schemas:
    Health:
      type: object
      properties:
        message:
          type: string
      required:
        - message
    IPAddress:
      type: object
      properties:
        ip:
          type: string
      required:
        - ip
```

We can use [APISprout](https://github.com/danielgtaylor/apisprout) to parse our swagger file and create a server we can use for testing. We define examples in our OpenAPI specification so our mock server can have set data. If you don't define examples, it would generate dummy data by inspecting the schema. I prefer to use it via the docker container because that makes it deployable in my work environment.

Once the server is up and running \(don't forget to add a Docker volume with the full path if you're referencing a local YAML file\), we can send requests to it like normal:

```bash
curl -H "Accept: application/json" http://localhost:8000/v4
# {
#   "ip": "234.21.235.206"
# }
curl -H "Accept: application/json" http://localhost:8000/v6
# {
#   "ip": "e2ad:23d6:871b:ee97:1154:ed95:742f:3ef4"
# }
```

We can confirm from the server logs they were hit as well:

```
2019/07/18 04:03:36 GET /v4 (Accept application/json) (Retrieve IPv4 address) => 200 (application/json)
2019/07/18 04:03:47 GET /v6 (Accept application/json) (Retrieve IPv6 address) => 200 (application/json)
```

And that's it for today! I hope this tool can unblock you as much as it did for me.

Happy API developing!
