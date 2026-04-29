FitTrack Pro

Overview
FitTrack Pro is a full-stack fitness tracking web application developed as a capstone project for **IST 256: Programming for the Web**.  

The application allows users to log workouts, track progress, and visualize performance data through an interactive dashboard.

This project demonstrates full-stack development by integrating a frontend interface, backend API, and a MongoDB database.



Purpose
The goal of FitTrack Pro is to help users:
- Track workout routines
- Monitor fitness progress over time
- Stay consistent with training goals


Features

Current Features
- Add workouts (exercise, sets, reps, weight, type, notes)
- Delete workouts
- View total workouts logged
- Visualize progress using a line chart (Chart.js)
- Store workout data in MongoDB (persistent database)
- Responsive UI using Bootstrap


Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript
- Bootstrap
- Chart.js

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB Atlas


Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/jrl6455/FitTrack.git
cd FitTrack
cd server
npm install
mongoose.connect("your_mongodb_connection_string_here")
node server.js
