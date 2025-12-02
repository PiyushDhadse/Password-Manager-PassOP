# 🔐 PassOP - Your Own Password Manager

PassOP is a simple yet powerful password manager built with **React**.  
It allows you to securely store, manage, and interact with your credentials (sitename, username, and password).  

The application comes in **two variants**:
1. **LocalStorage Variant** – Stores data directly in the browser's localStorage.
2. **MongoDB Variant** – Uses a backend (`server.js`) with MongoDB Compass to persist data and perform CRUD operations.

---

## ✨ Features
- Save credentials with **sitename, username, and password**.
- View all saved credentials in a **responsive table**.
- **Copy** password to clipboard with one click.
- **Edit** existing credentials.
- **Delete** credentials when no longer needed.
- Two storage options:
  - LocalStorage (client-side only).
  - MongoDB (server-side persistence).

---

## 🛠️ Tech Stack
- **Frontend:** React, JavaScript, Tailwind CSS
- **Backend (MongoDB variant):** Node.js, Express.js
- **Database:** MongoDB Compass
- **Other Tools:** localStorage API, CRUD operations

---

## 📂 Project Structure

PASSOP-MONGO/ │ ├── backend/                  # Backend (MongoDB mode only) │   ├── server.js             # Express server with CRUD APIs │   ├── .env                  # MongoDB connection string │   ├── package.json │   └── dist/ │ ├── public/ │   └── passop.svg │ ├── src/ │   ├── assets/ │   ├── components/ │   │   ├── Navbar.jsx │   │   ├── Manager.jsx │   │   └── Footer.jsx │   ├── App.jsx │   ├── App.css │   ├── index.css │   └── main.jsx │ ├── .gitignore ├── index.html ├── package.json ├── vite.config.js ├── postcss.config.js └── README.md

> 💡 To run the **LocalStorage version**, simply remove or ignore the `backend/` folder.

---

## ✨ Features

- 🔐 Add credentials: sitename, username, password
- 📋 View all entries in a responsive table
- 📎 Copy password to clipboard
- ✏️ Edit credentials inline
- 🗑️ Delete credentials with confirmation
- 🧭 Toggle between LocalStorage and MongoDB modes

---

## 🛠️ Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | React, Vite, JSX, TailwindCSS    |
| Backend     | Node.js, Express (MongoDB mode) |
| Database    | MongoDB Compass          |
| Storage     | localStorage or MongoDB  |

---

## 🚀 Getting Started

### 🧪 LocalStorage Mode (Frontend Only)

```bash
# Navigate to root
npm install
npm run dev


- Opens at http://localhost:5173
- All data is stored in browser's localStorage
- No backend required

🧪 MongoDB Mode (Full Stack)
1. Backend Setup
cd backend
npm install
node server.js


- Ensure MongoDB Compass is running
- Add your connection string to .env:
MONGO_URI=mongodb://localhost:27017/passop


2. Frontend Setup
cd ..
npm install
npm run dev


- Frontend communicates with backend via REST APIs
- Data is persisted in MongoDB

📡 API Endpoints (MongoDB Mode)
|  |  |  | 
|  | /api/passwords |  | 
|  | /api/passwords |  | 
|  | /api/passwords/:id |  | 
|  | /api/passwords/:id |  | 



🖼️ UI Overview
- Navbar: Branding and mode indicator
- Manager: Add/Edit/Delete/Copy credentials
- Footer: Attribution and links

🔒 Security Notes
- Passwords are stored in plaintext (for demo purposes).
- Future enhancements may include:
- Encryption at rest
- User authentication
- Cloud sync (MongoDB Atlas)

📌 Future Enhancements
- 🔐 Encryption support
- 👤 User login and auth
- ☁️ Cloud database integration
- 📤 Export/Import credentials
- 🌙 Dark mode

🤝 Contributing
Pull requests are welcome!
Please fork the repo and submit your improvements.

📜 License
MIT License

👨‍💻 Author
Crafted by Piyush

---

Would you like me to generate a **flow diagram** showing how data flows in both variants (LocalStorage vs MongoDB)? It could be a great visual for onboarding contributors or showcasing the architecture.




> 💡 To run the **LocalStorage version**, simply remove or ignore the `backend/` folder.

---

## ✨ Features

- 🔐 Add credentials: sitename, username, password
- 📋 View all entries in a responsive table
- 📎 Copy password to clipboard
- ✏️ Edit credentials inline
- 🗑️ Delete credentials with confirmation
- 🧭 Toggle between LocalStorage and MongoDB modes

---

## 🛠️ Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | React, Vite, JSX, CSS    |
| Backend     | Node.js, Express (MongoDB mode) |
| Database    | MongoDB Compass          |
| Storage     | localStorage or MongoDB  |

---

## 🚀 Getting Started

### 🧪 LocalStorage Mode (Frontend Only)

```bash
# Navigate to root
npm install
npm run dev
