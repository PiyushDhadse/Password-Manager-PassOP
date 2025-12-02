/* eslint-disable */
const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

dotenv.config();

// Validate environment variables
const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

if (!url) {
  console.error("ERROR: MONGO_URI is not set in .env file");
  process.exit(1);
}

if (!dbName) {
  console.error("ERROR: DB_NAME is not set in .env file");
  process.exit(1);
}

// Connection URL
const client = new MongoClient(url);

// App and Database
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Helper function to get database (MongoDB driver v7 maintains connection pool automatically)
async function getDatabase() {
  try {
    // MongoDB driver v7 automatically manages connections, just return the db instance
    return client.db(dbName);
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

// Get all the passwords
app.get("/", async (req, res) => {
  try {
    const db = await getDatabase();
    const collection = db.collection("passwords");
    const findResult = await collection.find({}).toArray();
    // Convert _id to string `id` so client can use it easily
    const sanitized = findResult.map((doc) => {
      const { _id, ...rest } = doc;
      return { id: _id.toString(), ...rest };
    });
    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save a Password
app.post("/", async (req, res) => {
  try {
    const db = await getDatabase();
    const collection = db.collection("passwords");
    const password = req.body;
    const insertResult = await collection.insertOne(password);
    console.log(`Inserted document into ${dbName}.passwords`);
    res.send({ success: true, insertedId: insertResult.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a password by id
app.delete("/", async (req, res) => {
  try {
    const body = req.body || {};
    const { id, ...rest } = body;
    const db = await getDatabase();
    const collection = db.collection("passwords");

    let deleteResult;
    if (id) {
      // Delete by ObjectId when id provided (use new ObjectId for MongoDB driver v7)
      try {
        deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
      } catch (idError) {
        // If ObjectId conversion fails, return error
        return res.status(400).json({ error: "Invalid ID format" });
      }
    } else {
      // Fallback: try to delete by document fields
      deleteResult = await collection.deleteOne(rest);
    }

    res.send({ success: true, result: deleteResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize connection and start server
(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    console.log(`Database name: ${dbName}`);

    // Verify connection by pinging the database
    try {
      await client.db(dbName).command({ ping: 1 });
      console.log(`Successfully connected to database: ${dbName}`);
    } catch (pingError) {
      console.warn(
        "Warning: Could not ping database, but connection established"
      );
    }

    app.listen(port, () => {
      console.log(`Server listening on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
})();
