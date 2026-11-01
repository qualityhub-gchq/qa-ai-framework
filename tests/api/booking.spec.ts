import { test, expect } from '@playwright/test';
import { buildBooking } from '../../test-data/booking';
import { env } from '../../config/env';

/**
 * API tests against Restful-Booker (public practice API).
 * Test cases: specs/booking-api.md
 * Note: Restful-Booker has some intentional quirks (e.g. /ping returns 201). Tests assert
 * the documented behaviour; if it ever changes, that's exactly what a regression suite should catch.
 */
test.describe('Booking API', () => {
  test(
    'TC-API-001 health check responds',
    { tag: ['@smoke', '@regression'] },
    async ({ request }) => {
      const response = await request.get('/ping');

      expect(response.status()).toBe(201);
    },
  );

  test(
    'TC-API-002 auth returns a token for valid credentials',
    { tag: '@regression' },
    async ({ request }) => {
      const response = await request.post('/auth', {
        data: { username: env.apiUsername, password: env.apiPassword },
      });

      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(body.token).toEqual(expect.any(String));
    },
  );

  test(
    'TC-API-003 create booking then retrieve it by id',
    { tag: ['@smoke', '@regression'] },
    async ({ request }) => {
      const booking = buildBooking();

      const createResponse = await request.post('/booking', { data: booking });
      expect(createResponse.ok()).toBeTruthy();
      const created = await createResponse.json();
      expect(created.bookingid).toEqual(expect.any(Number));
      expect(created.booking).toMatchObject(booking);

      const getResponse = await request.get(`/booking/${created.bookingid}`);
      expect(getResponse.ok()).toBeTruthy();
      expect(await getResponse.json()).toMatchObject(booking);
    },
  );

  test('TC-API-004 unknown booking id returns 404', { tag: '@regression' }, async ({ request }) => {
    const response = await request.get('/booking/999999999');

    expect(response.status()).toBe(404);
  });
});
