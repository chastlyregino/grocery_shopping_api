/* 
This file handles all fs functions and object handling needed
*/

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
        console.log('File exists')
    } else {
        console.log('File does not exist')
        writeContents(data)
        console.log('File created!')
    }
}

// write contents to file
const writeContents = (contents) => {
    fs.writeFileSync('data.json', JSON.stringify(data), 'utf8', (err) => {
        if(err){
            console.error(err);
            return;
        }
        console.log('Write in file');
    })
}


// reads the contents of data.json
const readContents = () => {
    data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    console.log('Contents read!')
    return data
}

// add new item to the list
const addNewContent = (item) => {
    data.grocery_list.push(item)
    console.log('New content added!')

    fs.writeFileSync("data.json", JSON.stringify(data), 'utf8', (err) => {
        if(err){
            console.error(err);
            return;
        }
        console.log("Data updated");
    })
}

// remove a specific item on the list
const removeSpecificContent = (name) => {
    data.grocery_list = data.grocery_list.filter((item) => item.itemName !== name)
    console.log('Content is removed! Idempotent.')

    writeContents(data)
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
    console.log('Content was purchased! Idempotent.')

    writeContents(data)
}

module.exports = {
    item,
    createFileIfNotExist,
    readContents,
    addNewContent,
    removeSpecificContent,
    toPurchase
}