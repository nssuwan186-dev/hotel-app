export interface Hotel {
    id: number;
    name: string;
    location: string;
    rating: number;
}

export interface Booking {
    id: number;
    hotelId: number;
    userId: number;
    checkInDate: Date;
    checkOutDate: Date;
    numberOfGuests: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}