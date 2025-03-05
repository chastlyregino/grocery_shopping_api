const { data, item, createFileIfNotExist, readContents, addNewContent, removeSpecificContent, toPurchase } = require('./groceryFileHandler.js')

let test = readContents()
removeSpecificContent("apple")
test = readContents()
console.log(test)