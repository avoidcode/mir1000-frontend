import { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { nanoid } from "nanoid";
import { apiBaseUrl } from "../features/constants";

const OrderHistory = () => {
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const getOrderHistory = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/orders`);
            const data = response.data;
            setOrders(
                data.filter(
                    (order) => order.userId === localStorage.getItem("id"),
                ),
            );
        } catch (error) {
            toast.error(error.response);
        }
    };

    useEffect(() => {
        if (!loginState) {
            toast.error("You must be logged in to access this page");
            navigate("/");
        } else {
            getOrderHistory();
        }
    }, []);

    return (
        <>
            <SectionTitle title="История заказов" />
            <div className="order-history-main max-w-7xl mx-auto mt-10 px-20 max-md:px-10">
                {orders?.length === 0 ? (
                    <div className="text-center">
                        <h1 className="text-4xl text-accent-content">
                            История заказов пуста.
                        </h1>
                        <Link
                            to="/shop"
                            className="btn bg-blue-600 hover:bg-blue-500 text-white mt-10"
                        >
                            Сделайте свой первый заказ!
                        </Link>
                    </div>
                ) : (
                    orders.map((order) => {
                        return (
                            <div
                                key={nanoid()}
                                className="collapse collapse-plus bg-base-200 mb-2"
                            >
                                <input type="radio" name="my-accordion-3" />
                                <div className="collapse-title text-xl font-medium text-accent-content">
                                    Order {order.id} - {order.orderStatus}
                                </div>
                                <div className="collapse-content">
                                    <div className="overflow-x-auto">
                                        <table className="table max-sm:table-xs table-pin-rows table-pin-cols">
                                            {/* head */}
                                            <thead>
                                                <tr className="text-accent-content">
                                                    <th>Заказ</th>
                                                    <th>Изображение</th>
                                                    <th>Наименование</th>
                                                    <th>Размер</th>
                                                    <th>Количество</th>
                                                    <th>Цена</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.cartItems.map(
                                                    (product, counter) => (
                                                        <tr
                                                            className="text-accent-content"
                                                            key={nanoid()}
                                                        >
                                                            <th>
                                                                {counter + 1}
                                                            </th>
                                                            <th>
                                                                <img
                                                                    src={`https://${product.image}`}
                                                                    alt=""
                                                                    className="w-10"
                                                                />
                                                            </th>
                                                            <td>
                                                                {product.title}
                                                            </td>
                                                            <td>
                                                                {
                                                                    product.selectedSize
                                                                }
                                                            </td>
                                                            <td>
                                                                {product.amount}
                                                            </td>
                                                            <td>
                                                                {(
                                                                    product.price *
                                                                    product.amount
                                                                ).toFixed(2)}
                                                                ₽
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="text-center"
                                                    >
                                                        <h4 className="text-md text-accent-content">
                                                            Подытог:{" "}
                                                            {Math.round(
                                                                order?.subtotal,
                                                            )}
                                                            ₽
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="text-center"
                                                    >
                                                        <h3 className="text-md text-accent-content">
                                                            Доставка: 199₽
                                                        </h3>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="text-center"
                                                    >
                                                        <h3 className="text-xl text-accent-content">
                                                            - Итого: $
                                                            {Math.round(
                                                                order?.subtotal +
                                                                    199,
                                                            )}{" "}
                                                            -
                                                        </h3>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default OrderHistory;
