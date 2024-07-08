import { db } from "../components/lib/dbconfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "./auth/[...nextauth]";

const stripe = new Stripe(process.env.STRIPE_SK);
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Should be a post method");
    return;
  }

  const {
    name,
    email,
    city,
    postalCode,
    country,
    streetAddress,
    cartProducts,
  } = req.body;

  const productsIds = cartProducts;

  const uniqueIds = [...new Set(productsIds)];

  const q = query(
    collection(db, "Products"),
    where("__name__", "in", uniqueIds)
  );

  const querySnapshot = await getDocs(q);

  let line_items = [];
  querySnapshot.forEach((doc) => {
    const productId = doc.id;
    const productData = doc.data();
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    console.log("Quantity==" + quantity);
    if (quantity > 0 && productData) {
      line_items.push({
        quantity,
        price_data: {
          currency: "INR",
          product_data: { name: productData.Title },
          unit_amount: productData.Price * 100,
        },
      });
    }
  });
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;
  const docRef = await addDoc(collection(db, "Orders"), {
    name: name,
    email: email,
    city: city,
    postalCode: postalCode,
    streetAddress: streetAddress,
    country: country,
    products: { line_items },
    createdAt: serverTimestamp(),
    paid: false,
    userEmail: user?.email,
  });

  async function fetchShippingFee() {
    const q = query(
      collection(db, "Settings"),
      where("name", "==", "shippingFee")
    );
    const querySnapshot = await getDocs(q);
    const documentRef = querySnapshot?.docs[0];
    return documentRef.data().value;
  }

  let shippingFee = await fetchShippingFee();
  console.log(shippingFee);
  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    shipping_address_collection: {
      allowed_countries: ["IN"], // Pass the customer's country here
    },
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?cancel=1",
    metadata: { orderid: docRef.id.toString() },
    allow_promotion_codes: true,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "shipping fee",
          type: "fixed_amount",
          fixed_amount: { amount: shippingFee * 100, currency: "INR" },
        },
      },
    ],
  });

  res.json({
    url: stripeSession.url,
  });
}
