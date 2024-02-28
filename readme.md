# Hostel Management System

Welcome to the Hostel Management System project! This is a simple application developed using React for the frontend and Django REST Framework for the backend. The purpose of this project is to provide a basic understanding of building web applications with React and Django REST Framework, as well as demonstrating the functionality of a hostel management system.

## Features

- **Adding Students:** Allows the addition of new students to the hostel database, including their personal details.
- **Adding Staff:** Provides functionality to add staff members, such as wardens or administrative staff, to the system.
- **Managing Rooms:** Enables the management of hostel rooms, including adding, editing, and removing rooms.
- **Fees Management:** Allows tracking and management of fees paid by students, including fee due dates and payment records.
- **Guardian Details:** Provides a feature to add and manage guardian details for students.

## Technologies Used

- **Frontend:** React with Vite (port: 5173)
- **Backend:** Django REST Framework
- **Database:** SQLite (default for Django development, can be replaced with other databases like PostgreSQL or MySQL for production)
- **UI Framework:** Tailwind CSS (optional, can be replaced with other CSS frameworks or custom styles)

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:** `git clone https://github.com/pokhrelgopal/hostel-management-system`
2. **Navigate to the frontend directory:** `cd frontend`
3. **Install dependencies:** `npm install`
4. **Start the frontend server with Vite:** `npm run dev`
5. **Navigate to the backend directory:** `cd backend`
6. **Install Django dependencies:** `pip install -r requirements.txt`
7. **Run Django migrations:** `python manage.py migrate`
8. **Start the Django development server:** `python manage.py runserver`

Now you should be able to access the application at `http://localhost:5173` for the frontend and `http://localhost:8000` for the backend.
