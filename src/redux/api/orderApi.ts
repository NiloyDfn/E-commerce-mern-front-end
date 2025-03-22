import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrdersResponse, messageResponse, NewOrderRequest, OrderDetailsResponse, UpdateOrderRequest } from "../../types/api-types"; 

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes:["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<messageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags : ["orders"]
    }),
    cashOnDelivery: builder.mutation<messageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "cash-on-delivery",
        method: "POST",
        body: order,
      }),
      invalidatesTags : ["orders"]
    }),
    updateOrder: builder.mutation<messageResponse, UpdateOrderRequest>({
      query: ({userId,orderId}) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags : ["orders"]
    }),
    deleteOrder: builder.mutation<messageResponse, UpdateOrderRequest>({
      query: ({userId,orderId}) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags : ["orders"]
    }),
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `my?id=${id}`,
      providesTags : ["orders"],
    }),
    allOrders : builder.query<AllOrdersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags : ["orders"],
    }),
    orderDetails : builder.query<OrderDetailsResponse, string>({
      query: (id) => id ,
      providesTags : ["orders"],
    }),
  }),
});

export const { useNewOrderMutation , useCashOnDeliveryMutation, useUpdateOrderMutation,useDeleteOrderMutation,useMyOrdersQuery,useAllOrdersQuery,useOrderDetailsQuery } = orderApi;
