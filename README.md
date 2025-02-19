# Financial Transaction Tracker

A basic financial transaction tracker built with **React** (frontend) and **.NET** (backend). This application allows users to manage their financial transactions, view transaction history, filter transactions, and calculate their total balance.

---

## Features

### User Features
1. **Add a Transaction**: Users can enter transaction details such as amount, type (send/receive), date, and description.
2. **View Transaction History**: A list of past transactions is displayed for easy reference.
3. **Filter Transactions**: Users can filter transactions by:
   - Date range
   - Type (send/receive)
   - Amount range
4. **Calculate Balance**: The total balance is calculated and displayed based on the transaction history.

---

## Tech Stack

### Frontend
- **React**: Built with **Vite** for fast development.
- **TypeScript**: For type safety and better developer experience.
- **TailwindCSS**: For utility-first styling.
- **ChakraUI**: For pre-built, customizable UI components.
- **Zustand**: For state management.
- **Docker**: For containerization and deployment.

### Backend
- **.NET 8**: For building the RESTful API.
- **Entity Framework Core**: For database operations and migrations.
- **Repository Pattern**: For abstraction and separation of concerns.
- **FluentValidations**: For request validations.
- **Redis**: For caching to improve performance.
- **SQLite**: For lightweight database storage.
- **Folder Structure**: Inspired by Domain-Driven Design (DDD):
  - `Api`: API controllers and endpoints.
  - `Contracts`: DTOs and request/response models.
  - `Core`: Domain logic and business rules.
  - `Infrastructure`: Database and external service integrations.
  - `Tests`: Unit and integration tests.
- **Docker**: For containerization and deployment.

### Deployment
- **Azure Container Instances**: Hosted on Azure with three containers:
  - React app (frontend)
  - .NET API (backend)
  - Redis (caching)

---

## Challenges Faced

1. **State Management in React**:
   - Deciding between Zustand and other state management libraries like Redux.
   - Ensuring state updates are efficient and predictable.
   - Making sure custom hooks with business logic works as expected.

2. **Backend Architecture**:
   - Managing database migrations and ensuring data consistency when my entities change.

3. **Deployment**:
   - Configuring Docker for both frontend and backend.
   - Setting up Azure Container Instances and ensuring all containers communicate seamlessly.

---

## Learnings

1. **React**:
   - Leveraging custom hooks for reusable logic.
   - Organizing the project with a scalable folder structure.

2. **.NET**:
   - Using SQLite fot lightweight database storage.
   - Writing unit and integration tests with XUnit for reliability.

3. **DevOps**:
   - Gained experience with Docker for containerization.
   - Learned how to deploy multi-container applications on Azure.