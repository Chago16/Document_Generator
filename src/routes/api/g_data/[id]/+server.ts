import { start_mongo } from '$db/mongo';
import { json } from '@sveltejs/kit';

export async function GET({ params }: any) {
  const { ownerID } = params; // Extract the ownerID from the route parameters

  // Validate that the ownerID is provided
  if (!ownerID) {
    return json({ message: 'Owner ID is required' }, { status: 400 });
  }

  // Connect to MongoDB
  const client = await start_mongo();
  const db = client.db();
  const contentsCollection = db.collection('saved_data');

  try {
    // Find the documents matching the given ownerID
    const documents = await contentsCollection.find({ owner: ownerID }).toArray();

    if (documents.length === 0) {
      return json({ message: 'No documents found for this owner' }, { status: 404 });
    }

    // Map through the documents to return the required fields
    const response = documents.map((doc: any) => ({
      documentId: doc._id,
      content: doc.content,
      documentTitle: doc.documentTitle,
      documentType: doc.documentType,
    }));

    return json(response, { status: 200 });
  } catch (err) {
    console.error('Error retrieving content:', err);
    return json({ message: 'Failed to retrieve content', error: err.message }, { status: 500 });
  } finally {
    client.close();
  }
}
