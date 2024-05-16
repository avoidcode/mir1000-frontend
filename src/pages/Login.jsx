import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { store } from "../store";
import { loginUser, logoutUser } from "../features/auth/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (loginState) {
            localStorage.clear();
            store.dispatch(logoutUser());
        }
    }, []);

    const isValidate = () => {
        let isProceed = true;
        if (email.length === 0) {
            isProceed = false;
            toast.warn("Please enter a email");
        } else if (password.length < 6) {
            isProceed = false;
            toast.warn("Password must be minimum 6 characters");
        }
        return isProceed;
    };

    const proceedLogin = (e) => {
        e.preventDefault();
        if (isValidate()) {
            fetch("http://localhost:8080/user")
                .then((res) => res.json())
                .then((res) => {
                    let data = res;
                    const foundUser = data.filter(
                        (item) => item.email === email && item.password === password,
                    );
                    if (foundUser[0]) {
                        toast.success("Авторизация успешна");
                        store.dispatch(loginUser({
                            id: foundUser[0].id,
                            role: foundUser[0].role_id,
                        }));
                        navigate("/");
                    } else {
                        toast.warn("Электронная почта или пароль неверны");
                    }
                })
                .catch((err) => {
                    toast.error("Неизвестная ошибка: " + err.message);
                });
        }
    };

    return (
        <>
            <SectionTitle title="Авторизация" />
            <div className="flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
                        <form className="px-5 py-7" onSubmit={proceedLogin}>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Электронная почта
                            </label>
                            <input
                                value={email}
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Пароль
                            </label>
                            <input
                                type="password"
                                required={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                            <button
                                type="submit"
                                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Войти</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
