import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Index from "./pages/Index";
import Detail from "./pages/Detail";

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
        },
        {
          path: "/edit/:id",
          element: <Edit />,
        },
        {
          path: "/notes/:id",
          element: <Detail />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
