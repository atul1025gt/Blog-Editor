import { MongoClient } from "mongodb";
if (!process.env.MONGO_URI) {
  throw new Error('Invalid or Missing Environment variable:"MONGO_URI"');
}
const uri = process.env.MONGO_URI;
const option = {};
let client;
let clientPromise;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, option);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, option);
  clientPromise = client.connect();
}
export default clientPromise;
