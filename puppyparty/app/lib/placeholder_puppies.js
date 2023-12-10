const puppies = [
    {
        id: 'c7d0210b-5e47-47fe-832d-8f30e0b70524',
        name: 'Soomsoom',
        birthday: '2023-01-18',
        sex: 'Female',
        email: 'test@test.com'
    },
    {
        id: 'fda5291c-edcb-45c3-bcd2-10612e0043f7',
        name: 'June',
        birthday: '2023-02-18',
        sex: 'Female',
        email: 'test2@test.com'
    },
]

const notifications = [
    {
        id: '5ba7b9f7-fe12-4d13-8e71-6af3423df48c',
        pupId: 'c7d0210b-5e47-47fe-832d-8f30e0b70524',
        typeOfRequest: 'Friend',
        friendRequestId: 'aec496a5-03c8-425b-86fc-2eafe5264fd3',
        timeCreated: '2023-11-28 at 12:30pm est'
    },
    {
        id: '9f33f3a5-ffd5-494f-a8d8-e5c98d81e7b7',
        pupId: 'c7d0210b-5e47-47fe-832d-8f30e0b70524',
        typeOfRequest: 'Party',
        partyRequestId: 'a7d68e32-46f6-40af-8b98-89b686b5f9f3',
        timeCreated: '2023-11-28 at 12:45pm est'
    },
]

const requests = [
    {
        id: '1',
        requesterId: 'c7d0210b-5e47-47fe-832d-8f30e0b70524',
        requesteeId: 'fda5291c-edcb-45c3-bcd2-10612e0043f7',
        status: 'Pending'
    }
]

const parties = [
    {
        id: '0270392f-8be9-43e3-966d-9777ed1a59ce',
        pupId: 'c7d0210b-5e47-47fe-832d-8f30e0b70524',
        location : '@41.8918285,-87.6164283',
        timeStarted: '2023-12-09 at 12:45pm est',
        ended: false
    }
]

module.exports = {
    puppies, notifications, requests, parties
  };
  
  