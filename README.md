# 🌾 KrishiSahayi Admin Dashboard

> **Smart India Hackathon 2025** - Agricultural Issue Management Platform

A comprehensive admin dashboard for managing farmer queries and agricultural issues with AI-powered summarization. Built for the Smart India Hackathon 2025 to address real-world challenges in agricultural support systems.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://krishi-sahayi-admin-dashboard.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend-API-blue?style=for-the-badge)](https://krishisahayi-admin-dashboard.onrender.com)

---

## 🎯 Project Overview

KrishiSahayi (Agriculture Helper) is a dual-interface platform designed to streamline communication between farmers and agricultural experts. The admin dashboard enables administrators to efficiently manage, categorize, and respond to farmer issues with the assistance of AI-powered summaries.

### Key Features

- **📊 Issue Management** - Comprehensive view of all farmer queries with filtering and categorization
- **🤖 AI Summaries** - Groq LLM integration for automatic issue summarization
- **📈 Analytics Dashboard** - Visual reports on issue trends, resolution times, and categories
- **✅ Status Tracking** - Real-time status updates (Pending, In Progress, Resolved)
- **🔒 Secure Authentication** - JWT-based authentication system
- **📱 Responsive Design** - Clean, government portal-inspired UI that works across all devices

---

## 🚀 Live Deployment

- **Frontend (Admin Dashboard)**: [https://krishi-sahayi-admin-dashboard.vercel.app](https://krishi-sahayi-admin-dashboard.vercel.app)
- **Backend API**: [https://krishisahayi-admin-dashboard.onrender.com](https://krishisahayi-admin-dashboard.onrender.com)

### Test Credentials
Use the seeded admin credentials to explore the dashboard functionality.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization for analytics
- **Lucide React** - Modern icon library
- **Axios** - HTTP client for API requests
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication and authorization
- **bcrypt** - Password hashing
- **Groq API** - LLM integration for AI summaries

### DevOps & Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **GitHub** - Version control and CI/CD

---

## 📁 Project Structure

```
KrishiSahayi-Admin-Dashboard/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js    # Admin endpoints
│   │   ├── authController.js     # Authentication logic
│   │   └── farmerController.js   # Farmer endpoints
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── models/
│   │   ├── Issue.js              # Issue schema
│   │   └── User.js               # User schema
│   ├── routes/
│   │   ├── adminRoutes.js        # Admin API routes
│   │   ├── authRoutes.js         # Auth routes
│   │   └── farmerRoutes.js       # Farmer routes
│   ├── services/
│   │   └── llmService.js         # Groq LLM integration
│   ├── scripts/
│   │   └── seed.js               # Database seeding
│   ├── package.json
│   └── server.js                 # Express app entry
│
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.tsx     # Error handling
│   │   ├── Loading.tsx           # Loading states
│   │   └── ProtectedRoute.tsx    # Route protection
│   ├── context/
│   │   └── AuthContext.tsx       # Auth state management
│   ├── pages/
│   │   ├── Dashboard.tsx         # Main dashboard
│   │   ├── Login.tsx             # Login page
│   │   └── Reports.tsx           # Analytics page
│   ├── services/
│   │   └── api.ts                # API service layer
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   ├── App.tsx                   # App component
│   ├── main.tsx                  # App entry point
│   └── index.css                 # Global styles
│
├── public/
│   ├── Dashboard.png             # Reference design
│   └── Krishipic.png             # Login background
│
├── .env                          # Environment variables
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Groq API key ([get one here](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/KrishiSahayi-Admin-Dashboard.git
   cd KrishiSahayi-Admin-Dashboard
   ```

2. **Frontend Setup**
   ```bash
   npm install
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Variables**

   Create `.env` in `backend/` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   GROQ_API_KEY=your_groq_api_key
   PORT=5000
   ```

   Create `.env.local` in root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Seed Database** (Optional)
   ```bash
   cd backend
   node scripts/seed.js
   ```

### Running Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Visit `http://localhost:5173` to access the dashboard.

---

## 📊 Features in Detail

### Issue Management
- **Advanced Filtering** - Filter by status, category, and priority
- **Search Functionality** - Quick search across all issues
- **Detailed View** - Complete issue information with farmer details
- **Response System** - Send responses directly to farmers
- **Status Updates** - Change issue status with one click

### AI-Powered Summaries
- **Automatic Summarization** - Groq LLM generates concise issue summaries
- **Context Extraction** - Key information highlighted for quick review
- **Time-Saving** - Reduces time spent reading lengthy issue descriptions

### Analytics & Reports
- **Status Distribution** - Visual breakdown of pending, in-progress, and resolved issues
- **Category Analysis** - Bar chart showing issues by agricultural category
- **Trend Tracking** - Line graph displaying issue trends over time
- **Resolution Metrics** - Average resolution time and performance indicators

### Professional UI/UX
- **Government Portal Aesthetic** - Clean, professional design inspired by Indian government portals
- **Light Theme** - Calm color scheme with muted greens and grays
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Accessibility** - Proper contrast ratios and keyboard navigation

---

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Protected Routes** - Frontend and backend route protection
- **CORS Configuration** - Controlled cross-origin resource sharing
- **Environment Variables** - Sensitive data kept out of source code

---

## 🎨 Design Philosophy

The dashboard follows a professional government portal aesthetic:
- **Minimalist Design** - No flashy animations or dark mode
- **Muted Color Palette** - Greens, grays, and subtle accents
- **Clear Typography** - Hierarchical text for easy scanning
- **Generous Spacing** - Ample padding for comfortable viewing
- **Consistent Patterns** - Uniform styling across all components

---

## 🤝 Contributing

This project was developed for Smart India Hackathon 2025. Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@rio-ARC](https://github.com/rio-ARC)
- LinkedIn: [Aritra Roy Choudhury](https://www.linkedin.com/in/aritra-roy-choudhury/)

---

## 🙏 Acknowledgments

- **Smart India Hackathon 2025** - For providing the problem statement and platform
- **Groq** - For providing fast LLM API for AI summaries
- **MongoDB Atlas** - For reliable cloud database hosting
- **Vercel & Render** - For generous free tier hosting

---

## 📧 Contact

For questions or feedback regarding this project, please reach out through GitHub issues or contact the author directly.

---

**Built with ❤️ for Smart India Hackathon 2025**
