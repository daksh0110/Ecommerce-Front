import { db } from "../components/lib/dbconfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
export default async function handle(req, res) {
  const { categories, sort, phrase, ...filters } = req.query;

  let [sortField, sortOrder] = (sort || "id-").split("_");
  if (!sortField) {
    sortField = "id";
  }
  if (!sortOrder) {
    sortOrder = "desc";
  }
  const Products = [];
  let subCategories;
  if (categories) {
    subCategories = categories.split(",");
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
  }

  if (phrase) {
    const lowercasedPhrase = phrase.toLowerCase();
    const titleQuery = query(
      collection(db, "Products"),
      where("Title", ">=", phrase),
      where("Title", "<=", phrase + "\uf8ff")
    );
    const titleSnapshot = await getDocs(titleQuery);
    titleSnapshot.forEach((doc) => {
      Products.push({ id: doc.id, ...doc.data() });
    });

    const descriptionQuery = query(
      collection(db, "Products"),
      where("Description", ">=", phrase),
      where("Description", "<=", phrase + "\uf8ff")
    );
    const descriptionSnapshot = await getDocs(descriptionQuery);
    descriptionSnapshot.forEach((doc) => {
      // Avoid adding duplicate products
      if (!Products.some((product) => product.id === doc.id)) {
        Products.push({ id: doc.id, ...doc.data() });
      }
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
  console.log({ Products });
  res.json(Products);
}
