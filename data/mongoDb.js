import { MongoClient, ObjectId } from "mongodb"

export async function connectMongoDB(db) {
    const user = process.env.MONGODB_USER
    const pw = process.env.MONGODB_PW
    const mongoDbUrl = `mongodb+srv://${user}:${pw}@cluster0.kh5dv.mongodb.net/${db}?retryWrites=true&w=majority`

    let client;
    try {
        client = await MongoClient.connect(mongoDbUrl)
    } catch (error) {
        throw new Error("Failed to connect to mongodb.")
    }
    return client
}

export async function insertDocument(client, collection, doc) {
    const db = client.db()
    try {
        await db.collection(collection).insertOne(doc)
    } catch (error) {
        throw new Error("Failed to insert into mongodb.")
    }
}

export async function updateDocument(client, collection, comment, eventId) {
    const db = client.db()
    try {
        await db.collection(collection).updateOne({ _id: ObjectId(eventId) }, {
            $push: {
                comments: comment
            }
        }, { upsert: true })
    } catch (error) {
        throw error
    }
}


export async function getDocument(client, name) {
    const db = client.db()
    let doc
    try {
        doc = await db.collection(name).find().toArray()
    } catch (error) {
        throw new Error("Failed to getData from mongodb.")
    }
    return doc
}