import { Booking } from '../models/booking';
import { Customer } from '../models/customer';
import { writeFileSync } from 'fs';

export function exportBookingsToCSV(bookings: Booking[], customers: Customer[], filePath: string) {
  const header = 'BookingID,CustomerName,RoomNumber,CheckIn,CheckOut,Price,Status,PaymentType\n';
  const rows = bookings.map(b => {
    const customer = customers.find(c => c.id === b.customerId);
    return `${b.id},${customer?.name},${b.roomNumber},${b.checkIn.toISOString()},${b.checkOut.toISOString()},${b.price},${b.status},${b.paymentType}`;
  });
  writeFileSync(filePath, header + rows.join('\n'));
}