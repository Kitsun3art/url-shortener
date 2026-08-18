# URL Shortener API

A RESTful API for creating, managing, and tracking shortened URLs.

Built with **Node.js**, **Express.js**, and **MongoDB** for Roadmap Project https://roadmap.sh/projects/url-shortening-service

## Features

* Create short URLs
* Retrieve original URLs
* Update existing short URLs
* Delete short URLs
* Redirect short URLs to original URLs
* Track the number of times a short URL has been accessed
* Get URL statistics
* Unique short code generation
* MongoDB persistence

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* Crypto (Node.js built-in module)

## Project Structure

```text
url-shortener/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   └── Url.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Kitsun3art/url-shortener.git
cd url-shortener
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
PORT=3000
BASE_URL=http://localhost:3000
MONGO_URI=your_mongodb_connection_string
```

Start the development server:

```bash
npm run dev
```

Or start the production server:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

## API Endpoints

### Create a Short URL

**POST** `/api/shorten`

Request:

```json
{
  "url": "https://www.example.com/some/long/url"
}
```

Response:

```json
{
  "id": "64f...",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "7e3b834b",
  "createdAt": "2026-08-17T10:00:00.000Z",
  "updatedAt": "2026-08-17T10:00:00.000Z",
  "accessCount": 0
}
```

Status codes:

* `201 Created` — URL successfully created
* `400 Bad Request` — URL is missing
* `500 Internal Server Error` — server/database error

---

### Retrieve a Short URL

**GET** `/api/shorten/:shortCode`

Example:

```text
GET /api/shorten/7e3b834b
```

Response:

```json
{
  "id": "64f...",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "7e3b834b",
  "createdAt": "2026-08-17T10:00:00.000Z",
  "updatedAt": "2026-08-17T10:00:00.000Z",
  "accessCount": 0
}
```

Status codes:

* `200 OK` — URL found
* `404 Not Found` — short URL does not exist
* `500 Internal Server Error` — server/database error

---

### Update a Short URL

**PUT** `/api/shorten/:shortCode`

Request:

```json
{
  "url": "https://www.google.com"
}
```

Example:

```text
PUT /api/shorten/7e3b834b
```

Response:

```json
{
  "id": "64f...",
  "url": "https://www.google.com",
  "shortCode": "7e3b834b",
  "createdAt": "2026-08-17T10:00:00.000Z",
  "updatedAt": "2026-08-17T11:00:00.000Z",
  "accessCount": 0
}
```

The `shortCode` remains unchanged while the original URL is updated.

Status codes:

* `200 OK` — URL successfully updated
* `400 Bad Request` — URL is missing
* `404 Not Found` — short URL does not exist
* `500 Internal Server Error` — server/database error

---

### Delete a Short URL

**DELETE** `/api/shorten/:shortCode`

Example:

```text
DELETE /api/shorten/7e3b834b
```

Successful response:

```text
204 No Content
```

Status codes:

* `204 No Content` — URL successfully deleted
* `404 Not Found` — short URL does not exist
* `500 Internal Server Error` — server/database error

---

### Get URL Statistics

**GET** `/api/shorten/:shortCode/stats`

Example:

```text
GET /api/shorten/7e3b834b/stats
```

Response:

```json
{
  "id": "64f...",
  "url": "https://www.google.com",
  "shortCode": "7e3b834b",
  "createdAt": "2026-08-17T10:00:00.000Z",
  "updatedAt": "2026-08-17T11:00:00.000Z",
  "accessCount": 5
}
```

`accessCount` represents the number of times the shortened URL has been accessed through the redirect endpoint.

---

### Redirect to Original URL

**GET** `/:shortCode`

Example:

```text
GET /7e3b834b
```

The API:

1. Finds the short URL.
2. Increments `accessCount`.
3. Saves the updated count.
4. Redirects the user to the original URL.

Example:

```text
http://localhost:3000/7e3b834b
        ↓
https://www.google.com
```

If the short code does not exist, the API returns:

```json
{
  "error": "Short URL not found"
}
```

## Database Model

Each URL is stored in MongoDB with the following fields:

```text
Url
├── url
├── shortCode
├── createdAt
├── updatedAt
└── accessCount
```

Example document:

```json
{
  "url": "https://www.google.com",
  "shortCode": "7e3b834b",
  "accessCount": 5,
  "createdAt": "2026-08-17T10:00:00.000Z",
  "updatedAt": "2026-08-17T11:00:00.000Z"
}
```

`shortCode` is unique and generated using Node.js's built-in `crypto` module.

## Testing

You can test the API using tools such as:

* Postman
* Insomnia
* Thunder Client
* cURL

Example with cURL:

```bash
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.google.com"}'
```

## Future Improvements

Possible improvements for future versions:

* URL format validation
* User authentication
* User-specific URLs
* Expiration dates
* Advanced click statistics
* Custom short codes
* Rate limiting
* Minimal frontend
* Docker support
* Automated tests

## License

This project is intended for learning and portfolio purposes.
