import { start_mongo } from '$db/mongo';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_super_secret_key'; // Change this to an env variable

export async function POST({ request }) {
  const { email, password } = await request.json(); 

  // Ensure MongoDB connection
  const client = await start_mongo();
  const db = client.db();
  const usersCollection = db.collection('user_accounts');

  try {
    // Find user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Check password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Generate a JWT token (optional)
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    // Return user details & token
    return json({
      user: { _id: user._id, username: user.username, email: user.email },
      token
    }, { status: 200 });

  } catch (err) {
    console.error('Login error:', err);
    return json({ message: 'Internal server error' }, { status: 500 });
  }
}
