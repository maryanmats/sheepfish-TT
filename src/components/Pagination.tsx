import {
	Button,
	Flex,
	HStack,
	Select,
	Text
	} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

type PaginationPropsType = {
	perPage: number;
	page: number;
	getLink: (page: number) => string;
	onPerPageChange: (perPage: string) => void;
	totalPages: number;
};

const Pagination = (props: PaginationPropsType) => {
	const { page, perPage, getLink, onPerPageChange, totalPages } = props;

	const numberOfButtons = Math.ceil(totalPages / perPage);

	if (numberOfButtons === 0) return null;

	const buttons = useMemo(() => {
    return Array.from({ length: numberOfButtons }, (_, index) => index + 1);
}, [totalPages, perPage]);


	let currPage = page;
	const currPerPage = perPage;

	if (currPage > numberOfButtons) {
		currPage = numberOfButtons;
	}

	if (currPage < 1) {
		currPage = 1;
	}

	const prevButton = currPage - 1 < 0 ? 1 : currPage - 1;
	const nextButton =
		currPage + 1 > numberOfButtons ? numberOfButtons : currPage + 1;

	const lastButton = numberOfButtons;
	const firstButton = 1;

	const isLastButton = currPage === numberOfButtons;
	const isFirstButton = currPage === 1;

	const isButtonVisible = (button: number) => {
		const first5Buttons = button <= 5 && currPage <= 3;
		const last5Buttons =
			button >= numberOfButtons - 4 && currPage >= numberOfButtons - 2;
		const afterNextButton = nextButton + 1;
		const beforePrevButton = prevButton - 1;

		return (
			button === currPage ||
			button === firstButton ||
			button === lastButton ||
			button === nextButton ||
			button === afterNextButton ||
			button === prevButton ||
			button === beforePrevButton ||
			first5Buttons ||
			last5Buttons
		);
	};

	const visibleButtons = useMemo(() => {
		const filtered: (number | boolean)[] = buttons.filter(isButtonVisible);

		const firstButton = 1;
		const lastButton = buttons.length;
		const firstVisibleButton = filtered[0] as number;
		const secondVisibleButton = filtered[1] as number;
		const lastVisibleButton = filtered.at(-1) as number;
		const beforeLastVisibleButton = filtered.at(-2) as number;

		let isFirstDots = secondVisibleButton - firstVisibleButton > 1;
		let isLastDots = lastVisibleButton - beforeLastVisibleButton > 1;

		if (firstButton === lastButton) return [firstButton];

		const visible = [
			firstButton,
			isFirstDots,
			...filtered.slice(1, -1),
			isLastDots,
			lastButton,
		];

		return visible;
	}, [isButtonVisible]);

	return (
		<Flex justifyContent='space-between' marginY={8}>
			<Flex as='nav'>
				<Button
					as={Link}
					to={getLink(prevButton)}
					isDisabled={isFirstButton}
					marginRight={6}
				>
					Prev
				</Button>

				<HStack>
					{visibleButtons.map((button, index) => {
						if (button === true) {
							return (
								<Button key={String(button) + String(index)} isDisabled>
									&#8230;
								</Button>
							);
						}

						if (button === currPage) {
							return (
								<Button isActive disabled key={String(button) + String(index)}>
									{button}
								</Button>
							);
						}

						if (button !== false) {
							return (
								<Button
									as={Link}
									variant='outline'
									to={getLink(button)}
									disabled={button === currPage}
									key={String(button) + String(index)}
								>
									{button}
								</Button>
							);
						}
					})}
				</HStack>

				<Button
					as={Link}
					isDisabled={isLastButton}
					to={getLink(nextButton)}
					marginLeft={6}
				>
					Next
				</Button>
			</Flex>

			<HStack>
				<Text>Items on a page:</Text>
				<Select
					value={currPerPage}
					onChange={({ target }) => onPerPageChange(target.value)}
					paddingY={0}
				>
					<option value='1'>1</option>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='20'>20</option>
				</Select>
			</HStack>
		</Flex>
	);
};

export default Pagination;
