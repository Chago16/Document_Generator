import { start_mongo } from '$db/mongo';
import { json } from '@sveltejs/kit';

export async function POST({ request }: any) {
  const { id, ...formData } = await request.json(); // Extract id and other form inputs

  if (!id) {
    return json({ message: 'Owner ID is required' }, { status: 400 });
  }

  const client = await start_mongo();
  const db = client.db();
  const detailsCollection = db.collection('stored_details');

  try {
    const result = await detailsCollection.updateOne(
      { owner: id },  // Find document by owner ID
      { $set: { ...formData, owner: id } },  // Update with new form data
      { upsert: true } // Create if not exists
    );

    return json({ message: 'Details saved successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error storing details:', err);
    return json({ message: 'Failed to save details' }, { status: 500 });
  } finally {
    client.close(); // Close connection
  }
}
