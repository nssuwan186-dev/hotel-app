import { Booking } from '../models/booking';

let bookings: Booking[] = [];

export function addBooking(booking: Booking) {
  bookings.push(booking);
}

export function getBookings() {
  return bookings;
}

export function getBookingsByDate(date: Date) {
  return bookings.filter(b => date >= b.checkIn && date <= b.checkOut);
}

export function calculateRoomPrice(checkIn: Date, checkOut: Date, ratePerNight: number): number {
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  return nights * ratePerNight;
}

export function checkoutBooking(bookingId: string) {
  bookings = bookings.map(b =>
    b.id === bookingId ? { ...b, status: 'checked-out' } : b
  );
}

export function getCheckoutChecklist() {
  return bookings.filter(b => b.status === 'checked-out');
}

export function getDailyReport(date: Date) {
  const dailyBookings = bookings.filter(b =>
    b.checkIn.toDateString() === date.toDateString() ||
    b.checkOut.toDateString() === date.toDateString()
  );

  const totalRooms = dailyBookings.length;
  const totalSales = dailyBookings.reduce((sum, b) => sum + b.price, 0);
  const rooms = dailyBookings.map(b => b.roomNumber);
  const transferSales = dailyBookings
    .filter(b => b.paymentType === 'transfer')
    .reduce((sum, b) => sum + b.price, 0);
  const cashSales = dailyBookings
    .filter(b => b.paymentType === 'cash')
    .reduce((sum, b) => sum + b.price, 0);

  return {
    date: date.toDateString(),
    totalRooms,
    totalSales,
    rooms,
    transferSales,
    cashSales
  };
}