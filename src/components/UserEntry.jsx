import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mapRoles } from "../features/utils";

const UserEntry = ({ userData, counter }) => {
    const { userId } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const removeUser = async (user) => {
        if (userData.id == userId)
            return;
        await axios.delete(`http://localhost:8080/user/${user.id}`);
        toast.success("Пользователь удалён.");
        navigate("/users");
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
                    onClick={() => navigate("/edit-user", {state: { userId: userData.id }})}
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
