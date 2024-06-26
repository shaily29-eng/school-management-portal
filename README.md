<h1 align="center">
    STUDENT TEACHER WEB APP
</h1>

## About

The STUDENT TEACHER WEB APP is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to streamline school management, class organization, and facilitate communication between students, teachers, and administrators.

## Architecture Diagram

<img src="https://github.com/shaily29-eng/student-teacher-webApp/assets/59019087/560053c7-914f-46a0-b438-447290b154e1" alt="unnamed" width="1000" height="300">

## Features

- **User Roles:** The system supports three user roles: Admin, Teacher, and Student. Each role has specific functionalities and access levels.

- **Admin Dashboard:** Administrators can add new students and teachers, create classes and subjects, manage user accounts, and oversee system settings.

- **Attendance Tracking:** Teachers can easily take attendance for their classes, mark students as present or absent, and generate attendance reports.

- **Performance Assessment:** Teachers can assess students' performance by providing marks and feedback. Students can view their marks and track their progress over time.

- **Data Visualization:** Students can visualize their performance data through interactive charts and tables, helping them understand their academic performance at a glance.

- **Communication:** Users can communicate effortlessly through the system. Teachers can send messages to students and vice versa, promoting effective communication and collaboration.

## Technologies Used

- Frontend: React.js, Material UI, Redux
- Backend: Node.js, Express.js
- Database: MongoDB

## Running in Docker

- React Frontend:
  ```shell
  docker build -t frontend .
  docker run -p 80:80 frontend
  ```
  - Your React frontend should now be running at `http://localhost:80/`
- Node Backend:
  ```shell
  docker build -t backend .
  docker run -p 5000:5000 backend
  ```
  - Your React frontend should now be running at `http://localhost:5000/`

## Running Unit Tests (Jest)

- Frontend:
  ```shell
  npm test
  ```
- Backend:
  ```shell
  jest
  ```

## Deployment

- Frontend: Netlify
- Backend: Render
