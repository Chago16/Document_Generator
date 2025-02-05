import { start_mongo } from '$db/mongo';
import { json } from '@sveltejs/kit';

export async function POST({ request }: any) {
  // Extract owner, content, documentName, and documentType from the request body
  const { owner, content, documentTitle, documentType } = await request.json();

  // Validate that all required fields are present
  if (!owner || !content || !documentTitle || !documentType) {
    return json({ message: 'Owner ID, content, document title, and document type are required' }, { status: 400 });
  }

  // Connect to MongoDB
  const client = await start_mongo();
  const db = client.db();
  const contentsCollection = db.collection('saved_data');

  try {
    // Insert the document with all required fields
    const result = await contentsCollection.insertOne({
      owner,
      content,
      documentTitle,
      documentType,
    });

    // Return the inserted document's ID as part of the response
    return json({ message: 'Content saved successfully', documentId: result.insertedId }, { status: 200 });
  } catch (err) {
    console.error('Error storing content:', err);
    return json({ message: 'Failed to save content', error: err.message }, { status: 500 });
  } finally {
    client.close();
  }
}
