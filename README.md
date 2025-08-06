# GCC Health Exams Quiz Portal

A comprehensive, subscription-based quiz platform for healthcare professionals preparing for various Gulf Cooperation Council (GCC) countries' health authority licensing examinations.

## 🏗️ Architecture

This is a monorepo built with **Turborepo** containing:

- **Backend API** (`apps/backend`): NestJS application with PostgreSQL database
- **Web Application** (`apps/web`): Next.js 14 frontend with TypeScript and Tailwind CSS
- **Database Package** (`packages/database`): Prisma schema and database utilities
- **UI Package** (`packages/ui`): Shared UI components (future expansion)
- **Types Package** (`packages/types`): Shared TypeScript types (future expansion)

## 🚀 Features

### Core Features
- **User Authentication & Authorization** with JWT
- **Subscription Management** with multiple plans
- **Quiz Engine** with multiple question types (SBA, MCQ, True/False, EMQ)
- **Performance Analytics** and progress tracking
- **Multi-Authority Support** (DHA, MOHAP, DOH, SCFHS, QCHP, OMSB, NHRA, KMLE)
- **25+ Medical Specialties** coverage

### Question Types Supported
- **SBA (Single Best Answer)**: Standard MCQ with one correct answer
- **MCQ (Multiple Choice)**: Questions with multiple correct answers
- **True/False**: Binary choice questions
- **EMQ (Extended Matching Questions)**: Matching questions with multiple vignettes
- **Image-Based Questions**: Questions with medical images

### Health Authorities Covered
- **DHA** - Dubai Health Authority
- **MOHAP** - Ministry of Health and Prevention (UAE)
- **DOH** - Department of Health (Abu Dhabi)
- **SCFHS** - Saudi Commission for Health Specialties
- **QCHP** - Qatar Council for Healthcare Practitioners
- **OMSB** - Oman Medical Specialty Board
- **NHRA** - National Health Regulatory Authority (Bahrain)
- **KMLE** - Kuwait Medical Licensing Examination

## 🛠️ Tech Stack

### Backend
- **NestJS** with TypeScript
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** authentication
- **Swagger** API documentation
- **Stripe** for payment processing

### Frontend
- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** for styling
- **Radix UI** components
- **React Query** for data fetching
- **Zustand** for state management
- **React Hook Form** with Zod validation

## 📋 Prerequisites

- **Node.js** 18+ 
- **PostgreSQL** 12+
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd gcc-health-exams-portal
npm install
```

### 2. Environment Setup
```bash
# Copy environment variables
cp .env.example .env

# Edit .env with your database credentials and other settings
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed initial data
npm run db:seed
```

### 4. Start Development Servers
```bash
# Start all apps in development mode
npm run dev

# Or start individually:
# Backend (port 3001): npm run dev --workspace=@gcc-portal/backend
# Frontend (port 3000): npm run dev --workspace=@gcc-portal/web
```

## 📊 Database Schema

### Core Models
- **User**: User accounts with role-based access
- **HealthAuthority**: GCC health regulatory bodies
- **Specialty**: Medical specialties and fields
- **Question**: Quiz questions with multiple types
- **QuizSession**: User quiz attempts and sessions
- **QuizAnswer**: Individual question responses
- **SubscriptionPlan**: Available subscription tiers
- **UserSubscription**: User subscription records

### Key Relationships
- Users belong to specialties and have multiple subscriptions
- Questions are linked to multiple authorities and specialties
- Quiz sessions contain multiple quiz answers
- Subscription plans are tied to specific specialties/authorities

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user

### Quiz System
- `POST /api/quiz` - Create new quiz
- `GET /api/quiz/:id` - Get quiz details
- `POST /api/quiz/:id/answers` - Submit answer
- `PUT /api/quiz/:id/complete` - Complete quiz
- `GET /api/quiz/:id/results` - Get quiz results

### Data Endpoints
- `GET /api/health-authorities` - List authorities
- `GET /api/specialties` - List specialties
- `GET /api/subscriptions/plans` - Available plans
- `GET /api/users/stats` - User statistics

### Admin Endpoints (Protected)
- `GET /api/questions` - Manage questions
- Admin dashboard and CMS features

## 🔐 Authentication & Authorization

The application uses **JWT-based authentication** with role-based access control:

- **STUDENT**: Default role for regular users
- **ADMIN**: Administrative access for content management

Protected routes require valid JWT tokens passed via `Authorization: Bearer <token>` header.

## 💳 Subscription System

### Plan Types
- **Authority-Specific**: Access to questions for specific health authority
- **Specialty-Specific**: Access to questions for specific medical specialty
- **All-Access**: Comprehensive access across authorities/specialties

### Access Control
Users can only create quizzes for authorities/specialties covered by their active subscriptions.

## 🏥 Default Data (Seeded)

### Sample Users
- **Admin**: admin@gcc-portal.com / admin123
- **Student 1**: doctor@example.com / password123 (GP)
- **Student 2**: nurse@example.com / password123 (Nursing)

### Sample Questions
- Cardiology question (SBA type)
- Pregnancy medication question (MCQ type)  
- Hand hygiene question (True/False type)

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## 📦 Build & Deployment

```bash
# Build all applications
npm run build

# Build specific app
npm run build --workspace=@gcc-portal/backend
npm run build --workspace=@gcc-portal/web

# Production start
npm run start --workspace=@gcc-portal/backend
npm run start --workspace=@gcc-portal/web
```

## 🚀 Production Setup

### Environment Variables
Ensure all production environment variables are set:
- Database connection string
- JWT secret key
- Stripe API keys
- CORS settings

### Database Migration
```bash
# Run database migrations
npm run db:migrate
```

### Security Considerations
- Use strong JWT secrets
- Enable HTTPS in production
- Configure proper CORS origins
- Set up database connection pooling
- Enable rate limiting
- Implement proper input validation

## 📚 API Documentation

When running the backend, visit:
- **Swagger UI**: http://localhost:3001/api/docs
- **API JSON**: http://localhost:3001/api/docs-json

## 🔧 Development

### Code Structure
```
apps/
  backend/          # NestJS API
    src/
      auth/         # Authentication module
      users/        # User management
      quiz/         # Quiz engine
      questions/    # Question management
      subscriptions/# Subscription handling
  web/              # Next.js frontend
    src/
      app/          # Next.js 14 app router
      components/   # React components
      lib/          # Utilities
      hooks/        # Custom hooks

packages/
  database/         # Prisma schema & utilities
  ui/              # Shared components
  types/           # Shared TypeScript types
```

### Adding New Features
1. Backend: Create new NestJS module
2. Database: Update Prisma schema
3. Frontend: Create new pages/components
4. Test: Add appropriate tests

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation

---

**Built with ❤️ for healthcare professionals in the GCC region**