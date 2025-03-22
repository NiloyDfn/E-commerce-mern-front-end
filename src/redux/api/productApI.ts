import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoriesResponse, DeleteProduct, messageResponse, NewProductRequest, productDetailResponse, productsResponse, searchProductsRequest, SearchProductsResponse, UpdateProduct } from "../../types/api-types";

export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    tagTypes : ["product"],
    endpoints: (builder) => ({
        latestProducts: builder.query<productsResponse, string>({  
            query: () => "latest",
            providesTags: ["product"]
        }),
        allProducts: builder.query<productsResponse, string>({  
            query: (id) => `admin-products?id=${id}`,
            providesTags: ["product"]
        }),
        categories: builder.query<categoriesResponse, string>({  
            query: () => "categories",
            providesTags: ["product"]
        }),
        searchProducts: builder.query<SearchProductsResponse, searchProductsRequest>({  
            query: ({price,search,sort, category,page}) => {
                let base = `all?search=${search}&page=${page}}`;
                if(price) base += `&price=${price}`;
                if(sort) base += `&sort=${sort}`;
                if(category) base += `&category=${category}`;

                return base;
            },
            providesTags: ["product"]
        }),
        newProduct : builder.mutation<messageResponse, NewProductRequest>({  
            query: ({formData,id}) => ({
                url : `new?id=${id}`,
                method : 'POST',
                body : formData,
            }),
            invalidatesTags: ["product"]
        }),
        productDetails: builder.query<productDetailResponse, string>({  
            query: (id) => id, // Ensure the correct URL format
            providesTags: ["product"]
        }),
        
        updateProduct: builder.mutation<messageResponse, UpdateProduct>({
            query: ({ formData, userId,productId}) => ({
                url: `${productId}?id=${userId}`,
                method: 'PUT', 
                body: formData
            }),
            invalidatesTags: ["product"]
        }),
        deleteProduct: builder.mutation<messageResponse, DeleteProduct>({
            query: ({userId , productId}) => ({
                url: `${productId}?id=${userId}`,
                method: 'DELETE',
        
            }),
            invalidatesTags: ["product"]
        })
    }),
});

export const { 
    useLatestProductsQuery, 
    useAllProductsQuery, 
    useCategoriesQuery,
    useSearchProductsQuery,
    useNewProductMutation,
    useProductDetailsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productAPI;
