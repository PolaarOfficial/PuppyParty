'use client';
import Link from 'next/link';
import haversine from 'haversine';

// import clsx from 'clsx';
// import { LatestInvoice } from '@/app/lib/definitions';
import { fetchDisplayNotifications, getPupName, fetchPartyLocation } from '@/app/lib/data';
import { getTimeDifference, getNotificationsForDisplay } from '@/app/lib/utils';
import { useState, useEffect } from 'react'
import { Location } from '@/app/lib/definitions';

export default async function Notifications(){
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
    const [latestNotifications, setLatestNofications] = useState<any[]>([]);
    useEffect(()=>{
        const fetchCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition((position)=>{
                const { latitude, longitude } = position.coords;
                setCurrentLocation({latitude, longitude});
            },
            (error)=>{
                console.error('Error getting location:',error);
                }
            );
        };
        fetchCurrentLocation();
    },[]);

    useEffect(()=>{
        const fetchData = async () => {
            const pupId="3c53fbf1-7c12-4f1a-ae8e-1da66945165b";
            setLatestNofications([]);
            const latestNotifications = await getNotificationsForDisplay(pupId)
            setLatestNofications(latestNotifications);
        };
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    },[]);
    if(!latestNotifications && !currentLocation) return <div>Loading...</div>;
    return (
        <div>
            <div className="bg-white px-6">
            {latestNotifications.slice(0,5).map((notification) => {
                //if the request is a party, calculate distance
                let distance;
                let distanceString;
                if(notification.type_of_request==='Party' && currentLocation){
                    const loc = notification.location.slice(1).split(',');
                    const start = {
                        latitude: loc[0],
                        longitude:loc[1]
                    }

                    distance = haversine(start, currentLocation, {unit: 'mile'})
                    distance = Math.round( distance *100)/100
                    distanceString = String(distance) + " miles away"
                }

                return (
                <div key={notification.id}>
                    <div>
                        <p>{notification.name}</p>
                        <p>{notification.type_of_request} </p>
                        <p>
                            {distance && (
                                <>{distanceString} </>
                            )}
                        </p>
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
