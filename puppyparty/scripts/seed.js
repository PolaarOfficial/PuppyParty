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
  async function seedNotifications(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS notifications (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          pupId UUID NOT NULL,
          typeOfRequest VARCHAR(6), 
          friendRequestId UUID,
          partyRequestId UUID,
          timeCreated TIMESTAMP NOT NULL,
          CONSTRAINT fkPupId FOREIGN KEY (pupId) REFERENCES puppies(id),
          CONSTRAINT fkFriendRequestId FOREIGN KEY (friendRequestId) REFERENCES request(id),
          CONSTRAINT fkPartyRequestId FOREIGN KEY (partyRequestId) REFERENCES party(id)
        );
      `;
  
      console.log(`Created "notifications" table`);
  
      // Insert data into the "users" table
      const insertedNotifications = await Promise.all(
        notifications.map(async (notification) => {
          return client.sql`
          INSERT INTO notifications (pupId, typeOfRequest, friendRequestId, partyRequestId, timeCreated )
          VALUES (${notification.pupId}, ${notification.typeOfRequest}, ${notification.friendRequestId}, ${notification.partyRequestId}, ${notification.timeCreated})
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
        CREATE TABLE IF NOT EXISTS party (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          pupId UUID NOT NULL,
          location VARCHAR(30), 
          timeStarted TIMESTAMP NOT NULL,
          ended BOOLEAN DEFAULT FALSE,
          CONSTRAINT fkPupId FOREIGN KEY (pupId) REFERENCES puppies(id)
        );
      `;
  
      console.log(`Created "party" table`);
  
      // Insert data into the "users" table
      const insertedParties = await Promise.all(
        parties.map(async (party) => {
          return client.sql`
          INSERT INTO party (pupId, location, timeStarted, ended )
          VALUES (${party.pupId}, ${party.location}, ${party.timeStarted}, ${party.ended})
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
        CREATE TABLE IF NOT EXISTS request (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          requesterId UUID NOT NULL,
          requesteeId UUID NOT NULL,
          status VARCHAR(8),
          CONSTRAINT fkrequestedPupId FOREIGN KEY (requesterId) REFERENCES puppies(id),
          CONSTRAINT fkrequesteePupId FOREIGN KEY (requesteeId) REFERENCES puppies(id)
        );
      `;
  
      console.log(`Created "request" table`);
  
      // Insert data into the "users" table
      const insertedRequests = await Promise.all(
        requests.map(async (request) => {
          return client.sql`
          INSERT INTO request (requesterID, requesteeID, status )
          VALUES (${request.requesterId}, ${request.requesteeId}, ${request.status})
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
    await seedNotifications(client);
    // await seedParty(client);
    // await seedRequest(client);
    await client.end();
  }

  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });
  