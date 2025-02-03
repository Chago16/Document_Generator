import { start_mongo } from '$db/mongo'; // Assuming start_mongo is in the same file
import { json } from '@sveltejs/kit';

export async function POST({ request }: any) {
  const { email, username, password } = await request.json();

  // Ensure the database connection is established
  const client = await start_mongo();
  const db = client.db();

  console.log("Received username:", username);

  const usersCollection = db.collection('user_accounts'); // Use the correct collection name

  const newUser = {
    email,
    username,
    password,
    createdAt: new Date(),
  };

  console.log("Inserting user:", username);

  try {
    // Insert the new user into the collection
    const insertResult = await usersCollection.insertOne(newUser);
    console.log("User inserted:", username);

    // After insertion, try to retrieve the newly inserted user
    const insertedUser = await usersCollection.findOne({ username });
    console.log("Inserted user:", insertedUser);

    return json({ message: 'User registered successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error inserting user:', err);
    return json({ message: 'Failed to register user' }, { status: 500 });
  }
}
