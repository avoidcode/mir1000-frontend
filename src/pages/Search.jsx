import axios from "axios";
import { useState } from "react";
import { ProductElement, SearchPagination, SectionTitle } from "../components";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { apiBaseUrl } from "../features/constants";

const Search = () => {
    const { isLoggedIn, userRole } = useSelector((state) => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setCurrentPage((prevState) => 1);
        setSearchTerm((prevState) => e.target.search.value);
        try {
            const response = await axios(
                `${apiBaseUrl}/filter?q=${e.target.search.value}&_page=${currentPage}`,
            );
            const data = response.data;
            setProducts(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleSearchPagination = async () => {
        try {
            const response = await axios(
                `${apiBaseUrl}/filter?q=${searchTerm}&_page=${currentPage}`,
            );
            const data = response.data;
            setProducts(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <>
            <SectionTitle title="Поиск" />

            <form
                className="form-control max-w-7xl mx-auto py-10 px-10"
                onSubmit={handleSearch}
            >
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Введите запрос..."
                        className="input input-bordered input-lg w-full outline-0 focus:outline-0"
                        name="search"
                    />
                    <button
                        type="submit"
                        className="btn btn-square btn-lg bg-blue-600 hover:bg-blue-500 text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </form>
            {searchTerm && products.length !== 0 && (
                <h2 className="text-center text-6xl my-10 max-lg:text-4xl max-sm:text-2xl max-sm:my-5 text-accent-content">
                    Результаты для &quot;{searchTerm}&quot;
                </h2>
            )}
            {products.length === 0 && searchTerm && (
                <h2 className="text-center text-6xl my-10 max-lg:text-4xl max-sm:text-2xl max-sm:my-5 text-accent-content">
                    Не найдено: &quot;{searchTerm}&quot;
                </h2>
            )}
            <div className="max-w-7xl mx-auto mt-5">
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
                        {products && Array.isArray(products) && products.map((product) => (
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
            </div>
            <SearchPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                products={products}
                handleSearchPagination={handleSearchPagination}
            />
        </>
    );
};

export default Search;
