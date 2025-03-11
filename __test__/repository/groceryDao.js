const { DynamoDBClient } = require("@aws-sdk/client-dynamodb")
const { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb")

const client = new DynamoDBClient({region: "us-east-1"})

const documentClient = DynamoDBDocumentClient.from(client)

async function createItem(item){
    const command = new PutCommand({
        TableName: 'Grocery-items',
        Item: item
    })

    try{
        await documentClient.send(command)
        return item
    }catch(err){
        console.error(err)
        return null
    }
}

async function getItem(item_name){
    const command = new GetCommand({
        TableName: 'Grocery-items',
        Key: {item_name}
    });

    try{
        const data = await documentClient.send(command)
        return data.Item
    }catch(err){
        console.error(err)
        return null
    }
}

async function deleteItem(item_name){
    const command = new DeleteCommand({
        TableName: 'Grocery-items',
        Key: {item_name}
    })

    try{
        await documentClient.send(command);
        return item_name
    }catch(err){
        console.error(err)
        return null
    }
}

async function updateItem(item_name){
    const command = new DeleteCommand({
        TableName: 'Grocery-items',
        Key: {item_name},
        UpdateExpression: "set is_purchase = :i_p",
        ExpressionAttributeValues: {":i_p": true}
    })


    try{
        await documentClient.send(command)
        return item_name
    }catch(err){
        console.error(err)
        return null
    }
}

module.exports = {
    createItem,
    getItem,
    deleteItem,
    updateItem
}