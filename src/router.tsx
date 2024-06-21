import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  loader as porductsLoader,
  action as updateAvailabilityAction,
} from "./views/Products";
import NewProduct, { action as NewProductAction } from "./views/NewProduct";
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from "./views/EditProducts";
import { action as deleteProductAction } from "./Components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: porductsLoader,
        action: updateAvailabilityAction,
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: NewProductAction,
      },
      {
        path: "products/:id/edit", //ROA pattern
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "products/:id/delete",
        action: deleteProductAction,
      },
    ],
  },
]);
