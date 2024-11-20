import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log("Received data:", req.body);
    res.status(200).json({ message: "Данные получены", data: req.body });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};