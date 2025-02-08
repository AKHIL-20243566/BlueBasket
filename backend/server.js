const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass", 
  database: "bluebasket",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Signup Route
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    }
  );
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      const user = results[0];
  
      // Compare entered password with hashed password in DB
      const isMatch = bcrypt.compareSync(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
    });
  });

  //cart
  app.post("/cart/add", (req, res) => {
    const { user_id, product_id, product_name, product_price, quantity } = req.body;
  
    if (!user_id || !product_id || !product_name || !product_price || !quantity) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    db.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [user_id, product_id],
      (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
  
        if (results.length > 0) {
          db.query(
            "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
            [quantity, user_id, product_id],
            (err) => {
              if (err) return res.status(500).json({ error: "Database error" });
              res.json({ message: "Cart updated successfully" });
            }
          );
        } else {
          db.query(
            "INSERT INTO cart (user_id, product_id, product_name, product_price, quantity) VALUES (?, ?, ?, ?, ?)",
            [user_id, product_id, product_name, product_price, quantity],
            (err) => {
              if (err) return res.status(500).json({ error: "Database error" });
              res.json({ message: "Item added to cart" });
            }
          );
        }
      }
    );
  });
  
  // 2️⃣ **Get Cart Items**
  app.get("/cart/:user_id", (req, res) => {
    const user_id = req.params.user_id;
  
    db.query(
      "SELECT id, product_id, product_name, product_price, quantity FROM cart WHERE user_id = ?",
      [user_id],
      (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
      }
    );
  });
  
  // 3️⃣ **Update Cart Quantity**
  app.put("/cart/update", (req, res) => {
    const { cart_id, quantity } = req.body;
  
    if (!cart_id || !quantity) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    db.query(
      "UPDATE cart SET quantity = ? WHERE id = ?",
      [quantity, cart_id],
      (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Cart updated successfully" });
      }
    );
  });
  
  // 4️⃣ **Remove Item from Cart**
  app.delete("/cart/remove/:cart_id", (req, res) => {
    const cart_id = req.params.cart_id;
  
    db.query("DELETE FROM cart WHERE id = ?", [cart_id], (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Item removed from cart" });
    });
  });
  
  // 5️⃣ **Clear Cart**
  app.delete("/cart/clear/:user_id", (req, res) => {
    const user_id = req.params.user_id;
  
    db.query("DELETE FROM cart WHERE user_id = ?", [user_id], (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Cart cleared" });
    });
  });
  
  // Start Server
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
  module.exports = db;