import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Index from "./pages/Index";
import Detail, { loader as noteLoader } from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isLogin as isLoginLoader } from "./utils/isLogin";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,

      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/create",
          element: <Create />,
          loader: isLoginLoader,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
          loader: isLoginLoader,
        },
        {
          path: "/notes/:id",
          element: <Detail />,
          loader: noteLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
