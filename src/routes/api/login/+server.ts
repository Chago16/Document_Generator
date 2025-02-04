import { start_mongo } from '$db/mongo';
import { json } from '@sveltejs/kit';
import { generateToken, verifyToken } from '$lib/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { parse } from "cookie";

export async function POST({ request }) {
  const { email, password } = await request.json();

  // Ensure MongoDB connection
  const client = await start_mongo();
  const db = client.db();
  const usersCollection = db.collection('user_accounts');

  try {
    // Find user by email
    const user = await usersCollection.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      const token = generateToken({ user });

      return new Response(JSON.stringify({ 
        message: 'Login successful', 
        data: { _id: user._id, username: user.username, email: user.email, token } }), {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly`
        }
      });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

  } catch (err) {
    console.error('Login error:', err);
    return new Response(JSON.stringify({ error: 'Failed to retrieve user' }), { status: 500 });
  }
}

// Function to retrieve user data based on token
export async function GET({ request }) {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.token;

  if (!token) {
    return new Response(JSON.stringify({ error: 'No token provided' }), { status: 401 });
  }

  try {
    // Verify the token
    const decoded = verifyToken(token);

    // Use the decoded user ID to find the user in MongoDB
    const client = await start_mongo();
    const db = client.db();
    const usersCollection = db.collection('user_accounts');

    const user = await usersCollection.findOne({ email: decoded.user.email });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Return the user details
    return new Response(JSON.stringify({ user: { _id: user._id, username: user.username, email: user.email } }), {
      status: 200
    });

  } catch (err) {
    console.error('Error retrieving user:', err);
    return new Response(JSON.stringify({ error: 'Failed to authenticate token or retrieve user' }), { status: 500 });
  }
}