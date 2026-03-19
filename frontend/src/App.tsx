import { RouterProvider } from "react-router-dom";
import { appRouter } from "./router/app.router";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
      <Toaster position="top-right"></Toaster>
    </>
  ) 
}
