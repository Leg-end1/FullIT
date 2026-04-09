import { Task, Track } from './types';

export const TRACKS: Track[] = [
  {
    id: 'programming-foundations',
    title: 'Programming Foundations',
    description: 'Start your journey here. Learn the core syntax and logic that powers all software.',
    icon: 'Terminal',
    color: 'emerald',
    tasks: ['js-syntax-1', 'js-logic-1', 'js-loops-1', 'js-functions-1', 'js-recursion-1', 'js-oop-1']
  },
  {
    id: 'backend-basics',
    title: 'Backend Fundamentals',
    description: 'Master the core of server-side logic, routing, and data persistence.',
    icon: 'Server',
    color: 'sky',
    tasks: ['hello-world-api', 'db-connect-1', 'middleware-logger']
  },
  {
    id: 'frontend-mastery',
    title: 'Frontend Mastery',
    description: 'Build responsive, high-performance user interfaces with React and Tailwind.',
    icon: 'Layout',
    color: 'pink',
    tasks: ['react-component-1', 'react-state-1']
  },
  {
    id: 'database-design',
    title: 'Database Architecture',
    description: 'Learn to design efficient schemas, optimize queries, and manage data at scale.',
    icon: 'Database',
    color: 'amber',
    tasks: ['schema-design-1', 'query-optimization-1']
  },
  {
    id: 'security-expert',
    title: 'Security & Auth',
    description: 'Deep dive into JWT, OAuth, and securing your backend systems.',
    icon: 'Shield',
    color: 'purple',
    tasks: ['express-auth-1', 'password-hashing']
  },
  {
    id: 'devops-essentials',
    title: 'DevOps & Cloud',
    description: 'Automate deployments, manage infrastructure, and scale applications.',
    icon: 'Cloud',
    color: 'indigo',
    tasks: ['docker-basics-1', 'ci-cd-pipeline-1']
  }
];

export const ALL_TASKS: Task[] = [
  {
    id: 'js-syntax-1',
    title: 'Variables & Data Types',
    description: 'Welcome to the team! Before we build systems, we need to handle data. Your first task is to declare variables for a user profile.',
    difficulty: 'beginner',
    category: 'Syntax',
    trackId: 'programming-foundations',
    initialCode: `// TODO: Declare a variable 'userName' (string) and 'userAge' (number)\n\n`,
    instructions: [
      {
        title: 'Declaring Variables',
        content: 'Use `let` or `const` to declare variables. `let` is for values that change, `const` is for constants.'
      }
    ],
    basics: [
      {
        title: 'What is a Variable?',
        content: 'Think of a variable as a labeled box that holds a value. You can use the label to access the value later.'
      }
    ],
    sender: {
      name: 'Alex Rivera',
      role: 'Junior Mentor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    subject: 'Onboarding: Data Basics',
    priority: 'low',
    visualType: 'memory'
  },
  {
    id: 'js-logic-1',
    title: 'Making Decisions',
    description: 'Our system needs to decide if a user is an adult. Implement a simple check.',
    difficulty: 'beginner',
    category: 'Logic',
    trackId: 'programming-foundations',
    initialCode: `function isAdult(age) {\n  // TODO: Return true if age is 18 or older, else false\n}\n`,
    instructions: [
      {
        title: 'If/Else Statements',
        content: 'Use `if (condition) { ... } else { ... }` to execute different code blocks based on a condition.'
      }
    ],
    basics: [
      {
        title: 'Boolean Logic',
        content: 'Conditions evaluate to either `true` or `false`. Comparison operators like `>=` or `==` help create these conditions.'
      }
    ],
    sender: {
      name: 'Alex Rivera',
      role: 'Junior Mentor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    subject: 'Logic: Age Verification',
    priority: 'low',
    visualType: 'logic'
  },
  {
    id: 'js-loops-1',
    title: 'Repeating Tasks',
    description: 'We have a list of scores. We need to print each one to the console.',
    difficulty: 'beginner',
    category: 'Loops',
    trackId: 'programming-foundations',
    initialCode: `const scores = [85, 92, 78];\n\n// TODO: Use a loop to print each score\n`,
    instructions: [
      {
        title: 'For Loops',
        content: 'A `for` loop repeats a block of code a specific number of times. `for (let i = 0; i < array.length; i++)` is a common pattern.'
      }
    ],
    basics: [
      {
        title: 'Why Loops?',
        content: 'Loops save you from writing the same code over and over. They are perfect for processing lists (arrays).'
      }
    ],
    sender: {
      name: 'Alex Rivera',
      role: 'Junior Mentor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    subject: 'Automation: Processing Lists',
    priority: 'medium',
    visualType: 'logic'
  },
  {
    id: 'js-functions-1',
    title: 'Reusable Logic',
    description: 'Create a function that calculates the total price after tax.',
    difficulty: 'beginner',
    category: 'Functions',
    trackId: 'programming-foundations',
    initialCode: `function calculateTotal(price, taxRate) {\n  // TODO: Return price + (price * taxRate)\n}\n`,
    instructions: [
      {
        title: 'Defining Functions',
        content: 'Functions are blocks of code designed to perform a particular task. They are executed when "called".'
      }
    ],
    basics: [
      {
        title: 'Parameters & Return',
        content: 'Parameters are inputs to the function. The `return` statement specifies the output value.'
      }
    ],
    sender: {
      name: 'Sarah Chen',
      role: 'Lead Backend Engineer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    subject: 'Refactoring: Pricing Logic',
    priority: 'medium',
    visualType: 'logic'
  },
  {
    id: 'js-recursion-1',
    title: 'Deep Thinking: Recursion',
    description: 'Calculate the factorial of a number using recursion. This is a classic "programming thinking" challenge.',
    difficulty: 'intermediate',
    category: 'Recursion',
    trackId: 'programming-foundations',
    initialCode: `function factorial(n) {\n  // TODO: Implement recursive factorial\n  // Base case: if n is 0 or 1, return 1\n}\n`,
    instructions: [
      {
        title: 'Recursive Calls',
        content: 'Recursion is when a function calls itself. You MUST have a base case to stop the recursion!'
      }
    ],
    basics: [
      {
        title: 'The Call Stack',
        content: 'Every time a function is called, it\'s added to the "stack". Recursion creates a chain of these calls.'
      }
    ],
    sender: {
      name: 'Marcus Thorne',
      role: 'CTO',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    },
    subject: 'Algorithms: Factorial Implementation',
    priority: 'high',
    visualType: 'memory'
  },
  {
    id: 'js-oop-1',
    title: 'Objects & Classes',
    description: 'Model a "User" using a class. It should have a constructor and a method to greet.',
    difficulty: 'intermediate',
    category: 'OOP',
    trackId: 'programming-foundations',
    initialCode: `class User {\n  // TODO: Implement constructor and greet() method\n}\n`,
    instructions: [
      {
        title: 'Class Syntax',
        content: 'Classes are templates for creating objects. Use `constructor` to initialize properties.'
      }
    ],
    basics: [
      {
        title: 'Object Oriented Programming',
        content: 'OOP is a style of programming where you organize code into "objects" that represent real-world things.'
      }
    ],
    sender: {
      name: 'Marcus Thorne',
      role: 'CTO',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    },
    subject: 'Architecture: User Modeling',
    priority: 'high',
    visualType: 'architecture'
  },
  {
    id: 'hello-world-api',
    title: 'Your First Express Route',
    description: 'Every journey starts with a single route. Let\'s create a simple GET endpoint that returns a greeting.',
    difficulty: 'beginner',
    category: 'API',
    trackId: 'backend-basics',
    initialCode: `const express = require('express');\nconst app = express();\n\n// TODO: Create a GET route at '/hello' that returns { message: "Hello World" }\n\n`,
    instructions: [
      {
        title: 'The Basics of Express',
        content: 'Express is a minimal and flexible Node.js web application framework. Routes are used to define how your application responds to client requests.'
      },
      {
        title: 'Creating a Route',
        content: 'Use `app.get(path, callback)` to define a GET route. The callback takes `req` (request) and `res` (response) objects.'
      }
    ],
    basics: [
      {
        title: 'What is an API?',
        content: 'An Application Programming Interface (API) is a set of rules that allow different software applications to communicate with each other.'
      },
      {
        title: 'HTTP Methods',
        content: 'GET is used to request data from a specified resource. POST is used to send data to a server to create/update a resource.'
      }
    ],
    sender: {
      name: 'Sarah Chen',
      role: 'Lead Backend Engineer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    subject: 'New Feature: Welcome Endpoint',
    priority: 'medium',
    visualType: 'architecture'
  },
  {
    id: 'db-connect-1',
    title: 'Connecting to MongoDB',
    description: 'Learn how to establish a secure connection to a MongoDB database using Mongoose.',
    difficulty: 'beginner',
    category: 'Database',
    trackId: 'backend-basics',
    initialCode: `const mongoose = require('mongoose');\n\n// TODO: Connect to mongodb://localhost:27017/stackmaster\n// and log "Connected" on success\n\n`,
    instructions: [
      {
        title: 'What is Mongoose?',
        content: 'Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.'
      }
    ],
    basics: [
      {
        title: 'Databases 101',
        content: 'A database is an organized collection of structured information, or data, typically stored electronically in a computer system.'
      }
    ],
    sender: {
      name: 'Marcus Thorne',
      role: 'CTO',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    },
    subject: 'Urgent: Database Integration',
    priority: 'high',
    visualType: 'architecture'
  },
  {
    id: 'react-component-1',
    title: 'Building a Profile Card',
    description: 'Create a reusable React component that displays user information with a clean, modern design.',
    difficulty: 'beginner',
    category: 'Frontend',
    trackId: 'frontend-mastery',
    initialCode: `import React from 'react';\n\n// TODO: Create a ProfileCard component that takes 'name', 'role', and 'avatar' as props\n\n`,
    instructions: [
      {
        title: 'React Components',
        content: 'Components are the building blocks of any React application. They are independent and reusable bits of code.'
      }
    ],
    basics: [
      {
        title: 'JSX Basics',
        content: 'JSX is a syntax extension to JavaScript. It is used with React to describe what the UI should look like.'
      }
    ],
    sender: {
      name: 'Elena Rodriguez',
      role: 'Senior UI Designer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
    },
    subject: 'Design System: Profile Components',
    priority: 'low',
    visualType: 'architecture'
  },
  {
    id: 'middleware-logger',
    title: 'Custom Logger Middleware',
    description: 'Middleware functions are functions that have access to the request object, the response object, and the next middleware function.',
    difficulty: 'intermediate',
    category: 'Middleware',
    trackId: 'backend-basics',
    initialCode: `function logger(req, res, next) {\n  // TODO: Log the request method and URL\n  // Then call next()\n}\n`,
    instructions: [
      {
        title: 'Middleware Concept',
        content: 'Middleware can execute any code, make changes to the request and response objects, and end the request-response cycle.'
      }
    ],
    basics: [
      {
        title: 'What is Middleware?',
        content: 'Middleware is software that lies between an operating system and the applications running on it.'
      }
    ],
    sender: {
      name: 'Sarah Chen',
      role: 'Lead Backend Engineer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    subject: 'Internal Tooling: Request Logging',
    priority: 'medium',
    visualType: 'architecture'
  },
  {
    id: 'schema-design-1',
    title: 'User Profile Schema',
    description: 'Design a Mongoose schema for a user profile that includes validation and default values.',
    difficulty: 'intermediate',
    category: 'Database',
    trackId: 'database-design',
    initialCode: `const mongoose = require('mongoose');\n\nconst userSchema = new mongoose.Schema({\n  // TODO: Define name, email, and age fields\n});\n`,
    instructions: [
      {
        title: 'Mongoose Schemas',
        content: 'Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.'
      }
    ],
    basics: [
      {
        title: 'Schema Validation',
        content: 'Validation is defined in the SchemaType. You can use built-in validators or create custom ones.'
      }
    ],
    sender: {
      name: 'Marcus Thorne',
      role: 'CTO',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    },
    subject: 'Data Integrity: User Schema',
    priority: 'high',
    visualType: 'architecture'
  },
  {
    id: 'ci-cd-pipeline-1',
    title: 'GitHub Actions Workflow',
    description: 'Create a simple GitHub Actions workflow that runs tests on every push to the main branch.',
    difficulty: 'advanced',
    category: 'DevOps',
    trackId: 'devops-essentials',
    initialCode: `name: Node.js CI\n\non:\n  push:\n    branches: [ "main" ]\n\njobs:\n  build:\n    # TODO: Define the steps to run tests\n`,
    instructions: [
      {
        title: 'CI/CD Basics',
        content: 'Continuous Integration (CI) and Continuous Deployment (CD) are practices that automate the building, testing, and deployment of applications.'
      }
    ],
    basics: [
      {
        title: 'GitHub Actions',
        content: 'GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD.'
      }
    ],
    sender: {
      name: 'David Kim',
      role: 'DevOps Lead',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
    subject: 'Automation: CI/CD Pipeline',
    priority: 'urgent',
    visualType: 'architecture'
  },
  {
    id: 'react-state-1',
    title: 'Managing State',
    description: 'Create a counter component that uses the `useState` hook to track a number.',
    difficulty: 'beginner',
    category: 'Frontend',
    trackId: 'frontend-mastery',
    initialCode: `import React, { useState } from 'react';\n\nfunction Counter() {\n  // TODO: Implement a counter with increment/decrement buttons\n}\n`,
    instructions: [
      {
        title: 'useState Hook',
        content: 'Hooks allow you to use state and other React features without writing a class.'
      }
    ],
    basics: [
      {
        title: 'What is State?',
        content: 'State is data that changes over time in your application. When state changes, React re-renders the component.'
      }
    ],
    sender: {
      name: 'Elena Rodriguez',
      role: 'Senior UI Designer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
    },
    subject: 'Interactive UI: Counter Component',
    priority: 'medium',
    visualType: 'logic'
  },
  {
    id: 'query-optimization-1',
    title: 'Optimizing MongoDB Queries',
    description: 'Improve the performance of a query by adding an index to the "email" field.',
    difficulty: 'intermediate',
    category: 'Database',
    trackId: 'database-design',
    initialCode: `const userSchema = new mongoose.Schema({\n  email: String,\n  name: String\n});\n\n// TODO: Add an index to the email field\n`,
    instructions: [
      {
        title: 'Database Indexing',
        content: 'Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a collection scan.'
      }
    ],
    basics: [
      {
        title: 'Why Index?',
        content: 'Indexing makes data retrieval much faster, especially as your database grows.'
      }
    ],
    sender: {
      name: 'Marcus Thorne',
      role: 'CTO',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    },
    subject: 'Performance: Query Indexing',
    priority: 'high',
    visualType: 'architecture'
  },
  {
    id: 'express-auth-1',
    title: 'JWT Authentication',
    description: 'Implement a middleware that verifies a JSON Web Token (JWT) in the request header.',
    difficulty: 'advanced',
    category: 'Security',
    trackId: 'security-expert',
    initialCode: `const jwt = require('jsonwebtoken');\n\nfunction verifyToken(req, res, next) {\n  // TODO: Extract token from header and verify it\n}\n`,
    instructions: [
      {
        title: 'JWT Basics',
        content: 'JSON Web Token is an open standard that defines a compact and self-contained way for securely transmitting information between parties.'
      }
    ],
    basics: [
      {
        title: 'Authentication vs Authorization',
        content: 'Authentication is verifying who you are. Authorization is verifying what you have access to.'
      }
    ],
    sender: {
      name: 'Sarah Chen',
      role: 'Lead Backend Engineer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    subject: 'Security: Token Verification',
    priority: 'urgent',
    visualType: 'architecture'
  },
  {
    id: 'password-hashing',
    title: 'Secure Password Storage',
    description: 'Use bcrypt to hash a user password before saving it to the database.',
    difficulty: 'intermediate',
    category: 'Security',
    trackId: 'security-expert',
    initialCode: `const bcrypt = require('bcrypt');\n\nasync function hashPassword(password) {\n  // TODO: Hash the password with a salt round of 10\n}\n`,
    instructions: [
      {
        title: 'Hashing Passwords',
        content: 'Never store passwords in plain text! Hashing is a one-way process that turns a password into a random string.'
      }
    ],
    basics: [
      {
        title: 'Salting',
        content: 'A salt is random data that is used as an additional input to a one-way function that "hashes" data.'
      }
    ],
    sender: {
      name: 'Sarah Chen',
      role: 'Lead Backend Engineer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    subject: 'Security: Password Hashing',
    priority: 'high',
    visualType: 'logic'
  }
];
