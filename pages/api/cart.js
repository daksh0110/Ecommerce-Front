import axios from "axios";
import { db } from "../../components/lib/dbconfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  const ids = req.body.ids;
  const Products = [];
  const q = query(collection(db, "Products"), where("__name__", "in", ids));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    Products.push({ ...doc.data(), id: doc.id });
  });

  res.json(Products);
}
