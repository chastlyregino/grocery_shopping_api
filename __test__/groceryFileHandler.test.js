const fs = require('node:fs')
const { writeItems, createFileIfNotExist, readItems, addNewItem, removeSpecificItem, toPurchase } = require('.././groceryFileHandler.js')

const data = {
    grocery_list: [
        {
            itemName: 'apple',
            quantity: 4,
            price: 3,
            purchased: false
        },
        {
            itemName: 'banana',
            quantity: 6,
            price: 1,
            purchased: false
        },
        {
            itemName: 'grapes',
            quantity: 2,
            price: 5,
            purchased: false
        }
    ]
}

const newItem = {
    itemName: 'pear',
    quantity: 5,
    price: 2,
    purchased: false
}

const truthyFile = 'testData.json'
const falsyFile = 'unexistentFile.json'
const itemToUpdate = 'banana'

describe('File Manipulation', () => {
    test('Creates the file after checking that it does not exist', () => {
        expect(fs.existsSync(falsyFile)).toBe(false)
        createFileIfNotExist(falsyFile)
        expect(fs.existsSync(falsyFile)).toBe(true)
        fs.unlinkSync(falsyFile)
        expect(fs.existsSync(falsyFile)).toBe(false)
    })
})

describe('File and Data Manipulation', () => {
    let newData

    beforeEach(() => {
        writeItems(data, truthyFile)
    })

    test('Read contents of existing file and returns an object with array of objects', () => {
        expect(readItems(truthyFile)).toStrictEqual(data)
    })

    test('New item added to file', () => {
        addNewItem(newItem, truthyFile)
        newData = readItems(truthyFile)
        const list = newData.grocery_list
        expect(list[list.length - 1]).toStrictEqual(newItem)
    })

    test('Item "purchased" value updated to true in file', () => {
        toPurchase(itemToUpdate, truthyFile)
        newData = readItems(truthyFile)
        const isItemPurchased = newData.grocery_list.find(({itemName}) => itemName === itemToUpdate )
        expect(isItemPurchased.purchased).toBe(true)
    })

    test('Item removed from file', () => {
        removeSpecificItem(itemToUpdate, truthyFile)
        newData = readItems(truthyFile)
        expect(newData.grocery_list.includes(itemToUpdate)).toBe(false)
    })
})