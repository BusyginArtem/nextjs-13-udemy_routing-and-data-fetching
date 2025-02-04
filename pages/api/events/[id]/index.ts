import { db } from "@/lib/firebaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  if (method === "GET" && query?.id) {
    const ref = db.ref("/events");

    ref.child(`${query.id}`).once("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        res.status(200).json(data);
      } else {
        res.status(200).json({});
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
