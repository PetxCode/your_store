import { dbConfig } from "@/app/utils/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import myProductModel from "@/app/utils/model/productModel";
import myUserModel from "@/app/utils/model/userModel";
import { iProduct } from "@/app/utils/interface";

export const GET = async () => {
  try {
    await dbConfig();

    const users = await myProductModel.find();
    return NextResponse.json({
      status: 200,
      message: "reading all Product",
      data: users,
    });
  } catch (error) {
    return NextResponse.json({
      status: 404,
      message: "Error",
    });
  }
};

export const POST = async (req: NextRequest, params: any) => {
  try {
    await dbConfig();
    const { title, price, image, desc, qty }: iProduct = await req.json();

    const { userID } = await params.params;
    const user = await myUserModel.findById(userID);
    if (user.role === "admin") {
      const users = await myProductModel.create({
        title,
        price,
        image,
        desc,
        qty,
      });

      return NextResponse.json({
        status: 201,
        message: "creating all User",
        data: users,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Error: You do not have right for this",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 404,
      message: "Error",
      error: error.message,
    });
  }
};
