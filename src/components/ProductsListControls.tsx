import { Th, Tr } from '@chakra-ui/react';
import React from 'react';
import ProductsListControl from './ProductsListControl';

function ProductsListControls() {
	return (
		<Tr>
			<ProductsListControl textAlign='center' field='id' />
			<ProductsListControl field='title' />
			<ProductsListControl field='description' />
			<ProductsListControl field='price' />
			<Th textAlign='center'>Photo</Th>
			<ProductsListControl field='rating' />
			<ProductsListControl field='stock' />
			<ProductsListControl field='category' />
			<Th></Th>
			<Th></Th>
		</Tr>
	);
}

export default ProductsListControls;
