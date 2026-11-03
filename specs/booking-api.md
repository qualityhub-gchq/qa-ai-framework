# Booking API — Test Plan

**API:** Restful-Booker (https://restful-booker.herokuapp.com) · public practice API with documented quirks.

| ID         | Title                                    | Priority | Expected                               | Automated    |
| ---------- | ---------------------------------------- | -------- | -------------------------------------- | ------------ |
| TC-API-001 | Health check `GET /ping`                 | High     | `201 Created` (documented quirk)       | Yes · @smoke |
| TC-API-002 | `POST /auth` with valid credentials      | High     | `200` + `token` string                 | Yes          |
| TC-API-003 | Create booking, then `GET /booking/{id}` | High     | Returned booking matches what was sent | Yes · @smoke |
| TC-API-004 | `GET /booking/{unknown id}`              | Medium   | `404`                                  | Yes          |
| TC-API-005 | `PUT /booking/{id}` without token        | High     | `403`; the booking is unchanged        | Yes          |
| TC-API-006 | `DELETE /booking/{id}` with token        | Medium   | `201`, then GET returns `404`          | No           |
