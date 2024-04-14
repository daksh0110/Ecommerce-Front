import Featured from "./components/Featured";
import Header from "./components/Header";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./components/lib/dbconfig";
import NewProduct from "./components/NewProduct";
export default function Home({ featuredproduct, id, product }) {
  return (
    <div>
      <Header />
      <Featured featuredproduct={featuredproduct} id={id} />
      <NewProduct product={product} />
    </div>
  );
}

export async function getServerSideProps() {
  const Featuredid = "CpJlemFbrDa6MFNB1kKH";
  const docRef = doc(db, "Products", Featuredid);
  const docSnap = await getDoc(docRef);
  const featuredproduct = docSnap.data();

  const newproduct = [];
  const collectionRef = collection(db, "Products");
  const querySnapshot = await getDocs(
    query(collectionRef, orderBy("createdAt", "desc"))
  );
  querySnapshot.forEach((doc) => {
    newproduct.push({ id: doc.id, ...doc.data() });
  });

  return {
    props: {
      featuredproduct: JSON.parse(JSON.stringify(featuredproduct)),
      id: Featuredid,
      product: JSON.parse(JSON.stringify(newproduct)),
    },
  };
}
