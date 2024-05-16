import {
    Filters,
    Pagination,
    ProductElement,
    SectionTitle,
} from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { apiBaseUrl } from "../features/constants";

export const shopLoader = async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);

    const filterObj = {
        manufacturer: params.brand ?? "all",
        category: params.category ?? "all",
        gender: params.gender ?? "all",
        price: params.price ?? "all",
        search: params.search ?? "",
        in_stock: params.stock === undefined ? false : true,
        current_page: Number(params.page) || 1,
    };

    let parameter =
        `?_start=${(filterObj.current_page - 1) * 10}&_limit=10` +
        (filterObj.manufacturer !== "Все" ? `&manufacturer=${filterObj.manufacturer}` : "") +
        (filterObj.category !== "Все"
            ? `&category=${filterObj.category}`
            : "") +
        (filterObj.search != ""
            ? `&q=${encodeURIComponent(filterObj.search)}`
            : ``) +
        (filterObj.in_stock ? `&quantity_in_stock.value_gt=0` : "") +
        (filterObj.price !== "all"
            ? `&price.value_lt=${filterObj.price}`
            : ``)

    try {
        const response = await axios(
            `${apiBaseUrl}/products${parameter}`,
        );
        let data = response.data;

        if (
            filterObj.order &&
            !(filterObj.order === "asc" || filterObj.order === "price low")
        )
            data.sort((a, b) => b.price.current.value - a.price.current.value);
        return {
            productsData: data,
            productsLength: data.length,
            page: filterObj.current_page,
        };
    } catch (error) {
        console.log(error.response);
    }

    return null;
};

const Shop = () => {
    const { isLoggedIn, userRole } = useSelector((state) => state.auth);
    const productLoaderData = useLoaderData();
    return (
        <>
            <SectionTitle title="Каталог" />
            <div className="max-w-7xl mx-auto mt-5">
                <Filters />
                {productLoaderData.productsData.length === 0 ? (
                    <h2 className="text-accent-content text-center text-4xl my-10">
                        Не найдено товаров по заданным параметрам
                    </h2>
                ) : (
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>Изображение</th>
                            <th>Наименование</th>
                            <th>Описание</th>
                            <th>На складе</th>
                            <th>Размер</th>
                            <th>Цена</th>
                            <th>Рекомендуемая цена продажи</th>
                            { isLoggedIn && ["0", "1"].includes(userRole) && (
                                <th>Действия</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {productLoaderData.productsData.length !== 0 &&
                            productLoaderData.productsData.map((product) => (
                                <ProductElement
                                    key={nanoid()}
                                    id={product.id}
                                    title={product.name}
                                    description={product.description}
                                    quantityInStock={product.quantity_in_stock}
                                    category={product.category_id}
                                    size={product.size}
                                    image={product.image}
                                    price={product.purchase_price}
                                    recommendedPrice={product.recommended_selling_price}
                                    manufacturerId={product.manufacturer_id}
                                />
                            ))}
                        </tbody>
                </table>
                )}
                <div className="flex flex-col justify-center sm:py-12">
                    <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
                        <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
                            <Link
                                to="/add-product"
                                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">
                                    Добавить товар
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Pagination />
        </>
    );
};

export default Shop;
