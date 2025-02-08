# Super-Todo Frontend (Vue.js)

## 📌 Overview
This is the frontend service for the **Super-Todo SaaS Platform**, built using **Vue.js**. It provides a user interface to manage tasks with role-based feature access.

## 🚀 Tech Stack
- **Frontend:** Vue.js (TypeScript)
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **API Communication:** Axios
- **Testing:** Vitest

---
## 🛠️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone git@github.com:tainguy22112000/super-todo-fe.git
cd super-todo-frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the development server
```bash
npm run dev
```

### 4️⃣ Access the application
Once the server is running, open **`http://localhost:5173`** in your browser.

---
## 📜 Features

### 🔹 User Roles
- Users are identified as **free** or **paid** based on the `userRole` query parameter.
- Example:
  - `/?userRole=free`
  - `/?userRole=paid`

### 🔹 To-Do List
- **Free Users (`userRole=free`)**
  - Can view a list of tasks
  - Can add, edit, and delete tasks
  - **CANNOT** add or view notes
- **Paid Users (`userRole=paid`)**
  - Can view a list of tasks
  - Can add, edit, and delete tasks
  - **CAN** add and view notes

---
## 🎯 Architecture Decisions
- **Vue.js with TypeScript**: Ensures type safety and maintainability.
- **Tailwind CSS**: Provides a utility-first styling approach for rapid development.
- **Pinia**: Chosen for state management due to its simplicity and Vue 3 integration.
- **Axios**: Used for API calls to the backend.

---
## 📌 Assumptions
- The `userRole` is passed as a **URL parameter**.
- The frontend communicates with a **NestJS backend**.
- Tasks update automatically when modified.

---
## ✅ Testing
Run unit tests with:
```bash
npm run test
```