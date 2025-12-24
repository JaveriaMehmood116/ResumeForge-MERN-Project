# ResumeForge - MERN Stack Resume Builder

A full-stack resume builder application built with MongoDB, Express, React, and Node.js. Create, edit, and export professional resumes with ease.

## Features

- 🔐 User Authentication (Register/Login)
- 📝 Comprehensive Resume Builder with multiple sections:
  - Personal Information
  - Work Experience
  - Education
  - Skills
  - Projects
  - Certifications
- 👁️ Live Resume Preview
- 💾 Save and manage multiple resumes
- 🖨️ Print/Export to PDF
- 📱 Responsive Design

## Tech Stack

- **Frontend**: React, React Router, Axios, React-to-Print
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ResumeForge
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Set up environment variables:
```bash
cd ../server
cp .env.example .env
```

Edit `.env` file with your MongoDB connection string:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/resumeforge
JWT_SECRET=your-secret-key-change-in-production
```

## Running the Application

1. Start MongoDB (if running locally):
```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

2. Start the backend server:
```bash
cd server
npm run dev
```
The server will run on `http://localhost:5000`

3. Start the frontend (in a new terminal):
```bash
cd client
npm start
```
The frontend will run on `http://localhost:3000`

## Project Structure

```
ResumeForge/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Resume.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── resumeRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   └── ResumeBuilder/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Resumes
- `GET /api/resumes/user/:userId` - Get all resumes for a user
- `GET /api/resumes/:id` - Get a single resume
- `POST /api/resumes` - Create a new resume
- `PUT /api/resumes/:id` - Update a resume
- `DELETE /api/resumes/:id` - Delete a resume

## Usage

1. Register a new account or login
2. Click "Create New Resume" to start building
3. Fill in your information across different sections
4. Use the sidebar to navigate between sections
5. Preview your resume in real-time
6. Save your resume and export as PDF when ready

## Development

- Backend uses nodemon for auto-restart during development
- Frontend uses Create React App with hot reloading
- CORS is enabled for development

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


