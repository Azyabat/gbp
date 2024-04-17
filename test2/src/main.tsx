import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { DetailPage, MainPage } from "./pages";
import { Provider } from "react-redux";
import { store } from "./store";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: ":id/details", element: <DetailPage /> },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
