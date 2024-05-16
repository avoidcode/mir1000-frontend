import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authHeaders, mapRoles } from "../features/utils";
import { apiBaseUrl } from "../features/constants";

const UserEntry = ({ userData, counter }) => {
    const { userId } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const removeUser = async (user) => {
        if (userData.user_id == userId)
            return;
        await axios.delete(`${apiBaseUrl}/users/${user.user_id}`, {
            headers: authHeaders
        });
        toast.success("Пользователь удалён.");
        navigate(0);
    };
    return (
        <tr className="hover">
            <th className="text-accent-content">{counter + 1}</th>
            <td className="text-accent-content">{userData.surname}</td>
            <td className="text-accent-content">{userData.name}</td>
            <td className="text-accent-content">{userData.patronymic}</td>
            <td className="text-accent-content">{userData.email}</td>
            <td className="text-accent-content">{mapRoles(userData.role_id)}</td>
            <td>
                <button
                    className={`btn btn-xs text-sm btn-success mr-5`}
                    onClick={() => navigate("/edit-user", {state: { userId: userData.user_id }})}
                >
                    Изменить
                </button>
                <button
                    className={`btn btn-xs text-sm ${userData.id == userId ? "" : "btn-error"}`}
                    onClick={() => removeUser(userData)}
                >
                    Удалить
                </button>
            </td>
        </tr>
    );
};

export default UserEntry;
