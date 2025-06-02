import Image from "next/image";
import Table from "./_components/Table";
import axios from "axios";

export default async function Home({ searchParams }) {
  const { status, productId, quantity, productName } =
     await( searchParams) || {};

  const params = new URLSearchParams();

  if (productName) params.set("productName", productName);
  if (productId) params.set("productId", productId);
  if (quantity) params.set("quantity", quantity);
  if (status) params.set("status", status);

  const res = await axios.get(
    `http://localhost:3000/api/product/get?${params.toString()}`
  );
  return (
    <>
      <Table data={res.data.data} />
    </>
  );
}
