import { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../features/constants";

const Profile = () => {
    const { isLoggedIn, userId, token } = useSelector((state) => state.auth);
    const [userFormData, setUserFormData] = useState({
        surname: false,
        name: false,
        patronymic: false,
        email: false,
        password: false
    });
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            const response = await axios(`${apiBaseUrl}/users/${userId}`);
            const data = response.data;
            setUserFormData({
                id: data.id,
                role_id: data.role_id,
                surname: data.surname,
                name: data.name,
                patronymic: data.patronymic,
                email: data.email,
                password: data.password
            });
        } catch (error) {
            toast.error("Error: ", error.response);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            getUserData();
        } else {
            toast.error("Вы должны быть авторизованы, чтобы выполнить это действие");
            navigate("/");
        }
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {

            await axios.patch(`${apiBaseUrl}/users/${userId}`, {
                surname: userFormData.surname,
                name: userFormData.name,
                patronymic: userFormData.patronymic,
                email: userFormData.email,
                password: userFormData.password
            }, {headers:{"Authorization":`Bearer ${token}`}});
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <>
            <SectionTitle title="Профиль" />
            <form
                className="max-w-7xl mx-auto text-center px-10"
                onSubmit={updateProfile}
            >
                <div className="grid grid-cols-3 max-lg:grid-cols-1">

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Фамилия</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.surname}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    surname: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Имя</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.name}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Отчество</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.patronymic}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    patronymic: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">
                                Электронная почта
                            </span>
                        </label>
                        <input
                            type="email"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.email}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Пароль</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.password}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <button
                    className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
                    type="submit"
                >
                    Обновить профиль
                </button>
            </form>
        </>
    );
};

export default Profile;
