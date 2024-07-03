import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { db } from "../components/lib/dbconfig";

export default async function handle(req, res) {
  const Orders = [];
  const { user } = await getServerSession(req, res, authOptions);
  const UserRefs = collection(db, "Orders");
  const q = query(UserRefs, where("userEmail", "==", user.email));
  const userOrders = await getDocs(q);
  userOrders.forEach((order) => {
    Orders.push({ ...order.data(), id: order.id });
  });
  console.log(Orders);
  res.json(Orders);
}
