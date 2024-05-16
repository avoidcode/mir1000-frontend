import { useState } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
    const [selectCategoryList] = useState([
        "Все",
        "shoes",
        "slippers",
        "heels",
        "t-shirts",
        "jackets",
        "caps",
        "shorts",
        "sweaters",
        "sneakers",
        "shirts",
        "boots",
        "overshirts",
        "pants",
        "jeans",
        "socks",
        "belts",
        "trainers",
    ]);
    const [selectBrandList] = useState([
        "Все",
        "WALK LONDON",
        "Reebok",
        "Nike",
        "Jack & Jones",
        "Crocs",
        "Vans",
        "Puma",
        "New Balance",
        "Tommy Jeans",
        "Tommy Hilfiger",
        "Bershka",
        "New Look",
        "AllSaints",
        "Columbia",
        "The North Face",
        "Collusion",
        "ASOS DESIGN",
        "Topman",
        "Dr Denim",
        "Polo Ralph Lauren",
        "ASOS Dark Future",
        "Levi's",
        "Threadbare",
        "Calvin Klein",
        "AAPE BY A BATHING APE®",
        "Good For Nothing",
        "Timberland",
        "Pull and Bear",
        "Koi Footwear",
        "adidas performance",
        "Nike Running",
        "Dr Martens",
        "River Island",
    ]);

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
                list={selectCategoryList.map((item) => {return {name: item, value: item}; })}
                size="select-sm"
                defaultValue="all"
            />
            <FormSelect
                label="Производитель"
                name="manufacturer"
                list={selectBrandList.map((item) => {return {name: item, value: item}; })}
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
