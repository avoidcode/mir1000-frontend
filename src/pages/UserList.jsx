import { useSelector } from "react-redux";
import { SectionTitle, UserEntry } from "../components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../features/constants";
import { authHeaders } from "../features/utils";

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const getUsersData = async () => {
        try {
            const response = await axios(`${apiBaseUrl}/users`, {
                headers: authHeaders
            });
            setUsers(response.data);
        } catch (error) {
            toast.error("Error: ", error.response);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            getUsersData();
        } else {
            toast.error("Вы должны быть авторизованы, чтобы выполнить это действие");
            navigate("/");
        }
    }, []);

    return (
        <>
            <SectionTitle title="Пользователи" />
            <div className="max-w-7xl mx-auto">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-accent-content">Фамилия</th>
                                <th className="text-accent-content">Имя</th>
                                <th className="text-accent-content">Отчество</th>
                                <th className="text-accent-content">Электронная почта</th>
                                <th className="text-accent-content">Роль</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, index) => (
                                <UserEntry
                                    userData={item}
                                    key={index}
                                    counter={index}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col justify-center sm:py-12">
                    <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                        <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
                            <Link
                                to="/register"
                                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">
                                    Новый пользователь
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserList;
