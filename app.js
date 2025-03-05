const { logger } = require('./util/logger.js')
const { data, item, createFileIfNotExist, readContents, addNewContent, removeSpecificContent, toPurchase } = require('./groceryFileHandler.js')
//const { data, createFileIfNotExist, readContents } = require('./groceryFileHandler.js')
const http = require('http')

const PORT = 3000

const server = http.createServer((req, res) => {
    let body = ''

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

                switch(req.method){
                    case 'GET':
                        res.statusCode = 200
                        res.end(JSON.stringify({message: readContents()}))
                        break
                    // case 'POST':
                    //     const { name, quantity, price } = body
                    //     if (!name || !quantity || !price){
                    //         res.writeHead(400, contentType)
                    //         res.end(
                    //             JSON.stringify({
                    //                 message: 'Please provide a valid name and price'
                    //             })
                    //         )
                    //     } else {
                    //         res.end(
                    //             JSON.stringify({
                    //                 message: 'Item Added to List!',
                    //                 name,
                    //                 quantity,
                    //                 price
                    //             })
                    //         )
                    //     }
                    //     break
                    // case 'PUT':
                    //     break
                    case 'DELETE':
                        let { name } = body
                        removeSpecificContent(name)
                        res.statusCode = 200
                        res.end(JSON.stringify({
                            message: `Item deleted from the list!Updated List: readContents()` + readContents()}))
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