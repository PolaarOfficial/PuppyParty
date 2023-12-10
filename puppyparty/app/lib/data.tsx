import { sql } from '@vercel/postgres';
import { Puppy } from '@/app/lib/definitions';

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

export async function getLatestNotifications(
    email:string
){
//     try{
//         const latestNotifications = await sql
//     }
return ;
}