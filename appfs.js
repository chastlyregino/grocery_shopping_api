/* 
This file handles all HTTP requests and response.
*/
const express = require('express')
const { logger } = require('./util/logger.js')
const { item, createFileIfNotExist, readItems, addNewItem, removeSpecificItem, toPurchase } = require('./groceryFileHandler.js')

const app = express()
const PORT = 3000
const file = 'data.json'
let data = createFileIfNotExist(file)

app.use(express.json())

app.get('/items', (req, res) => {
    data = readItems(file)
    logger.info(`GET method display items`)
    res.statusCode = 200
    res.send(JSON.stringify({message: data}))
})

app.post('/items', (req, res) => {
    const { itemName, quantity, price } = req.body

    if (!itemName || !quantity || !price){
        logger.info(`POST method failed! Missing info`)
        res.status(400).send(JSON.stringify({error: 'Please provide a valid name, quantity, and price'}))
    } else {
        const itemObject = Object.create(item)
        itemObject.itemName = itemName.toLowerCase(),
        itemObject.quantity = quantity
        itemObject.price = price
        itemObject.purchased = false
        addNewItem(itemObject, file)
        
        res.statusCode = 200
        res.send(JSON.stringify({
                    message: 'Item Added to List!',
                    itemObject
                    })
        )
        
        logger.info(`POST method info added: ${itemName}, ${quantity}, ${price}`)
    }                            
})

app.put('/items/:itemName', (req, res) => {
    toPurchase(req.params.itemName, file)
    data = readItems(file)

    res.statusCode = 200
    res.send(JSON.stringify({
        message: `Item is marked as purchased! Updated List: `, data
        }))
    
    logger.info(`PUT method item updated: ${req.params.itemName}`)
})

app.delete('/items/:itemName', (req, res) => {
    removeSpecificItem(req.params.itemName, file)
    data = readItems(file)

    res.statusCode = 200
    res.send(JSON.stringify({
        message: `Item deleted from the list! Updated List: `, data
        }))
    
    logger.info(`DELETE method item removed: ${req.params.itemName}`)
})

app.all('/items', (req, res) => {
    res.status(405).send(JSON.stringify({error: `Method unsupported`}))

    logger.info(`Method unsupported`)
})

app.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`)
})

