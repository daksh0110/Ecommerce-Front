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

export default async function handler(req, res) {
  const method = req.method;
  const { value } = req.body;
  const { user } = await getServerSession(req, res, authOptions);
  const UserRefs = collection(db, "WishList");
  const q = query(UserRefs, where("userEmail", "==", user.email));
  const wishListDocument = await getDocs(q);

  if (method === "POST") {
    const { productId } = req.body;
    if (wishListDocument.docs.length > 0) {
      const document = wishListDocument.docs[0];
      const id = document.id;
      const docRef = doc(db, "WishList", id);
      if (value) {
        await updateDoc(docRef, {
          products: arrayUnion(productId),
        });

        res.json(true);
      } else {
        await updateDoc(docRef, {
          products: arrayRemove(productId),
        });
        res.json(false);
      }
    } else {
      const docRef = await addDoc(collection(db, "WishList"), {
        userEmail: user.email,
        products: [],
      });
    }
    res.json(user);
  }

  if (method === "GET") {
    const wishListProducts = [];
    if (wishListDocument.docs.length > 0) {
      const productIds = wishListDocument.docs[0].data().products;
      for (const id of productIds) {
        const docRef = doc(db, "Products", id);
        const docSnap = await getDoc(docRef);
        wishListProducts.push({ ...docSnap.data(), id: docSnap.id });
      }
      res.json({ wishListProducts });
    }
  }
}
