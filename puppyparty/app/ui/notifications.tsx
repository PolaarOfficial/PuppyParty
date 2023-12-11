'use client';
import Link from 'next/link';
import haversine from 'haversine';

// import clsx from 'clsx';
// import { LatestInvoice } from '@/app/lib/definitions';
import { fetchDisplayNotifications, getPupName, fetchPartyLocation } from '@/app/lib/data';
import { getTimeDifference } from '@/app/lib/utils';
import { useState, useEffect } from 'react'
import { Location } from '@/app/lib/definitions';

export default async function Notifications(){
    // const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
    const [latestNotifications, setLatestNofications] = useState<any[]>([]);
    // useEffect(()=>{
    //     const fetchCurrentLocation = () => {
    //         navigator.geolocation.getCurrentPosition((position)=>{
    //             const { latitude, longitude } = position.coords;
    //             setCurrentLocation({latitude, longitude});
    //         },
    //         (error)=>{
    //             console.error('Error getting location:',error);
    //             }
    //         );
    //     };
    //     fetchCurrentLocation();
    // },[]);

    useEffect(()=>{
        async function fetchData(){
            const pupId="3c53fbf1-7c12-4f1a-ae8e-1da66945165b";
            const latestNotifications = await fetchDisplayNotifications(pupId);
            setLatestNofications(latestNotifications);
        }
        fetchData();
    },[]);

    return (
        <div>
            <div className="bg-white px-6">
            {latestNotifications.map((notification) => {
                console.log(notification);
                //if the request is a party, calculate distance
                let distance;
                // if(notification.type_of_request==='Party' && currentLocation){
                //     const loc = notification.location.slice(1).split(',');
                //     const start = {
                //         latitude: loc[0],
                //         longitude:loc[1]
                //     }
                //     console.log(start);

                //     // distance = haversine(start, currentLocation, {unit: 'mile'})
                // }

                return (
                <div key={notification.id}>
                    <div>
                        <p>{notification.name}</p>
                        <p>{notification.type_of_request} </p>
                        {/* {distance && (
                            <p>
                            {distance}  
                            </p>
                        )} */}
                    </div>
                    <p>{getTimeDifference(notification.time_created)} minutes ago</p>
                    <br/>
                </div>
                );
            })}
            </div>
        </div>
    );
}
