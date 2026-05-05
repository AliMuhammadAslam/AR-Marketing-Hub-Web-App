# AR Marketing Hub

A full-stack MERN web application for product and event marketing. Users can browse products and events, purchase tickets, interact with a built-in chatbot, and manage their profile. Admins have a dedicated dashboard to manage all content.

---

## Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18">
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
  <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap 5">
  <img src="https://img.shields.io/badge/MUI-v5-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI v5">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
</p>

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon">
</p>

---

## Project Structure

```
AR-Marketing-Hub-Website/
├── front-end-ar-marketing-hub/        # React frontend (port 3000)
│   ├── public/
│   └── src/
│       ├── Pages/                     # Page-level components
│       ├── components/                # Shared UI components
│       ├── actions/                   # Redux action creators
│       ├── reducers/                  # Redux reducers
│       ├── constants/                 # Redux action type constants
│       ├── api/                       # Axios instance configuration
│       ├── chatbot/                   # Chatbot config and handlers
│       ├── speech-recognition/        # Voice command support
│       └── Images/                    # Static assets
│
└── project-apis-ar-marketing-hub/     # Express.js backend (port 3500)
    ├── controllers/                   # Business logic
    ├── models/                        # Mongoose schemas
    ├── routes/                        # API route definitions
    └── helpers/                       # JWT, validation, DB connection
```

---

## Features

- **Authentication** — Register, login, and JWT-based sessions with access and refresh token support
- **Products** — Browse and search products displayed in a responsive card grid
- **Events** — Browse events, search by name, filter by order, and purchase tickets
- **Ticket Booking** — Ticket selection with quantity, pricing, and order confirmation
- **Admin Dashboard** — Protected admin portal to add, update, and delete products and events
- **User Profile** — View and update personal information
- **Chatbot** — Integrated customer support chatbot with minimizable web chat
- **Voice Search** — Speech recognition for hands-free event search
- **Email Notifications** — Newsletter subscription via EmailJS
- **Image Uploads** — Cloudinary-based image uploads for products and events
- **Role-Based Access** — Separate user and admin roles with protected routes

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`
- [nodemon](https://nodemon.io/) — install globally with `npm install -g nodemon`

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AliMuhammadAslam/AR-MarketingHub-Website.git
cd AR-Marketing-Hub-Website
```

### 2. Configure the backend environment

Create a `.env` file inside `project-apis-ar-marketing-hub/`:

```env
PORT=3500
MONGODB_URI=mongodb://localhost:27017
DB_NAME=ar-marketing-hub
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

> **Note:** Never commit your `.env` file — it is already listed in `.gitignore`.

### 3. Start the backend

```bash
cd project-apis-ar-marketing-hub
npm install
npm start
```

The API server will run at `http://localhost:3500`.

### 4. Start the frontend

```bash
cd front-end-ar-marketing-hub
npm install
npm start
```

The React app will run at `http://localhost:3000`.

---

## API Reference

All routes are prefixed with `/auth`.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive tokens |
| POST | `/refresh-token` | Refresh access token |
| DELETE | `/logout` | Logout |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Get all products |
| POST | `/find_product/:filter` | Search products |
| GET | `/product_details/:product_id` | Get product details |
| POST | `/add_product` | Add a product (admin) |
| POST | `/update_product/:product_id` | Update a product (admin) |
| GET | `/delete_product/:product_id` | Delete a product (admin) |
| POST | `/product_details/:user_id/:product_id/comment` | Add a comment |

### Events

| Method | Endpoint | Description |
|---|---|---|
| GET | `/events` | Get all events |
| POST | `/find_event/:event_name` | Search events by name |
| GET | `/event_details/:event_id` | Get event details |
| POST | `/add_event` | Create an event (admin) |
| POST | `/update_event/:event_id` | Update an event (admin) |
| GET | `/delete_event/:event_id` | Delete an event (admin) |
| POST | `/add_ticket` | Purchase a ticket |
| POST | `/event_details/:user_id/:event_id/comment` | Add a comment |

### Content & Profile

| Method | Endpoint | Description |
|---|---|---|
| GET | `/home` | Get home page content |
| POST | `/addHome` | Update home content (admin) |
| GET | `/about` | Get about page content |
| POST | `/addAbout` | Update about content (admin) |
| POST | `/update_profile/:user_id` | Update user profile |

---

## Scripts

### Frontend

```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

### Backend

```bash
npm start        # Start with Nodemon (auto-reload)
```

---

## License

MIT
