import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.tsx";
import { Home } from "./pages/Home.tsx";
import { Register } from "./pages/RegisterPage.tsx";
import { Profile } from "./pages/Profile.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "form1",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
