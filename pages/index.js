import Featured from "./components/Featured";
import Header from "./components/Header";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./components/lib/dbconfig";
export default function Home({ product, id }) {
  console.log(product);
  console.log(id);
  return (
    <div>
      <Header />
      <Featured product={product} id={id} />
    </div>
  );
}

export async function getServerSideProps() {
  const Featuredid = "CpJlemFbrDa6MFNB1kKH";
  const docRef = doc(db, "Products", Featuredid);
  const docSnap = await getDoc(docRef);
  const product = docSnap.data();

  return {
    props: { product, id: Featuredid },
  };
}
