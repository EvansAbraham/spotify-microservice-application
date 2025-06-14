export interface Song {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
    audio: string;
    album_id: string | null;
    created_at: string;
}

export interface Album {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: [];
}