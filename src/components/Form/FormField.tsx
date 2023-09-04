import { Field, FieldProps } from "formik";
import React from "react";
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';

type FormFieldType = {
	name: string;
	type: string;
	placeholder: string;
};

const FormField = ({ name, placeholder, type }: FormFieldType) => {
	return (
		<Field name={name}>
			{({ field, meta }: FieldProps) => (
				<FormControl isInvalid={!!meta.error && meta.touched} marginBottom={4}>
					<FormLabel textTransform='capitalize'>{name}</FormLabel>
					<Input {...field} placeholder={placeholder} type={type} />
					<FormErrorMessage>{meta.error}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	);
};

export default FormField;
