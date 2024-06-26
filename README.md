Full Stack Blog Application
Overview
This project is a full-stack blog application developed using React for the frontend and Node.js with Express.js for the backend. The application leverages MongoDB for database management and JSON Web Tokens (JWT) for secure user authentication. It supports full CRUD (Create, Read, Update, Delete) operations for blog posts and ensures data integrity and security, providing a seamless and interactive user experience. The state management is handled using Context API.

Frontend
Technologies Used
React
Context API
Axios (for HTTP requests)
React Router (for routing)
CSS/SCSS (for styling)
Features
User authentication (login/register)
Create, read, update, and delete blog posts
User-specific post management
Responsive design for various devices
Setup Instructions
Clone the repository:

git clone https://github.com/MukeshKr55/MERN-Blog-App-frontend.git
cd client
Install the dependencies:

npm install
Create a .env file in the root directory and add the following environment variables:

REACT_APP_API_URL=http://localhost:5000/api
Start the development server:


npm start
Open your browser and navigate to http://localhost:3000.

Project Structure
client/
├── public/
│   └── index.html
├── src/
│   ├── asset/
│   ├── component/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── Loader.jsx
│   │   ├── PostAuthor.jsx
│   │   ├── PostItem.jsx
│   │   └── Posts.jsx
│   ├── context/
│   │   └── userContext.js
│   ├── pages/
│   │   ├── AuthorPosts.jsx
│   │   ├── Authors.jsx
│   │   ├── CategoryPosts.jsx
│   │   ├── CreatePost.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DeletePost.jsx
│   │   ├── EditPost.jsx
│   │   ├── ErrorPage.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Logout.jsx
│   │   ├── PostDetail.jsx
│   │   ├── Register.jsx
│   │   └── UserProfile.jsx
│   ├── index.css
│   ├── index.js
│   └── data.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
