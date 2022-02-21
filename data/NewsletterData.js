import { insertDocument, connectToDatabase } from "./mongoDb"

export async function addEmail(doc) {
    const { client } = await connectToDatabase("events")
    insertDocument(client, "newsletter", doc)
}