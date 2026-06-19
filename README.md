# Sort My Scene 🎟️

Sort My Scene is a modern, full-stack event discovery and ticket booking platform. It provides a seamless experience for both attendees looking to book seats for upcoming events and organizers wanting to list and manage their own events.

## 🔗 Links

- **Live Demo (Frontend)**: https://tiny-blancmange-4cd649.netlify.app/
- **API URL (Backend)**: https://sort-my-scene.onrender.com

---

## ✨ Features

### For Attendees
- **Event Discovery**: Browse upcoming events, view details, venue information, and prices.
- **Interactive Seating Grid**: Select exact seats from a dynamic, live-preview seating layout (e.g., Row A Seat 5).
- **Seat Reservations**: Selected seats are temporarily held with a 5-minute countdown timer to prevent booking conflicts.
- **Payment Simulation**: Complete booking securely with a fully validated mock payment form.
- **Receipt Generation**: Instantly view your booking receipt with a unique Booking ID upon successful payment.
- **My Bookings**: Keep track of all your past and upcoming ticket purchases in one place.

### For Organizers
- **List New Events**: Create events with custom titles, dates, descriptions, categories, and upload promotional posters.
- **Custom Seating Layouts**: Define your own venue capacity by specifying custom rows and columns (e.g., 5 rows, 10 columns) with a live visual preview.
- **Ticket Pricing**: Set custom base prices for event tickets.
- **Manage Events**: Track all the events you have listed on the platform via the "My Events" dashboard and delete them if necessary.

### General
- **Authentication**: Secure user login and signup with JWT (JSON Web Tokens).
- **Responsive Design**: A sleek, dark-themed, glassmorphic UI optimized for both mobile and desktop screens.
- **Offline Resilience**: Bookings fall back to local storage seamlessly in case of temporary API disconnects.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: Built with React and Vite for blazing-fast performance.
- **Tailwind CSS**: Custom dark-mode theme, sleek micro-animations, and glassmorphism UI components.
- **React Router**: For seamless single-page application navigation.
- **React Hot Toast**: Beautiful, non-intrusive notifications.

### Backend
- **Node.js & Express.js**: RESTful API architecture.
- **MongoDB & Mongoose**: Database and schema management.
- **Mongoose Transactions**: Ensures data integrity so two people cannot book the same seat at the exact same millisecond.
- **JWT (JSON Web Tokens)**: For secure route protection and user sessions.
- **Multer**: For handling event poster image uploads.

---

## 🚀 How It Works

1. **Database Architecture**: Events and Seats are separate collections. When an event is created, the server automatically generates the required grid of individual seat documents linked to that event.
2. **Booking Flow**:
   - A user clicks an `available` seat.
   - The frontend calls `/api/reserve`, which locks the seat status to `reserved` for 5 minutes.
   - The user completes the payment form.
   - The frontend calls `/api/bookings`, finalizing the transaction and permanently changing the seat status to `booked`.
3. **Data Integrity**: If a user's 5-minute reservation expires, the seats are automatically released back to the `available` pool.

---

## 💻 Local Setup

If you want to run this project locally, follow these steps:

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas URL)

### 1. Clone the repository
```bash
git clone [Add Repo URL Here]
cd sort_my_scene
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend` folder with the following:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_super_secret_key
  ```
- Seed the database (optional) and start the server:
  ```bash
  npm run seed
  npm start
  ```

### 3. Setup the Frontend
```bash
cd frontend
npm install
```
- Create a `.env` file in the `frontend` folder with the following:
  ```env
  VITE_API_URL=https://sort-my-scene.onrender.com/api
  ```
- Start the development server:
  ```bash
  npm run dev
  ```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! 
Feel free to check [issues page]([Add Link Here]).

