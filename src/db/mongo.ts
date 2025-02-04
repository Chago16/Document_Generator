import {MongoClient} from 'mongodb';
import { MONGO_URL } from '$env/static/private';

const client = new MongoClient(MONGO_URL)

export function start_mongo() : Promise<MongoClient> {
    console.log('Starting Mongo...');
    return client.connect()
      .then(() => {
        console.log('Mongo connected successfully');
        return client;
      })
      .catch(err => {
        console.error('Error connecting to Mongo:', err);
        throw err;
      });
  }

export default client.db()