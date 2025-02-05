import { json, type RequestHandler } from '@sveltejs/kit';
import { start_mongo } from '$db/mongo';

export const GET: RequestHandler = async ({ params }) => {
    const id = params.id; // Explicitly access 'id'

    if (!id) {
        return json({ message: 'Owner ID is required' }, { status: 400 });
    }

    const client = await start_mongo();
    const db = client.db();
    const detailsCollection = db.collection('stored_details');

    try {
        const formData = await detailsCollection.findOne({ owner: id });

        if (!formData) {
            return json({ message: 'No form data found for this owner' }, { status: 404 });
        }

        return json(formData);
    } catch (err) {
        console.error('Error retrieving form data:', err);
        return json({ message: 'Failed to fetch form data' }, { status: 500 });
    } finally {
        client.close();
    }
};
