const { logger } = require('./util/logger.js')
const { item, createFileIfNotExist, readContents, addNewContent, removeSpecificContent, toPurchase } = require('./groceryFileHandler.js')
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

            if (req.url.startsWith('/items')){
                logger.info(req.url.split('/'))
                let index = parseInt(req.url.split('/')[2]);
                createFileIfNotExist()
                const { itemName, quantity, price } = body

                switch(req.method){
                    case 'GET':
                        res.statusCode = 200
                        res.end(JSON.stringify({message: readContents()}))
                        break
                        
                    case 'POST':
                        
                        if (!itemName|| !quantity || !price){
                            res.writeHead(400, contentType)
                            res.end(
                                JSON.stringify({
                                    message: 'Please provide a valid name, quantity, and price'
                                })
                            )
                        } else {
                            const itemObject = Object.create(item)
                            itemObject.itemName = itemName,
                            itemObject.quantity = quantity
                            itemObject.price = price
                            itemObject.purchase = false
                            addNewContent(itemObject)

                            //data = readContents()
                            res.end(
                                JSON.stringify({
                                    message: 'Item Added to List!',
                                    itemObject//,
                                    //data
                                })
                            )
                        }
                        break

                    case 'PUT':
                        toPurchase(itemName)
                        data = readContents()
                        res.statusCode = 200
                        res.end(JSON.stringify({
                            message: `Item is marked as purchased! Updated List: `, data}))
                        break

                    case 'DELETE':
                        removeSpecificContent(itemName)
                        data = readContents()
                        res.statusCode = 200
                        res.end(JSON.stringify({
                            message: `Item deleted from the list! Updated List: `, data}))
                        break

                    default:
                        res.statusCode = 405 // method not allowed
                        res.end(JSON.stringify({message: "Method not supported"}))
                        break
                }
            
            }
        })
})

server.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`)
})