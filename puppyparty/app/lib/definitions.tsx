export type Puppy = {
    id: string;
    email: string;
    name: string;
    birthday: string;
    sex: 'female' | 'male';
}

export type Notification = {
    id: string;
    pup_id: string;
    type_of_request: 'Friend' | 'Party';
    friend_request_id: string;
    party_request_id: string;
    time_created: string;
}

export type Request = {
    id: string;
    requester_id: string;
    requestee_id: string;
    status: 'Pending' | 'Accepted' | 'Declined';
}

export type Party = {
    id: string;
    pup_id: string;
    fkPupId: string;
    location: string;
    time_started: string;
    ended: boolean;
}

export type Name = {
    name: string;
}

export type SQLLocation = {
    location:string;
}

export type Location = {
    latitude:number;
    longitude:number;
}

export type NotificationPresentation = {
    id: string;
    name:string;
    type_of_request: 'Friend' | 'Party';
    location:string;
    time_created:string;
}
