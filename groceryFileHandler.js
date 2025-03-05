/* 
This file handles all fs functions and object handling needed
*/

const { logger } = require('./util/logger.js')
const fs = require('node:fs');

let data = {grocery_list:[]}

const item = () => {
    this.itemName = itemName,
    this.quantity = quantity,
    this.price = price,
    this.purchased = purchased
}

// This checks if the file exists and creates it if none exists
const createFileIfNotExist = () => {
    if (fs.existsSync('data.json')) {
        data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
        logger.info(`File exists`)
    } else {
        logger.info(`File does not exist`)
        writeItems(data)
        logger.info(`File created!`)
    }
}

// write Items to file
const writeItems = (items) => {
    fs.writeFileSync('data.json', JSON.stringify(items), 'utf8', (err) => {
        if(err){
            console.error(err)
            return
        }
        logger.info(`Write in file`)
    })
}


// reads the Items of data.json
const readItems = () => {
    data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    logger.info(`Items read!`)
    return data
}

// add new item to the list
const addNewItem = (item) => {
    data.grocery_list.push(item)
    logger.info(`New item added!`)

    writeItems(data)
}

// remove a specific item on the list
const removeSpecificItem = (name) => {
    data.grocery_list = data.grocery_list.filter((item) => item.itemName !== name)
    logger.info(`Item is removed! Idempotent.`)

    writeItems(data)
}

// to set purchase to true of a specific item
const toPurchase = (name) => {
    data.grocery_list = data.grocery_list
                        .map((item) => {
                            if (item.itemName === name) {
                                item.purchased = true
                            }
                            return item
                        })
    logger.info(`Item was purchased! Idempotent.`)

    writeItems(data)
}

module.exports = {
    item,
    createFileIfNotExist,
    readItems,
    addNewItem,
    removeSpecificItem,
    toPurchase
}