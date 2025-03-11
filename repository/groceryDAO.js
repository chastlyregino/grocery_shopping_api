const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, ScanCommand, PutCommand, DeleteCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb')

const client = new DynamoDBClient({region: 'us-east-1'})

const documentClient = DynamoDBDocumentClient.from(client)

const item = () => {
    this.itemName = itemName,
    this.quantity = quantity,
    this.price = price,
    this.purchased = purchased
} 

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

async function getItems(){
    const command = new ScanCommand({
        TableName: 'Grocery-items'//,
       // Key: {item_name}
    })

    try{
        const data = await documentClient.send(command)
        console.log(data.Items)
        return data.Items
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

// async function updateItem(item_name){
//     const command = new DeleteCommand({
//         TableName: 'Grocery-items',
//         Key: {item_name},
//         UpdateExpression: "set is_purchase = :i_p",
//         ExpressionAttributeValues: {":i_p": true}
//     })


//     try{
//         await documentClient.send(command)
//         return item_name
//     }catch(err){
//         console.error(err)
//         return null
//     }
// }

module.exports = {
    item,
    createItem,
    getItems,
    deleteItem//,
    //updateItem
}