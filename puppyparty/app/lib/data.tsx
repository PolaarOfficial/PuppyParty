import { sql } from '@vercel/postgres';
import { Puppy, Notification, Name } from '@/app/lib/definitions';
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
