import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./pages/Posts";
import Post from "./pages/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
  },
  {
    path: "/posts/:id",
    element: <Post />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
