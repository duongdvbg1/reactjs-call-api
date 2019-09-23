
import * as Types from './../constants/ActionTypes';

var initialState = [];

const products = (state = initialState, action) => {
    
    var index = -1;
    var { id, product } = action;
    switch(action.type) {
        case Types.FETCH_PRODUCTS:
            state = action.products;
            return [...state];
        case Types.DELETE_PRODUCT:
            index = fineIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_PRODUCT:
            state.push(action.product);
            return [...state];
        case Types.UPDATE_PRODUCT:
            index = fineIndex(state, product.id);
            state[index] = product;
            return [...state];
        default: return [...state];
    }
}

var fineIndex = (products, id) => {
    var result = -1;
    products.forEach((product,index)=> {
        if(product.id=== id) {
            result = index;
        }
    })

    return result;
}

export default products;