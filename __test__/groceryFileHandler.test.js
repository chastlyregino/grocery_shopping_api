const fs = require('node:fs')
const { writeItems, createFileIfNotExist, readItems, addNewItem, removeSpecificItem, toPurchase } = require('.././groceryFileHandler.js')

let newData

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
    beforeEach(() => {
        fs.writeFileSync(truthyFile, JSON.stringify(data), 'utf8', (err) => {
            if(err){
                console.error(err)
                return
            }
        })
    })

    test('Write contents to a file', () => {
        writeItems('new content', truthyFile)
        expect(readItems(truthyFile)).toStrictEqual('new content')
    })

    test('Read contents of existing file and returns an object with array of objects', () => {
        expect(readItems(truthyFile)).toStrictEqual(data)
    })

    test('New item added to file', () => {
        addNewItem(newItem, truthyFile)
        newData = readItems(truthyFile).grocery_list // returns the array of updated file
        expect(newData[newData.length - 1]).toStrictEqual(newItem)
    })

    test('Item "purchased" value updated to true in file', () => {
        toPurchase(itemToUpdate, truthyFile)
        newData = readItems(truthyFile).grocery_list.find(({itemName}) => itemName === itemToUpdate ) // returns the object of updated file
        expect(newData.purchased).toBe(true)
    })

    test('Item removed from file', () => {
        removeSpecificItem(itemToUpdate, truthyFile)
        newData = readItems(truthyFile).grocery_list // returns the array of updated file
        expect(newData.includes(itemToUpdate)).toBe(false)
    })
})