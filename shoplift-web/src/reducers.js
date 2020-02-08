const initialState = {
    items: []
}

export default function items(state = initialState, action) {
    switch (action.type) {
        case "ADD_ITEM":
            return Object.assign({}, state, {
                items: [... state.items, action.item]
            });
        case "REMOVE_ITEM":
            return Object.assign({}, state, {
                items: [... state.items].splice(state.items.indexOf(action.item),1)
            });
        default:
            return state
    }
}