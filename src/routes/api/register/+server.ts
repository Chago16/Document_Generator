import { start_mongo } from '$db/mongo';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

export async function POST({ request }: any) {
  const { email, username, password } = await request.json();

  const client = await start_mongo();
  const db = client.db();
  const usersCollection = db.collection('user_accounts');

  console.log("Received username:", username);

  try {
    // Check if an account with the same email already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return json({ message: 'Email is already taken' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      username,
      password: hashedPassword,
      createdAt: new Date(),
    };

    console.log("Inserting user:", username);

    const insertResult = await usersCollection.insertOne(newUser);
    console.log("User inserted:", username);

    return json({ message: 'User registered successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error inserting user:', err);
    return json({ message: 'Failed to register user' }, { status: 500 });
  }
}
