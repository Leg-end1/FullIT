import { Task, Track, Interview } from "./types";
import { TaskBuilder } from "./lib/TaskBuilder";

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
    title: "The Initializer: Variables & Memory",
    description: "Welcome to the Lab. Your first operation is simple but critical. Every system needs a way to store its current state in memory.",
    difficulty: "beginner",
    category: "Syntax",
    trackId: "programming-foundations",
    sender: { name: "Dr. Aris", role: "Chief Systems Architect", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aris" },
    subject: "RE: First Mission - Memory Allocation",
    priority: "high",
    initialCode: "function main() {\n  // 1. Declare a variable named 'status' and set it to 'READY'\n  // 2. Log 'System ' + status to the console\n}\n\nmain();",
    basics: [
      { title: "Variables", content: "Variables are containers for storing data values. In JavaScript/TypeScript, we use 'const' for values that don't change and 'let' for values that might." },
      { title: "The Console", content: "The console is our primary communication link with the underlying system. Use console.log() to output data." }
    ],
    instructions: [
      { title: "Define the Variable", content: "Use 'const status = \"READY\";' to allocate memory." },
      { title: "Output Result", content: "Use 'console.log(\"System \" + status);' to verify the state." }
    ],
    tips: [
      { title: "Semicolons", content: "While often optional, using semicolons prevents logical parsing errors in complex scripts." }
    ],
    visualType: "memory"
  },
  {
    id: "programming-foundations-task-2",
    title: "Logic Gate: Conditional Flow",
    description: "Systems must make autonomous decisions based on input parameters. You need to build a security gate.",
    difficulty: "beginner",
    category: "Control Flow",
    trackId: "programming-foundations",
    sender: { name: "Agent V", role: "Head of Security Ops", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=V" },
    subject: "Security Protocol Implementation",
    priority: "urgent",
    initialCode: "function checkAccess(role) {\n  // If role is 'admin', log 'ACCESS_GRANTED'\n  // Otherwise, log 'ACCESS_DENIED'\n}\n\ncheckAccess('student');",
    basics: [
      { title: "If Statements", content: "If statements allow code to execute only when a condition is true. The 'else' block handles all other cases." },
      { title: "Comparison", content: "Use '===' for strict equality checking to ensure both value and type match." }
    ],
    instructions: [
      { title: "Implement the Check", content: "Write 'if (role === \"admin\") { ... }' to start the logic." },
      { title: "Default Case", content: "Use 'else' to handle non-admin roles." }
    ],
    tips: [
      { title: "Strict Equality", content: "Always prefer '===' over '==' to avoid unexpected type coercion." }
    ],
    visualType: "logic"
  },
  // FRONTEND TASKS
  {
    id: "frontend-mastery-task-1",
    title: "Virtual DOM: State Management",
    description: "The user interface needs to reflect reality. React uses 'State' to keep the screen in sync with data.",
    difficulty: "beginner",
    category: "React Hooks",
    trackId: "frontend-mastery",
    sender: { name: "Lina", role: "UI/UX Director", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lina" },
    subject: "Interactive Dashboard Components",
    priority: "medium",
    initialCode: "function SystemStatus() {\n  // 1. Use useState to track 'status' (default: false)\n  // 2. Return a button that toggles this state\n  return <button>Toggle</button>;\n}",
    basics: [
      { title: "useState", content: "The useState hook is how we store dynamic data in a React component." },
      { title: "JSX", content: "JSX allows us to write HTML-like structures inside our JavaScript code." }
    ],
    instructions: [
      { title: "Hook Initialization", content: "Add 'const [status, setStatus] = useState(false);' to your component." },
      { title: "Event Listener", content: "Add an 'onClick={() => setStatus(!status)}' to the button." }
    ],
    tips: [
      { title: "Immutability", content: "Never update state directly. Always use the setter function provided by useState." }
    ],
    visualType: "architecture"
  },
  // BACKEND TASKS
  {
    id: "backend-basics-task-1",
    title: "Request Pipeline: Express Middleware",
    description: "Every request enters through the pipeline. Middleware functions allow us to inspect or modify requests before they reach the handler.",
    difficulty: "beginner",
    category: "Node.js",
    trackId: "backend-basics",
    sender: { name: "Kai", role: "Cluster Architect", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kai" },
    subject: "Audit Log Implementation",
    priority: "high",
    initialCode: "app.use((req, res, next) => {\n  // 1. Log req.method and req.url\n  // 2. Call next() to continue the pipeline\n});",
    basics: [
      { title: "Middleware", content: "Middleware are functions that have access to the Request and Response objects and the 'next' function." },
      { title: "Next function", content: "Calling next() is mandatory to pass control to the next middleware in the stack." }
    ],
    instructions: [
      { title: "Logging", content: "Use 'console.log(req.method + \" \" + req.url);' to create the audit trail." },
      { title: "Continuity", content: "Ensure 'next()' is called at the end of the function." }
    ],
    tips: [
      { title: "Order Matters", content: "App.use() order defines the execution sequence of your middleware." }
    ],
    visualType: "architecture"
  },
  // DATABASE TASKS
  {
    id: "database-design-task-1",
    title: "Schema Blueprint: Normalization",
    description: "Data integrity is the foundation of any application. You need to design a normalized schema for a blogging platform.",
    difficulty: "beginner",
    category: "SQL Design",
    trackId: "database-design",
    sender: { name: "Sita", role: "Database Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sita" },
    subject: "Storage Schema Optimization",
    priority: "medium",
    initialCode: "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  username TEXT NOT NULL\n);\n\n-- Create posts table with foreign key",
    basics: [
      { title: "Primary Keys", content: "A primary key is a unique identifier for each record in a table." },
      { title: "Foreign Keys", content: "A foreign key is a field that links a record in one table to a primary key in another table." }
    ],
    instructions: [
      { title: "Define the Posts Table", content: "Create a table 'posts' with id, title, and author_id." },
      { title: "Enforce Relationship", content: "Add a constraint so author_id references users.id." }
    ],
    tips: [
      { title: "Naming Conventions", content: "Use snake_case for table and column names in SQL for better consistency." }
    ],
    visualType: "logic"
  },
  // SECURITY TASKS
  {
    id: "security-expert-task-1",
    title: "Auth Gateway: JWT Implementation",
    description: "The perimeter has been breached. We need to implement stateless authentication to secure our communication channels.",
    difficulty: "intermediate",
    category: "Authentication",
    trackId: "security-expert",
    sender: { name: "Zero", role: "Security Researcher", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zero" },
    subject: "Encrypted Token Handshake",
    priority: "urgent",
    initialCode: "function verifyToken(token) {\n  // 1. Check if token exists\n  // 2. Return true if 'SECRET_KEY' matches signature\n}",
    basics: [
      { title: "JWT", content: "JSON Web Tokens are an open standard for securely transmitting information between parties as a JSON object." },
      { title: "Hashing", content: "Hashing transforms data into a fixed-length string, which is one-way and cannot be reversed easily." }
    ],
    instructions: [
      { title: "Token Validation", content: "Verify that the token parameter is not null or undefined." },
      { title: "Signature Check", content: "Implement a mock signature check against a secret key." }
    ],
    tips: [
      { title: "HTTPS", content: "Tokens should only ever be transmitted over secure HTTPS connections to prevent interception." }
    ],
    visualType: "logic"
  },
  // DEVOPS TASKS
  {
    id: "devops-essentials-task-1",
    title: "Containerization: Docker Ecosystem",
    description: "Isolate the runtime. You need to build a configuration check that ensures the system knows which environment it's operating in.",
    difficulty: "beginner",
    category: "Infrastructure",
    trackId: "devops-essentials",
    sender: { name: "Nova", role: "Site Reliability Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nova" },
    subject: "Platform Configuration Audit",
    priority: "high",
    initialCode: "const ENV = 'PROD';\nlet endpoint;\n\n// 1. If ENV is 'PROD', set endpoint to 'https://api.fullit.com'\n// 2. Otherwise set it to 'http://localhost:3000'",
    basics: [
      { title: "Environment Variables", content: "These allow us to change app behavior without changing the code itself." },
      { title: "Immutability", content: "Containers are meant to be immutable; they should behave exactly the same way every time they start." }
    ],
    instructions: [
      { title: "Conditional Config", content: "Use an 'if' statement to switch the endpoint based on the ENV variable." },
      { title: "Fallback", content: "Ensure a default endpoint is set if the environment is unknown." }
    ],
    tips: [
      { title: "Secrets", content: "Never hardcode passwords or keys in environment variables that are checked into source control." }
    ],
    visualType: "memory"
  },
  // JAVA ENTERPRISE TASKS
  {
    id: "java-enterprise-task-1",
    title: "Dependency Injection: Spring Framework",
    description: "Build for scale. Inversion of control allows us to decouple components and make systems more testable.",
    difficulty: "advanced",
    category: "Design Patterns",
    trackId: "java-enterprise",
    sender: { name: "Marcus", role: "Enterprise Specialist", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
    subject: "Component Decoupling Strategy",
    priority: "medium",
    initialCode: "@Service\nclass LogService {\n  @Autowired\n  private LogRepository repository;\n  \n  public void audit() {\n    repository.findAll();\n  }\n}",
    basics: [
      { title: "Dependency Injection", content: "DI is a technique where an object receives other objects that it depends on, rather than creating them itself." },
      { title: "Annotations", content: "Java annotations like @Service and @Autowired provide metadata to the compiler and runtime." }
    ],
    instructions: [
      { title: "Service Definition", content: "Annotate the class as a @Service to register it in the Spring context." },
      { title: "Auto-wiring", content: "Use @Autowired to inject the repository dependency." }
    ],
    tips: [
      { title: "Unit Testing", content: "DI makes it easy to mock dependencies during unit tests, ensuring you're only testing one component at a time." }
    ],
    visualType: "architecture"
  }
];

export const INTERVIEWS: Interview[] = [
  {
    id: "junior-frontend-interview",
    title: "The UI Foundation",
    company: "Pixel Perfect",
    role: "Junior Frontend Developer",
    difficulty: "junior",
    trackId: "frontend-mastery",
    interviewer: {
      name: "Elena",
      role: "Senior UX Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      personality: "Encouraging but precise. Cares deeply about accessibility and clean CSS."
    },
    probes: [
      {
        id: "q1",
        type: "text",
        question: "Explain the difference between 'padding' and 'margin' in the CSS Box Model, and give a scenario where you'd use one over the other.",
        expectedFocus: ["box model", "content", "border", "spacing"]
      },
      {
        id: "q2",
        type: "code",
        question: "Write a function that takes an array of numbers and returns a new array with only the even numbers. Use the modern '.filter()' method.",
        expectedFocus: ["array methods", "filter", "arrow function"]
      }
    ]
  },
  {
    id: "frontend-interview-1",
    title: "The Reactive Handshake",
    company: "Veloce Systems",
    role: "Senior Frontend Engineer",
    difficulty: "senior",
    trackId: "frontend-mastery",
    interviewer: {
      name: "Soren",
      role: "Lead UI Architect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Soren",
      personality: "Direct, technical, values efficiency and clean abstractions."
    },
    probes: [
      {
        id: "q1",
        type: "text",
        question: "We're seeing performance degradation in our main dashboard when multiple data streams update simultaneously. How would you approach identifying and fixing the bottleneck in a React application?",
        expectedFocus: ["profiler", "memoization", "batching", "reconciliation"]
      },
      {
        id: "q2",
        type: "code",
        question: "Show me how you'd implement a custom hook 'useDebounce' to handle a search input that triggers API calls. Efficiency is key here.",
        expectedFocus: ["useEffect", "setTimeout", "cleanup"]
      }
    ]
  },
  {
    id: "junior-backend-interview",
    title: "The Data Bridge",
    company: "DataFlow Corp",
    role: "Junior Backend Developer",
    difficulty: "junior",
    trackId: "backend-basics",
    interviewer: {
      name: "Arnav",
      role: "API Specialist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arnav",
      personality: "Methodical and logic-driven. Focuses on RESTful principles and error handling."
    },
    probes: [
      {
        id: "q1",
        type: "text",
        question: "What are the common HTTP methods (GET, POST, PUT, DELETE) and which one would you use to update an existing user's profile?",
        expectedFocus: ["HTTP methods", "REST", "PUT", "PATCH"]
      }
    ]
  },
  {
    id: "backend-interview-1",
    title: "The Distributed Core",
    company: "Nexus Cloud",
    role: "Backend Engineer",
    difficulty: "mid",
    trackId: "backend-basics",
    interviewer: {
      name: "Tala",
      role: "System Reliability Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tala",
      personality: "Calm, focused on edge cases, deeply interested in scalability."
    },
    probes: [
      {
        id: "q1",
        type: "text",
        question: "How do you ensure data consistency across multiple microservices during a transaction that fails halfway through?",
        expectedFocus: ["saga pattern", "two-phase commit", "eventual consistency", "idempotency"]
      }
    ]
  },
  {
    id: "security-mid-interview",
    title: "The Perimeter Audit",
    company: "IronGuard",
    role: "SecOps Specialist",
    difficulty: "mid",
    trackId: "security-expert",
    interviewer: {
      name: "Ghost",
      role: "Penetration Tester",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ghost",
      personality: "Mysterious, skeptical, looks for vulnerabilities in every sentence."
    },
    probes: [
      {
        id: "q1",
        type: "text",
        question: "What is a Cross-Site Scripting (XSS) attack, and what is the most effective way to prevent it in a modern web application?",
        expectedFocus: ["sanitization", "content security policy", "escaping", "output encoding"]
      }
    ]
  },
  {
    id: "devops-senior-simulation",
    title: "Orchestration Crisis",
    company: "CloudScale",
    role: "Senior DevOps Engineer",
    difficulty: "senior",
    trackId: "devops-essentials",
    interviewer: {
      name: "Sven",
      role: "Infrastructure Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sven",
      personality: "No-nonsense, highly practical, hates manual intervention."
    },
    probes: [
      {
        id: "q1",
        type: "text",
        question: "Our Kubernetes cluster is experiencing 'CrashLoopBackOff' on a critical production pod. Walk me through your debugging steps from the command line.",
        expectedFocus: ["kubectl logs", "describe pod", "events", "environment variables", "resource limits"]
      }
    ]
  }
];
