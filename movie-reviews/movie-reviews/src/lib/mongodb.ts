import { MongoClient, Db } from "mongodb";

const MONGODB_DB = process.env.MONGODB_DB || "masterclassers";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  const client = await MongoClient.connect(uri);
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getReviewsCollection() {
  const { db } = await connectToDatabase();
  return db.collection("reviews");
}
