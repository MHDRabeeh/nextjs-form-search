import Product from "@/app/models/ProductModel";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { id } = await request.json();
    await connectDB();
    const res = await Product.findByIdAndDelete(id);
    return NextResponse.json({message:"product deleted sucessfully" ,success:true},{status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
