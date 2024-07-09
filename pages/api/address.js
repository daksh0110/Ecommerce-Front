import nextAuth, { getServerSession } from "next-auth";

import { db } from "../../components/lib/dbconfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { authOptions } from "../api/auth/[...nextauth]";
import { use } from "react";

export default async function handler(req, res) {
  const { name, email, city, postalCode, streetAddress, country } = req.body;
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;
  if (user) {
    if (req.method === "PUT") {
      const documentRef = collection(db, "Address");

      const q = query(documentRef, where("userEmail", "==", user.email));

      const querySnapshot = await getDocs(q);
      const Detail = querySnapshot.docs[0];
      const address = Detail?.data();
      const id = Detail?.id;
      if (address) {
        const docRef = doc(db, "Address", id);
        await updateDoc(docRef, {
          name: name,
          email: email,
          city: city,
          postalCode: postalCode,
          streetAddress: streetAddress,
          country: country,
        });
        res.json(docRef);
      } else {
        const docRef = await addDoc(collection(db, "Address"), {
          name: name,
          email: email,
          city: city,
          postalCode: postalCode,
          streetAddress: streetAddress,
          country: country,
          userEmail: user.email,
        });
        res.json(docRef);
      }
    }
    if (req.method === "GET") {
      const documentRef = collection(db, "Address");

      const q = query(documentRef, where("userEmail", "==", user.email));

      const querySnapshot = await getDocs(q);
      const Detail = querySnapshot.docs[0];
      const address = Detail?.data();
      const id = Detail?.id;

      res.json({ ...address, id: id });
    }
  }

  res.json(user);
}
