const { db } = require('@vercel/postgres');
const {
    puppies
  } = require('../app/lib/placeholder_puppies.js');

  async function seedPuppies(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS puppies (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          sex TEXT,
          birthday DATE NOT NULL
        );
      `;
  
      console.log(`Created "puppies" table`);
  
      // Insert data into the "users" table
      const insertedPuppies = await Promise.all(
        puppies.map(async (puppy) => {
          return client.sql`
          INSERT INTO puppies (name, email, sex, birthday)
          VALUES (${puppy.name}, ${puppy.email}, ${puppy.sex}, ${puppy.birthday})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedPuppies.length} puppies`);
  
      return {
        createTable,
        puppies: insertedPuppies,
      };
    } catch (error) {
      console.error('Error seeding puppies:', error);
      throw error;
    }
  }

  async function main() {
    const client = await db.connect();
    await seedPuppies(client);
    await client.end();
  }

  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });
  