import chunk from "lodash/chunk";
import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDataSort from "./useDataSort";

function usePagination() {
	const navigate = useNavigate();

	const { sortedData: sortedItems } = useDataSort();
	const [searchParams] = useSearchParams();

	const perPageItems = parseInt(searchParams.get('perPage') ?? '10', 10);
	const pagesCount = Math.ceil((sortedItems?.length || 0) / perPageItems);
	let pageFromParams = parseInt(searchParams.get('page') ?? '1', 10);

	const currPage = useMemo(() => {
		if (pageFromParams > pagesCount) {
			pageFromParams = pagesCount;
		}

		if (pageFromParams < 1) {
			pageFromParams = 1;
		}

		return pageFromParams;
	}, [searchParams]);

	useEffect(() => {
		searchParams.set('page', String(currPage));
		const newUrl = searchParams.toString();

		navigate('?' + newUrl, { replace: true });
	}, [currPage]);

	const paginatedItems = useMemo(
		() => chunk(sortedItems, perPageItems),
		[sortedItems]
	);

	const visibleItems = useMemo(() => {
		return paginatedItems[currPage - 1];
	}, [paginatedItems, currPage]);

	const getLink = (newPage: number) => {
		searchParams.set('page', String(newPage));

		return '?' + searchParams.toString();
	};

	const onPerPageChange = (perPage: string) => {
		searchParams.set('perPage', perPage);
		const newUrl = searchParams.toString();

		navigate('?' + newUrl, { replace: true });
	};

	return {
		currPage,
		perPageItems,
		visibleItems,
		sortedItems,
		getLink,
		onPerPageChange,
	};
}

export default usePagination;
