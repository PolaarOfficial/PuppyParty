'use client';
import { useState, useEffect } from 'react'
import { Location } from '@/app/lib/definitions';
import { startPuppyParty } from '@/app/lib/utils';
export default function Party(){
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
    const [fetchingLocation, setFetchingLocation] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFetchLocation = () => {
        setFetchingLocation(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            let loc = { latitude, longitude };
            setCurrentLocation(loc);
            let pup_id = "3c53fbf1-7c12-4f1a-ae8e-1da66945165b";
            let sqlLoc = "@"+latitude + "," + longitude;
            startPuppyParty(pup_id, sqlLoc)
            setFetchingLocation(false);
          },
          (error) => {
            setErrorMessage('Error getting location: ' + error.message);
            setFetchingLocation(false);
          }
        );
      };
    

    return (
        <div>
            <button onClick={handleFetchLocation} disabled={fetchingLocation}>
                {fetchingLocation ? 'Partying!' : 'Puppy Party!' }
            </button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}