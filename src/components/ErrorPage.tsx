import {
	Box,
	Container,
	Heading,
	Text
	} from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
	const error = useRouteError() as Error;
	let errorMessage = JSON.stringify(error);

	if ('statusText' in error) {
		errorMessage = JSON.stringify(error.statusText);
	} else if ('message' in error) {
		errorMessage = JSON.stringify(error.message);
	}

	return (
		<Box height='100dvh'>
			<Container>
				<Heading size='2xl' marginBottom='6'>
					Oops!
				</Heading>
				<Text fontSize='2xl'>Sorry, an unexpected error has occurred.</Text>
				<Text fontSize='xl'>
					<i>{errorMessage}</i>
				</Text>
			</Container>
		</Box>
	);
}

export default ErrorPage;
