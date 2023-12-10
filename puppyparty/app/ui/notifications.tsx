import Link from 'next/link';

// import clsx from 'clsx';
// import { LatestInvoice } from '@/app/lib/definitions';
import { fetchLatestNotifications, getPupName } from '@/app/lib/data';
import { getTimeDifference } from '@/app/lib/utils';


export default async function Notifications(){
    //how to pass id through Notification?
    const pupId="3c53fbf1-7c12-4f1a-ae8e-1da66945165b";
    const latestNotifications = await fetchLatestNotifications(pupId);
    const name = await getPupName(pupId);
    console.log(name);
    return (
        <div>
            <div className="bg-white px-6">
            {latestNotifications.map((notification) => {
                console.log(notification);
            return (
              <div
                key={notification.id}
              >
                <div>
                    <p>
                      {name}
                    </p>
                    <p>
                      {notification.type_of_request}
                    </p>
                </div>
                <p>
                {getTimeDifference(notification.time_created)} minutes ago
                {/* {notification.time_created} */}
                </p>
                <br/>
              </div>
            );
          })}
        </div>
        </div>
    );
}
