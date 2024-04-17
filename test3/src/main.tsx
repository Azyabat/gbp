import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { CalendarPage } from "./pages/index.ts";
import { attachLogger } from "effector-logger";

const router = createBrowserRouter([
  { path: "/", element: <CalendarPage /> },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);

attachLogger();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
