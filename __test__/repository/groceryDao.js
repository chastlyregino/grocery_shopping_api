const { DynamoDBClient } = require("@aws-sdk/client-dynamodb")
const { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb")

const client = new DynamoDBClient({region: "us-east-1"})

const documentClient = DynamoDBDocumentClient.from(client)