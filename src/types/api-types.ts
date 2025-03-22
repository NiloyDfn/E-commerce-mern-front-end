import { Bar, CartItem, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types";

export type CustomeError = {
    status : number;
    data : {
        message : string;
        success : boolean;
    }
};

export type messageResponse = {
    success : boolean;
    message : string;
}
export type AllUsersResponse = {
    success : boolean;
    users : User[];
}

export type UserResponse = {
    success : boolean;
    user : User ;
}
export type productsResponse = {
    success : boolean;
    products : Product[] ;
};

export type categoriesResponse = {
    success : boolean;
    categories : string[] ;
};

export type SearchProductsResponse = productsResponse &  {
   
    totalPage : number ;
};



export type searchProductsRequest =  {
   
    price : number ;
    page : number ;
    category : string;
    search : string;
    sort : string

};

export type productDetailResponse = {
    success : boolean;
    product : Product;
};

export type NewProductRequest = {
    id : string;
    formData : FormData;
}
export type UpdateProduct ={
    userId : string;
    productId : string;
    formData : FormData;
}

export type DeleteProduct ={
    userId : string;
    productId : string;
}

export type NewOrderRequest ={
    shippingInfo : ShippingInfo ;
    orderItems : CartItem[];
    subtotal : number;
    tax : number; 
    shippingCharges : number;
    discount : number;
    total : number;
    user : string;
}

export type DeleteUserRequest = {
    userId : string;
    adminUserId : string;
}



export type AllOrdersResponse = {
    success : boolean;
    orders : Order[] ;
};

export type OrderDetailsResponse = {
    success : boolean;
    order : Order;
};

export type StatsResponse = {
    success : boolean;
    stats : Stats;
};

export type PieResponse = {
    success : boolean;
    charts : Pie;
};

export type BarResponse = {
    success : boolean;
    barCharts : Bar;
};
export type LineResponse = {
    success : boolean;
    lineCharts : Line;
};

export type UpdateOrderRequest ={
   
    userId : string;
    orderId : string;
};
