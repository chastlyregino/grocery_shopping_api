const fs = require('node:fs')
const { writeItems, createFileIfNotExist, readItems, addNewItem, removeSpecificItem, toPurchase } = require('.././groceryFileHandler.js')

//jest.mock('fs')
const mockwriteItems = jest.fn()

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

const truthyFile = 'data.json'
const falsyFile = 'unexistentFile.json'

describe('File and Data Manipulation', () => {
    test('Check if data.json exists', () => {
        //mockWriteItems.mockReturnValue(true)
    })

    test('Creates the file after checking that it does not exist', () => {
        expect(fs.existsSync(falsyFile)).toBe(false)
        createFileIfNotExist(falsyFile)
        expect(fs.existsSync(falsyFile)).toBe(true)
        fs.unlinkSync(falsyFile)
        expect(fs.existsSync(falsyFile)).toBe(false)
    })

    test('Read contents of data.json and returns an object with array of objects', () => {
        
    })

    test('New item added to data.json', () => {
        
    })

    test('Item removed from data.json', () => {
        
    })

    test('Item "purchased" value updated to true in data.json', () => {
        
    })
})