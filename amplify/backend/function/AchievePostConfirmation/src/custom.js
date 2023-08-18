/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppSyncID = process.env.API_ACHIEVE_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppSyncID}-${env}`;

const userExists = async (id) => {
  const params = {
    TableName,
    Key: id,
  };
  try {
    const response = await documentClient.get(params).promise();
    return !!response?.Item;
  } catch (error) {
    return false;
  }
};

const saveUser = async (user) => {
  const date = new Date();
  const dateStr = date.toISOString();
  const timestamp = date.getTime();

  const Item = {
    ...user,
    __typename: "User",
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timestamp,
    _version: 1,
  };
  const params = {
    TableName,
    Item,
  };
  try {
    const response = await documentClient.put(params).promise();
    return response;
  } catch (error) {
    return error;
  }
};

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  console.log("Lambda Triggered");
  console.log("event", event);
  if (!event?.request?.userAttributes) {
    console.log("No user data available.");
    return;
  }

  const { sub, name, email } = event.request.userAttributes; // {sub, email, name}

  const newUser = {
    id: sub,
    name,
    email,
  };

  //* User already exists
  if (!(await userExists(newUser.id))) {
    //* Save user to DynamoDB
    await saveUser(newUser);
    console.log(`User ${newUser.id} saved to DynamoDB.`);
  } else {
    console.log(`User ${newUser.id} already exists.`);
  }

  return event;
};
