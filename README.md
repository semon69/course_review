# Course Management System

This TypeScript-based Course Management System utilizes Express.js and MongoDB with Mongoose for Object Data Modeling and Validation. It provides a set of API endpoints for creating, updating, and retrieving courses, categories, and reviews. The system includes robust error handling, employing Joi/Zod for data validation.

## Key Features

### Models:

- Course: Detailed representation of a course with various attributes such as title, instructor, price, tags, and more.
- Category: Represents categories to which courses can be assigned.
- Review: Captures user reviews and ratings for courses.

### Endpoints:

1. Create a Course: POST /api/course
2. Get Paginated and Filtered Courses: GET /api/courses
3. Create a Category: POST /api/categories
4. Get All Categories: GET /api/categories
5. Create a Review: POST /api/reviews
6. Update a Course (Partial Update with Dynamic Update): PUT /api/courses/:courseId
7. Get Course by ID with Reviews: GET /api/courses/:courseId/reviews
8. Get the Best Course Based on Average Review (Rating): GET /api/course/best

### Validation:

- Utilizes Zod for validating incoming data for course, category, and review creation and updating operations.
- Provides meaningful error messages in API responses.

### Error Handling:

- Global error handling middleware to catch and handle errors.
- Consistent error response format with detailed information.

## Technology Stack

- Programming Language: TypeScript
- Web Framework: Express.js
- Object Data Modeling (ODM) and Validation Library: Mongoose for MongoDB
- Validation Library: Joi/Zod for data validation

## How to Use

1. Installation:
   - Clone the repository
   - Run npm install to install dependencies

2. Configuration:
   - Set up MongoDB connection in the configuration file

3. Run:
   - Execute npm run start:dev to run the application

4. API Documentation:
   - Refer to the API documentation for details on available endpoints

5. Contribute:
   - Feel free to contribute by opening issues or submitting pull requests



This Course Management System provides a comprehensive solution for managing courses, categories, and reviews with a user-friendly API and solid data validation practices.
