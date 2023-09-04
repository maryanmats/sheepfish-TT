import {
	Highlight,
	HTMLChakraProps,
	Text,
	Tooltip
	} from "@chakra-ui/react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { ProductType } from "../store/productsSlice";

type ProductItemTextFieldProps = Pick<ProductType, 'category'> &
	HTMLChakraProps<'p'>;

function ProductItemTextField({
	category,
	...otherProps
}: ProductItemTextFieldProps) {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('search') ?? '';

	return (
		<Tooltip label={category} openDelay={200}>
			<Text
				{...otherProps}
				overflow='hidden'
				textOverflow='ellipsis'
				whiteSpace='nowrap'
				lineHeight='1.5rem'
			>
				<Highlight query={query} styles={{ py: '1', bg: 'orange.100' }}>
					{category}
				</Highlight>
			</Text>
		</Tooltip>
	);
}

export default ProductItemTextField;
