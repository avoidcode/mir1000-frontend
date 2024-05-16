import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import { authHeaders, validateUserForm } from "../features/utils";
import axios from "axios";
import { apiBaseUrl } from "../features/constants";

const EditUser = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    const getUsersData = async () => {
        try {
            const response = await axios(`${apiBaseUrl}/users/${state.userId}`, {
                headers: authHeaders
            });
            const data = response.data;
            setName(data.name);
            setSurname(data.surname);
            setPatronymic(data.patronymic);
            setEmail(data.email);
            setRole(data.role_id);
        } catch (error) {
            toast.error("Error: ", error.response);
        }
    };

    useEffect(() => {
        if (!state) {
            navigate("/");
            return;
        }
        getUsersData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        let patchObj = {
            name,
            surname,
            patronymic,
            email,
            password,
            role_id: role
        };

        if (validateUserForm({...patchObj, confirmPassword}, false)) {
            fetch(`${apiBaseUrl}/users/${state.userId}`, {
                method: "PATCH",
                headers: {...authHeaders, "Content-Type": "application/json"},
                body: JSON.stringify(patchObj),
            })
                .then((res) => {
                    toast.success("Данные изменены");
                    navigate("/users");
                })
                .catch((err) => {
                    toast.error("Ошибка: " + err.message);
                });
        }
    };
    return (
        <>
            <SectionTitle title="Изменение пользователя" />
            <div className="flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
                        <form className="px-5 py-7" onSubmit={handleSubmit}>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Фамилия
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Имя
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Отчество
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={patronymic}
                                onChange={(e) => setPatronymic(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Электронная почта
                            </label>
                            <input
                                type="email"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Роль
                            </label>
                            <select
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="1">Продавец</option>
                                <option value="2">Сотрудник склада</option>
                                <option value="3">Администратор</option>
                                <option value="4">Менеджер</option>
                                <option value="5">Поставщик</option>
                            </select>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Пароль
                            </label>
                            <input
                                type="password"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Повторите пароль
                            </label>
                            <input
                                type="password"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required={true}
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

export default EditUser;
