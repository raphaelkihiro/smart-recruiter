# 🧠 Smart Recruiter

Smart Recruiter is a full-stack web application that streamlines the recruitment and technical assessment process. It allows **recruiters (interviewers)** to create and manage coding assessments, review candidate submissions, and monitor performance. Meanwhile, **candidates (recruitees)** can take assessments, view results, and attempt toy challenges to improve their scores.

---

## 🚀 Tech Stack

**Frontend**  
- React.js + Vite  
- Tailwind CSS  
- React Router  
- Fetch
- Toastify  

**Backend**  
- Flask (Python)  
- Flask-RESTful  
- Flask-JWT-Extended  
- Flask-SQLAlchemy  
- PostgreSQL (or SQLite for development)  
- Flask-Migrate  
- CORS  
- dotenv  

---

## ✨ Features

### 👨‍💼 Recruiter (Interviewer) Dashboard

- ✅ **Dashboard Overview** — key metrics and activity.
- 📝 **Create Assessment** — design and assign tests.
- 📥 **Submissions** — view & grade answers.
- 🏆 **Leaderboard** — ranked performance tracking.
- 🎯 **Toy Challenges** — small coding puzzles.
- ✉️ **Invites** — send invites to candidates.
- 🔓 **Logout** — secure sign out.

### 🙋‍♂️ Recruitee (Candidate) Dashboard

- 📋 **Interview Details** — upcoming assessment info.
- 🧠 **Take Assessment** — complete coding or MCQ tests.
- 📊 **Results** — view performance feedback.
- 🎮 **Toy Challenges** — boost rank with extra problems.
- 🔓 **Logout** — end session.

### 🔐 Authentication

- Secure **Login & Signup** using JWT tokens.
- Role-based access (Recruiter or Recruitee).
- Protected routes and sessions.

---

## 📁 Project Structure

smart-recruiter/
├── client/ # React frontend
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
│
├── server/ # Flask backend
│ ├── models/
│ ├── resources/
│ ├── app.py
│ └── config.py
│
├── migrations/ # Flask-Migrate files
├── .env
├── requirements.txt
├── README.md

---

## ⚙️ Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL or SQLite
- Git

---

### 🔧 Backend Setup

```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt


Create a .env file:

DATABASE_URL=sqlite:///app.db  
JWT_SECRET_KEY=your_secret_key

Initialize DB:

flask db init
flask db migrate -m "Initial"
flask db upgrade

Run the server:

flask run

Frontend Setup

cd client
npm install
npm run dev