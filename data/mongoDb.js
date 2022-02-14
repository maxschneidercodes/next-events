import { MongoClient } from "mongodb"

export async function connectMongoDB() {
    const mongoDbUrl = "mongodb+srv://admin:XQ9Jz01hALQXGdl2@cluster0.kh5dv.mongodb.net/newsletter?retryWrites=true&w=majority"

    const client = await MongoClient.connect(mongoDbUrl)

    return client
}

export async function insertDocument(client, collection, doc) {
    const db = client.db()
    await db.collection(collection).insertOne(doc)
}

export async function getDocument(client, name) {
    const db = client.db()
    const doc = await db.collection(name).find().toArray()
    return doc
}