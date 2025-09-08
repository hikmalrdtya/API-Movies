# Movies API | BACKEND

This is a complete RESTful API project built with Node.js, Express, and MongoDB. It serves as the backend for a movie review application where users can register, log in, browse movies, and post their own reviews.

This project was built as a comprehensive exercise to master fundamental and advanced backend development concepts, from initial server setup to a full-fledged, role-based security system.

## Core Features

-   **User Authentication (JWT):** Secure user registration and login system using JSON Web Tokens. Passwords are safely hashed using `bcryptjs`.
-   **Role-Based Authorization (Admin/User):** Middleware implementation to restrict access. Only users with an 'admin' role can create, update, or delete movie data.
-   **Full CRUD Operations:** Complete functionality to Create, Read, Update, and Delete data for Movies and Reviews.
-   **Data Relationships:** Clear relationships between `User`, `Movie`, and `Review` models implemented using Mongoose refs and population.
-   **Professional Error Handling:** A centralized error handling system to gracefully manage operational errors and programming bugs.
-   **Advanced Data Validation:** Strict validation rules at the Model level (Mongoose Schema) to ensure data integrity.
-   **Advanced Querying Features:** The ability to filter results (e.g., by year) and limit the number of results (`limit`).

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB Atlas (NoSQL)
-   **ODM (Object Data Modeling):** Mongoose
-   **Authentication:** JSON Web Token (`jsonwebtoken`), `bcryptjs`
-   **Environment Management:** `dotenv`
-   **API Testing:** Postman

## Local Installation & Setup

To run this project on your local machine, follow these steps.

### Prerequisites

-   Node.js (v14 or higher)
-   npm (Node Package Manager)
-   Git
-   A MongoDB Atlas account to get a database connection string.
-   Postman (for testing the API endpoints).

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/hikmalrdtya/API-Movies.git
    ```

2.  **Navigate into the project directory:**
    ```bash
    cd API-Movies
    ```

3.  **Install all dependencies:**
    ```bash
    npm install
    ```

4.  **Create a `.env` file in the project root.**
    Create a new file named `.env` or copy `.env.example`.

    ```env
    # Server Port
    PORT=YOUR_PORT

    # Your MongoDB Atlas Connection URL
    DATABASE_URL=YOUR_DATABASE_MONGODB_URL

    # JSON Web Token Settings
    JWT_SECRET=YOUR_JWT_SECRET_TOKEN
    JWT_EXPIRES_IN=YOUR_JWT_EXPIRED
    ```

5.  **Start the server:**
    ```bash
    npm run dev
    ```
    The server will be running at `http://localhost:<YOUR_PORT>`.

## API Endpoint Documentation

The following is a list of available endpoints.

### 🔑 Authentication (`/api/auth`)

| Method | Endpoint  | Description                   | Security |
| :----- | :-------- | :-------------------------- | :------- |
| `POST` | `/signup` | Registers a new user.       | Public   |
| `POST` | `/login`  | Logs in a user and returns a token. | Public   |
| `GET`  | `/logout` | Logs out a user (clears cookie). | Public   |

### 🎬 Movies (`/api/movies`)

| Method   | Endpoint | Description             | Security          |
| :------- | :------- | :---------------------- | :---------------- |
| `GET`    | `/`      | Get all movies.         | Public            |
| `GET`    | `/:id`   | Get a single movie.     | Public            |
| `POST`   | `/`      | Create a new movie.     | **Admin Only**    |
| `PUT`    | `/:id`   | Update a movie.         | **Admin Only** |
| `DELETE` | `/:id`   | Delete a movie.         | **Admin Only** |

### ⭐️ Reviews (`/api/movies/:movieId/reviews`)

| Method   | Endpoint     | Description                       | Security         |
| :------- | :----------- | :-------------------------------- | :--------------- |
| `GET`    | `/`          | Get all reviews for a specific movie. | Public           |
| `POST`   | `/`          | Create a new review for a specific movie. | Login Required   |
| `PUT` | `/:reviewId` | Edit a review (owner only).     | Review Owner Only |
| `DELETE` | `/:reviewId` | Delete a review (owner only).     | Review Owner Only |
```
