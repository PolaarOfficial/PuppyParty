export type Puppy = {
    id: string;
    email: string;
    name: string;
    birthday: string;
    sex: 'female' | 'male';
}

export type Notification = {
    id: string;
    pupId: string;
    typeOfRequest: 'Friend' | 'Party';
    friendRequestId: string;
    partyRequestId: string;
    timeCreated: Date;
}

export type Request = {
    id: string;
    requesterId: string;
    requesteeId: string;
    status: 'Pending' | 'Accepted' | 'Declined';
}

export type Party = {
    id: string;
    pupId: string;
    fkPupId: string;
    location: string;
    timeStarted: string;
    ended: boolean;
}
