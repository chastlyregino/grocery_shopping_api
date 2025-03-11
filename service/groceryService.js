const groceryDAO = require('../repository/groceryDAO.js')

async function createItem(item){
    const result = await groceryDAO.createItem(item);

    if(!result){
        return {message: "Failed to create user"};
    }else{
        return {message: "Created user", user: result}
    }
}

async function getItems(){
    const result = await groceryDAO.getItems();
    console.log(result)
    if(!result){
        return {message: 'Failed to get items'};
    }else{
        return {message: 'Found items:', result}
    }
}

async function deleteItem(item_name){
    const result = await groceryDAO.deleteItem(item_name);

    if(!result){
        return {message: "Failed to delete user", item_name};
    }else{
        return {message: "Deleted user", item_name}
    }
}

// async function updateItem(item_name){
//     const result = await groceryDAO.updateItem(item_name);

//     if(!result){
//         return {message: "Failed to update item", item_name};
//     }else{
//         return {message: "Item updates", result}
//     }
// }

module.exports = {
    createItem,
    getItems,
    deleteItem//,
    //updateItem
}