import { NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";
import Product from "@/app/models/ProductModel";
import connectDB from "@/config/db";
export async function POST(req) {
  try {
    const formData = await req.formData();

    const productId = formData.get("productId");
    const productName = formData.get("productName");
    const quantity = formData.get("quantity");
    const status = formData.get("status");
    const file = formData.get("image");
    const discription = formData.get("discription");

    if (!file || file === 0) {
      return NextResponse.json({
        success: false,
        message: "No file uploaded",
      });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await new Promise((resolve, reject) => {
      const strem = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          }
          {
            resolve(result);
          }
        }
      );
      strem.end(buffer);
    });
    const imageUrl = result.secure_url;
    await connectDB();
    const response = await Product.create({
      productId,
      productName,
      quantity: parseInt(quantity),
      status,
      discription,
      imageUrl,
    });

    return NextResponse.json({success:true,data:response})
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success:false,message:error.message})
  }
}
