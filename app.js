/* 
This file handles all HTTP requests and response.
*/
const express = require('express')
const { logger } = require('./util/logger.js')
const groceryService = require('./service/groceryService.js')
const { item } = require('./repository/groceryDAO.js')

const app = express()
const PORT = 3000
const file = 'data.json'
let data = groceryService.getItems()

app.use(express.json())

app.get('/items', (req, res) => {
    data = groceryService.getItems()
            .then(data => {
                logger.info(`GET method display items`)

                res.statusCode = 200
                res.send(JSON.stringify(data))
            })
            .catch(err => console.error(err));
})

app.post('/items', (req, res) => {
    const { item_name, quantity, price } = req.body

    if (!item_name || !quantity || !price){
        logger.info(`POST method failed! Missing info`)
        res.status(400).send(JSON.stringify({error: 'Please provide a valid name, quantity, and price'}))
    } else {
        const itemObject = Object.create(item)
        itemObject.item_name = item_name.toLowerCase(),
        itemObject.quantity = quantity
        itemObject.price = price
        itemObject.is_purchase = false
        groceryService.createItem(itemObject)
        .then(data => {
            res.statusCode = 200
            res.send(JSON.stringify({
                        message: 'Item Added to List!',
                        itemObject
                        })
            )
            
            logger.info(`POST method info added: ${item_name}, ${quantity}, ${price}`)
        })
        .catch(err => console.error(err))
        
    }                            
})

app.put('/items/:item_name', (req, res) => {
    groceryService.updateItem(req.params.item_name)
    .then(incomingData => {
        data = groceryService.getItems()
        .then(data => {
            res.statusCode = 200
            res.send(JSON.stringify({
                message: `Item is marked as purchased! Updated List: `, data
                }))
            
            logger.info(`PUT method item updated: ${incomingData.result}`)
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

app.delete('/items/:item_name', (req, res) => {
    groceryService.deleteItem(req.params.item_name)
    .then(incomingData => {
        data = groceryService.getItems()
        .then(data => {
            res.statusCode = 200
            res.send(JSON.stringify({
                message: `Item deleted from the list! Updated List: `, data
                }))
            
            logger.info(`DELETE method item removed: ${incomingData.item_name}`)
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

app.all('/items', (req, res) => {
    res.status(405).send(JSON.stringify({error: `Method unsupported`}))

    logger.info(`Method unsupported`)
})

app.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`)
})

