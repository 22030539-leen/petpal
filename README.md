# 🐾 PetPal – Pet Adoption Platform

PetPal is a responsive ReactJS web application designed to help users find pets available for adoption, view detailed profiles, mark favorites, read success stories, and contact shelters.  
The project also includes an Admin Dashboard for managing pet data and a Dark/Light mode theme switch.

This project fulfills all requirements for the Web Development course final project.

---

## 📌 Table of Contents
1. [Project Description](#project-description)  
2. [Features](#features)  
3. [Technologies Used](#technologies-used)  
4. [Project Pages](#project-pages)  
5. [Setup Instructions](#setup-instructions)  
6. [Folder Structure](#folder-structure)  
7. [Screenshots](#screenshots)  
8. [Deployment Link](#deployment-link)  
9. [Contributors](#contributors)
10. [Database Design](#database-design)
11. [API Endpoints](#api-endpoints)
    

---

## 🐶 *Project Description*
PetPal is a modern and user-friendly pet adoption platform built with *ReactJS* and *Bootstrap*. Users can browse available pets, search and filter by type, add favorites, contact shelters, and submit adoption requests.

The project also includes:
- Admin Login  
- Admin Dashboard (Add / Edit / Delete pets)  
- Light/Dark mode toggle  
- Responsive UI for all devices  
- LocalStorage support (favorites, theme, admin login)

---

## ✨ *Features*
### 👩‍💻 User Features
✔ Browse all pets  
✔ View detailed pet profiles  
✔ Mark/unmark favorites  
✔ Adoption request form  
✔ View success stories  
✔ Contact & shelters info  
✔ Fully responsive design  

### 🛠 Admin Features
✔ Admin login  
✔ Add new pets  
✔ Edit existing pets  
✔ Delete pets  
✔ Manage custom pets saved in LocalStorage  

### 🌙 Theme
✔ Light & Dark mode toggle (saved in localStorage)

---

## 🧰 *Technologies Used*
- *ReactJS*
- *React Router DOM*
- *Bootstrap 5*
- Java Script
- Node.js
- Express.js
- MySQL
- dotenv
- cors
- *CSS3*
- *LocalStorage API*
- *Git & GitHub*
- Postman
- VS Code

---

## 📄 *Project Pages*
| Page | Description |
|------|-------------|
| Home | Overview, CTA buttons, hero section |
| About | Information about the platform |
| Pets | Search, filter, view all pets |
| Pet Details | Detailed page + Adopt form |
| Favorites | Saved users favorites |
| Adoption | Adoption process guide |
| Stories | Success stories |
| Contact | Contact + form |
| Admin Login | Restricted login |
| Admin Dashboard | Add / Edit / Delete pets |

---

## ⚙️ *Setup Instructions*
Follow these steps to run the project locally:

### 1️⃣ Clone the repository
```sh
git clone https://github.com/22089359-leen/petpal.git
##Home Page 
![Home](public/screenshots/home.png)
![Home](public/screenshots/home1.png)
##About page
![About](public/screenshots/about.png)
##Process page
![Process](public/screenshots/process.png)
##Pets page
![Pets](public/screenshots/pets.png)
##Favorites page
![Favorites](public/screenshots/favorites.png)
##Stories page
![Stories](public/screenshots/stories.png)
##Contact page
![Contact](public/screenshots/contact.png)
##Login Page
![Login](public/screenshots/login.png)
##Admin page
![Admin](public/screenshots/admin.png)

---

## Folder Structure

petpal-project/
│
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── node_modules/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       ├── index.js
│       └── styles/
│
├── README.md
└── package-lock.json

---

## Screenshots
The following screenshots demonstrate the main features of the application:
- Home Page
- Pets Listing Page
- Pet Details Page
- Adoption Request Form
- Admin Dashboard
- Admin Adoption Requests View

(Screenshots are included in public/screenshots.)

---

## Deployment Link

Frontend: Not deployed (runs locally on http://localhost:3000)  
Backend API: Not deployed (runs locally on http://localhost:5000)
The project can be easily deployed using platforms such as Render or Railway.

---

##Contributors
-Leen Abou Said

---

## Database Design

The system uses a MySQL relational database with the following relationships:
- One user can submit multiple adoption requests.
- Each adoption request is linked to one pet.

### Tables:
- Users
- Pets
- Adoptions
Foreign key relationships ensure data integrity between pets and adoption requests.

---

## API Endpoints

### Users
- GET /api/users
- POST /api/users/admin
- DELETE /api/users/admin

### Pets
- GET /api/pets
- GET /api/pets/:id
- POST /api/pets
- PUT /api/pets/:id
- DELETE /api/pets/:id
- PUT /api/pets/:id/adopted

### Adoptions
- POST /api/adoptions
- GET /api/adoptions
