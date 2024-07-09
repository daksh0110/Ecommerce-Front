import {
  collection,
  addDoc,
  doc,
  getFirestore,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../components/lib/dbconfig";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const { name } = req.query;

    const q = query(collection(db, "Settings"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    const documentRef = querySnapshot?.docs[0];
    if (documentRef !== undefined) {
      res.json({ ...documentRef.data(), id: documentRef.id });
    } else {
      res.json("not found");
    }
  }
}
