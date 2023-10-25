import db from "../../public/db";

export default async (req, res) => {
  try {
    const rows = await pool.query(
      "SELECT price FROM dummydatabase.sales_prices;"
    );
    console.log("fetched data from db", rows);
    res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "An error occured while connecting with db" });
  }
};
