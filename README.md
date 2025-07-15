# 📦 Rate Your Store

Welcome to the **Rate Your Store** repository!  
This full-stack web application allows users to rate and review stores, manage their own stores, and control platform-wide data as an admin.  
Built with a clean interface and powerful role-based access, it ensures a smooth experience for all user types.

---

## ✨ Features

- 🔐 **User Authentication**: Secure login, registration, and logout via Devise.
- 🎯 **Role-Based Access**:
  - Normal Users can browse and rate stores.
  - Store Owners can manage their own stores.
  - System Admins can manage all users, stores, and ratings.
- ⭐ **Ratings**: Users can rate each store once (1–5 stars) and see average ratings.
- 📊 **Dashboards**: Custom dashboards for each role with relevant controls and data.
- 🌐 **Responsive UI**: Mobile-first and clean interface using Tailwind CSS.

---

## 🛠 Tech Stack

### 🔙 Backend
- [Ruby on Rails](https://rubyonrails.org/) (API-only)
- [PostgreSQL](https://www.postgresql.org/)
- [Devise](https://github.com/heartcombo/devise) for authentication
- Custom Role Management

### 🔜 Frontend
- [React.js](https://react.dev/) (via [Vite](https://vitejs.dev/))
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)

---

## 👥 User Roles

| Role           | Access                                                                 |
|----------------|------------------------------------------------------------------------|
| 🛠 System Admin | View/delete all users, stores, and ratings                            |
| 🏪 Store Owner  | Create/update/delete own stores and view their ratings                |
| 👤 Normal User  | View all stores and submit/update one rating per store                |

---

## 📊 Dashboards

### 🛠 System Admin
- `/admin/dashboard` → View platform stats
- `/admin/users` → List & delete users
- `/admin/stores` → List & delete stores
- `/admin/ratings` → View all ratings

### 🏪 Store Owner
- `/store_owner/dashboard` → Manage own stores
- Create, edit, delete store entries
- View average ratings

### 👤 Normal User
- `/user/dashboard` → View all stores
- See average rating
- Rate each store once (1–5 stars)

---

## 🖼 Screenshots

### 🔹 Home page
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/4ba80289-c7b5-4d4b-abcc-17a4b4b14224" />

### 🔹 About Page
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/039e467c-185b-47a4-9f57-e7eb61cd34ee" />

### 🔹 Admin Dashboard
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/1aea6135-2d57-455f-acde-37f70a1b4b62" />

### 🔹 Normal User Dashboard
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/f86935a1-8705-410f-8ab1-42145ac4f0f1" />

### 🔹 Store Owner Dashboard
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/1c7a33f6-4c70-4c63-b6a6-207fe0e86a5a" />

### 🔹 Store Owner Dashboard
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/1c7a33f6-4c70-4c63-b6a6-207fe0e86a5a" />


---

## 🚀 Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/deepakgithub2001/rate-your-store.git
cd rate-your-store

# 2. Setup backend
cd rate-your-store-api
bundle install
rails db:create db:migrate db:seed
rails server

# 3. Setup frontend (in a new terminal)
cd ../rate-your-store-client
npm install
npm run dev
