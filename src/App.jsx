import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
    HomeLayout,
    Landing,
    Login,
    Register,
    Shop,
    SingleProduct,
    Profile,
    Search,
    UserList,
    EditUser,
    EditProduct,
    AddProduct,
} from "./pages";
import { singleProductLoader } from "./pages/SingleProduct";
import { shopLoader } from "./pages/Shop";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "shop",
                element: <Shop />,
                loader: async ({ params }) => {
                    return shopLoader(params)
                },
            },
            {
                path: "shop/product/:id",
                element: <SingleProduct />,
                loader: singleProductLoader,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "user-profile",
                element: <Profile />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "users",
                element: <UserList />,
            },
            {
                path: "edit-user",
                element: <EditUser />,
            },
            {
                path: "edit-product",
                element: <EditProduct />,
            },
            {
                path: "add-product",
                element: <AddProduct />,
            },
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer position="top-center" />
        </>
    );
}

export default App;
