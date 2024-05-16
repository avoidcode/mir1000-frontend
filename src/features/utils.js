import { toast } from "react-toastify";
import { store } from "../store";

const validateUserForm = (form) => {
    let isProceed = true;
    let errorMessage = "";

    if (form.name.length === 0) {
        isProceed = false;
        errorMessage = "Введите имя пользователя";
    } else if (form.surname.length === 0) {
        isProceed = false;
        errorMessage = "Введите фамилию пользователя";
    } else if (form.email.length === 0) {
        isProceed = false;
        errorMessage = "Введите электронную почту пользователя";
    } else if (form.password.length < 6) {
        isProceed = false;
        errorMessage = "Введите пароль длиной более 5 символов";
    } else if (form.confirmPassword.length < 6) {
        isProceed = false;
        errorMessage = "Повторите пароль";
    } else if (form.password !== form.confirmPassword) {
        isProceed = false;
        errorMessage = "Пароли должны совпадать";
    }

    if (!isProceed) {
        toast.warn(errorMessage);
    }

    return isProceed;
};

const mapRoles = (roleId) => {
    switch (roleId) {
        case "0":
            return "Администратор";
        case "1":
            return "Менеджер";
        case "2":
            return "Работник склада";
        case "3":
            return "Поставщик";
    }
}

const authHeaders = {
    "Authorization":`Bearer ${store.getState().auth.token}`,
    "Cache-Control": "no-cache"
}

export { validateUserForm, mapRoles, authHeaders };
