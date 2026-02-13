# Postman Testing Guide - Employee Management API

**Base URL:** `https://employeeapi-production-b09d.up.railway.app`

---

## 🚀 Quick Start

1. Open Postman
2. Create a new Collection called "Employee Management API"
3. Add the base URL as a collection variable for easy reuse

---

## 📋 API Endpoints Testing Order

### 1. Health Check ✅

**Purpose:** Verify the API is running

- **Method:** `GET`
- **URL:** `https://employeeapi-production-b09d.up.railway.app/`
- **Headers:** None required
- **Body:** None

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Employee Management API is running"
}
```

---

## 🏢 Department Endpoints

### 2. Create a Department

- **Method:** `POST`
- **URL:** `https://employeeapi-production-b09d.up.railway.app/api/departments`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "name": "Engineering"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Department created successfully",
  "data": {
    "id": 1,
    "name": "Engineering"
  }
}
```

**💡 Tip:** Save the department `id` from the response - you'll need it for employee creation!

---

### 3. Create More Departments (Optional)

Create additional departments to test with:

**HR Department:**
```json
{
  "name": "Human Resources"
}
```

**Sales Department:**
```json
{
  "name": "Sales"
}
```

---

### 4. Get All Departments

- **Method:** `GET`
- **URL:** `https://employeeapi-production-b09d.up.railway.app/api/departments`
- **Headers:** None required
- **Body:** None

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Engineering"
    },
    {
      "id": 2,
      "name": "Human Resources"
    },
    {
      "id": 3,
      "name": "Sales"
    }
  ]
}
```

---

### 5. Delete Department

- **Method:** `DELETE`
- **URL:** `https://employeeapi-production-b09d.up.railway.app/api/departments/3`
- **Headers:** None required
- **Body:** None

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Department deleted successfully"
}
```

**⚠️ Important:** You cannot delete a department that has employees. Try deleting a department with employees and you'll get:

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Cannot delete department",
  "message": "Department has 2 employee(s). Please reassign or remove employees first."
}
```

---

## 👥 Employee Endpoints

### 6. Create an Employee

**⚠️ Important:** You need a valid `departmentId` from the departments you created earlier!

- **Method:** `POST`
- **URL:** `https://employeeapi-production-b09d.up.railway.app/api/employees`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "phoneNumber": "+1-555-0100",
  "hireDate": "2024-01-15",
  "salary": 75000.00,
  "departmentId": 1
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@company.com",
    "phoneNumber": "+1-555-0100",
    "hireDate": "2024-01-15T00:00:00.000Z",
    "salary": 75000,
    "departmentId": 1,
    "createdAt": "2026-02-13T04:25:00.000Z",
    "updatedAt": "2026-02-13T04:25:00.000Z"
  }
}
```

---

### 7. Create More Employees (Optional)

**Employee 2:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@company.com",
  "phoneNumber": "+1-555-0101",
  "hireDate": "2024-02-01",
  "salary": 80000.00,
  "departmentId": 1
}
```

**Employee 3:**
```json
{
  "firstName": "Bob",
  "lastName": "Johnson",
  "email": "bob.johnson@company.com",
  "phoneNumber": "+1-555-0102",
  "hireDate": "2024-03-10",
  "salary": 65000.00,
  "departmentId": 2
}
```

---

### 8. Get All Employees

- **Method:** `GET`
- **URL:** `https://employeeapi-production-b09d.up.railway.app/api/employees`
- **Headers:** None required
- **Body:** None

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@company.com",
      "phoneNumber": "+1-555-0100",
      "hireDate": "2024-01-15T00:00:00.000Z",
      "salary": 75000,
      "departmentId": 1,
      "department": {
        "id": 1,
        "name": "Engineering"
      },
      "createdAt": "2026-02-13T04:25:00.000Z",
      "updatedAt": "2026-02-13T04:25:00.000Z"
    }
    // ... more employees
  ]
}
```

---

### 9. Get Employee by ID

- **Method:** `GET`
- **URL:** `https://employeeapi-production-b09d.up.railway.app/api/employees/1`
- **Headers:** None required
- **Body:** None

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@company.com",
    "phoneNumber": "+1-555-0100",
    "hireDate": "2024-01-15T00:00:00.000Z",
    "salary": 75000,
    "departmentId": 1,
    "department": {
      "id": 1,
      "name": "Engineering"
    },
    "createdAt": "2026-02-13T04:25:00.000Z",
    "updatedAt": "2026-02-13T04:25:00.000Z"
  }
}
```

---

### 10. Update Employee

- **Method:** `PUT`
- **URL:** `https://employeeapi-production-b09d.up.railway.app/api/employees/1`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "phoneNumber": "+1-555-0100",
  "hireDate": "2024-01-15",
  "salary": 85000.00,
  "departmentId": 1
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@company.com",
    "phoneNumber": "+1-555-0100",
    "hireDate": "2024-01-15T00:00:00.000Z",
    "salary": 85000,
    "departmentId": 1,
    "createdAt": "2026-02-13T04:25:00.000Z",
    "updatedAt": "2026-02-13T04:30:00.000Z"
  }
}
```

---

### 11. Delete Employee

- **Method:** `DELETE`
- **URL:** `https://employeeapi-production-b09d.up.railway.app/api/employees/1`
- **Headers:** None required
- **Body:** None

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

---

## 🔴 Error Testing

### Test 1: Invalid Department ID (Employee Creation)

Try creating an employee with a non-existent department:

```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@company.com",
  "phoneNumber": "+1-555-9999",
  "hireDate": "2024-01-01",
  "salary": 50000.00,
  "departmentId": 999
}
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Department not found"
}
```

---

### Test 2: Duplicate Email

Try creating two employees with the same email:

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Email already in use"
}
```

---

### Test 3: Missing Required Fields

Try creating a department without a name:

```json
{}
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Department name is required"
}
```

---

### Test 4: Invalid Resource ID

Try to get a non-existent employee:

- **URL:** `https://employeeapi-production-b09d.up.railway.app/api/employees/9999`

**Expected Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Employee not found"
}
```

---

## 📝 Postman Tips

### Setting Up Collection Variables

1. Create a new collection
2. Go to collection settings → Variables
3. Add variable:
   - **Variable:** `baseUrl`
   - **Initial Value:** `https://employeeapi-production-b09d.up.railway.app`
   - **Current Value:** `https://employeeapi-production-b09d.up.railway.app`

4. Use in requests: `{{baseUrl}}/api/employees`

### Save Test Data

After creating departments and employees, save their IDs as collection variables:
- `departmentId1`, `departmentId2`, etc.
- `employeeId1`, `employeeId2`, etc.

Use them in requests: `{{baseUrl}}/api/employees/{{employeeId1}}`

---

## ✅ Testing Checklist

- [ ] Health check endpoint works
- [ ] Create department
- [ ] Get all departments
- [ ] Create employee with valid department
- [ ] Get all employees
- [ ] Get employee by ID
- [ ] Update employee
- [ ] Test error: Invalid department ID
- [ ] Test error: Duplicate email
- [ ] Test error: Delete department with employees
- [ ] Delete employee
- [ ] Delete department (empty)

---

**Happy Testing! 🚀**
