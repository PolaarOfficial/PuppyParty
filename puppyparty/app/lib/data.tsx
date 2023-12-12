import { sql } from '@vercel/postgres';
import { Puppy, Notification, Name, SQLLocation , Location, NotificationPresentation} from '@/app/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';
export async function getCurrentAccountDetails(
    email:string
){
    try{
        const currentDetails = await sql<Puppy>`
        SELECT id, email, name, birthday, sex
        From Puppies
        where email=${email}
        `;
        return currentDetails.rows[0];
    } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch account.');
  }
}

export async function fetchLatestNotifications(
    pup_id:string
){
    noStore();
    try{
        const latestNotifications = await sql<Notification>`
        SELECT *
        FROM notifications
        where notifications.pup_id=${pup_id}
        `;
        const updatedNotifications = latestNotifications.rows.map((notification) => ({
            ...notification,
          }));
        return updatedNotifications;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch notifications.');
    }
}

export async function getPupName(
    pup_id:string
){
    try{
        const name = await sql<Name>`
        SELECT name
        from puppies
        where id=${pup_id}`
        return name.rows[0].name;
    } catch (error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch puppies.');
    }
}

export async function fetchPartyLocation(
    party_request_id:string
){
    try{
        const location = await sql<SQLLocation>`
        SELECT location
        from parties
        where id=${party_request_id}`
        const loc = location.rows[0].location.slice(1).split(',');
        return loc;
    } catch (error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch parties.');
    }
}

export async function fetchDisplayNotifications(
    pup_id:string
){
    noStore();
    try{
        const latestNotifications = await sql<NotificationPresentation>`
        SELECT notifications.id, puppies.name, notifications.type_of_request, parties.location, notifications.time_created
        FROM notifications
        inner join puppies on puppies.id=notifications.pup_id
        inner join parties on parties.pup_id = notifications.pup_id
        where notifications.pup_id=${pup_id}
        `;
        const updatedNotifications = latestNotifications.rows.map((notification) => ({
            ...notification,
          }));
          console.log('here', updatedNotifications);
        return updatedNotifications;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch notifications.');
    }
}
