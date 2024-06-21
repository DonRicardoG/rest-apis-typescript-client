import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { Product } from "../types";
import { FormatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const isAvailable = product.availability;
  const navigate = useNavigate();

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800 text-center">{product.name}</td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {FormatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-xs uppercase font-bold w-1/2 border border-black-100 cursor-pointer min-w-32`}
          >
            {isAvailable ? "Available" : "Not Available"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className=" flex gap-2 items-center">
          <button
            className=" bg-indigo-600 text-white rounded-lg w-full p-2 uppercase text-center text-xs hover:bg-indigo-700 transition-all"
            onClick={() => navigate(`/products/${product.id}/edit`)}
          >
            Edit
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm("Are you sure you want to delete de product?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value={"delete"}
              className=" bg-red-600 text-white rounded-lg w-full p-2 uppercase text-center text-xs cursor-pointer hover:bg-red-700 transition-all"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
