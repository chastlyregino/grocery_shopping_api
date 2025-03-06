/* 
This file handles all HTTP requests and response.
*/

const { logger } = require('./util/logger.js')
const { item, createFileIfNotExist, readItems, addNewItem, removeSpecificItem, toPurchase } = require('./groceryFileHandler.js')
const http = require('http')

const PORT = 3000

const server = http.createServer((req, res) => {
    let body = ''
    let data = {}

    req
        .on('data', (chunk) => {
            body += chunk
        })
        .on('end', () => {
            body = body.length > 0 ? JSON.parse(body) : {}

            const contentType = {'Content-Type': 'application/json'}
            const { itemName, quantity, price } = body

            if (req.url.startsWith('/items')){
                logger.info(req.url.split('/'))
                //const itemToUpdate = req.url.split('/')[2]
                createFileIfNotExist()

                switch(req.method){
                    case 'GET':
                        data = readItems()
                        logger.info(`GET method display items`)
                        res.statusCode = 200
                        res.end(JSON.stringify({message: data}))
                    break
                        
                    case 'POST':
                        if (!itemName || !quantity || !price){
                            logger.info(`POST method failed! Missing info`)
                            res.writeHead(400, contentType)
                            res.end(
                                JSON.stringify({
                                    message: 'Please provide a valid name, quantity, and price'
                                })
                            )
                        } else {
                            const itemObject = Object.create(item)
                            itemObject.itemName = itemName.toLowerCase(),
                            itemObject.quantity = quantity
                            itemObject.price = price
                            itemObject.purchased = false
                            addNewItem(itemObject)

                            res.end(
                                JSON.stringify({
                                    message: 'Item Added to List!',
                                    itemObject
                                })
                            )

                            logger.info(`POST method info added: ${itemName}, ${quantity}, ${price}`)
                        }
                    break

                    case 'PUT':
                        if (!itemName){
                            logger.info(`PUT method failed! Missing info`)
                            res.writeHead(400, contentType)
                            res.end(
                                JSON.stringify({
                                    message: 'Please provide a valid name'
                                })
                            )
                        } else {
                            toPurchase(itemName.toLowerCase())
                            data = readItems()

                            res.statusCode = 200
                            res.end(JSON.stringify({
                                message: `Item is marked as purchased! Updated List: `, data
                            }))

                            logger.info(`PUT method item updated: ${itemName}`)
                        }
                    break

                    case 'DELETE':
                        if (!itemName){
                            logger.info(`DELETE method failed! Missing info`)
                            res.writeHead(400, contentType)
                            res.end(
                                JSON.stringify({
                                    message: 'Please provide a valid name'
                                })
                            )
                        } else {
                            removeSpecificItem(itemName.toLowerCase())
                            data = readItems()

                            res.statusCode = 200
                            res.end(JSON.stringify({
                                message: `Item deleted from the list! Updated List: `, data
                            }))

                            logger.info(`DELETE method item removed: ${itemName}`)
                        }
                    break

                    default:
                        res.statusCode = 405 // method not allowed
                        res.end(JSON.stringify({message: 'Method not supported'}))

                        logger.info(`Method not supported`)
                    break
                }
            }
        })
})

server.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`)
})