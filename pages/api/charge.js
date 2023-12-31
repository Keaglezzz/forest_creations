// pages/api/charge.js
import axios from "axios";

const SECRET_KEY = "sk_test_1d5f5973442aaefb26d40a84bc2078e4dec65b30";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { token, amountInCents } = req.body;

      const response = await axios.post(
        "https://online.yoco.com/v1/charges/",
        {
          token,
          amountInCents,
          currency: "ZAR",
        },
        {
          headers: {
            "X-Auth-Secret-Key": SECRET_KEY,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
