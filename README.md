# AR Marketing Hub

A full-stack web application for marketing and event management. Users can browse products and events, purchase tickets, leave reviews, and interact with a built-in chatbot. Admins have a dedicated dashboard to manage all content.

## Project Structure

```
ARMarketingHubWebsite/
├── front-end-ar-marketing-hub/      # React frontend
└── project-apis-ar-marketing-hub/   # Express.js backend
```

---

## Tech Stack

### Frontend
| Category | Technology |
|---|---|
| Framework | React 18 |
| State Management | Redux + Redux Thunk |
| Routing | React Router v6 |
| UI | Material-UI (MUI) v5, React Bootstrap |
| HTTP Client | Axios |
| Chatbot | react-chatbot-kit, Bot Framework WebChat |
| Speech | react-speech-recognition |
| Email | EmailJS |

### Backend
| Category | Technology |
|---|---|
| Framework | Express.js 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT (access: 12h, refresh: 1y) + Bcrypt |
| Validation | Hapi Joi |
| Dev Server | Nodemon |

---

## Features

- **Authentication** — Register, login, JWT-based sessions with refresh token support
- **Products** — Browse, search, and review products with pagination
- **Events** — Browse events, purchase tickets, and leave comments
- **Admin Dashboard** — Add, update, and delete products/events; manage page content
- **Chatbot** — Integrated customer support chatbot with minimizable web chat
- **Speech Recognition** — Voice command support
- **Email Notifications** — EmailJS integration
- **Image Uploads** — Upload images for products and events
- **Role-Based Access** — Separate user and admin roles with protected routes

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/ARMarketingHubWebsite.git
cd ARMarketingHubWebsite
```

### 2. Start the backend

```bash
cd project-apis-ar-marketing-hub
npm install
npm start
```

The API server will run at `http://localhost:3500`.

### 3. Start the frontend

```bash
cd front-end-ar-marketing-hub
npm install
npm start
```

The React app will run at `http://localhost:3000`.

---

## Environment Variables

The backend requires a `.env` file in `project-apis-ar-marketing-hub/`. Create one with:

```env
PORT=3500
MONGODB_URI=mongodb://127.0.0.1:27017/auth_apis
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
```

> **Note:** Never commit your `.env` file. Add it to `.gitignore`.

---

## API Endpoints

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
| GET | `/products` | Get all products (paginated, 16/page) |
| POST | `/find_product/:filter` | Search products |
| GET | `/product_details/:product_id` | Get product details |
| POST | `/add_product` | Add product (admin) |
| POST | `/update_product/:product_id` | Update product (admin) |
| GET | `/delete_product/:product_id` | Delete product (admin) |
| POST | `/product_details/:user_id/:product_id/comment` | Add comment |

### Events
| Method | Endpoint | Description |
|---|---|---|
| GET | `/events` | Get all events |
| POST | `/find_event/:event_name` | Search events |
| GET | `/event_details/:event_id` | Get event details |
| POST | `/add_event` | Create event (admin) |
| POST | `/update_event/:event_id` | Update event (admin) |
| GET | `/delete_event/:event_id` | Delete event (admin) |
| POST | `/add_ticket` | Purchase a ticket |
| POST | `/event_details/:user_id/:event_id/comment` | Add comment |

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

### Frontend (`front-end-ar-marketing-hub/`)
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

### Backend (`project-apis-ar-marketing-hub/`)
```bash
npm start        # Start with Nodemon (auto-reload)
```

---

## License

MIT
