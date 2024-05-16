import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../features/constants";

const ProductElement = ({
    id,
    title,
    description,
    quantityInStock,
    category,
    size,
    image_id,
    price,
    recommendedPrice,
    manufacturerId,
    manufacturers,
    categories
}) => {
    const { userRole, isLoggedIn, token } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const removeProduct = async (productId) => {
        await axios.delete(`${apiBaseUrl}/products/${productId}`, {headers:{"Authorization":`Bearer ${token}`}});
        toast.success("Товар удалён.");
        navigate("/shop");
    };

    console.log(categories);
    console.log(categories.find(i => i.category_id == category));
    console.log(manufacturers);
    console.log(manufacturers.find(i => i.manufacturer_id == manufacturerId));

    return (
        <tr className="hover">
            <td>
                <Link
                    to={`/shop/product/${id}`}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <img
                        width="150px"
                        className="p-2"
                        src={`${apiBaseUrl}/images/${image_id}`}
                        alt="product image"
                    />
                </Link>
            </td>
            <td>
                <Link
                    to={`/shop/product/${id}`}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <span className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
                        {title}
                    </span>
                </Link>
                <p>{}</p>
                <p>{}</p>
            </td>
            <td>
                <span className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
                    {description}
                </span>
            </td>
            <td>
                <span className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
                    {quantityInStock}
                </span>
            </td>
            <td>
                <span className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
                    {size}
                </span>
            </td>
            <td>
                <div>
                    <span className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
                        {price}₽
                    </span>
                </div>
            </td>
            <td>
                <div>
                    <span className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
                        {recommendedPrice}₽
                    </span>
                </div>
            </td>
            <td>
                <div className="flex items-center justify-center h-16">
                    {isLoggedIn && [4, 3].includes(userRole) && (
                        <>
                            <button
                                className={`btn btn-xs text-sm btn-success mr-2`}
                                onClick={() => navigate("/edit-product", {state: { productId: id }})}
                            >
                                Изменить
                            </button>
                            <button
                                className={`btn btn-xs text-sm btn-error`}
                                onClick={() => removeProduct(id)}
                            >
                                Удалить
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default ProductElement;
