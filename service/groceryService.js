const groceryDAO = require('../repository/groceryDAO.js')

async function createItem(item){
    const result = await groceryDAO.createItem(item);

    if(!result){
        return {message: 'Failed to create item'}
    }else{
        return {message: 'Created item', user: result}
    }
}

async function getItems(){
    const result = await groceryDAO.getItems()
    if(!result){
        return {message: 'Failed to get items'}
    }else{
        return {message: 'Found items:', result}
    }
}

async function deleteItem(item_name){
    const result = await groceryDAO.deleteItem(item_name)

    if(!result){
        return {message: 'Failed to delete item', item_name}
    }else{
        return {message: 'Deleted item', item_name}
    }
}

async function updateItem(item_name){
    const result = await groceryDAO.updateItem(item_name);

    if(!result){
        return {message: "Failed to update item", item_name};
    }else{
        return {message: "Item updates", result}
    }
}

module.exports = {
    createItem,
    getItems,
    deleteItem,
    updateItem
}