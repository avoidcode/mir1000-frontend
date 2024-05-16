import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import axios from "axios";
import { apiBaseUrl } from "../features/constants";
import { toast } from "react-toastify";

const Filters = () => {
    const [categoriesList, setCategoriesList] = useState([
        "Все",
    ]);
    const [manufacturersList, setManufacturersList] = useState([
        "Все",
    ]);

    const getManufacturerData = async () => {
        try {
            const response = await axios(`${apiBaseUrl}/v1/manufacturers`);
            const data = response.data;
            setManufacturersList([...data, "Все"]);
        } catch (error) {
            toast.error("Ошибка: ", error.response);
        }
    };

    const getCategoriesData = async () => {
        try {
            const response = await axios(`${apiBaseUrl}/v1/categories`);
            const data = response.data;
            setCategoriesList([...data, "Все"]);
        } catch (error) {
            toast.error("Ошибка: ", error.response);
        }
    };

    useEffect(() => {
        getManufacturerData();
        getCategoriesData();
    }, []);

    return (
        <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center pb-8">
            <FormInput
                type="search"
                label="Запрос"
                name="search"
                size="input-sm"
                defaultValue=""
            />
            <FormSelect
                label="Категория"
                name="category"
                list={categoriesList.map((item) => {return {name: item, value: item}; })}
                size="select-sm"
                defaultValue="all"
            />
            <FormSelect
                label="Производитель"
                name="manufacturer"
                list={manufacturersList.map((item) => {return {name: item, value: item}; })}
                size="select-sm"
                defaultValue="all"
            />
            <FormSelect
                label="Сортировать"
                name="order"
                list={[
                    {value: "asc", name: "По алфавиту"},
                    {value: "price-higher", name: "Сначала дороже"},
                    {value: "price-lower", name: "Сначала дешевле"}
                ]}
                size="select-sm"
                defaultValue="a-z"
            />
            <FormRange
                name="price"
                label="Цена"
                size="range-sm"
                price={1000000}
            />
            <FormCheckbox label="В наличии" name="stock" defaultValue="false" />
            <button
                type="submit"
                className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm m-2"
            >
                Поиск
            </button>
            <Link to="/shop?page=1" className="btn btn-primary btn-sm m-2">
                Cбросить
            </Link>
        </Form>
    );
};

export default Filters;
