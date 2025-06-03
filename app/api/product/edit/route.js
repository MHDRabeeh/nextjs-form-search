import Product from "@/app/models/ProductModel";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";


export async function PUT(request) {
  try {
    const formData = await request.formData();
    const productName = formData.get("productName");
    const imageUrl = formData.get("imageUrl");
    const image = formData.get("image");
    const productId = formData.get("productId");
    const quantity = formData.get("quantity");
    const status = formData.get("status");
    const discription = formData.get("discription");
    const _id = formData.get("id");

    console.log(formData);
    

    let newImageUrl;
    if (image) {
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
      newImageUrl = result.secure_url;
    } else {
      newImageUrl = imageUrl;
    }

    await connectDB();
    const res = await Product.findByIdAndUpdate(_id, {
      productName,
      productId,
      quantity,
      status,
      discription,
      newImageUrl,
    });
    return NextResponse.json({ success:true, response: res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message,success:false});
  }
}
