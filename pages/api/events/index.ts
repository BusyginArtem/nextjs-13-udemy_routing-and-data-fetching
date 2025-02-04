import { db } from "@/lib/firebaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  const isQueryUninitialized = Object.keys(query).length === 0;

  if (method === "GET" && query.year && query.month) {
    const ref = db.ref("/events");

    const { year, month } = query;

    const paddedMonth = Number(month) < 10 ? `0${month}` : month;

    const startDate = `${year}-${paddedMonth}-01`;
    const endDate = `${year}-${paddedMonth}-31`;

    ref
      .orderByChild("date")
      .startAt(startDate)
      .endAt(endDate)
      .once("value", (snapshot) => {
        const data = snapshot.val();

        res.status(200).json(data);
      });
  } else if (method === "GET" && query.featured) {
    const ref = db.ref("/events");

    ref
      .orderByChild("isFeatured")
      .equalTo(true)
      .once("value", (snapshot) => {
        const data = snapshot.val();

        res.status(200).json(data);
      });
  } else if (method === "GET" && isQueryUninitialized) {
    const ref = db.ref("/events");

    ref.once("value", (snapshot) => {
      const data = snapshot.val();

      res.status(200).json(data);
    });
  } else if (method === "POST") {
    const { id, name } = body;
    const ref = db.ref("/events").child(id);
    await ref.set({ name });

    res.status(201).json({ message: "Data saved successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
