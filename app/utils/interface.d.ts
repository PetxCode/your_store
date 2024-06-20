import { Document } from "mongoose";

export interface iUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
}

export interface iUserData extends iUser, Document {}

export interface iProduct {
  title: string;
  price: number;
  desc: string;
  image: string;
  qty: number;
}

export interface iProductData extends iProduct, Document {}
