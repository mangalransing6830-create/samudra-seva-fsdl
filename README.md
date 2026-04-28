# 🌊 Samudra Seva — Beach Cleanup Monitoring System

A modern full-stack web platform that helps monitor beach cleanliness, report garbage, and coordinate volunteers for beach cleanup drives.

---

## 🗂️ Project Structure

```
samudra-seva/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── beachController.ts
│   │   │   ├── volunteerController.ts
│   │   │   └── eventController.ts
│   │   ├── models/
│   │   │   ├── Beach.ts
│   │   │   ├── Volunteer.ts
│   │   │   └── Event.ts
│   │   ├── routes/
│   │   │   ├── beachRoutes.ts
│   │   │   ├── volunteerRoutes.ts
│   │   │   └── eventRoutes.ts
│   │   ├── scripts/
│   │   │   └── seed.ts            # Database seed script
│   │   └── server.ts              # Express entry point
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   ├── pages/
    │   │   ├── Home.tsx           # Hero & Impact Dashboard
    │   │   ├── Beaches.tsx        # Status & Leaderboard
    │   │   ├── Map.tsx            # Interactive Leaflet Map
    │   │   ├── Events.tsx         # Cleanup Drives List
    │   │   ├── Report.tsx         # Garbage Reporting Form
    │   │   ├── Join.tsx           # Volunteer Registration
    │   │   ├── Volunteers.tsx     # Volunteer Grid
    │   │   └── Contact.tsx        # Contact Us Page
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── index.html
    ├── vite.config.ts
    └── package.json
```

---

## ⚙️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React + TypeScript + Vite           |
| Styling   | Tailwind CSS v4                     |
| Map       | Leaflet + React-Leaflet             |
| Backend   | Node.js + Express + TypeScript      |
| Database  | MongoDB Atlas + Mongoose            |
| Icons     | Lucide React                        |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (or local MongoDB)

---

### 1. Clone / Navigate to project
```bash
cd samudra-seva
```

---

### 2. Backend Setup

```bash
cd backend
```

Copy the example environment file and fill in your MongoDB URI:
```bash
copy .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/samudra-seva?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
```

Install dependencies:
```bash
npm install
```

Seed the database with sample data (Juhu, Versova, Chowpatty, etc.):
```bash
npm run seed
```

Start the development server:
```bash
npm run dev
```

The API will be running at: **http://localhost:5000**

---

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

The app will be running at: **http://localhost:5173**

---

## 🌐 API Endpoints

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| GET    | `/api/beaches`       | Get all beaches              |
| POST   | `/api/beaches`       | Add a new beach              |
| PUT    | `/api/beaches/:id`   | Update beach info/waste level |
| GET    | `/api/events`        | Get all cleanup events       |
| POST   | `/api/events/:id/join`| Join a specific event       |
| GET    | `/api/volunteers`    | Get all volunteers           |
| POST   | `/api/volunteers`    | Register a new volunteer     |

---

## 📋 Key Features

- 🌊 **Beach Status Dashboard**: Real-time cleanliness monitoring for Mumbai's top beaches.
- 🏆 **Leaderboard**: Recognizing the cleanest shores and top contributors.
- 🗺️ **Interactive Map**: Visualize beach locations and "Red Zones" needing urgent cleanup.
- 📅 **Cleanup Events**: Browse and join scheduled cleaning drives.
- 📊 **Impact Dashboard**: Live statistics on waste collected and volunteer contributions.
- 📸 **Success Stories**: Gallery showcasing the transformation of our coastlines.

---

## 🏖️ Sample Beach Data
The seed script adds data for:
- Juhu Beach
- Versova Beach
- Girgaon Chowpatty
- Aksa Beach
- Gorai Beach
- Madh Island Beach

---

## 📝 Environment Variables

```env
PORT=5000
MONGODB_URI=<your_mongodb_atlas_connection_string>
FRONTEND_URL=http://localhost:5173
```

---

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first.

---

*Built with 💙 for cleaner coastlines — Samudra Seva*
