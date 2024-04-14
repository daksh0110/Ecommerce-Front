import { db } from "../components/lib/dbconfig";
import Stripe from "stripe";
import { buffer } from "micro";
import { updateDoc, doc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SK);
export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];
  const endpointSecret =
    "whsec_10112d1588f8f01d0816fc11ee8ddb834091735bd5eb444498eed5ecfcfa8f00";
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log("Event====" + event);
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderid;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        const docref = doc(db, "Orders", orderId);

        await updateDoc(docref, {
          paid: true,
        });
      }
      const metadata = event.data.object.metadata;
      console.log("MetaData===", metadata);
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200);
}
export const config = {
  api: { bodyParser: false },
};

// pepped-divine-wisely-galore
// account id acct_1P4qsGSAXmEtszSU
