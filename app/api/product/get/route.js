import Product from "@/app/models/ProductModel";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let query = {};
    const _id = searchParams.get("id");
    if (_id) {
      query._id = _id;
    }

    const productId = searchParams.get("productId");
    if (productId) {
      query.productId = productId;
    }
    const productName = searchParams.get("productName");
    if (productName) {
      query.productName = { $regex: productName, $options: "i" };
    }
    const status = searchParams.get("status");
    if (status) {
      query.status = status;
    }
    const quantity = searchParams.get("quantity");
    if (quantity) {
      query.quantity = quantity;
    }
    connectDB();
    const data = await Product.find(query);

    return NextResponse.json({ message: "get request called", data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
