---
title: "Manually Configuring an AWS Amplify Session"
date: 2024-06-11 18:00:00
categories:
  - software development
tags:
  - software development
  - javascript
  - react
  - aws
---

The [AWS Amplify SDK](https://docs.aws.amazon.com/amplify/) is a handy JavaScript SDK to interact with AWS services. I've used it a lot with React. Once a few variables are configured, managing authentication and the HTTP client to send requests to the backend becomes quite easy. AWS Cognito has very limited controls and configurations, much to the frustration of many developers (tell me if in 2024 you can change how many unsuccessful login attempts lock out an account, and adjust the lockout time for Cognito users), so it's common for developers to create [pre-authentication lambdas](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-pre-authentication.html) or custom endpoints to handle the authentication process.

Pre-authentication lambdas work well with the client, because the default code for logging in, logging out, signing up, and resetting passwords remains unchanged. However, if you have a pre-existing authentication endpoint that you want to integrate with AWS Amplify, instead of porting the logic to a lambda, you can manually set up a session with AWS Amplify.

## Backend requirements

There are some steps we need to take on our backend and on AWS Cognito so that we can successfully authenticate users via an API and use it in our frontend. You must return at least 3 properties on the backend, all strings:

- `idToken`: The JWT token that contains the user's information
- `accessToken`: The JWT token that allows the user to access the API
- `refreshToken`: The JWT token that allows the user to refresh the `accessToken`

On AWS Cognito, ensure that the **Remember Device** option is set to "Don't remember". If this is set to "remember", while the original authentication will work, when AWS Amplify tries to refresh the token it will fail (because the backend device isn't the same as the client!).

## Manually configuring the session

On the frontend, create a function like this that accepts the tokens and configures the session:

```typescript
import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";

export async function setupAmplifySession(
  username: string, // Take the username from the form so they can sign up
  accessToken: string, // Taken from the API response
  idToken: string, // Taken from the API response
  refreshToken: string, // Taken from the API response
  userPoolId: string, // Cognito user pool ID
  appClientId: string // Cognito app client ID
) {
  // Create Cognito tokens
  const accessCognitoToken = new CognitoAccessToken({
    AccessToken: accessToken,
  });
  const idCognitoToken = new CognitoIdToken({ IdToken: idToken });
  const refreshCognitoToken = new CognitoRefreshToken({
    RefreshToken: refreshToken,
  });

  // Create a new user session with the tokens
  const session = new CognitoUserSession({
    AccessToken: accessCognitoToken,
    IdToken: idCognitoToken,
    RefreshToken: refreshCognitoToken,
  });

  // Create a user pool object
  const userPool = new CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: appClientId,
  });

  // Then create a new user object from that pool
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  // Connect user to the session
  user.setSignInUserSession(session);

  // Update the user session in local storage
  await Auth.currentSession();
}
```

There you have it. Once your backend returns all the tokens, you can use the above code to set up your session with AWS Amplify and enjoy all the benefits of using the SDK, even with your custom flow.
