/* 
This file handles all HTTP requests and response.
*/
const express = require('express')
//const path = require('path')
const { logger } = require('./util/logger.js')
const { item, createFileIfNotExist, readItems, addNewItem, removeSpecificItem, toPurchase } = require('./groceryFileHandler.js')
const http = require('http')

const app = express()
const PORT = 3000
const file = 'data.json'
let data = {}

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '*filedir', '*file'))
// })
app.use(express.json())

app.get('/items', (req, res) => {
    data = readItems(file)
    logger.info(`GET method display items`)
    res.statusCode = 200
    res.send(JSON.stringify({message: data}))
})

app.post('/items', (req, res) => {
    // console.log(req.body)
    const { itemName, quantity, price } = req.body

    if (!itemName || !quantity || !price){
        logger.info(`POST method failed! Missing info`)
        res.writeHead(400, contentType)
        res.send(JSON.stringify({
                    message: 'Please provide a valid name, quantity, and price'
                    })
        )
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

app.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`)
})


// const server = http.createServer((req, res) => {
//     let body = ''
//     let data = {}

//     req
//         .on('data', (chunk) => {
//             body += chunk
//         })
//         .on('end', () => {
//             body = body.length > 0 ? JSON.parse(body) : {}

//             const contentType = {'Content-Type': 'application/json'}

//             if (req.url.startsWith('/items')){
//                 logger.info(req.url.split('/'))
//                 const itemToUpdate = req.url.split('/')[2]
//                 data = createFileIfNotExist(file)

//                 switch(req.method){
//                     case 'GET':
//                         data = readItems(file)
//                         logger.info(`GET method display items`)
//                         res.statusCode = 200
//                         res.end(JSON.stringify({message: data}))
//                     break
                        
//                     case 'POST':
//                         const { itemName, quantity, price } = body
//                         if (!itemName || !quantity || !price){
//                             logger.info(`POST method failed! Missing info`)
//                             res.writeHead(400, contentType)
//                             res.end(
//                                 JSON.stringify({
//                                     message: 'Please provide a valid name, quantity, and price'
//                                 })
//                             )
//                         } else {
//                             const itemObject = Object.create(item)
//                             itemObject.itemName = itemName.toLowerCase(),
//                             itemObject.quantity = quantity
//                             itemObject.price = price
//                             itemObject.purchased = false
//                             addNewItem(itemObject, file)

//                             res.statusCode = 200
//                             res.end(
//                                 JSON.stringify({
//                                     message: 'Item Added to List!',
//                                     itemObject
//                                 })
//                             )

//                             logger.info(`POST method info added: ${itemName}, ${quantity}, ${price}`)
//                         }
//                     break

//                     case 'PUT':
//                         if (!itemToUpdate){
//                             logger.info(`PUT method failed! Missing info`)
//                             res.writeHead(400, contentType)
//                             res.end(
//                                 JSON.stringify({
//                                     message: 'Please provide a valid name'
//                                 })
//                             )
//                         } else {
//                             toPurchase(itemToUpdate.toLowerCase(), file)
//                             data = readItems(file)

//                             res.statusCode = 200
//                             res.end(JSON.stringify({
//                                 message: `Item is marked as purchased! Updated List: `, data
//                             }))

//                             logger.info(`PUT method item updated: ${itemToUpdate}`)
//                         }
//                     break

//                     case 'DELETE':
//                         if (!itemToUpdate){
//                             logger.info(`DELETE method failed! Missing info`)
//                             res.writeHead(400, contentType)
//                             res.end(
//                                 JSON.stringify({
//                                     message: 'Please provide a valid name'
//                                 })
//                             )
//                         } else {
//                             removeSpecificItem(itemToUpdate.toLowerCase(), file)
//                             data = readItems(file)

//                             res.statusCode = 200
//                             res.end(JSON.stringify({
//                                 message: `Item deleted from the list! Updated List: `, data
//                             }))

//                             logger.info(`DELETE method item removed: ${itemToUpdate}`)
//                         }
//                     break

//                     default:
//                         res.statusCode = 405 // method not allowed
//                         res.end(JSON.stringify({message: 'Method not supported'}))

//                         logger.info(`Method not supported`)
//                     break
//                 }
//             }
//         })
// })

// server.listen(PORT, () => {
//     logger.info(`Server is listening on http://localhost:${PORT}`)
// })