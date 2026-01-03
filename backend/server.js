const express = require("express");
require("dotenv").config();
const cors = require("cors");

const db = require("./db");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.get("/api/test", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ message: "Backend + MySQL connected ✅" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, created_at FROM users ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});


app.post("/api/users/admin", async (req, res) => {
  try {
    const adminEmail = "admin@petpal.com";

    const [exists] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [adminEmail]
    );

    if (exists.length === 0) {
      await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [
        "Admin",
        adminEmail,
      ]);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("INSERT ADMIN ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});


app.delete("/api/users/admin", async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE email = ?", ["admin@petpal.com"]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
app.get("/ping", (req, res) => {
  res.send("pong");
});


app.get("/api/pets", async (req, res) => {
  try {
    const onlyAvailable = req.query.onlyAvailable === "1";
    const sql = onlyAvailable
      ? "SELECT id, name, type, breed, age, description, image, adopted, created_at FROM pets WHERE adopted = 0 ORDER BY id DESC"
      : "SELECT id, name, type, breed, age, description, image, adopted, created_at FROM pets ORDER BY id DESC";

    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    console.error("GET /api/pets ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/api/pets/:id", async (req, res) => {
  const petId = Number(req.params.id);

  if (!Number.isInteger(petId)) {
    return res.status(400).json({ ok: false, error: "Invalid pet id" });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, name, type, breed, age, description, image, adopted, created_at FROM pets WHERE id = ? LIMIT 1",
      [petId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ ok: false, error: "Pet not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("GET /api/pets/:id ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post("/api/pets", async (req, res) => {
  const { name, type, breed, age, description, image } = req.body;

  if (!name || !type || !breed || !age || !image) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO pets (name, type, breed, age, description, image, adopted) VALUES (?, ?, ?, ?, ?, ?, 0)",
      [name, type, breed, age, description || "", image]
    );

    res.json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error("POST /api/pets ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});


app.put("/api/pets/:id", async (req, res) => {
  const petId = Number(req.params.id);
  if (!Number.isInteger(petId)) {
    return res.status(400).json({ ok: false, error: "Invalid pet id" });
  }

  const { name, type, breed, age, description, image } = req.body;

  try {
    await db.query(
      `UPDATE pets
       SET name=?, type=?, breed=?, age=?, description=?, image=?
       WHERE id=?`,
      [name, type, breed, age, description || "", image, petId]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("PUT /api/pets/:id ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});


app.put("/api/pets/:id/adopted", async (req, res) => {
  const petId = Number(req.params.id);
  if (!Number.isInteger(petId)) {
    return res.status(400).json({ ok: false, error: "Invalid pet id" });
  }

  const adopted = Number(req.body.adopted);
  if (!(adopted === 0 || adopted === 1)) {
    return res.status(400).json({ ok: false, error: "adopted must be 0 or 1" });
  }

  try {
    await db.query("UPDATE pets SET adopted = ? WHERE id = ?", [adopted, petId]);
    res.json({ ok: true });
  } catch (err) {
    console.error("PUT /api/pets/:id/adopted ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.delete("/api/pets/:id", async (req, res) => {
  const petId = Number(req.params.id);
  if (!Number.isInteger(petId)) {
    return res.status(400).json({ ok: false, error: "Invalid pet id" });
  }

  try {
    await db.query("DELETE FROM pets WHERE id = ?", [petId]);
    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/pets/:id ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});


app.get("/api/adoptions", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM adoptions ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("GET /api/adoptions ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});
app.post("/api/adoptions", async (req, res) => {
  try {
    const { petId, fullName, email, reason, userId } = req.body;

    if (!petId || !fullName || !email) {
      return res.status(500).json({ ok: false, error: "Missing required fields" });
    }

    await db.query(
      "INSERT INTO adoptions (petId, userId, fullName, email, reason, status) VALUES (?, ?, ?, ?, ?, 'pending')",
      [petId, userId || null, fullName, email, reason || ""]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("POST /api/adoptions ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("✅ Backend running on port", PORT));