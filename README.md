# FindHome

FindHome is a MERN (MongoDB, Express.js, React.js, Node.js) stack project designed to help users find and list rental properties. It is similar to Airbnb and includes features such as property listings, user authentication, image uploads, and search functionality.

## Features

- **User Authentication**: Sign up, login, and manage accounts.
- **Property Listings**: Property owners can add, edit, and delete home listings.
- **Image Uploads**: Supports multiple image uploads for properties.
- **Ratings & Reviews**: Users can rate and review properties.
- **Booking System**: Availability and booking functionality.
- **Map Integration**: Displays property locations using coordinates.

## User Roles

### Property Owner

- Can add, update, and delete property listings.
- Manages availability and bookings.
- Can upload images for properties.
- Views tenant inquiries and messages.

### User (Renter)

- Can book available properties.
- Can rate and review properties.
- Can contact property owners for inquiries.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS (or any other styling framework used)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT-based authentication
- **Image Storage**: Multer for file uploads (Base64 storage in MongoDB)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/findhome.git
   cd findhome
   ```
2. Install dependencies:
   ```sh
   npm install
   cd client && npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     PORT=4000
     ```
4. Start the backend server:
   ```sh
   npm start
   ```
5. Start the frontend:
   ```sh
   cd client
   npm start
   ```

## API Endpoints

| Method | Endpoint           | Description                                   |
| ------ | ------------------ | --------------------------------------------- |
| POST   | /api/auth/register | Register a new user                           |
| POST   | /api/auth/login    | User login                                    |
| GET    | /api/homes         | Get all home listings                         |
| POST   | /api/homes         | Add a new home listing (Property Owners only) |
| PUT    | /api/homes/:id     | Update home details (Property Owners only)    |
| DELETE | /api/homes/:id     | Remove a listing (Property Owners only)       |
| POST   | /api/upload        | Upload images                                 |

## Future Improvements

- Payment Gateway Integration
- AI-based Recommendations
- Wishlist & Favorites Feature
- Chat System for Owner & Renter Communication

## License

This project is licensed under the MIT License.

## Contact

For any queries or contributions, feel free to reach out to [dwidwnbrahmaa222@gmail.com] or visit [https://github.com/Dwidenbrahma].
