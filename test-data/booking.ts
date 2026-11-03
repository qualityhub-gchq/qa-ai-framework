// Test data, including buildBooking(), which creates fresh data for each test

/**
 * Test data builder for Restful-Booker bookings.
 * Builders give every test fresh, valid data and let a test override only what it cares about.
 */
export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds?: string;
};

export function buildBooking(overrides: Partial<Booking> = {}): Booking {
  const unique = Date.now().toString().slice(-6);
  return {
    firstname: `QA${unique}`,
    lastname: 'Automation',
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2027-01-10', checkout: '2027-01-15' },
    additionalneeds: 'Breakfast',
    ...overrides,
  };
}
