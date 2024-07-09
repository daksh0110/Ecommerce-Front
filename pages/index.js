import Featured from "../components/Featured";
import Header from "../components/Header";

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
import { db } from "../components/lib/dbconfig";
import NewProduct from "../components/NewProduct";

import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

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
  const q = query(
    collection(db, "Settings"),
    where("name", "==", "featuredProductId")
  );
  const FeaturedProductIds = await getDocs(q);
  const documentRef = FeaturedProductIds?.docs[0];
  const Featuredid = documentRef.data().value;
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
