# 🧠 Manaze Frontend

Welcome to the **frontend** of **Manaze** — a modern task management web application built with **React.js**. Manaze allows users and admins to create, manage, and track tasks with ease, all through a clean and interactive UI.

> 🔐 **Admin SignUp Note:** Use the following token to register as an admin:  
> `ADMIN_INVITE_TOKEN = 212169`

---

## 🚀 Features

- 🔐 User & Admin Login/Signup with secure auth
- 📊 Beautiful dashboard with charts and task summary
- ✅ Task creation, status update, priority labeling
- 👥 Team members management (admin only)
- 🎨 Fully responsive & modern UI
- 🌓 Light & clean interface

---

## 🖼️ Screenshots

### 👤 Login Page  
![Login](./assets/login.png)

---

### 📝 Sign Up Page  
![Signup](./assets/signup.png)

---

### 📊 Admin Dashboard  
![Dashboard](./assets/dashboard.png)

---

## 🛠️ Tech Stack

- **React.js** — UI Library
- **Axios** — For API integration
- **React Router** — Page routing
- **Chart.js** — Task charts
- **Tailwind CSS / CSS Modules** — Styling

---

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/manaze-frontend.git
   cd manaze-frontend
Install dependencies

bash
Copy
Edit
npm install
Set up environment variables

Create a .env file and configure:

env
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000/api
Run the development server

bash
Copy
Edit
npm run dev
🧪 Directory Structure
bash
Copy
Edit
manaze-frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Login, Signup, Dashboard, etc.
│   ├── context/          # Auth context
│   ├── assets/           # Images and icons
│   ├── App.jsx           # Root component
│   └── main.jsx          # Entry point
└── .env                  # Environment variables

👨‍💼 Admin Signup Token
To create an admin account, enter the following token during signup:
212169
This token will grant admin access and allow management of team members.

🌐 Backend Repository
👉 [Manaze Backend](https://github.com/PallabJB/manaze_backend/tree/main)

🤝 Contributing
Fork the project

Create your feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Add feature"

Push to the branch: git push origin feature-name

Open a pull request

📄 License
This project is licensed under the MIT License.

📬 Contact
📧 pallabjyotibora75@example.com

