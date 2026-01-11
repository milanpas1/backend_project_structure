# MVC Authentication API

A RESTful authentication API built with Node.js, Express, PostgreSQL, and JWT tokens following the MVC (Model-View-Controller) architecture pattern.

## Features

- ✅ User Registration (Signup)
- ✅ User Login with JWT Authentication
- ✅ Access Token & Refresh Token Implementation
- ✅ Password Hashing with bcrypt
- ✅ PostgreSQL Database Integration
- ✅ MVC Architecture Pattern
- ✅ Token Refresh Endpoint
- ✅ Logout Functionality
- ✅ Environment Variables Configuration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Environment Variables:** dotenv
- **Development:** nodemon

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd 3_mvc
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
   ```

   **Generate secure secrets:**

   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

4. **Set up the database**

   Create the database and tables:

   ```sql
   -- Create users table
   CREATE TABLE IF NOT EXISTS users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create refresh_tokens table
   CREATE TABLE IF NOT EXISTS refresh_tokens (
     id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     token TEXT NOT NULL UNIQUE,
     expires_at TIMESTAMP NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create indexes
   CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
   CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
   CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);
   ```

## Usage

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

#### 1. **Signup**

- **Endpoint:** `POST /auth/signup`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-01-11T10:30:00.000Z"
  }
  ```

#### 2. **Login**

- **Endpoint:** `POST /auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### 3. **Refresh Token**

- **Endpoint:** `POST /auth/refresh`
- **Body:**
  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### 4. **Logout**

- **Endpoint:** `POST /auth/logout`
- **Body:**
  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

## Project Structure

```
3_mvc/
├── controllers/
│   └── auth.controller.js    # Authentication logic
├── services/
│   ├── user.service.js       # User database operations
│   └── token.service.js      # JWT token operations
├── routes/
│   └── auth.routes.js        # Authentication routes
├── middleware/
│   └── auth.middleware.js    # JWT verification middleware
├── db.js                     # PostgreSQL connection pool
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## Token Details

- **Access Token:** Expires in 15 minutes
- **Refresh Token:** Expires in 7 days
- Refresh tokens are stored in the database for security
- All user tokens can be revoked on logout

## Security Features

- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens for stateless authentication
- Refresh token rotation
- Secure token storage in database
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Milan

## Acknowledgments

- Express.js Documentation
- PostgreSQL Documentation
- JWT.io
- bcrypt Documentation
