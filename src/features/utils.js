import { toast } from "react-toastify";
import { store } from "../store";

const validateUserForm = (form, passReqired) => {
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
    } 
    if (passReqired) {
        if (form.confirmPassword.length < 6) {
            isProceed = false;
            errorMessage = "Повторите пароль";
        } else if (form.password !== form.confirmPassword) {
            isProceed = false;
            errorMessage = "Пароли должны совпадать";
        }
    }

    if (!isProceed) {
        toast.warn(errorMessage);
    }

    return isProceed;
};

const mapRoles = (roleId) => {
    switch (roleId) {
        case 1:
            return "Продавец";
        case 2:
            return "Сотрудник склада";
        case 3:
            return "Администратор";
        case 4:
            return "Менеджер";
        case 5:
            return "Поставщик";
    }
}

const authHeaders = {
    "Authorization":`Bearer ${store.getState().auth.token}`,
    "Cache-Control": "no-cache"
}

export { validateUserForm, mapRoles, authHeaders };
