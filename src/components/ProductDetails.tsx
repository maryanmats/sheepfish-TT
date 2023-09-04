import React from "react";
import { useParams } from "react-router-dom";
import getProductById from "../utils/getProductById";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	Card,
	CardBody,
	Text,
	Image,
	CardFooter,
	Heading,
	Stack,
	Center,
	useToast,
} from '@chakra-ui/react';

function ProductDetails() {
	const { productId } = useParams();
	const toast = useToast();

	if (!productId) return null;

	const product = getProductById(parseInt(productId, 10));

	if (!product) {
		return (
			<Alert status='error'>
				<AlertIcon />
				<AlertTitle>Product not found!</AlertTitle>
				<AlertDescription>
					You may have entered an incorrect id.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<Center>
			<Card
				direction={{ base: 'column', sm: 'row' }}
				overflow='hidden'
				variant='outline'
				maxWidth='fit-content'
			>
				<Image
					objectFit='cover'
					maxWidth={{ base: '100%', sm: '200px' }}
					src={product.thumbnail}
					alt={product.title}
				/>

				<Stack>
					<CardBody>
						<Heading size='md'>{product.title}</Heading>

						<Text py='2'>{product.description}</Text>
					</CardBody>

					<CardFooter>
						<Button
							variant='solid'
							colorScheme='blue'
							onClick={() =>
								toast({
									position: 'top',
									title: `${product.title} added to cart.`,
									description:
										'You can pay for the goods and order delivery in your cart.',
									status: 'success',
									duration: 9000,
									isClosable: true,
								})
							}
						>
							Buy Latte
						</Button>
					</CardFooter>
				</Stack>
			</Card>
		</Center>
	);
}

export default ProductDetails;
