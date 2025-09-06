const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

let autocadProductsPath = path.join(
  __dirname,
  "storage",
  "autocad",
  "products.json"
);
let webdevProductsPath = path.join(
  __dirname,
  "storage",
  "webdev",
  "products.json"
);
let advertsPath = path.join(__dirname, "storage", "adverts.json");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/api/admins", (req, res) => {
  let admins = [
    { name: "Donald Simiyu", role: "owner" },
    { name: "Jeremiah Ndiritu", role: "Assistant" },
  ];
  res.json({ admins });
});

app.get("/api/products/:service", (req, res) => {
  let { service } = req.params;

  let productsPath =
    service == "autocad" ? autocadProductsPath : webdevProductsPath;

  let existing = [];
  if (fs.existsSync(productsPath)) {
    let raw = fs.readFileSync(productsPath);
    existing = JSON.parse(raw);
    console.log("existing :>> ", existing);
    res.json({ products: existing });
  }
});
app.get("/api/adverts", (req, res) => {
  let existing = [];
  if (fs.existsSync(advertsPath)) {
    let raw = fs.readFileSync(advertsPath);
    existing = JSON.parse(raw);
    console.log("existing :>> ", existing);
    res.json({ adverts: existing });
  }
});
const PORT = process.env.PORT || 8084;

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
