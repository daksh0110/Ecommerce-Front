import { db } from "../components/lib/dbconfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
export default async function handle(req, res) {
  const { categories, sort, ...filters } = req.query;

  const [sortField, sortOrder] = sort.split("_");

  const Products = [];
  const subCategories = categories.split(",");

  for (const CategoryId of subCategories) {
    let ProductQuery = query(
      collection(db, "Products"),
      where("Category", "==", CategoryId)
    );

    Object.entries(filters).forEach(([key, value]) => {
      ProductQuery = query(
        ProductQuery,
        where(`properties.${key}`, "==", value)
      );
    });

    const querySnapshot = await getDocs(ProductQuery);

    querySnapshot.forEach(async (doc) => {
      Products.push({ id: doc.id, ...doc.data() });
      console.log(Products);
    });
  }

  Products.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortOrder === "asc" && sortField === "Price") {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  console.log("============");
  console.log(Products);
  res.json(Products);
}
