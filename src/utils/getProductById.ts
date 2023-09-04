import { useAppSelector } from "../store/hooks";
import { selectProducts } from "../store/productsSlice";

function getProductById(id: number) {
	const products = useAppSelector(selectProducts);
	const product = products.find((product) => product.id === id);

	return product;
}

export default getProductById;
