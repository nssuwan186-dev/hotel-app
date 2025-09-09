import express from 'express';
import { addCustomer, getCustomers } from '../controllers/customerController';
import { addBooking, getBookings, getBookingsByDate, checkoutBooking, getCheckoutChecklist, getDailyReport } from '../controllers/bookingController';

const router = express.Router();

router.get('/customers', (req, res) => {
  res.json(getCustomers());
});

router.post('/customers', (req, res) => {
  addCustomer(req.body);
  res.status(201).send('Customer added');
});

router.get('/bookings', (req, res) => {
  res.json(getBookings());
});

router.post('/bookings', (req, res) => {
  addBooking(req.body);
  res.status(201).send('Booking added');
});

router.get('/bookings/date/:date', (req, res) => {
  const date = new Date(req.params.date);
  res.json(getBookingsByDate(date));
});

router.post('/bookings/checkout/:id', (req, res) => {
  checkoutBooking(req.params.id);
  res.send('Booking checked out');
});

router.get('/bookings/checklist', (req, res) => {
  res.json(getCheckoutChecklist());
});

router.get('/report/daily/:date', (req, res) => {
  const date = new Date(req.params.date);
  res.json(getDailyReport(date));
});

export default router;