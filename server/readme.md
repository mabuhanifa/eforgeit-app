# Test_School - Server Application

This is the backend for the Test_School Competency Assessment Platform, built with Node.js, Express, and TypeScript.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT) & bcrypt
- **Email**: Nodemailer

## Getting Started

Follow these instructions to get the server application running on your local machine.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- MongoDB (running locally or a connection string to a cloud instance like MongoDB Atlas)

### Installation

1.  **Navigate to the server directory:**

    ```bash
    cd server
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

### Environment Variables

The server requires several environment variables to run correctly.

1.  Create a local environment file by copying the example file:

    ```bash
    cp .env.example .env
    ```

2.  Open the `.env` file and fill in the required values:

    ```env
    # Server port
    PORT=5000

    # Your MongoDB connection string
    MONGO_URI=mongodb://localhost:27017/test_school

    # Secret keys for JWT
    JWT_SECRET=your_jwt_secret_key
    JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

    # Email configuration for Nodemailer (using Gmail as an example)
    # Note: You may need to create an "App Password" for your Google account
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_gmail_app_password
    ```

### Running the Application

1.  **Start the server in development mode (with hot-reloading):**
    ```bash
    npm run dev
    ```

The server will now be running on `http://localhost:5000`.

### Database Seeding

The application includes a seeder script to populate the database with initial data (e.g., admin user, sample questions).

- **To import data:**
  This command will clear all existing data and insert the sample data from the `src/seeds/data` directory.

  ```bash
  npm run seed:import
  ```

- **To destroy data:**
  This command will clear all data from the relevant collections.
  ```bash
  npm run seed:destroy
  ```

### Default Admin Credentials

After seeding the database, you can log in with the following admin credentials:

- **Email**: `admin@example.com`
- **Password**: `password123`
