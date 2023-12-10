const puppies = [
    {
        id: '3c53fbf1-7c12-4f1a-ae8e-1da66945165b',
        name: 'Soomsoom',
        birthday: '2023-01-18',
        sex: 'Female',
        email: 'test@test.com'
    },
    {
        id: '9ec6a7a8-d33a-455f-89bb-dfc866366a24',
        name: 'June',
        birthday: '2023-02-18',
        sex: 'Female',
        email: 'test2@test.com'
    },
]

const notifications = [
    {
        id: '5ba7b9f7-fe12-4d13-8e71-6af3423df48c',
        pup_id: '3c53fbf1-7c12-4f1a-ae8e-1da66945165b',
        type_of_request: 'Friend',
        friend_request_id: '8ec0c9f4-c462-41df-8967-127691997a6e',
        time_created: '2023-11-28T12:00Z'
    },
    {
        id: '9f33f3a5-ffd5-494f-a8d8-e5c98d81e7b7',
        pup_id: '3c53fbf1-7c12-4f1a-ae8e-1da66945165b',
        type_of_request: 'Party',
        party_request_id: 'a7d68e32-46f6-40af-8b98-89b686b5f9f3',
        time_created: '2023-11-28T12:45:00Z'
    },
]

const requests = [
    {
        id: '8ec0c9f4-c462-41df-8967-127691997a6e',
        requester_id: '3c53fbf1-7c12-4f1a-ae8e-1da66945165b',
        requestee_id: '9ec6a7a8-d33a-455f-89bb-dfc866366a24',
        status: 'Pending'
    }
]

const parties = [
    {
        id: 'a7d68e32-46f6-40af-8b98-89b686b5f9f3',
        pup_id: '3c53fbf1-7c12-4f1a-ae8e-1da66945165b',
        location : '@41.8918285,-87.6164283',
        time_started: '2023-12-09 at 12:45pm est',
        ended: false
    }
]

module.exports = {
    puppies, notifications, requests, parties
  };
  
  