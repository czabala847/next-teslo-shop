import { db, seedDataBase } from "@/database";
import { Product, Order } from "@/models";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(401).json({ message: "No puedes hacer esta acción" });
  }

  await db.connect();

  await User.deleteMany();
  await User.insertMany(seedDataBase.initialData.users);

  await Product.deleteMany();
  await Product.insertMany(seedDataBase.initialData.products);

  await Order.deleteMany();

  await db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
