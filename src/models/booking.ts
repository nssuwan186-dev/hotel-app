export interface Booking {
  id: string;
  customerId: string;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  price: number;
  status: 'checked-in' | 'checked-out';
  paymentType: 'transfer' | 'cash';
}