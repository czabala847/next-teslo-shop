import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Product } from "@/models";

import { IProduct } from "@/interfaces";

type Data = { message: string } | IProduct | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("entro aqui");

  switch (req.method) {
    case "GET":
      return searchProduct(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

async function searchProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  let { q = "" } = req.query;

  if (q.length === 0) {
    return res.status(400).json({ message: "Debe especificar un query" });
  }

  q = q.toString().toLowerCase();

  await db.connect();
  const products = await Product.find({
    $text: { $search: q },
  })
    .select("title images price inStock slug -_id")
    .lean();
  await db.disconnect();

  return res.status(200).json(products);
}
