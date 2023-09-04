import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Search() {
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const filterFromParams = searchParams.get('search');

	const [query, setQuery] = useState(filterFromParams ?? '');
	const [debouncedQuery, setDebouncedQuery] = useState(filterFromParams ?? '');

	useEffect(() => {
		if (filterFromParams !== null) {
			setQuery(filterFromParams);
			setDebouncedQuery(filterFromParams);
		}
	}, [searchParams]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedQuery(query);
		}, 200);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [query]);

	useEffect(() => {
		searchParams.set('search', debouncedQuery);
		const newUrl = searchParams.toString();

		navigate('?' + newUrl, { replace: true });
	}, [debouncedQuery]);

	return (
		<Input
			variant='filled'
			placeholder='Search'
			name='search'
			autoFocus
			value={query}
			onChange={(e) => setQuery(e.target.value.trim())}
		/>
	);
}

export default Search;
