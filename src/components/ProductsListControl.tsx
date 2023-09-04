import { HTMLChakraProps, Th, useColorMode } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductType } from "../store/productsSlice";
import { DataSortContext } from "./ProductsList";

type ProductsListControlProps = HTMLChakraProps<'th'> & {
	field: keyof ProductType;
};

function ProductsListControl({
	field,
	...otherProps
}: ProductsListControlProps) {
	const { colorMode } = useColorMode();
	const dataSort = useContext(DataSortContext);
	const [_searchParams, setSearchParams] = useSearchParams();

	let direction: 'asc' | 'desc' = 'asc';

	if (dataSort?.currSortBy === field) {
		direction = dataSort?.orderBy === 'asc' ? 'desc' : 'asc';
	}

	const handleSort = () => {
		setSearchParams((search) => {
			search.set('sortby', field);
			search.set('orderby', direction);

			return search;
		});
	};

	return (
		<Th
			{...otherProps}
			transition='background 0.3s'
			onClick={handleSort}
			_hover={{
				bg: `${colorMode === 'light' ? 'gray.200' : 'gray.600'}`,
				cursor: 'pointer',
			}}
		>
			{field}{' '}
			{dataSort?.currSortBy === field &&
				(dataSort?.orderBy === 'asc' ? <>&uarr;</> : <>&darr;</>)}
		</Th>
	);
}

export default ProductsListControl;
