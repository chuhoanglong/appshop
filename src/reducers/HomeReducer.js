import * as Types from '../actions/actionTypes';
import adidas from '../assets/adidas.png';
import nike from '../assets/nike.png';
import coffe from '../assets/coffee.png';
import cupcake from '../assets/cupcake.png';
import badhabits from '../assets/logo.jpg';
const initialState = {
    categorys:[
        {
            id:1,
            name:'adidas',
            src:adidas
        },
        {
            id:2,
            name:'NIKE',
            src:nike
        },
        {
            id:5,
            name:'BAD HABITS',
            src:badhabits
        },
        {
            id:3,
            name:'coffee',
            src:coffe
        },
        {
            id:4,
            name:'cupcake',
            src:cupcake
        },
    ],
}

export default function(state = initialState,action){
    switch (action.type) {
        case Types.SHOW_PRODUCT:{
            return state
        }
                        
        default:
            return state
    }
}


