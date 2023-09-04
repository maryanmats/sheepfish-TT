import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";
const ProductsList = lazy(() => import('../components/ProductsList'));
const ProductDetails = lazy(() => import('../components/ProductDetails'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '',
				element: <ProductsList />,
			},
			{
				path: 'product/:productId',
				element: <ProductDetails />,
			},
		],
	},
]);
export default router;
