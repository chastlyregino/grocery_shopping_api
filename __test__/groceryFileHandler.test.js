jest.mock('fs')
const { writeItems, createFileIfNotExist, readItems, addNewItem, removeSpecificItem, toPurchase } = require('.././groceryFileHandler.js')

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

const file = 'data.json'

describe('File and Data Manipulation', () => {
    test('Check if data.json exists', () => {
        mockWriteItems.mockReturnValue(true)
    })

    test('Creates data.json after checking not exist', () => {

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