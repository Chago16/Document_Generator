import { start_mongo } from '$db/mongo';
import { json, type RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';  // Import ObjectId from mongodb

export const DELETE: RequestHandler = async ({ params }) => {
  const { documentId } = params; // Extract the documentId from the route parameters

  // Validate that the documentId is provided
  if (!documentId) {
    return json({ message: 'Document ID is required' }, { status: 400 });
  }

  // Connect to MongoDB
  const client = await start_mongo();
  const db = client.db();
  const contentsCollection = db.collection('saved_data');

  try {
    // Delete the document with the given documentId
    const result = await contentsCollection.deleteOne({ _id: new ObjectId(documentId) });

    if (result.deletedCount === 0) {
      return json({ message: 'Document not found or already deleted' }, { status: 404 });
    }

    return json({ message: 'Document deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting document:', err);
    return json({ message: 'Failed to delete document', error: err }, { status: 500 });
  } finally {
    client.close();
  }
};
