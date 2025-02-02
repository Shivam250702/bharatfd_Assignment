# BharatFD - Backend

## Overview
BharatFD is the backend service for a dynamic FAQ (Frequently Asked Questions) system. It leverages MongoDB for data persistence, Redis for efficient caching, and Google Cloud's Translation API for multilingual support. The backend provides RESTful APIs for managing and retrieving FAQs with real-time language translation.

## Features
- **FAQ Management**: Create, store, and retrieve FAQs.
- **Multi-Language Support**: Auto-translate content using Google Cloud Translation API.
- **Performance Optimization**: Redis caching for frequently accessed data.
- **REST API**: Provides endpoints for seamless integration with frontends.

## Tech Stack
- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Framework to build RESTful API routes.
- **MongoDB**: NoSQL database for storing FAQ data.
- **Redis**: Caching mechanism for improved response times.
- **Google Cloud Translation API**: Enables automatic translation of FAQs.
- **Docker**: Containerization for consistent deployment.
- **Mocha & Chai**: Testing framework for unit and integration testing.
- **ESLint**: Ensures clean and maintainable code.
- **Nodemon**: Automatically restarts the server during development.

## Dependencies
### Core Dependencies
- `express` - Web framework for API development.
- `mongoose` - MongoDB ODM for schema modeling.
- `redis` - Redis client for caching data.
- `google-translate-api` - Integrates Google Cloud Translation API.
- `cors` - Enables cross-origin requests.
- `dotenv` - Manages environment variables.
- `helmet` - Enhances security through HTTP headers.
- `morgan` - Logs HTTP requests.
- `quill` - Rich text editor for content formatting.
- `winston` - Logging library for debugging.

### Development Dependencies
- `chai` - Assertion library for testing.
- `eslint` - JavaScript linter for code consistency.
- `mocha` - Test framework for automated testing.
- `nodemon` - Enables hot reloading during development.
- `supertest` - Facilitates API testing.

## Installation Guide
Follow these steps to set up the backend locally:

### 1. Clone the Repository
```sh
git clone https://github.com/Shivam250702/bharatfd_Assignment
cd Backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file and add the following:
```env
MONGO_URI=mongodb://localhost:27017/BharatFD
REDIS_URL=redis://localhost:6379
GOOGLE_API_KEY=your-google-api-key
PORT=3000
```

### 4. Start the Development Server
```sh
npm run dev
```
Server runs on `http://localhost:3000`

## Running with Docker
### 1. Build the Docker Image
```sh
npm run build
```

### 2. Start the Application with Docker Compose
```sh
docker-compose up
```
This starts the backend, MongoDB, and Redis in separate containers.

## API Endpoints
### Fetch FAQs
```sh
GET /api/faqs?lang=en
```

### Create a New FAQ
```sh
POST /api/faqs
```
#### Request Body
```json
{
  "question": {
    "en": "What is BharatFD?",
    "hi": "भारतFD क्या है?"
  },
  "answer": {
    "en": "BharatFD is an FAQ platform providing common question answers.",
    "hi": "भारतFD एक FAQ प्लेटफ़ॉर्म है जो सामान्य प्रश्नों के उत्तर प्रदान करता है।"
  }
}
```
#### Response
```json
{
  "message": "FAQ successfully created.",
  "faq": {
    "_id": "abc123",
    "question": {
      "en": "What is BharatFD?",
      "hi": "भारतFD क्या है?"
    },
    "answer": {
      "en": "BharatFD is an FAQ platform providing common question answers.",
      "hi": "भारतFD एक FAQ प्लेटफ़ॉर्म है जो सामान्य प्रश्नों के उत्तर प्रदान करता है।"
    },
    "createdAt": "2025-02-01T10:00:00.000Z",
    "updatedAt": "2025-02-01T10:00:00.000Z"
  }
}
```
#### Error Response
```json
{
  "error": "Question and answer must be provided in at least one language."
}
```

### Update an FAQ
```sh
PUT /api/faqs/:id
```
#### Request Body
```json
{
  "question": "Updated question?",
  "answer": "Updated answer."
}
```

### Delete an FAQ
```sh
DELETE /api/faqs/:id
```
#### Response
```json
{
  "message": "FAQ deleted successfully."
}
```

## API Testing with cURL
```sh
curl -X POST http://localhost:3000/api/faqs \
-H "Content-Type: application/json" \
-d '{
  "question": {
    "en": "What is BharatFD?",
    "hi": "भारतFD क्या है?"
  },
  "answer": {
    "en": "BharatFD is an FAQ platform providing common question answers.",
    "hi": "भारतFD एक FAQ प्लेटफ़ॉर्म है जो सामान्य प्रश्नों के उत्तर प्रदान करता है।"
  }
}'
```

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a pull request.

---
### 📌 Happy Coding! 🚀
