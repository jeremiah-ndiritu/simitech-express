const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

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
const PORT = process.env.PORT || 8084;

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
