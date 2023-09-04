import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useAddProductsMutation } from "../../store/services/products";
import FormField from "./FormField";
import {
	addProduct,
	ProductType,
	selectProducts,
} from '../../store/productsSlice';

type ProductFormType = Partial<ProductType>;

const validationSchema = Yup.object({
	title: Yup.string()
		.max(25, 'Must be 25 characters or less')
		.required('Required'),
	description: Yup.string()
		.max(300, 'Must be 300 characters or less')
		.required('Required'),
	price: Yup.number().min(0, 'Must be positive').required('Required'),
	rating: Yup.number()
		.min(0, 'Must be from 0 to 5')
		.max(5, 'Must be from 0 to 5')
		.required('Required'),
});

type ProductFromType = {
	onClose?: () => void;
	product?: ProductFormType;
};

const ProductForm = ({ onClose, product = {} }: ProductFromType) => {
	const [addNewProduct] = useAddProductsMutation();
	const dispatch = useAppDispatch();
	const toast = useToast();

	// create it only for fake response
	const products = useAppSelector(selectProducts);
	const lastId = products.at(-1)?.id || 0;

	return (
		<Formik
			initialValues={{
				title: product.title || '',
				description: product.description || '',
				price: product.price || 0,
				rating: product.rating || 0,
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, actions) => {
				const response = await addNewProduct(values);

				if ('data' in response) {
					// add necessary data to fake response
					const newProduct: ProductType = {
						...response.data,
						id: lastId + 1,
						thumbnail: 'https://placehold.co/100',
						category: 'lorem',
						brand: 'lorem',
						stock: Math.trunc(Math.random() * 100),
					};

					dispatch(addProduct(newProduct));
				}

				actions.setSubmitting(false);
				actions.resetForm();
				onClose && onClose();
				toast({
					position: 'top',
					description: 'Product added.',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			}}
		>
			{(props) => (
				<Form id='newProduct'>
					<FormField
						name='title'
						type='text'
						placeholder='Enter the product name'
					/>
					<FormField
						name='description'
						type='text'
						placeholder='Enter the product description'
					/>
					<FormField
						name='price'
						type='number'
						placeholder='Enter the product price'
					/>
					<FormField
						name='rating'
						type='number'
						placeholder='Enter the product rating'
					/>
					<Button
						mt={4}
						colorScheme='teal'
						isLoading={props.isSubmitting}
						width='100%'
						isDisabled={!props.isValid}
						type='submit'
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default ProductForm;
