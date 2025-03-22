import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState : cartReducerInitialState = {
    loading : false,
    cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') as string) : [],
    subtotal  : 0,
    tax : 0,
    shippingCharges : 0,
    discount : 0,
    total : 0 ,
    shippingInfo : {
        address : "",
        city : "",
        state : "",
        country : "",
        pincode : "",

    }
}

export const cartReducer = createSlice({ 
    name: "cartReducer",
    initialState ,
    reducers : {
        addToCart : (state,action:PayloadAction<CartItem>) =>{
            state.loading = true;
            const item = state.cartItems.findIndex(i=>i.productId===action.payload.productId)
            if(item!==-1) state.cartItems[item] = action.payload;
            else state.cartItems.push(action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            state.loading = false;
        },
        removeCartItem : (state,action:PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((i)=>i.productId !== action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            state.loading = false;
        },
        calculatePrice : (state) => {
            const subtotal = state.cartItems.reduce(
                (total,item) => total + item.price * item.quantity, 0
            )
            state.subtotal = subtotal
            state.shippingCharges = state.subtotal > 1000 ? 0 : 150;
            state.tax = Math.round(state.subtotal * .5/100);
            state.total = state.subtotal + state.tax + state.shippingCharges - state.discount
        },
        applyDiscount: (state,action:PayloadAction<number>) => {
            state.discount = action.payload

        } ,
        saveShippingInfo : (state,action:PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },
        resetCart : () => initialState,
    },
 });

 export const {addToCart,removeCartItem, calculatePrice,applyDiscount ,saveShippingInfo,resetCart } = cartReducer.actions;

export default cartReducer.reducer;
