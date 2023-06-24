export const handler = async function (
  event: any,
) {
  try {
    const bearerToken = event.authorizationToken;
    const token = bearerToken.split(' ')[1];

    if (token != 'quan') {
      return generatePolicy('user', 'Deny', event.methodArn);
    }
    return generatePolicy('user', 'Allow', event.methodArn, { mySuperUserName: 'quan' });
  } catch (error) {
    throw new Error(`APIGateway authentication error: ${error}`);
  }
};

const generatePolicy = function (
  principalId: string,
  effect: string,
  resource: string,
  context?: any,
) {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context,
  };
};
