import { Task, Track } from "./types";

export const TRACKS: Track[] = [
  {
    id: "programming-foundations",
    title: "Programming Foundations",
    description:
      "Start your journey here. Learn the core syntax and logic that powers all software.",
    icon: "Terminal",
    color: "emerald",

    tasks: [
      "programming-foundations-task-1",
      "programming-foundations-task-2",
      "programming-foundations-task-3",
      "programming-foundations-task-4",
      "programming-foundations-task-5",
      "programming-foundations-task-6",
      "programming-foundations-task-7",
      "programming-foundations-task-8",
      "programming-foundations-task-9",
      "programming-foundations-task-10",
    ],
  },
  {
    id: "backend-basics",
    title: "Backend Fundamentals",
    description:
      "Master the core of server-side logic, routing, and data persistence.",
    icon: "Server",
    color: "sky",

    tasks: [
      "backend-basics-task-1",
      "backend-basics-task-2",
      "backend-basics-task-3",
      "backend-basics-task-4",
      "backend-basics-task-5",
      "backend-basics-task-6",
      "backend-basics-task-7",
      "backend-basics-task-8",
      "backend-basics-task-9",
      "backend-basics-task-10",
    ],
  },
  {
    id: "frontend-mastery",
    title: "Frontend Mastery",
    description:
      "Build responsive, high-performance user interfaces with React and Tailwind.",
    icon: "Layout",
    color: "pink",

    tasks: [
      "frontend-mastery-task-1",
      "frontend-mastery-task-2",
      "frontend-mastery-task-3",
      "frontend-mastery-task-4",
      "frontend-mastery-task-5",
      "frontend-mastery-task-6",
      "frontend-mastery-task-7",
      "frontend-mastery-task-8",
      "frontend-mastery-task-9",
      "frontend-mastery-task-10",
    ],
  },
  {
    id: "database-design",
    title: "Database Architecture",
    description:
      "Learn to design efficient schemas, optimize queries, and manage data at scale.",
    icon: "Database",
    color: "amber",

    tasks: [
      "database-design-task-1",
      "database-design-task-2",
      "database-design-task-3",
      "database-design-task-4",
      "database-design-task-5",
      "database-design-task-6",
      "database-design-task-7",
      "database-design-task-8",
      "database-design-task-9",
      "database-design-task-10",
    ],
  },
  {
    id: "security-expert",
    title: "Security & Auth",
    description:
      "Deep dive into JWT, OAuth, and securing your backend systems.",
    icon: "Shield",
    color: "purple",

    tasks: [
      "security-expert-task-1",
      "security-expert-task-2",
      "security-expert-task-3",
      "security-expert-task-4",
      "security-expert-task-5",
      "security-expert-task-6",
      "security-expert-task-7",
      "security-expert-task-8",
      "security-expert-task-9",
      "security-expert-task-10",
    ],
  },
  {
    id: "devops-essentials",
    title: "DevOps & Cloud",
    description:
      "Automate deployments, manage infrastructure, and scale applications.",
    icon: "Cloud",
    color: "indigo",

    tasks: [
      "devops-essentials-task-1",
      "devops-essentials-task-2",
      "devops-essentials-task-3",
      "devops-essentials-task-4",
      "devops-essentials-task-5",
      "devops-essentials-task-6",
      "devops-essentials-task-7",
      "devops-essentials-task-8",
      "devops-essentials-task-9",
      "devops-essentials-task-10",
    ],
  },
  {
    id: "java-enterprise",
    title: "Java Enterprise Design",
    description:
      "Master enterprise patterns in Java. Learn to build scalable, professional backend systems.",
    icon: "Shield",
    color: "orange",

    tasks: [
      "java-enterprise-task-1",
      "java-enterprise-task-2",
      "java-enterprise-task-3",
      "java-enterprise-task-4",
      "java-enterprise-task-5",
      "java-enterprise-task-6",
      "java-enterprise-task-7",
      "java-enterprise-task-8",
      "java-enterprise-task-9",
      "java-enterprise-task-10",
    ],
  },
];

export const ALL_TASKS: Task[] = [
  {
    id: "programming-foundations-task-1",
    title: "Hello World & Variables",
    description:
      "Write your first program and learn how to store data in variables.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "programming-foundations",
    initialCode:
      "function main() {\
  // TODO: Add your logic here\
}\
\
main();",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Sarah Chen",
      role: "Lead Backend Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    subject: "Programming Foundations Assignment #1: Hello World & Variables",
    priority: "urgent",
    visualType: "memory",
  },
  {
    id: "programming-foundations-task-2",
    title: "Control Flow",
    description: "Use if/else statements to make decisions in your code.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "programming-foundations",
    initialCode:
      "function main() {\
  // TODO: Add your logic here\
}\
\
main();",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Programming Foundations Assignment #2: Control Flow",
    priority: "urgent",
    visualType: "architecture",
  },
  {
    id: "programming-foundations-task-3",
    title: "Loops & Iteration",
    description: "Repeat actions using for and while loops.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "programming-foundations",
    initialCode:
      "function main() {\
  // TODO: Add your logic here\
}\
\
main();",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Programming Foundations Assignment #3: Loops & Iteration",
    priority: "high",
    visualType: "architecture",
  },
  {
    id: "programming-foundations-task-4",
    title: "Functions & Scope",
    description:
      "Group code into reusable functions and understand variable scope.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "programming-foundations",
    initialCode:
      "function main() {\
  // TODO: Add your logic here\
}\
\
main();",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Marcus Thorne",
      role: "CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    subject: "Programming Foundations Assignment #4: Functions & Scope",
    priority: "low",
    visualType: "logic",
  },
  {
    id: "programming-foundations-task-5",
    title: "Arrays & Lists",
    description: "Store collections of data in arrays and iterate over them.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "programming-foundations",
    initialCode:
      "function main() {\
  // TODO: Add your logic here\
}\
\
main();",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Programming Foundations Assignment #5: Arrays & Lists",
    priority: "urgent",
    visualType: "architecture",
  },
  {
    id: "programming-foundations-task-6",
    title: "Dictionaries & Objects",
    description: "Use key-value pairs to store complex data structures.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "programming-foundations",
    initialCode:
      "function main() {\
  // TODO: Add your logic here\
}\
\
main();",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Sarah Chen",
      role: "Lead Backend Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    subject: "Programming Foundations Assignment #6: Dictionaries & Objects",
    priority: "low",
    visualType: "logic",
  },
  {
    id: "programming-foundations-task-7",
    title: "Object-Oriented Basics",
    description: "Create classes and objects to model real-world entities.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "programming-foundations",
    initialCode:
      "function main() {\
  // TODO: Add your logic here\
}\
\
main();",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Marcus Thorne",
      role: "CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    subject: "Programming Foundations Assignment #7: Object-Oriented Basics",
    priority: "low",
    visualType: "logic",
  },
  {
    id: "programming-foundations-task-8",
    title: "Error Handling",
    description: "Use try/catch blocks to gracefully handle runtime errors.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "programming-foundations",
    initialCode:
      "function main() {\
  // TODO: Add your logic here\
}\
\
main();",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Programming Foundations Assignment #8: Error Handling",
    priority: "low",
    visualType: "memory",
  },
  {
    id: "programming-foundations-task-9",
    title: "File I/O",
    description: "Read from and write data to files on the filesystem.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "programming-foundations",
    initialCode:
      "function main() {\
  // TODO: Add your logic here\
}\
\
main();",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Programming Foundations Assignment #9: File I/O",
    priority: "high",
    visualType: "architecture",
  },
  {
    id: "programming-foundations-task-10",
    title: "Basic Algorithms",
    description: "Implement simple sorting and searching algorithms.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "programming-foundations",
    initialCode:
      "function main() {\
  // TODO: Add your logic here\
}\
\
main();",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Programming Foundations Assignment #10: Basic Algorithms",
    priority: "medium",
    visualType: "architecture",
  },
  {
    id: "backend-basics-task-1",
    title: "Setup HTTP Server",
    description: "Initialize a basic web server using Node.js and Express.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "backend-basics",
    initialCode:
      "const express = require('express');\
const app = express();\
\
app.listen(3000, () => {\
  console.log('Server running');\
});",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Backend Fundamentals Assignment #1: Setup HTTP Server",
    priority: "high",
    visualType: "architecture",
  },
  {
    id: "backend-basics-task-2",
    title: "Routing Implementation",
    description:
      "Create RESTful routes for GET, POST, PUT, and DELETE requests.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "backend-basics",
    initialCode:
      "const express = require('express');\
const app = express();\
\
app.listen(3000, () => {\
  console.log('Server running');\
});",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Marcus Thorne",
      role: "CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    subject: "Backend Fundamentals Assignment #2: Routing Implementation",
    priority: "medium",
    visualType: "architecture",
  },
  {
    id: "backend-basics-task-3",
    title: "Middleware Basics",
    description: "Write middleware to log incoming requests.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "backend-basics",
    initialCode:
      "const express = require('express');\
const app = express();\
\
app.listen(3000, () => {\
  console.log('Server running');\
});",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Backend Fundamentals Assignment #3: Middleware Basics",
    priority: "urgent",
    visualType: "architecture",
  },
  {
    id: "backend-basics-task-4",
    title: "Parsing Request Data",
    description: "Handle JSON body payloads and URL parameters.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "backend-basics",
    initialCode:
      "const express = require('express');\
const app = express();\
\
app.listen(3000, () => {\
  console.log('Server running');\
});",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Backend Fundamentals Assignment #4: Parsing Request Data",
    priority: "medium",
    visualType: "logic",
  },
  {
    id: "backend-basics-task-5",
    title: "Database Connection",
    description: "Connect your application to a SQL or NoSQL database.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "backend-basics",
    initialCode:
      "const express = require('express');\
const app = express();\
\
app.listen(3000, () => {\
  console.log('Server running');\
});",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Marcus Thorne",
      role: "CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    subject: "Backend Fundamentals Assignment #5: Database Connection",
    priority: "medium",
    visualType: "memory",
  },
  {
    id: "backend-basics-task-6",
    title: "CRUD Operations",
    description:
      "Implement Create, Read, Update, and Delete logic for a resource.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "backend-basics",
    initialCode:
      "const express = require('express');\
const app = express();\
\
app.listen(3000, () => {\
  console.log('Server running');\
});",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Sarah Chen",
      role: "Lead Backend Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    subject: "Backend Fundamentals Assignment #6: CRUD Operations",
    priority: "medium",
    visualType: "logic",
  },
  {
    id: "backend-basics-task-7",
    title: "Input Validation",
    description: "Sanitize and validate user inputs before processing.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "backend-basics",
    initialCode:
      "const express = require('express');\
const app = express();\
\
app.listen(3000, () => {\
  console.log('Server running');\
});",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Backend Fundamentals Assignment #7: Input Validation",
    priority: "high",
    visualType: "architecture",
  },
  {
    id: "backend-basics-task-8",
    title: "Authentication Layer",
    description: "Add basic authentication to protect certain endpoints.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "backend-basics",
    initialCode:
      "const express = require('express');\
const app = express();\
\
app.listen(3000, () => {\
  console.log('Server running');\
});",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Marcus Thorne",
      role: "CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    subject: "Backend Fundamentals Assignment #8: Authentication Layer",
    priority: "urgent",
    visualType: "logic",
  },
  {
    id: "backend-basics-task-9",
    title: "Rate Limiting",
    description: "Implement a rate limiter to prevent abuse API abuse.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "backend-basics",
    initialCode:
      "const express = require('express');\
const app = express();\
\
app.listen(3000, () => {\
  console.log('Server running');\
});",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Backend Fundamentals Assignment #9: Rate Limiting",
    priority: "high",
    visualType: "architecture",
  },
  {
    id: "backend-basics-task-10",
    title: "Deployment Prep",
    description:
      "Setup environment variables and error handling for production.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "backend-basics",
    initialCode:
      "const express = require('express');\
const app = express();\
\
app.listen(3000, () => {\
  console.log('Server running');\
});",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Backend Fundamentals Assignment #10: Deployment Prep",
    priority: "high",
    visualType: "logic",
  },
  {
    id: "frontend-mastery-task-1",
    title: "React App Init",
    description:
      "Bootstrap a new React application and explore its file structure.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "frontend-mastery",
    initialCode:
      "import React from 'react';\
\
export default function Component() {\
  return (\
    <div>\
      {/* TODO: Add implementation */}\
    </div>\
  );\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Frontend Mastery Assignment #1: React App Init",
    priority: "medium",
    visualType: "logic",
  },
  {
    id: "frontend-mastery-task-2",
    title: "Component Architecture",
    description: "Break down a complex UI into smaller, reusable components.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "frontend-mastery",
    initialCode:
      "import React from 'react';\
\
export default function Component() {\
  return (\
    <div>\
      {/* TODO: Add implementation */}\
    </div>\
  );\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Frontend Mastery Assignment #2: Component Architecture",
    priority: "urgent",
    visualType: "memory",
  },
  {
    id: "frontend-mastery-task-3",
    title: "State Management",
    description: "Use the useState hook to manage local component state.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "frontend-mastery",
    initialCode:
      "import React from 'react';\
\
export default function Component() {\
  return (\
    <div>\
      {/* TODO: Add implementation */}\
    </div>\
  );\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Frontend Mastery Assignment #3: State Management",
    priority: "high",
    visualType: "memory",
  },
  {
    id: "frontend-mastery-task-4",
    title: "Effects & Data Fetching",
    description: "Use useEffect to fetch external data from an API.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "frontend-mastery",
    initialCode:
      "import React from 'react';\
\
export default function Component() {\
  return (\
    <div>\
      {/* TODO: Add implementation */}\
    </div>\
  );\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Frontend Mastery Assignment #4: Effects & Data Fetching",
    priority: "low",
    visualType: "memory",
  },
  {
    id: "frontend-mastery-task-5",
    title: "React Routing",
    description: "Implement multi-page navigation using React Router.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "frontend-mastery",
    initialCode:
      "import React from 'react';\
\
export default function Component() {\
  return (\
    <div>\
      {/* TODO: Add implementation */}\
    </div>\
  );\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Marcus Thorne",
      role: "CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    subject: "Frontend Mastery Assignment #5: React Routing",
    priority: "high",
    visualType: "logic",
  },
  {
    id: "frontend-mastery-task-6",
    title: "Context API",
    description: "Manage global application state using React Context.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "frontend-mastery",
    initialCode:
      "import React from 'react';\
\
export default function Component() {\
  return (\
    <div>\
      {/* TODO: Add implementation */}\
    </div>\
  );\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Frontend Mastery Assignment #6: Context API",
    priority: "medium",
    visualType: "memory",
  },
  {
    id: "frontend-mastery-task-7",
    title: "Tailwind CSS Styling",
    description: "Style your components using utility classes from Tailwind.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "frontend-mastery",
    initialCode:
      "import React from 'react';\
\
export default function Component() {\
  return (\
    <div>\
      {/* TODO: Add implementation */}\
    </div>\
  );\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Frontend Mastery Assignment #7: Tailwind CSS Styling",
    priority: "medium",
    visualType: "memory",
  },
  {
    id: "frontend-mastery-task-8",
    title: "Forms & Validation",
    description: "Build controlled forms and handle validation errors.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "frontend-mastery",
    initialCode:
      "import React from 'react';\
\
export default function Component() {\
  return (\
    <div>\
      {/* TODO: Add implementation */}\
    </div>\
  );\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Frontend Mastery Assignment #8: Forms & Validation",
    priority: "urgent",
    visualType: "architecture",
  },
  {
    id: "frontend-mastery-task-9",
    title: "Custom Hooks",
    description: "Extract reusable logic into custom React hooks.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "frontend-mastery",
    initialCode:
      "import React from 'react';\
\
export default function Component() {\
  return (\
    <div>\
      {/* TODO: Add implementation */}\
    </div>\
  );\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Frontend Mastery Assignment #9: Custom Hooks",
    priority: "high",
    visualType: "architecture",
  },
  {
    id: "frontend-mastery-task-10",
    title: "Performance Optimization",
    description:
      "Improve app performance using memoization and code splitting.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "frontend-mastery",
    initialCode:
      "import React from 'react';\
\
export default function Component() {\
  return (\
    <div>\
      {/* TODO: Add implementation */}\
    </div>\
  );\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Frontend Mastery Assignment #10: Performance Optimization",
    priority: "urgent",
    visualType: "architecture",
  },
  {
    id: "database-design-task-1",
    title: "Schema Modeling",
    description: "Design tables and relationships for a new application.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "database-design",
    initialCode:
      "-- Write your SQL query here\
SELECT * FROM users;",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Database Architecture Assignment #1: Schema Modeling",
    priority: "low",
    visualType: "architecture",
  },
  {
    id: "database-design-task-2",
    title: "Keys & Constraints",
    description: "Define primary keys, foreign keys, and unique constraints.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "database-design",
    initialCode:
      "-- Write your SQL query here\
SELECT * FROM users;",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Database Architecture Assignment #2: Keys & Constraints",
    priority: "high",
    visualType: "architecture",
  },
  {
    id: "database-design-task-3",
    title: "Normalization",
    description: "Apply 1NF to 3NF rules to reduce data redundancy.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "database-design",
    initialCode:
      "-- Write your SQL query here\
SELECT * FROM users;",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Database Architecture Assignment #3: Normalization",
    priority: "medium",
    visualType: "memory",
  },
  {
    id: "database-design-task-4",
    title: "Complex Joins",
    description: "Write SQL queries using INNER, LEFT, and FULL joins.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "database-design",
    initialCode:
      "-- Write your SQL query here\
SELECT * FROM users;",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Database Architecture Assignment #4: Complex Joins",
    priority: "urgent",
    visualType: "memory",
  },
  {
    id: "database-design-task-5",
    title: "Database Migrations",
    description: "Create scripts to version your database schema.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "database-design",
    initialCode:
      "-- Write your SQL query here\
SELECT * FROM users;",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Database Architecture Assignment #5: Database Migrations",
    priority: "low",
    visualType: "logic",
  },
  {
    id: "database-design-task-6",
    title: "Indexing Strategies",
    description: "Add indexes to speed up frequently queried columns.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "database-design",
    initialCode:
      "-- Write your SQL query here\
SELECT * FROM users;",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Sarah Chen",
      role: "Lead Backend Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    subject: "Database Architecture Assignment #6: Indexing Strategies",
    priority: "medium",
    visualType: "architecture",
  },
  {
    id: "database-design-task-7",
    title: "Subqueries & CTEs",
    description: "Use Common Table Expressions to simplify complex queries.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "database-design",
    initialCode:
      "-- Write your SQL query here\
SELECT * FROM users;",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Database Architecture Assignment #7: Subqueries & CTEs",
    priority: "low",
    visualType: "architecture",
  },
  {
    id: "database-design-task-8",
    title: "Transactions",
    description: "Ensure data integrity using ACID-compliant transactions.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "database-design",
    initialCode:
      "-- Write your SQL query here\
SELECT * FROM users;",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Database Architecture Assignment #8: Transactions",
    priority: "high",
    visualType: "memory",
  },
  {
    id: "database-design-task-9",
    title: "NoSQL Design",
    description: "Understand document-oriented design patterns.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "database-design",
    initialCode:
      "-- Write your SQL query here\
SELECT * FROM users;",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Database Architecture Assignment #9: NoSQL Design",
    priority: "urgent",
    visualType: "memory",
  },
  {
    id: "database-design-task-10",
    title: "Cache Management",
    description: "Implement Redis to cache expensive query results.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "database-design",
    initialCode:
      "-- Write your SQL query here\
SELECT * FROM users;",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Sarah Chen",
      role: "Lead Backend Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    subject: "Database Architecture Assignment #10: Cache Management",
    priority: "high",
    visualType: "logic",
  },
  {
    id: "security-expert-task-1",
    title: "Password Hashing",
    description: "Securely store passwords using bcrypt or Argon2.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "security-expert",
    initialCode:
      "function secureData(data) {\
  // TODO: Implement security measures\
  return data;\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Marcus Thorne",
      role: "CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    subject: "Security & Auth Assignment #1: Password Hashing",
    priority: "medium",
    visualType: "logic",
  },
  {
    id: "security-expert-task-2",
    title: "JWT Implementation",
    description: "Generate and verify JSON Web Tokens for stateless auth.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "security-expert",
    initialCode:
      "function secureData(data) {\
  // TODO: Implement security measures\
  return data;\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Security & Auth Assignment #2: JWT Implementation",
    priority: "urgent",
    visualType: "logic",
  },
  {
    id: "security-expert-task-3",
    title: "OAuth Integration",
    description:
      "Allow users to sign in using third-party providers (Google/GitHub).",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "security-expert",
    initialCode:
      "function secureData(data) {\
  // TODO: Implement security measures\
  return data;\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Security & Auth Assignment #3: OAuth Integration",
    priority: "medium",
    visualType: "architecture",
  },
  {
    id: "security-expert-task-4",
    title: "CORS Configuration",
    description: "Configure Cross-Origin Resource Sharing safely.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "security-expert",
    initialCode:
      "function secureData(data) {\
  // TODO: Implement security measures\
  return data;\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Security & Auth Assignment #4: CORS Configuration",
    priority: "low",
    visualType: "logic",
  },
  {
    id: "security-expert-task-5",
    title: "SQL Injection Prevention",
    description: "Use parameterized queries to prevent SQLi attacks.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "security-expert",
    initialCode:
      "function secureData(data) {\
  // TODO: Implement security measures\
  return data;\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Security & Auth Assignment #5: SQL Injection Prevention",
    priority: "low",
    visualType: "logic",
  },
  {
    id: "security-expert-task-6",
    title: "XSS Protection",
    description: "Sanitize inputs to prevent Cross-Site Scripting.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "security-expert",
    initialCode:
      "function secureData(data) {\
  // TODO: Implement security measures\
  return data;\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Security & Auth Assignment #6: XSS Protection",
    priority: "low",
    visualType: "architecture",
  },
  {
    id: "security-expert-task-7",
    title: "CSRF Tokens",
    description: "Protect forms with Cross-Site Request Forgery tokens.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "security-expert",
    initialCode:
      "function secureData(data) {\
  // TODO: Implement security measures\
  return data;\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Security & Auth Assignment #7: CSRF Tokens",
    priority: "low",
    visualType: "logic",
  },
  {
    id: "security-expert-task-8",
    title: "Role-Based Access Control",
    description: "Implement RBAC to restrict user permissions.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "security-expert",
    initialCode:
      "function secureData(data) {\
  // TODO: Implement security measures\
  return data;\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Security & Auth Assignment #8: Role-Based Access Control",
    priority: "urgent",
    visualType: "logic",
  },
  {
    id: "security-expert-task-9",
    title: "Secure Headers",
    description: "Use Helmet.js to enforce secure HTTP headers.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "security-expert",
    initialCode:
      "function secureData(data) {\
  // TODO: Implement security measures\
  return data;\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Security & Auth Assignment #9: Secure Headers",
    priority: "urgent",
    visualType: "logic",
  },
  {
    id: "security-expert-task-10",
    title: "Audit Logging",
    description: "Track sensitive actions by maintaining an audit log.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "security-expert",
    initialCode:
      "function secureData(data) {\
  // TODO: Implement security measures\
  return data;\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "Security & Auth Assignment #10: Audit Logging",
    priority: "urgent",
    visualType: "memory",
  },
  {
    id: "devops-essentials-task-1",
    title: "Containerization",
    description: "Write a Dockerfile to containerize a web application.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "devops-essentials",
    initialCode:
      "# Define your configuration here\
version: '3'\
services:\
  web:\
    image: node:alpine",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "DevOps & Cloud Assignment #1: Containerization",
    priority: "urgent",
    visualType: "memory",
  },
  {
    id: "devops-essentials-task-2",
    title: "Docker Compose",
    description:
      "Orchestrate multi-container environments using docker-compose.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "devops-essentials",
    initialCode:
      "# Define your configuration here\
version: '3'\
services:\
  web:\
    image: node:alpine",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "DevOps & Cloud Assignment #2: Docker Compose",
    priority: "low",
    visualType: "architecture",
  },
  {
    id: "devops-essentials-task-3",
    title: "CI Pipeline",
    description: "Set up GitHub Actions to automatically run tests.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "devops-essentials",
    initialCode:
      "# Define your configuration here\
version: '3'\
services:\
  web:\
    image: node:alpine",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "DevOps & Cloud Assignment #3: CI Pipeline",
    priority: "urgent",
    visualType: "architecture",
  },
  {
    id: "devops-essentials-task-4",
    title: "CD Pipeline",
    description: "Automate deployment to a cloud provider on merge.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "devops-essentials",
    initialCode:
      "# Define your configuration here\
version: '3'\
services:\
  web:\
    image: node:alpine",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "DevOps & Cloud Assignment #4: CD Pipeline",
    priority: "medium",
    visualType: "logic",
  },
  {
    id: "devops-essentials-task-5",
    title: "Reverse Proxy",
    description: "Configure Nginx as a reverse proxy for your app.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "devops-essentials",
    initialCode:
      "# Define your configuration here\
version: '3'\
services:\
  web:\
    image: node:alpine",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Marcus Thorne",
      role: "CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    subject: "DevOps & Cloud Assignment #5: Reverse Proxy",
    priority: "high",
    visualType: "logic",
  },
  {
    id: "devops-essentials-task-6",
    title: "Infrastructure as Code",
    description: "Define cloud resources using Terraform.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "devops-essentials",
    initialCode:
      "# Define your configuration here\
version: '3'\
services:\
  web:\
    image: node:alpine",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Alex Rivera",
      role: "Junior Mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    subject: "DevOps & Cloud Assignment #6: Infrastructure as Code",
    priority: "urgent",
    visualType: "logic",
  },
  {
    id: "devops-essentials-task-7",
    title: "Secret Management",
    description: "Securely inject environment variables and secrets.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "devops-essentials",
    initialCode:
      "# Define your configuration here\
version: '3'\
services:\
  web:\
    image: node:alpine",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Marcus Thorne",
      role: "CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    subject: "DevOps & Cloud Assignment #7: Secret Management",
    priority: "low",
    visualType: "logic",
  },
  {
    id: "devops-essentials-task-8",
    title: "Monitoring Setup",
    description: "Implement basic monitoring using Prometheus.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "devops-essentials",
    initialCode:
      "# Define your configuration here\
version: '3'\
services:\
  web:\
    image: node:alpine",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "DevOps & Cloud Assignment #8: Monitoring Setup",
    priority: "low",
    visualType: "memory",
  },
  {
    id: "devops-essentials-task-9",
    title: "Log Aggregation",
    description: "Centralize logs from multiple services.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "devops-essentials",
    initialCode:
      "# Define your configuration here\
version: '3'\
services:\
  web:\
    image: node:alpine",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "DevOps & Cloud Assignment #9: Log Aggregation",
    priority: "high",
    visualType: "memory",
  },
  {
    id: "devops-essentials-task-10",
    title: "Kubernetes Basics",
    description: "Deploy a simple app to a Minikube cluster.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "devops-essentials",
    initialCode:
      "# Define your configuration here\
version: '3'\
services:\
  web:\
    image: node:alpine",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "DevOps & Cloud Assignment #10: Kubernetes Basics",
    priority: "urgent",
    visualType: "memory",
  },
  {
    id: "java-enterprise-task-1",
    title: "Spring Boot Init",
    description: "Set up a new Spring Boot application with Maven/Gradle.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "java-enterprise",
    initialCode:
      "package com.example.app;\
\
public class Main {\
    public static void main(String[] args) {\
        // TODO: implementation\
    }\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Sarah Chen",
      role: "Lead Backend Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    subject: "Java Enterprise Design Assignment #1: Spring Boot Init",
    priority: "low",
    visualType: "architecture",
  },
  {
    id: "java-enterprise-task-2",
    title: "Dependency Injection",
    description: "Learn to use @Autowired and @Component for IoC.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "java-enterprise",
    initialCode:
      "package com.example.app;\
\
public class Main {\
    public static void main(String[] args) {\
        // TODO: implementation\
    }\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Java Enterprise Design Assignment #2: Dependency Injection",
    priority: "high",
    visualType: "architecture",
  },
  {
    id: "java-enterprise-task-3",
    title: "Spring Data JPA",
    description: "Connect to a relational database using Hibernate.",
    difficulty: "beginner",
    category: "Core Implementation",
    trackId: "java-enterprise",
    initialCode:
      "package com.example.app;\
\
public class Main {\
    public static void main(String[] args) {\
        // TODO: implementation\
    }\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Java Enterprise Design Assignment #3: Spring Data JPA",
    priority: "urgent",
    visualType: "logic",
  },
  {
    id: "java-enterprise-task-4",
    title: "MVC Pattern",
    description:
      "Build REST endpoints using @RestController and @RequestMapping.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "java-enterprise",
    initialCode:
      "package com.example.app;\
\
public class Main {\
    public static void main(String[] args) {\
        // TODO: implementation\
    }\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Marcus Thorne",
      role: "CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    subject: "Java Enterprise Design Assignment #4: MVC Pattern",
    priority: "medium",
    visualType: "architecture",
  },
  {
    id: "java-enterprise-task-5",
    title: "Global Exception Handling",
    description: "Use @ControllerAdvice to handle errors gracefully.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "java-enterprise",
    initialCode:
      "package com.example.app;\
\
public class Main {\
    public static void main(String[] args) {\
        // TODO: implementation\
    }\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Sarah Chen",
      role: "Lead Backend Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    subject: "Java Enterprise Design Assignment #5: Global Exception Handling",
    priority: "urgent",
    visualType: "architecture",
  },
  {
    id: "java-enterprise-task-6",
    title: "Spring Security Filters",
    description: "Implement authentication filters to secure endpoints.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "java-enterprise",
    initialCode:
      "package com.example.app;\
\
public class Main {\
    public static void main(String[] args) {\
        // TODO: implementation\
    }\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "David Kim",
      role: "DevOps Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    subject: "Java Enterprise Design Assignment #6: Spring Security Filters",
    priority: "high",
    visualType: "architecture",
  },
  {
    id: "java-enterprise-task-7",
    title: "Microservices Communication",
    description: "Use FeignClient to communicate between services.",
    difficulty: "intermediate",
    category: "Core Implementation",
    trackId: "java-enterprise",
    initialCode:
      "package com.example.app;\
\
public class Main {\
    public static void main(String[] args) {\
        // TODO: implementation\
    }\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Sarah Chen",
      role: "Lead Backend Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    subject:
      "Java Enterprise Design Assignment #7: Microservices Communication",
    priority: "low",
    visualType: "memory",
  },
  {
    id: "java-enterprise-task-8",
    title: "Message Queues",
    description: "Integrate RabbitMQ or Kafka for asynchronous processing.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "java-enterprise",
    initialCode:
      "package com.example.app;\
\
public class Main {\
    public static void main(String[] args) {\
        // TODO: implementation\
    }\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Sarah Chen",
      role: "Lead Backend Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    subject: "Java Enterprise Design Assignment #8: Message Queues",
    priority: "low",
    visualType: "architecture",
  },
  {
    id: "java-enterprise-task-9",
    title: "Testing Strategy",
    description: "Write unit tests using JUnit 5 and Mockito.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "java-enterprise",
    initialCode:
      "package com.example.app;\
\
public class Main {\
    public static void main(String[] args) {\
        // TODO: implementation\
    }\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Elena Rodriguez",
      role: "Senior UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    subject: "Java Enterprise Design Assignment #9: Testing Strategy",
    priority: "high",
    visualType: "memory",
  },
  {
    id: "java-enterprise-task-10",
    title: "Performance Tuning",
    description: "Profile and optimize Java heap space and garbage collection.",
    difficulty: "advanced",
    category: "Core Implementation",
    trackId: "java-enterprise",
    initialCode:
      "package com.example.app;\
\
public class Main {\
    public static void main(String[] args) {\
        // TODO: implementation\
    }\
}",
    instructions: [
      {
        title: "Step 1: Planning",
        content:
          "Review the requirements and plan out your data structures or endpoints.",
      },
      {
        title: "Step 2: Implementation",
        content:
          "Write the core logic avoiding common pitfalls and code smells.",
      },
      {
        title: "Step 3: Refactoring",
        content:
          "Clean up your code and ensure proper naming conventions and modularity.",
      },
    ],
    basics: [
      {
        title: "Best Practices",
        content:
          "Always refer to the official documentation when dealing with new language features or libraries.",
      },
    ],
    tips: [
      {
        title: "Debugging Tip",
        content:
          "Use console logs or a proper debugger to step through your application state.",
      },
    ],
    sender: {
      name: "Sarah Chen",
      role: "Lead Backend Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    subject: "Java Enterprise Design Assignment #10: Performance Tuning",
    priority: "urgent",
    visualType: "memory",
  },
];
