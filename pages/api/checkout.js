export default function handler(req, res) {
  if (res.method !== "POST") {
    res.json("Should be a post method");
    return;
  }
}
