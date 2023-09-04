import { ProductType } from "../store/productsSlice";

function toFilter(items: ProductType[], filter: string) {
	if (filter.length === 0) {
		return items;
	}

	const filteredItems = items.filter((item) =>
		isRequired(item, filter.toLowerCase())
	);

	return filteredItems;
}

function isRequired(item: ProductType, filter: string) {
	return (
		item.title.toLowerCase().includes(filter) ||
		item.description.toLowerCase().includes(filter) ||
		item.category.toLowerCase().includes(filter) ||
		item.brand.toLowerCase().includes(filter) ||
		item.id.toString().includes(filter)
	);
}

export default toFilter;
