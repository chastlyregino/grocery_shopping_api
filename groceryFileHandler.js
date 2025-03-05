/* 
This file handles all fs functions and object handling needed
*/

const fs = require('node:fs');


let data = {}
const item = () => {
    this.gname = gname,
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
        fs.writeFileSync('data.json', JSON.stringify(data), 'utf8', (err) => {
            if(err){
                console.error(err);
                return;
            }
            console.log('File created!');
        })
    }
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
    data.grocery_list = data.grocery_list.filter((item) => item.name !== name)
    console.log('Content is removed! Idempotent.')

    fs.writeFileSync('data.json', JSON.stringify(data), 'utf8', (err) => {
        if(err){
            console.error(err)
            return
        }
        console.log('Data updated')
    })
}

// to set purchase to true of a specific item
const toPurchase = (name) => {
    data.grocery_list = data.grocery_list
                        .map((item) => {
                            if (item.gname === name) {
                                item.purchased = true
                            }
                        })
    console.log('Content was purchased! Idempotent.')

    fs.writeFileSync('data.json', JSON.stringify(data), 'utf8', (err) => {
        if(err){
            console.error(err);
            return;
        }
        console.log('Data updated');
    })
}

module.exports = {
    data,
    item,
    createFileIfNotExist,
    readContents,
    addNewContent,
    removeSpecificContent,
    toPurchase
}