const fs = require('node:fs')
const { writeItems, createFileIfNotExist, readItems, addNewItem, removeSpecificItem, toPurchase } = require('.././groceryFileHandler.js')

//jest.mock('fs')
const mockwriteItems = jest.fn()

let tempData, newData
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
        }
    ]
}

const newItem = {
    itemName: 'pear',
    quantity: 5,
    price: 2,
    purchased: false
}

const truthyFile = 'data.json'
const falsyFile = 'unexistentFile.json'

describe('File and Data Manipulation', () => {
    test('Creates the file after checking that it does not exist', () => {
        expect(fs.existsSync(falsyFile)).toBe(false)
        createFileIfNotExist(falsyFile)
        expect(fs.existsSync(falsyFile)).toBe(true)
        fs.unlinkSync(falsyFile)
        expect(fs.existsSync(falsyFile)).toBe(false)
    })

    test('Read contents of existing file and returns an object with array of objects', () => {
        tempData = readItems(truthyFile)
        writeItems(data, truthyFile)
        expect(readItems(truthyFile)).toStrictEqual(data)
        writeItems(tempData, truthyFile)
    })

    test('New item added to file', () => {
        tempData = readItems(truthyFile)
        writeItems(data, truthyFile)
        addNewItem(newItem, truthyFile)
        newData = readItems(truthyFile)
        const list = newData.grocery_list
        expect(list[list.length - 1]).toStrictEqual(newItem)
        writeItems(tempData, truthyFile)
    })

    test('Item removed from file', () => {
        
    })

    test('Item "purchased" value updated to true in file', () => {
        
    })
})