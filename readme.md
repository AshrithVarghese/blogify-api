# 📝 Blogify – A Fullstack MERN Blog API

**Blogify** is a secure, token-based blog management API built using the MERN stack. Users can register, log in, create, edit, view, and delete their blog posts securely. The backend is fully RESTful and uses JWT for authentication.

---

## 🚀 Tech Stack

- **MongoDB** – NoSQL database
- **Express.js** – Web server framework
- **Node.js** – Backend runtime
- **Mongoose** – ODM for MongoDB
- **JWT (JSON Web Token)** – Authentication
- **Dotenv** – Environment variables

---

## 📂 Features

- 🔐 User Authentication (Register & Login with JWT)
- ✍️ Create Blog Posts (Only by logged-in users)
- 📖 Read All or Individual Posts
- ✏️ Edit Your Own Posts
- 🗑️ Delete Your Own Posts
- 🧾 Clean REST API with protected routes

---

## 📦 API Endpoints

### 🔑 User & Auth Routes

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/api/user/register` | Register new user      |
| POST   | `/api/user/login`    | Login and get token    |
| GET    | `/api/user/profile`  | Get current user info  |

### 📚 Blog Routes

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| GET    | `/api/posts/all`     | Get all blog posts           |
| GET    | `/api/posts/:id`     | Get blog post by ID          |
| POST   | `/api/posts/create`  | Create a new post *(auth)*   |
| PUT    | `/api/posts/:id`     | Edit your post *(auth)*      |
| DELETE | `/api/posts/:id`     | Delete your post *(auth)*    |

> Use `Authorization: Bearer <token>` in headers for protected routes.

---

## 📁 Project Structure

<pre>
backend/
├── controllers/
│ ├── authController.js
│ └── postController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── User.js
│ └── Post.js
├── routes/
│ ├── authRoutes.js
│ └── postRoutes.js
├── config
│ └── db.js
├── .env
├── server.js
</pre>
---

## 🔧 Setup & Run

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/blogify.git
cd blogify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```Create a .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the server

```bash
npm run dev
```

### 🔐 Auth Header Example

Authorization: Bearer `<your_token>`

### License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


### 💻 Author

Made with ❤️ by Ashrith Varghese