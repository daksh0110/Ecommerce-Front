import Featured from "./components/Featured";
import Header from "./components/Header";

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
} from "firebase/firestore";
import { db } from "./components/lib/dbconfig";
import NewProduct from "./components/NewProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { userAgentFromString } from "next/server";
export default function Home({ featuredproduct, id, product, wishedProducts }) {
  return (
    <div>
      <Header />
      <Featured featuredproduct={featuredproduct} id={id} />
      <NewProduct product={product} wishedProducts={wishedProducts} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const Featuredid = "7fDFjCh9qOxoRvbpYo3W";
  const docRef = doc(db, "Products", Featuredid);
  const docSnap = await getDoc(docRef);
  const featuredproduct = docSnap.data();
  let wishedProducts = [];

  const newproduct = [];
  const collectionRef = collection(db, "Products");
  const querySnapshot = await getDocs(
    query(collectionRef, orderBy("createdAt", "desc"))
  );
  querySnapshot.forEach((doc) => {
    newproduct.push({ id: doc.id, ...doc.data() });
  });

  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (session && session.user) {
    const user = session.user;
    const UserRefs = collection(db, "WishList");
    const q = query(UserRefs, where("userEmail", "==", user.email));
    const wishListDocument = await getDocs(q);
    wishListDocument.forEach((doc) => {
      wishedProducts.push({ ...doc.data().products });
    });
  } else {
    wishedProducts = [];
  }

  return {
    props: {
      featuredproduct: JSON.parse(JSON.stringify(featuredproduct)),
      id: Featuredid,
      product: JSON.parse(JSON.stringify(newproduct)),
      wishedProducts: wishedProducts,
    },
  };
}
