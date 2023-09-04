import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../productsSlice";

export const productApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getProducts: builder.query<{ products: ProductType[] }, void>({
			query: () => ({ url: 'products' }),
			providesTags: (result) =>
				result
					? [
							...result.products.map(({ id }) => ({
								type: 'Products' as const,
								id,
							})),
							'Products',
					  ]
					: ['Products'],
		}),
		addProducts: builder.mutation<ProductType, Partial<ProductType>>({
			query: (body) => ({
				url: `products/add`,
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}),
			invalidatesTags: [{ type: 'Products', id: 'LIST' }],
		}),
		deleteProducts: builder.mutation<ProductType, number>({
			query(id) {
				return {
					url: `products/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: (product) => [{ type: 'Products', id: product?.id }],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useDeleteProductsMutation,
	useAddProductsMutation,
} = productApi;
