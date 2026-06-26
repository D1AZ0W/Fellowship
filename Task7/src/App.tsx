import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.tsx";
import { Home } from "./pages/Home.tsx";
import { Form1 } from "./pages/Form1.tsx";
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
        element: <Form1 />,
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
