/*const addItem = item => ({
    type: "ADD_ITEM",
    item
})

const removeItem = item => ({
    type: "REMOVE_ITEM",
    item
})*/

export function addItem(item) {
    return {
        type: "ADD_ITEM",
        item
    }
}

export function removeItem(item) {
    return {
        type: "REMOVE_ITEM",
        item
    }
}