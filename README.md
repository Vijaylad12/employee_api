# Employee Management API 👥

A clean and simple RESTful API for managing employees and departments. Built with Node.js, Express, and Prisma ORM with MySQL database.

**Live API:** [https://employeeapi-production-b09d.up.railway.app](https://employeeapi-production-b09d.up.railway.app)

---

## What's This About?

This is a backend API I built to handle basic employee and department management operations. It's designed to be straightforward and easy to use - perfect for learning or as a starting point for a larger HR management system.

### What Can It Do?

- **Department Management:** Create, read, update, and delete departments
- **Employee Management:** Full CRUD operations for employee records
- **Relationships:** Employees are linked to departments with proper foreign key constraints
- **Validation:** Built-in validation to prevent duplicate emails and ensure data integrity
- **Error Handling:** Comprehensive error handling with meaningful error messages
- **Logging:** Request/response logging middleware for debugging

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Prisma
- **Deployment:** Railway
- **Environment:** dotenv for configuration

---

## API Endpoints

### Health Check
```
GET /
```
Quick health check to verify the API is running.

### Departments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/departments` | Get all departments |
| POST | `/api/departments` | Create a new department |
| DELETE | `/api/departments/:id` | Delete a department |

### Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get a specific employee |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/:id` | Update an employee |
| DELETE | `/api/employees/:id` | Delete an employee |

📖 **Full API documentation with sample requests:** Check out [`POSTMAN_TESTING_GUIDE.md`](./POSTMAN_TESTING_GUIDE.md)

---

## Getting Started

### Prerequisites

Make sure you have these installed:
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   
   # Database Configuration
   DATABASE_URL="mysql://username:password@localhost:3306/employee_management"
   
   # Node Environment
   NODE_ENV=development
   ```

4. **Set up the database**
   
   Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```
   
   Run migrations to create tables:
   ```bash
   npm run prisma:migrate
   ```

5. **Start the server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

The API will be running at `http://localhost:3000` 🚀

---

## Database Schema

### Department
```prisma
model Department {
  id        Int        @id @default(autoincrement())
  name      String     @unique @db.VarChar(100)
  employees Employee[]
}
```

### Employee
```prisma
model Employee {
  id            Int         @id @default(autoincrement())
  first_name    String      @db.VarChar(50)
  last_name     String      @db.VarChar(50)
  email         String      @unique @db.VarChar(100)
  department_id Int
  manager_id    Int?
  created_at    DateTime    @default(now())
  updated_at    DateTime    @updatedAt
  
  department    Department  @relation(...)
  manager       Employee?   @relation(...)
  subordinates  Employee[]  @relation(...)
}
```

### Key Features:
- **Unique constraints** on department names and employee emails
- **Foreign key relationships** between employees and departments
- **Self-referential relationship** for manager-subordinate hierarchy
- **Automatic timestamps** for created_at and updated_at
- **Cascade operations** for updates, restrict on department deletion

---

## Project Structure

```
├── config/
│   └── database.js          # Prisma client configuration
├── controllers/
│   ├── departmentController.js
│   └── employeeController.js
├── middleware/
│   ├── errorHandler.js      # Global error handling
│   └── logger.js            # Request/response logging
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── routes/
│   ├── departmentRoutes.js
│   └── employeeRoutes.js
├── .env                     # Environment variables (not in git)
├── .gitignore
├── package.json
├── server.js                # Main application entry point
└── README.md
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the server in production mode |
| `npm run dev` | Start the server with nodemon (auto-reload) |
| `npm run start:migrate` | Run migrations and start the server (for Railway) |
| `npm run build` | Generate Prisma Client |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations in dev mode |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |

---

## Example Usage

### Create a Department
```bash
curl -X POST https://employeeapi-production-b09d.up.railway.app/api/departments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Engineering",
    "description": "Software Development Team"
  }'
```

### Create an Employee
```bash
curl -X POST https://employeeapi-production-b09d.up.railway.app/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@company.com",
    "phoneNumber": "+1-555-0100",
    "hireDate": "2024-01-15",
    "salary": 75000.00,
    "departmentId": 1
  }'
```

### Get All Employees
```bash
curl https://employeeapi-production-b09d.up.railway.app/api/employees
```

---

## Deployment

This API is deployed on Railway. Here's how it's set up:

1. **Database:** MySQL service on Railway's private network
2. **Build Command:** `npm install && npx prisma generate`
3. **Start Command:** `npm run start:migrate` (runs migrations at startup)

The migrations run at startup because Railway's private network is only accessible at runtime, not during the build phase.

### Deploy Your Own

1. Push your code to GitHub
2. Create a new project on Railway
3. Add a MySQL database service
4. Add your Node.js service (from GitHub)
5. Configure environment variables:
   - `DATABASE_URL` (auto-populated from MySQL service)
   - `NODE_ENV=production`
   - `PORT=3000`
6. Set build/start commands as mentioned above
7. Deploy!

---

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common error codes:
- `400` - Bad Request (validation errors, invalid data)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## Validation & Business Rules

- **Email uniqueness:** No two employees can have the same email
- **Department names:** Must be unique
- **Foreign key constraints:** Can't delete a department that has employees
- **Required fields:** All employee fields are required except manager_id

---







