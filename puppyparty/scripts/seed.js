const { db } = require('@vercel/postgres');
const {
    puppies, notifications, parties, requests
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
          INSERT INTO puppies (id, name, email, sex, birthday)
          VALUES (${puppy.id},${puppy.name}, ${puppy.email}, ${puppy.sex}, ${puppy.birthday})
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
  async function seedNotifications(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS notifications (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          pup_id UUID NOT NULL,
          type_of_request VARCHAR(6), 
          friend_request_id UUID,
          party_request_id UUID,
          time_created TIMESTAMP NOT NULL,
          CONSTRAINT fkPupId FOREIGN KEY (pup_id) REFERENCES puppies(id),
          CONSTRAINT fkFriendRequestId FOREIGN KEY (friend_request_id) REFERENCES requests(id),
          CONSTRAINT fkPartyRequestId FOREIGN KEY (party_request_id) REFERENCES parties(id)
        );
      `;
  
      console.log(`Created "notifications" table`);
  
      // Insert data into the "users" table
      const insertedNotifications = await Promise.all(
        notifications.map(async (notification) => {
          return client.sql`
          INSERT INTO notifications (id, pup_id, type_of_request, friend_request_id, party_request_id, time_created )
          VALUES (${notification.id},${notification.pup_id}, ${notification.type_of_request}, ${notification.friend_request_id}, ${notification.party_request_id}, ${notification.time_created})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedNotifications.length} notifications`);
  
      return {
        createTable,
        notifications: insertedNotifications
      };
    } catch (error) {
      console.error('Error seeding notifications:', error);
      throw error;
    }
  }

  async function seedParty(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS parties (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          pup_id UUID NOT NULL,
          location VARCHAR(30), 
          time_started TIMESTAMP NOT NULL,
          ended BOOLEAN DEFAULT FALSE,
          CONSTRAINT fkPupId FOREIGN KEY (pup_id) REFERENCES puppies(id)
        );
      `;
  
      console.log(`Created "parties" table`);
  
      // Insert data into the "users" table
      const insertedParties = await Promise.all(
        parties.map(async (party) => {
          return client.sql`
          INSERT INTO parties (id, pup_id, location, time_started, ended )
          VALUES (${party.id},${party.pup_id}, ${party.location}, ${party.time_started}, ${party.ended})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedParties.length} parties`);
  
      return {
        createTable,
        parties: insertedParties
      };
    } catch (error) {
      console.error('Error seeding parties:', error);
      throw error;
    }
  }

  async function seedRequest(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS requests (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          requester_id UUID NOT NULL,
          requestee_id UUID NOT NULL,
          status VARCHAR(8),
          CONSTRAINT fkrequestedPupId FOREIGN KEY (requester_id) REFERENCES puppies(id),
          CONSTRAINT fkrequesteePupId FOREIGN KEY (requestee_id) REFERENCES puppies(id)
        );
      `;
  
      console.log(`Created "requests" table`);
  
      // Insert data into the "users" table
      const insertedRequests = await Promise.all(
        requests.map(async (request) => {
          return client.sql`
          INSERT INTO requests (id, requester_id, requestee_id, status )
          VALUES (${request.id}, ${request.requester_id}, ${request.requestee_id}, ${request.status})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedRequests.length} requests`);
  
      return {
        createTable,
        requests: insertedRequests
      };
    } catch (error) {
      console.error('Error seeding requests:', error);
      throw error;
    }
  }



  async function main() {
    const client = await db.connect();
    // await seedPuppies(client);
    // await seedRequest(client);

    // await seedParty(client);
    await seedNotifications(client);

    await client.end();
  }

  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });
  