import { MongoClient, ObjectId } from "mongodb"

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PW = process.env.MONGODB_PW;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_USER || !MONGODB_PW || !MONGODB_DB) {
    throw new Error(`Define the MONGODB_USER environmental variables`);
}

const mongoDbUrl = `mongodb+srv://${MONGODB_USER}:${MONGODB_PW}@cluster0.kh5dv.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`

export async function connectToDatabase() {
    if (global.connection) return global.connection
    if (!global.connectionPromise) {
        global.connectionPromise = MongoClient.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }

    const client = await global.connectionPromise
    const db = await client.db()
    global.connection = {
        client,
        db,
    }
    return global.connection
}


export async function insertDocument(client, collection, doc) {
    const db = client.db()
    try {
        await db.collection(collection).insertOne(doc)
    } catch (error) {
        throw error
    }
}

export async function updateDocument(client, collection, comment, eventId) {
    const db = client.db()

    console.log(eventId);

    try {
        await db.collection(collection).updateOne({ _id: ObjectId(eventId) }, {
            $push: {
                comments: comment
            }
        })
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