import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import axios from "axios";
import { apiBaseUrl } from "../features/constants";
import { authHeaders } from "../features/utils";

const EditProduct = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [categoriesList, setCategoriesList] = useState([]);
    const [manufacturersList, setManufacturersList] = useState([]);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [recommendedSellingPrice, setRecommendedSellingPrice] = useState("");
    const [size, setSize] = useState("");
    const [quantityInStock, setQuantityInStock] = useState("");
    const [image, setImage] = useState("");

    const getProductData = async () => {
        try {
            const response = await axios(`${apiBaseUrl}/products/${state.productId}`, {
                headers: authHeaders
            });
            const data = response.data;
            setName(data.name);
            setCategory(data.category_id);
            setManufacturer(data.manufacturer_id);
            setDescription(data.description);
            setPurchasePrice(data.purchase_price);
            setRecommendedSellingPrice(data.recommended_selling_price);
            setSize(data.size);
            setQuantityInStock(data.quantity_in_stock);
        } catch (error) {
            toast.error("Ошибка: ", error.response);
        }
    };

    const getManufacturerData = async () => {
        try {
            const response = await axios(`${apiBaseUrl}/v1/manufacturers`, {
                headers: authHeaders
            });
            const data = response.data.data;
            setManufacturersList(data);
        } catch (error) {
            toast.error("Ошибка: ", error.response);
        }
    };

    const getCategoriesData = async () => {
        try {
            const response = await axios(`${apiBaseUrl}/v1/categories`, {
                headers: authHeaders
            });
            const data = response.data.data;
            setCategoriesList(data);
        } catch (error) {
            toast.error("Ошибка: ", error.response);
        }
    };

    useEffect(() => {
        if (!state) {
            navigate("/");
            return;
        }
        getProductData();
        getManufacturerData();
        getCategoriesData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        let patchObj = {
            name,
            category_id: Number(category),
            description,
            manufacturer_id: Number(manufacturer),
            purchase_price: String(purchasePrice),
            recommended_selling_price: String(recommendedSellingPrice),
            size: Number(size),
            quantity_in_stock: Number(quantityInStock),
            image: image
        };

        if (!image)
            delete patchObj.image;

        fetch(`${apiBaseUrl}/products/${state.productId}`, {
                method: "PATCH",
                headers: {...authHeaders, "Content-Type": "application/json"},
                body: JSON.stringify(patchObj),
            })
                .then((res) => {
                    toast.success("Данные изменены");
                    navigate("/shop");
                })
                .catch((err) => {
                    toast.error("Ошибка: " + err.message);
                });
    };
    return (
        <>
            <SectionTitle title="Изменение товара" />
            <div className="flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
                        <form className="px-5 py-7" onSubmit={handleSubmit}>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Наименование
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Описание
                            </label>
                            <textarea
                                rows="4"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Описание"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required={true}>
                            </textarea>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Цена
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={purchasePrice}
                                onChange={(e) => setPurchasePrice(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Рекомендованная цена продажи
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={recommendedSellingPrice}
                                onChange={(e) => setRecommendedSellingPrice(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Размер
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Доступно на складе
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={quantityInStock}
                                onChange={(e) => setQuantityInStock(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Категория
                            </label>
                            <select
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categoriesList?.map((item, index) => {
                                    return (<option key={index} value={item.category_id}>{item.name}</option>);
                                })}
                            </select>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Производитель
                            </label>
                            <select
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={manufacturer}
                                onChange={(e) => setManufacturer(e.target.value.id)}
                            >
                                {manufacturersList?.map((item, index) => {
                                    return (<option key={index} value={item.manufacturer_id}>{item.name}</option>);
                                })}
                            </select>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Изображение
                            </label>
                            <input
                                type="file"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                onChange={(e) =>
                                    setImage(e.target.filepath)
                                }
                            />
                            <button
                                type="submit"
                                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">
                                    Применить
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
