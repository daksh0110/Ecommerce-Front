import Featured from "./components/Featured";
import Header from "./components/Header";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./components/lib/dbconfig";
import NewProduct from "./components/NewProduct";
export default function Home({ featuredproduct, id, newproduct }) {
  return (
    <div>
      <Header />
      <Featured featuredproduct={featuredproduct} id={id} />
      <NewProduct newproduct={newproduct} />
    </div>
  );
}

export async function getServerSideProps() {
  const Featuredid = "CpJlemFbrDa6MFNB1kKH";
  const docRef = doc(db, "Products", Featuredid);
  const docSnap = await getDoc(docRef);
  const featuredproduct = docSnap.data();

  const newproduct = [];
  const querySnapshot = await getDocs(collection(db, "Products"));
  querySnapshot.forEach((doc) => {
    newproduct.push({ id: doc.id, ...doc.data() });
  });

  return {
    props: {
      featuredproduct: JSON.parse(JSON.stringify(featuredproduct)),
      id: Featuredid,
      newproduct: JSON.parse(JSON.stringify(newproduct)),
    },
  };
}
