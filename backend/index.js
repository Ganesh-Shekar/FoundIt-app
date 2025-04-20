import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();

// Routes
//POD health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get("/", (req, res) => {
  res.send("Lost & Found Platform Backend is running ✅");
});

// Post a lost item
app.post("/lost", async (req, res) => {
  const { title, description, imageUrl, location, dateLost } = req.body;
  if (!title || !description) {
    return res.status(400).send({ error: "Title and description required" });
  }

  const lostItemRef = db.ref("lost_items").push();
  await lostItemRef.set({
    title,
    description,
    imageUrl: imageUrl || "",
    location: location || "",
    dateLost: dateLost || "",
    status: "lost",
    timestamp: Date.now(),
  });

  res.send({ id: lostItemRef.key });
});

// Post a found item
app.post("/found", async (req, res) => {
  const { title, description, imageUrl, location, dateFound } = req.body;
  if (!title || !description) {
    return res.status(400).send({ error: "Title and description required" });
  }

  const foundItemRef = db.ref("found_items").push();
  await foundItemRef.set({
    title,
    description,
    imageUrl: imageUrl || "",
    location: location || "",
    dateFound: dateFound || "",
    status: "found",
    timestamp: Date.now(),
  });

  res.send({ id: foundItemRef.key });
});

// Get all lost items
app.get("/lost", async (req, res) => {
  const snapshot = await db
    .ref("lost_items")
    .orderByChild("timestamp")
    .once("value");
  res.send(snapshot.val() || {});
});

// Get all found items
app.get("/found", async (req, res) => {
  const snapshot = await db
    .ref("found_items")
    .orderByChild("timestamp")
    .once("value");
  res.send(snapshot.val() || {});
});

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
