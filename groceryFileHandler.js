/* 
This file handles all fs functions and object handling needed
*/

const { logger } = require('./util/logger.js')
const fs = require('node:fs')

let data = {grocery_list:[]}

const item = () => {
    this.itemName = itemName,
    this.quantity = quantity,
    this.price = price,
    this.purchased = purchased
}

// This checks if the file exists and creates it if none exists
const createFileIfNotExist = (file) => {
    if (fs.existsSync(file)) {
        data = JSON.parse(fs.readFileSync(file, 'utf8'))
        logger.info(`File exists`)
    } else {
        logger.info(`File does not exist`)
        fileWritten = writeItems(data, file)
        logger.info(`File created!`)
    }
    return data
}

// write Items to file
const writeItems = (items, file) => {
    fs.writeFileSync(file, JSON.stringify(items), 'utf8', (err) => {
        if(err){
            console.error(err)
            return
        }
        logger.info(`Write in file`)
    })
}


// reads the Items of data.json
const readItems = (file) => {
    data = JSON.parse(fs.readFileSync(file, 'utf8'))
    logger.info(`Items read!`)
    return data
}

// add new item to the list
const addNewItem = (item, file) => {
    data.grocery_list.push(item)
    logger.info(`New item added!`)

    writeItems(data, file)
}

// remove a specific item on the list
const removeSpecificItem = (name, file) => {
    data.grocery_list = data.grocery_list.filter((item) => item.itemName !== name)
    logger.info(`Item is removed! Idempotent.`)

    writeItems(data, file)
}

// to set purchase to true of a specific item
const toPurchase = (name, file) => {
    data.grocery_list = data.grocery_list
                        .map((item) => {
                            if (item.itemName === name) {
                                item.purchased = true
                            }
                            return item
                        })
    logger.info(`Item was purchased! Idempotent.`)

    writeItems(data, file)
}

module.exports = {
    item,
    createFileIfNotExist,
    writeItems,
    readItems,
    addNewItem,
    removeSpecificItem,
    toPurchase
}