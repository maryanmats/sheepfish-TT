import React, { createContext, lazy } from "react";
import useDataSort from "../hooks/useDataSort";
import usePagination from "../hooks/usePagination";
import { ProductType } from "../store/productsSlice";
import { useGetProductsQuery } from "../store/services/products";
import Pagination from "./Pagination";
import ProductsListControls from "./ProductsListControls";
const ProductItem = lazy(() => import('./ProductItem'));

// eslint-disable-next-line
import {
	Table,
	Thead,
	Tbody,
	TableContainer,
	Center,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';

type DataSortContextType = {
	sortedItems: ProductType[] | undefined;
	currSortBy: keyof ProductType;
	orderBy: 'asc' | 'desc';
};

export const DataSortContext = createContext<DataSortContextType | null>(null);

function ProductsList() {
	const [isLargerThan1440] = useMediaQuery('(min-width: 1440px)');
    const { error, isLoading } = useGetProductsQuery();
    const { sortedData, orderBy, currSortBy } = useDataSort();
    const {
        currPage,
        perPageItems,
        visibleItems,
        sortedItems,
        getLink,
        onPerPageChange,
    } = usePagination();

	let errorMessage: null | string = null;

	if (error && 'status' in error) {
		const errMsg = 'data' in error ? JSON.stringify(error.data) : error.error;

		errorMessage = `Error: ${errMsg}.`;
	} else if (error) {
		errorMessage = error.message ?? 'undefine error';
	}

	if (errorMessage) return <Center>{errorMessage?.toUpperCase()}</Center>;

	if (isLoading) return <Center>Loading...</Center>;

	return (
		<DataSortContext.Provider value={{ sortedItems, orderBy, currSortBy }}>
			<TableContainer marginBottom='5rem'>
				<Table variant='simple' size={isLargerThan1440 ? 'md' : 'sm'}>
					<Thead>
						<ProductsListControls />
					</Thead>
					<Tbody>
						{visibleItems?.map((product) => (
							<ProductItem key={product.id} {...product} />
						))}
					</Tbody>
				</Table>
				<Pagination
					perPage={perPageItems}
					page={currPage}
					getLink={getLink}
					onPerPageChange={onPerPageChange}
					totalPages={sortedData.length}
				/>
			</TableContainer>
			{!visibleItems && (
				<Text padding={6} fontSize='xl'>
					No matches
				</Text>
			)}
		</DataSortContext.Provider>
	);
}

export default ProductsList;
