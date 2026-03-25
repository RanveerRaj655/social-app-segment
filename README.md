# Social App

A modern, responsive social media application built with the MERN stack (MongoDB, Express, React, Node.js).

**Deployed Link:** [https://social-app-segment.vercel.app](https://social-app-segment.vercel.app)

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT.
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens.
- **Interactive Feed**:
  - View posts from all users.
  - Sort by "Most Liked" or "Most Commented".
  - Like and add comments to posts.
- **Enhanced Search**: Find posts or users by searching for keywords or usernames.
- **Post Creation**:
  - Upload images along with text.
  - Preview images before posting.
  - Cancel creation with a dedicated close button.
- **User Profile**: Quick logout access via the profile menu in the Navbar.

## 📁 File Structure

```text
social-app/
├── backend/                # Express API
│   ├── config/             # Database configuration
│   ├── middleware/         # Auth middlware
│   ├── models/             # Mongoose schemas (User, Post)
│   ├── routes/             # API routes (Auth, Posts)
│   ├── uploads/            # Local storage for post images
│   └── server.js           # Entry point
├── frontend/               # React (Vite) Frontend
│   ├── src/
│   │   ├── api/            # Axios instance configuration
│   │   ├── components/     # Reusable UI components (Navbar, PostCard, etc.)
│   │   ├── context/        # Auth context for state management
│   │   ├── pages/          # Page components (Feed, Login, Signup, etc.)
│   │   ├── App.jsx         # Routing and layout
│   │   └── index.css       # Global styles and responsiveness
│   └── .env                # Frontend environment variables
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

