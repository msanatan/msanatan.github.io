---
title: "Fixing AWS Chalice's Cognito CORS Errors"
date: 2022-03-06 23:00:00
categories:
- serverless
tags:
- python
- aws chalice
---

<a href="https://aws.github.io/chalice/" target="_blank" rel="nofollow noopener noreferrer">AWS Chalice</a> is an interesting Python serverless framework. It's similar to using Flask or other microframeworks, but it deploys Lambdas instead. As you'd expect, there are nice integrations with other AWS services, like AWS Cognito.

When using Cognito, something really strange and annoying happens. If you send a request and the server returns Unauthorized or Forbidden, the client just gets a CORS error. Yep, the responses for Cognito are sent without CORS header, so your front-end app can't make heads or tails of the failure and react accordingly.

Those responses don't come from your Chalice lambdas, but from AWS Cognito. For whatever reason, when you deploy with `chalice deploy` the API Gateway response headers are not set:

![No values set in API Gateway Response Headers after running `chalice deploy`](./aws-chalice-no-gateway-responses-for-errors.png).

The fix is to set these Gateway Response headers **after you deploy with Chalice**. You can do that by setting the `DEFAULT_5XX` and `DEFAULT_4XX` headers, which would set it up for all error messages:

```bash
aws apigateway update-gateway-response --rest-api-id <YOUR-API-ID> --response-type DEFAULT_5XX --cli-input-json "{\"patchOperations\":[{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Headers\",\"value\":\"'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'\"},{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Methods\",\"value\":\"'OPTIONS,POST,PUT,GET,DELETE'\"},{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Origin\",\"value\":\"'*'\"}]}"

aws apigateway update-gateway-response --rest-api-id <YOUR-API-ID> --response-type DEFAULT_4XX --cli-input-json "{\"patchOperations\":[{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Headers\",\"value\":\"'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'\"},{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Methods\",\"value\":\"'OPTIONS,POST,PUT,GET,DELETE'\"},{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Origin\",\"value\":\"'*'\"}]}"

# You need to re-deploy the API so the changes take effect
aws apigateway create-deployment --rest-api-id <YOUR-API-ID> --stage-name <YOUR-API-STAGE>
```

Since I need to call it every time, I created a bash script that deploys Chalice and then updates API Gateway to return the CORS headers:

```bash
API_ID=""
STAGE_NAME=""

if [ $1 == 'prod' ]
then
    API_ID='PROD-API-ID'
    STAGE_NAME='prod-api-name'
elif [ $1 == 'dev' ]
then
    API_ID='DEV-API-ID'
    STAGE_NAME='dev-api-name'
else
    echo "$1 is not a valid deployment stage"
    exit 1
fi

chalice deploy --stage "$1"
aws apigateway update-gateway-response --rest-api-id "$API_ID" --response-type DEFAULT_5XX --cli-input-json "{\"patchOperations\":[{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Headers\",\"value\":\"'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'\"},{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Methods\",\"value\":\"'OPTIONS,POST,PUT,GET,DELETE'\"},{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Origin\",\"value\":\"'*'\"}]}"
aws apigateway update-gateway-response --rest-api-id "$API_ID" --response-type DEFAULT_4XX --cli-input-json "{\"patchOperations\":[{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Headers\",\"value\":\"'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'\"},{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Methods\",\"value\":\"'OPTIONS,POST,PUT,GET,DELETE'\"},{\"op\":\"add\",\"path\":\"/responseParameters/gatewayresponse.header.Access-Control-Allow-Origin\",\"value\":\"'*'\"}]}"
aws apigateway create-deployment --rest-api-id "$API_ID" --stage-name "$STAGE_NAME"
```

It accepts the chalice stage as a parameter. So instead of calling `chalice deploy --stage prod`, I call `./update-api.sh prod`.

That's it! Next time Cognito is returning an error response, you'll actually get it.

## Another Gotcha with AWS Chalice and CORS

For CORS to work for the rest of the API calls be sure to set up in Chalice correctly. You can enable the CORS headers in the lambdas app wide with `app.api.cors = True`. However, when you have authorizers to integrate with AWS Cognito, regardless of your app wide configuration you **must** set some sort of CORS config in the `@app.route` decorator. This feels like a bug but save yourself the headache I got when I didn't have it:

```python
from chalice import CognitoUserPoolAuthorizer, CORSConfig

authorizer = CognitoUserPoolAuthorizer('MyPool', header="Authorization", provider_arns=['arn:aws:cognito:...:userpool/name'])

cors_config = CORSConfig(
    allow_origin='*',
    allow_headers=['X-Extra-Headers']
)

@app.route('/authorizer-and-cors', authorizer=authorizer, methods=['GET'], cors=cors_config)
def authorizer_and_cors():
    return {'cors': True}
```

Happy hacking!
