# aamarpayLive - Event Management System

A comprehensive event management platform with integrated payment processing, built with modern web technologies. This system allows users to create, manage, and participate in events with secure authentication and real-time notifications.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)

## Features

### Event Management

- **Create Events**: Users can create events with details like title, description, date, location, and category
- **Edit Events**: Event organizers can modify event details
- **Delete Events**: Event organizers can remove events
- **View Events**: Browse all events or filter by category and search terms
- **RSVP System**: Users can RSVP to events they're interested in

### User Management

- **User Registration**: New users can create accounts
- **User Login**: Secure authentication system
- **Role-based Access Control**: Different permissions for administrators and regular users
- **Profile Management**: Users can update their profile information

### Real-time Features

- **Notifications**: Real-time notifications for event updates and RSVPs
- **WebSocket Communication**: Instant messaging and updates

### Admin Features

- **User Management**: Admins can manage user accounts
- **Event Oversight**: Admins can oversee all events
- **Audit Logging**: Track all system activities

## Technology Stack

### Frontend (Client)

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form validation
- **NextAuth.js** - Authentication solution
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **SweetAlert2** - Beautiful alert dialogs

### Backend (Server)

- **NestJS** - Progressive Node.js framework
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **Passport.js** - Authentication middleware
- **Socket.IO** - Real-time communication
- **Swagger** - API documentation

### Development & Testing

- **Jest** - Testing framework (both frontend and backend)
- **Docker** - Containerization
- **ESLint** - Code linting
- **Prettier** - Code formatting

## System Architecture

The application follows a client-server architecture with microservices-like modular structure on the server side:

```
┌─────────────────┐    REST API + WebSockets    ┌──────────────────┐
│   Next.js       │ ────────────────────────────▶│   NestJS         │
│   Frontend      │ ◀────────────────────────────│   Backend        │
└─────────────────┘                              └──────────────────┘
                                                         │
                                                         ▼
                                                  ┌───────────────┐
                                                  │  PostgreSQL   │
                                                  │  Database     │
                                                  └───────────────┘
```

### Key Design Patterns

- **MVC Pattern**: Next.js frontend with NestJS backend
- **Repository Pattern**: Via Prisma ORM
- **JWT Authentication**: With role guards and interceptors
- **Event Emitter Pattern**: For notifications
- **Dependency Injection**: Core NestJS feature

## Project Structure

### Client (Frontend)

```
client/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── api/             # API routes
│   │   ├── create-event/    # Event creation page
│   │   ├── events/          # Events listing page
│   │   ├── my-events/       # User's events page
│   │   └── ...
│   ├── components/          # Reusable UI components
│   │   ├── atoms/           # Basic building blocks
│   │   ├── molecules/       # Component compositions
│   │   └── organisms/       # Complex components with logic
│   ├── contexts/            # React context providers
│   ├── services/            # API services and utilities
│   └── ...
├── public/                  # Static assets
└── ...
```

### Server (Backend)

```
server/
├── src/
│   ├── auth/                # Authentication module
│   ├── events/              # Events management module
│   ├── users/               # User management module
│   ├── notification/        # Notification system
│   ├── permission/          # Permission management
│   ├── audit/               # Audit logging
│   ├── prisma/              # Prisma module
│   └── ...
├── prisma/                  # Prisma schema and migrations
└── ...
```

## Installation

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn
- Docker (for database)
- PostgreSQL (if not using Docker)

### Setup Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd aamarpayLive
```

2. **Install client dependencies**

```bash
cd client
npm install
```

3. **Install server dependencies**

```bash
cd ../server
npm install
```

4. **Setup environment variables**

- Copy `.env.example` to `.env` in both client and server directories
- Update the values according to your environment

5. **Start database with Docker**

```bash
cd server
docker-compose up -d
```

6. **Run database migrations**

```bash
npx prisma migrate dev
```

## Running the Application

### Development Mode

**Start the server:**

```bash
cd server
npm run start:dev
```

**Start the client:**

```bash
cd client
npm run dev
```

### Production Mode

**Build and start the server:**

```bash
cd server
npm run build
npm run start:prod
```

**Build and start the client:**

```bash
cd client
npm run build
npm run start
```

## Testing

### Frontend Testing

The client uses Jest for testing with TypeScript support.

**Run all tests:**

```bash
cd client
npm run test
```

**Run tests in watch mode:**

```bash
cd client
npm run test:watch
```

### Backend Testing

The server uses Jest for unit and integration testing.

**Run all tests:**

```bash
cd server
npm run test
```

**Run tests in watch mode:**

```bash
cd server
npm run test:watch
```

**Run coverage report:**

```bash
cd server
npm run test:cov
```

**Run end-to-end tests:**

```bash
cd server
npm run test:e2e
```

### Test Structure

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test module interactions
- **End-to-End Tests**: Test complete user flows

## API Documentation

The backend API is documented using Swagger. Once the server is running, visit:

```
http://localhost:3001/api
```

### Authentication

Most API endpoints require authentication via JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Key API Endpoints

#### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

#### Events

- `GET /events` - Get all events
- `GET /events/my-events` - Get user's events
- `GET /events/:id` - Get specific event
- `POST /events` - Create new event
- `PATCH /events/:id` - Update event
- `DELETE /events/:id` - Delete event
- `POST /events/:id/rsvp` - RSVP to event

#### Users

- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get specific user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Notifications

- `GET /notifications` - Get user notifications
- `POST /notifications` - Create notification
- `PATCH /notifications/:id/read` - Mark notification as read

## Database Schema

The application uses PostgreSQL with Prisma ORM. The main entities include:

### User

- id (UUID)
- email (String, unique)
- password (String)
- name (String)
- role (Enum: USER, ADMIN)
- createdAt (DateTime)
- updatedAt (DateTime)

### Event

- id (UUID)
- title (String)
- description (String)
- date (DateTime)
- location (String)
- category (Enum)
- isUserCreated (Boolean)
- rsvpCount (Int)
- userId (Foreign Key to User)
- createdAt (DateTime)
- updatedAt (DateTime)

### Notification

- id (UUID)
- message (String)
- userEmail (String)
- isRead (Boolean)
- createdAt (DateTime)

### AuditLog

- id (UUID)
- action (String)
- userId (UUID)
- details (Json)
- timestamp (DateTime)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is proprietary and confidential. All rights reserved.

## Support

For support, please contact the development team or open an issue in the repository.
