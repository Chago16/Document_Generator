import { start_mongo } from '$db/mongo';
import { json } from '@sveltejs/kit';


export async function POST({ request }: any) {
  const { owner, content } = await request.json(); // Extract owner ID & Quill content

  if (!owner || !content) {
    return json({ message: 'Owner ID and content are required' }, { status: 400 });
  }
  

  const client = await start_mongo();
  const db = client.db();
  const contentsCollection = db.collection('saved_data');

  try {
    const result = await contentsCollection.insertOne({ 
      owner, 
      content: content 
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
