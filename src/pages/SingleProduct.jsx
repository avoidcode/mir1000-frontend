import axios from "axios";

import { useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import { apiBaseUrl } from "../features/constants";
import { authHeaders } from "../features/utils";

export const singleProductLoader = async ({ params }) => {
    const { id } = params;

    const response = await axios(`${apiBaseUrl}/products/${id}`, {
        headers: authHeaders
    });

    return { productData: response.data };
};

const SingleProduct = () => {
    const { productData } = useLoaderData();
    return (
        <>
            <div className="grid grid-cols-2 max-w-7xl mx-auto mt-5 max-lg:grid-cols-1 max-lg:mx-5">
                <div className="product-images flex flex-col justify-center max-lg:justify-start">
                    <img
                        src={`https://${productData?.image}`}
                        className="w-96 text-center border border-gray-600 cursor-pointer"
                        alt={productData.name}
                    />
                </div>
                <div className="single-product-content flex flex-col gap-y-5 max-lg:mt-2">
                    <h2 className="text-5xl max-sm:text-3xl text-accent-content">
                        {productData?.name}
                    </h2>
                    <p className="text-3xl text-error">
                        {productData?.purchase_price}₽
                    </p>
                    <div className="text-xl max-sm:text-lg text-accent-content">
                        {parse(productData?.description)}
                    </div>
                    <div className="other-product-info flex flex-col gap-x-2">
                        <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
                            Производитель: {productData?.manufacturer_id}
                        </div>
                        <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
                            Рекомендованная цена продажи: {productData?.recommended_selling_price}
                        </div>
                        <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
                            Наличие: {productData?.quantity_in_stock}
                        </div>
                        <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
                            Артикул: {productData?.id}
                        </div>
                        <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
                            Категория: {productData?.category_id}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;
