export const projects = [
    {
        id: 'proj-1',
        projectNumber: 1,
        title: 'Personal Web Page',
        tagline: 'Structure accessible semantic markup from scratch.',
        technologies: ['HTML5', 'Semantic Web', 'Accessibility (a11y)'],
        difficulty: 'BEGINNER',
        problemStatement: 'Create a clean, accessible, semantic personal web page featuring your biography, developer goals, skills table, structured navigation, and a functional contact form.',
        learningObjectives: [
            'Write a fully valid HTML5 document with appropriate doctype, head metadata, and character encoding',
            'Use semantic landmarks (<header>, <nav>, <main>, <article>, <section>, <footer>)',
            'Organize information using proper heading hierarchy (h1 through h3)',
            'Construct accessible forms with associated <label> elements and native validation attributes'
        ],
        prerequisites: ['HTML: Beginner to Advanced (Module 4)'],
        requirements: [
            'Single index.html file with valid <!DOCTYPE html> structure',
            'One unique <h1> heading representing the page identity',
            'Navigation bar with working anchor jump links to sections',
            'Profile image with descriptive alt text',
            'Contact form with name, email, subject, message, and submit button'
        ],
        acceptanceCriteria: [
            'Document passes W3C HTML validator without errors',
            'All form inputs have explicitly linked <label for="..."> associations',
            'No generic <div> tags used where semantic alternatives exist'
        ],
        architectureOverview: 'Single-document static HTML file structured into header, main (profile article + skills section + contact section), and footer.',
        milestones: [
            {
                step: 1,
                title: 'Document Boilerplate & Head Metadata',
                description: 'Set up doctype, lang attribute, charset, viewport meta tag, and descriptive title.',
                tasks: ['Create index.html', 'Add meta viewport', 'Set title'],
                hints: ['Remember that viewport meta tag is critical for mobile devices.']
            },
            {
                step: 2,
                title: 'Header & Navigation Landmark',
                description: 'Build site branding and jump links using <header> and <nav>.',
                tasks: ['Add header and h1', 'Add nav with ul/li/a elements'],
                hints: ['Use href="#skills" to jump to element with id="skills".']
            },
            {
                step: 3,
                title: 'Content Sections & Table',
                description: 'Structure about me bio, skills breakdown table, and project links.',
                tasks: ['Add main landmark', 'Build skills table with thead, tbody, th, td'],
                hints: ['Ensure table header cells use <th scope="col">.']
            },
            {
                step: 4,
                title: 'Accessible Contact Form',
                description: 'Implement user feedback form with accessible input types.',
                tasks: ['Add form tag', 'Include input type="email" with required attribute', 'Add submit button'],
                hints: ['Never use placeholder text as a replacement for a visible <label>.']
            }
        ],
        guidedHints: [
            'Always use semantic elements over generic divs.',
            'Check alt tags on all images to ensure screen readers announce meaningful descriptions.'
        ],
        commonMistakes: [
            {
                title: 'Missing label association',
                badCode: `<input type="text" placeholder="Your Name" />`,
                goodCode: `<label for="name">Your Name</label>\n<input id="name" type="text" required />`,
                explanation: 'Screen readers cannot associate an input without an id that matches the label for attribute.',
                howToFix: 'Ensure every input has a matching label with matching id/for values.'
            }
        ],
        testingInstructions: [
            'Run the code in your browser and check for console errors.',
            'Navigate the page entirely using the Tab key to ensure focusable elements work.'
        ],
        finalReviewChecklist: [
            'Only one h1 element exists',
            'Valid HTML markup with no unclosed tags',
            'All image elements have meaningful alt attributes'
        ]
    },
    {
        id: 'proj-2',
        projectNumber: 2,
        title: 'Responsive Developer Portfolio',
        tagline: 'Design fluid layouts with CSS Grid, Flexbox, and custom properties.',
        technologies: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Media Queries'],
        difficulty: 'BEGINNER',
        problemStatement: 'Transform your personal page into a modern, responsive developer portfolio with responsive typography, mobile hamburger navigation, a projects grid, and dark/light color themes.',
        learningObjectives: [
            'Implement a consistent design system using CSS custom properties (variables)',
            'Build two-dimensional responsive layouts with CSS Grid and auto-fit/minmax',
            'Implement mobile-first responsive breakpoints using media queries',
            'Apply smooth CSS transitions and accessible color contrast ratios'
        ],
        prerequisites: ['HTML (Module 4)', 'CSS: Beginner to Advanced (Module 5)'],
        requirements: [
            'CSS variables defining color palette, spacing, and typography scale',
            'Responsive navigation bar that adapts seamlessly from mobile to desktop',
            'Projects showcase using CSS Grid that reorganizes from 1 column on mobile to 3 columns on desktop',
            'Fluid typography with clamp() and relative rem units'
        ],
        acceptanceCriteria: [
            'Zero unintended horizontal scroll on any viewport width (320px to 2560px)',
            'WCAG AA color contrast ratio (> 4.5:1) for all text elements',
            'Smooth hover states and active focus rings on all interactive elements'
        ],
        architectureOverview: 'Clean separation of index.html structure and styles.css modular styles utilizing CSS custom properties for tokens.',
        milestones: [
            {
                step: 1,
                title: 'Design Tokens & Global CSS Reset',
                description: 'Define CSS variables for slate neutrals, brand indigo accents, and box-sizing reset.',
                tasks: ['Set :root variables', 'Apply border-box reset'],
                hints: ['Use hsl() or hex tokens with consistent lightness levels.']
            },
            {
                step: 2,
                title: 'Flexbox Header & Hero Section',
                description: 'Build sticky navigation bar with flex spacing and prominent hero headline.',
                tasks: ['Align navbar with display: flex', 'Format hero headline and CTA button'],
                hints: ['Keep hero headline under 2 lines on desktop viewports.']
            },
            {
                step: 3,
                title: 'CSS Grid Projects Showcase',
                description: 'Layout project cards with grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)).',
                tasks: ['Create card grid container', 'Add project cards with tags and links'],
                hints: ['Avoid fixed pixel heights on cards to prevent text overflow.']
            },
            {
                step: 4,
                title: 'Mobile-First Media Queries',
                description: 'Refine responsive layouts for mobile viewports below 768px.',
                tasks: ['Add @media (max-width: 768px)', 'Stack columns vertically'],
                hints: ['Always test on mobile widths down to 320px.']
            }
        ],
        guidedHints: [
            'Use minmax(280px, 1fr) so grid items automatically wrap without requiring rigid media query breakpoints.'
        ],
        commonMistakes: [
            {
                title: 'Hardcoding pixel widths',
                badCode: `.card { width: 450px; }`,
                goodCode: `.card { width: 100%; max-width: 450px; }`,
                explanation: 'Fixed pixel widths break on smaller mobile screens, causing horizontal scrolling bugs.',
                howToFix: 'Use max-width with percentages or CSS Grid minmax.'
            }
        ],
        testingInstructions: [
            'Open Chrome DevTools device toolbar and resize from 320px to 1440px.',
            'Inspect Lighthouse Accessibility audit to ensure 95+ score.'
        ],
        finalReviewChecklist: [
            'No horizontal overflow on small screens',
            'All buttons have clear focus-visible states',
            'Consistent spacing scale applied throughout'
        ]
    },
    {
        id: 'proj-3',
        projectNumber: 3,
        title: 'Interactive Task Manager',
        tagline: 'DOM manipulation, event delegation, and localStorage persistence.',
        technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'DOM API', 'localStorage'],
        difficulty: 'BEGINNER',
        problemStatement: 'Build a client-side productivity app that allows users to create tasks, toggle completion, filter by status (All, Active, Completed), edit task titles, and persist state in browser localStorage.',
        learningObjectives: [
            'Manipulate the Document Object Model (DOM) dynamically with JavaScript',
            'Implement event delegation to handle dynamic list item clicks efficiently',
            'Persist application state using localStorage with JSON serialization',
            'Manage input validation and empty states gracefully'
        ],
        prerequisites: ['JavaScript Fundamentals (Module 6)', 'Browser & DOM (Module 8)'],
        requirements: [
            'Add new task with validation (no empty titles)',
            'Mark tasks complete with visual strikethrough and status toggle',
            'Delete task with confirmation or undo capability',
            'Filter buttons for All, Active, and Completed tasks',
            'State persists across browser refresh using localStorage'
        ],
        acceptanceCriteria: [
            'Tasks remain intact after closing and reopening the browser tab',
            'Event listeners attached to list parent container via event delegation',
            'Clean empty state displayed when no tasks match current filter'
        ],
        architectureOverview: 'MVC-inspired client architecture: State Object (tasks array) -> Render Function (DOM synchronization) -> Event Listeners (mutations).',
        milestones: [
            {
                step: 1,
                title: 'Data State Model & Storage Helper',
                description: 'Define task interface ({ id, title, completed, createdAt }) and load/save functions for localStorage.',
                tasks: ['Implement saveTasks()', 'Implement loadTasks()'],
                hints: ['Use JSON.stringify() to save and JSON.parse() to read.']
            },
            {
                step: 2,
                title: 'Task Form & Input Handling',
                description: 'Intercept form submission, validate input text, generate unique ID, and update state.',
                tasks: ['Add submit event listener', 'Prevent default form submission', 'Trim whitespace'],
                hints: ['Use crypto.randomUUID() or Date.now() for unique task IDs.']
            },
            {
                step: 3,
                title: 'DOM Rendering & Event Delegation',
                description: 'Render tasks to DOM and attach single click listener to task list for toggle and delete actions.',
                tasks: ['Write render() function', 'Add event delegation on ul element using e.target'],
                hints: ['Use data-id attribute on buttons to locate the target task in state.']
            },
            {
                step: 4,
                title: 'Filtering & Active Counts',
                description: 'Add filter controls and display remaining uncompleted task count.',
                tasks: ['Implement filter state', 'Render counter element'],
                hints: ['Derive counts directly from the tasks array using tasks.filter().']
            }
        ],
        guidedHints: [
            'Separate your data state from your DOM rendering. When an event fires, update the tasks array first, save to localStorage, then call render().'
        ],
        commonMistakes: [
            {
                title: 'Attaching event listeners inside a loop',
                badCode: `tasks.forEach(t => button.addEventListener('click', ...))`,
                goodCode: `taskList.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) { ... }
});`,
                explanation: 'Attaching individual listeners inside loops causes memory leaks and fails when new items are added dynamically.',
                howToFix: 'Use event delegation on the stable parent container.'
            }
        ],
        testingInstructions: [
            'Create 5 tasks, mark 2 completed, filter by Active, then refresh the page to confirm state is maintained.'
        ],
        finalReviewChecklist: [
            'Form validation prevents empty tasks',
            'Persistence works reliably with localStorage',
            'Event delegation used for list interactions'
        ]
    },
    {
        id: 'proj-4',
        projectNumber: 4,
        title: 'API-Powered Web Application',
        tagline: 'Asynchronous data fetching, search, error handling, and loading states.',
        technologies: ['JavaScript ES6+', 'Fetch API', 'async/await', 'Public REST APIs'],
        difficulty: 'INTERMEDIATE',
        problemStatement: 'Build a dynamic explorer application (such as a Country Explorer or Tech Job Search) that queries a public REST API, handles network latency with loading skeletons, catches HTTP errors, and implements debounced live search.',
        learningObjectives: [
            'Perform asynchronous network requests using modern fetch() and async/await syntax',
            'Implement complete UI lifecycle states: Loading, Success, Error, and Empty',
            'Debounce search input to prevent wasteful API rate-limiting',
            'Parse JSON responses and handle non-200 HTTP status errors gracefully'
        ],
        prerequisites: ['JavaScript Deep Dive (Module 7)', 'Browser & DOM (Module 8)', 'REST APIs (Module 13)'],
        requirements: [
            'Search input with 300ms debounce',
            'Animated loading skeleton while requests are in flight',
            'User-friendly error banner when network fails or API returns 404/500',
            'Detailed modal or card view showing rich API metadata'
        ],
        acceptanceCriteria: [
            'No application crashes on network disconnect or invalid searches',
            'Debounce utility prevents duplicate network requests during rapid typing',
            'Accessible aria-live announcements for search results count'
        ],
        architectureOverview: 'Modular frontend modules: apiService.js (HTTP fetch with error handling), debounce.js (utility), and uiController.js (DOM state rendering).',
        milestones: [
            {
                step: 1,
                title: 'API Service Layer',
                description: 'Create an isolated fetch wrapper that checks res.ok and throws descriptive errors.',
                tasks: ['Build fetchQuery(endpoint)', 'Handle non-200 HTTP statuses'],
                hints: ['Remember that fetch() does NOT reject on 404 or 500 status codes! You must check res.ok manually.']
            },
            {
                step: 2,
                title: 'Debounce Utility',
                description: 'Implement a debounce function using setTimeout and clearTimeout.',
                tasks: ['Write debounce(fn, delay)', 'Attach to search input keyup'],
                hints: ['Debounce delays execution until the user stops typing for the specified duration.']
            },
            {
                step: 3,
                title: 'State Handling: Loading & Error Skeletons',
                description: 'Render pulsing skeleton cards while waiting for response.',
                tasks: ['Create renderLoading()', 'Create renderError(message)'],
                hints: ['Use skeleton placeholders that match the size of real content cards.']
            },
            {
                step: 4,
                title: 'Data Presentation & Filter Controls',
                description: 'Map JSON results to HTML cards with responsive grid.',
                tasks: ['Render item cards', 'Implement category filter dropdown'],
                hints: ['Always sanitize and encode user-provided search text.']
            }
        ],
        guidedHints: [
            'Always check if (response.ok === false) before calling response.json() to capture HTTP error payloads.'
        ],
        commonMistakes: [
            {
                title: 'Assuming fetch throws on 404',
                badCode: `try {
  const res = await fetch('/api/data');
  const data = await res.json();
} catch (err) {
  // Never triggers on 404!
}`,
                goodCode: `const res = await fetch('/api/data');
if (!res.ok) {
  throw new Error('HTTP error ' + res.status);
}
const data = await res.json();`,
                explanation: 'Fetch only rejects a Promise on complete network failure (like offline), not on HTTP 404 or 500 error responses.',
                howToFix: 'Always check if (!res.ok) and throw an explicit Error.'
            }
        ],
        testingInstructions: [
            'Test searching with valid terms, invalid terms (empty results), and simulate offline mode in DevTools Network tab.'
        ],
        finalReviewChecklist: [
            'All 4 UI states (loading, success, error, empty) tested and functional',
            'Search input is properly debounced',
            'Error states offer a retry action'
        ]
    },
    {
        id: 'proj-5',
        projectNumber: 5,
        title: 'TypeScript & React Analytics Dashboard',
        tagline: 'Component architecture, strict static typing, and client routing.',
        technologies: ['React 18+', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'],
        difficulty: 'INTERMEDIATE',
        problemStatement: 'Build a production-grade analytics dashboard in React and TypeScript featuring collapsible sidebar navigation, modular metric cards, interactive data filtering, and strict type safety.',
        learningObjectives: [
            'Architect maintainable React applications with reusable component hierarchies',
            'Model complex UI state and API payloads using TypeScript interfaces and union types',
            'Manage client routing with React Router (nested routes and parameters)',
            'Leverage Tailwind CSS utility tokens for responsive, modern UI design'
        ],
        prerequisites: ['TypeScript (Module 10)', 'React Fundamentals (Module 11)', 'Advanced React (Module 12)'],
        requirements: [
            'Strict TypeScript configuration with zero "any" types',
            'Collapsible sidebar navigation with active route highlights',
            'Modular KPI metric cards displaying stats, trends, and change percentages',
            'Interactive data table with search, sorting, and pagination controls'
        ],
        acceptanceCriteria: [
            'Zero TypeScript compiler errors (tsc passes cleanly)',
            'Responsive on both mobile devices and wide desktop monitors',
            'Accessible keyboard navigation for tabs and dropdown filters'
        ],
        architectureOverview: 'Modern React structure: components/ (atoms & molecules), pages/ (route views), types/ (TypeScript interfaces), and hooks/ (custom state logic).',
        milestones: [
            {
                step: 1,
                title: 'Vite & TypeScript Setup',
                description: 'Initialize project with Vite React-TS template and configure Tailwind CSS.',
                tasks: ['Setup tsconfig', 'Configure Tailwind v4 / tokens'],
                hints: ['Enable strict: true in tsconfig.json.']
            },
            {
                step: 2,
                title: 'Type Definitions & Mock Data',
                description: 'Define strong interfaces for User, Metric, Order, and DashboardState.',
                tasks: ['Create types/dashboard.ts', 'Create fixtures/mockData.ts'],
                hints: ['Use union types for status fields (e.g., status: "active" | "pending" | "archived").']
            },
            {
                step: 3,
                title: 'Layout Shell & Routing',
                description: 'Construct top navigation bar, collapsible sidebar, and React Router outlet.',
                tasks: ['Build Sidebar and Topbar', 'Setup createBrowserRouter'],
                hints: ['Keep sidebar state in a lightweight context or custom hook.']
            },
            {
                step: 4,
                title: 'KPI Cards & Filterable Table',
                description: 'Implement reusable StatCard components and paginated data table.',
                tasks: ['Build StatCard component', 'Build Table with search and pagination'],
                hints: ['Derive filtered records using useMemo for optimal render performance.']
            }
        ],
        guidedHints: [
            'Never use any in TypeScript. Model your data accurately with interfaces or type aliases.'
        ],
        commonMistakes: [
            {
                title: 'Type assertion abuse (using "as any")',
                badCode: `const data = response as any;`,
                goodCode: `interface DashboardPayload {
  metrics: Metric[];
}
const data = response as DashboardPayload;`,
                explanation: 'Using "any" defeats the entire purpose of TypeScript and hides type bugs.',
                howToFix: 'Create explicit interface definitions.'
            }
        ],
        testingInstructions: [
            'Run npm run build to verify zero compile or type errors.',
            'Test sidebar collapse on mobile and desktop viewports.'
        ],
        finalReviewChecklist: [
            'TypeScript strict mode passes without warnings',
            'Components are cleanly decomposed and reusable',
            'Loading and empty table states are accounted for'
        ]
    },
    {
        id: 'proj-6',
        projectNumber: 6,
        title: 'RESTful API with Node.js & Express',
        tagline: 'Layered architecture, Zod validation, and centralized error handling.',
        technologies: ['Node.js', 'Express.js', 'TypeScript', 'Zod', 'REST Architecture'],
        difficulty: 'INTERMEDIATE',
        problemStatement: 'Design and build a professional backend REST API from scratch using Express and TypeScript. Implement a layered architecture (Routes -> Controllers -> Services), Zod request schema validation, and centralized error handling.',
        learningObjectives: [
            'Architect maintainable backend applications using the Layered Architecture pattern',
            'Validate incoming request bodies, params, and queries with Zod schemas',
            'Design clean REST endpoints with proper HTTP status codes and headers',
            'Build centralized Express error-handling middleware'
        ],
        prerequisites: ['Node.js (Module 14)', 'Express.js (Module 15)', 'Web Architecture & REST (Module 13)'],
        requirements: [
            'Complete CRUD endpoints for a resource (e.g., /api/articles or /api/courses)',
            'Zod validation middleware that returns structured 400 Bad Request error lists',
            'Custom ApplicationError class hierarchy (BadRequest, NotFound, Unauthorized)',
            'Security headers with Helmet and CORS configuration'
        ],
        acceptanceCriteria: [
            'Invalid request bodies are rejected with detailed field-by-field error messages',
            'All responses adhere to standardized JSON envelopes',
            'Unit and integration tests verify endpoint status codes and payloads'
        ],
        architectureOverview: 'src/routes/ -> src/controllers/ -> src/services/ -> src/middleware/ (validation, error handler) -> src/types/.',
        milestones: [
            {
                step: 1,
                title: 'Express & TypeScript Scaffolding',
                description: 'Initialize Express app with json parser, cors, and helmet.',
                tasks: ['Configure app.ts', 'Set up server entry point'],
                hints: ['Separate app.ts (Express setup) from server.ts (app.listen) for easy testing.']
            },
            {
                step: 2,
                title: 'Zod Validation Middleware',
                description: 'Create a reusable middleware function: validate(schema) that parses req.body, req.query, or req.params.',
                tasks: ['Write validateRequest middleware', 'Define resource Zod schemas'],
                hints: ['Use schema.parse() inside try/catch and pass errors to next(error).']
            },
            {
                step: 3,
                title: 'Controllers & Service Layer',
                description: 'Build controllers that extract validated params and invoke services containing business logic.',
                tasks: ['Build CRUD controllers', 'Implement in-memory data store service'],
                hints: ['Keep controllers thin; place business rules inside service files.']
            },
            {
                step: 4,
                title: 'Centralized Error Handling Middleware',
                description: 'Capture all thrown errors and format into consistent JSON responses.',
                tasks: ['Write errorHandler middleware', 'Define custom AppError class'],
                hints: ['Ensure errorHandler takes 4 arguments: (err, req, res, next).']
            }
        ],
        guidedHints: [
            'Express recognizes error-handling middleware ONLY when it accepts four parameters: (err, req, res, next). Never omit the fourth parameter!'
        ],
        commonMistakes: [
            {
                title: 'Uncaught asynchronous errors in Express handlers',
                badCode: `app.get('/items', async (req, res) => {
  const items = await getItems(); // If this throws, server hangs!
  res.json(items);
});`,
                goodCode: `app.get('/items', async (req, res, next) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (err) {
    next(err); // Hands error to centralized error middleware!
  }
});`,
                explanation: 'Uncaught errors in async Express handlers cause requests to hang indefinitely.',
                howToFix: 'Wrap in try/catch and forward errors to next(err).'
            }
        ],
        testingInstructions: [
            'Write tests with Supertest to verify that POST with invalid data returns 400 and valid data returns 201.'
        ],
        finalReviewChecklist: [
            'All endpoints return correct status codes (200, 201, 204, 400, 404)',
            'Layered architecture cleanly decouples HTTP handling from business logic',
            'No secrets or passwords logged to console'
        ]
    },
    {
        id: 'proj-7',
        projectNumber: 7,
        title: 'Relational Database Application',
        tagline: 'PostgreSQL modeling, pure SQL queries, relations, and Prisma ORM.',
        technologies: ['PostgreSQL', 'SQL', 'Prisma ORM', 'TypeScript'],
        difficulty: 'INTERMEDIATE',
        problemStatement: 'Design and query a multi-table relational database for an e-commerce or school management platform. Implement 1-to-many and many-to-many relations, constraints, database migrations, and complex SQL joins.',
        learningObjectives: [
            'Design normalized relational schemas (1NF, 2NF, 3NF) with primary and foreign keys',
            'Write complex SQL queries involving INNER JOIN, LEFT JOIN, aggregations, and GROUP BY',
            'Model relational entities in Prisma schema and execute migrations',
            'Execute atomic database transactions for safe multi-step operations'
        ],
        prerequisites: ['Database Fundamentals & SQL (Module 16)', 'PostgreSQL & Prisma (Module 17)'],
        requirements: [
            'Multi-table schema: Users, Products, Categories, Orders, OrderItems',
            'Foreign key constraints with ON DELETE CASCADE or RESTRICT policies',
            'Automated seed script that populates realistic relational fixture data',
            'Repository functions executing type-safe queries using Prisma Client'
        ],
        acceptanceCriteria: [
            'Database migrations apply cleanly from empty state',
            'Referential integrity enforced by database constraints',
            'Seed script runs idempotently without duplicate key errors'
        ],
        architectureOverview: 'prisma/schema.prisma (data models & relations), prisma/migrations/ (schema evolution), prisma/seed.ts (fixtures), and src/db/ (Prisma client singleton).',
        milestones: [
            {
                step: 1,
                title: 'Schema Modeling & Relations',
                description: 'Define models for Users, Orders, and Items with 1-to-many and many-to-many relationships.',
                tasks: ['Write schema.prisma models', 'Set up foreign key relations'],
                hints: ['Use @@index on foreign keys for query performance.']
            },
            {
                step: 2,
                title: 'Database Migrations',
                description: 'Generate and execute migration files to create database tables.',
                tasks: ['Run prisma migrate dev', 'Inspect generated SQL migration'],
                hints: ['Always inspect the generated SQL to ensure tables and constraints match expectations.']
            },
            {
                step: 3,
                title: 'Seed Script Implementation',
                description: 'Write an automated script to populate seed users, categories, and items.',
                tasks: ['Build seed.ts', 'Configure prisma db seed script'],
                hints: ['Use upsert or clear existing records before seeding in development.']
            },
            {
                step: 4,
                title: 'Complex Queries & Aggregations',
                description: 'Write queries to calculate total revenue, top-selling items, and user purchase histories.',
                tasks: ['Implement aggregate queries', 'Implement multi-model transactions'],
                hints: ['Use prisma.$transaction for operations that must succeed or fail together.']
            }
        ],
        guidedHints: [
            'Always wrap operations like order creation (deducting stock + creating order record) in a database transaction to prevent inconsistencies.'
        ],
        commonMistakes: [
            {
                title: 'The N+1 Query Problem',
                badCode: `// Fetching 50 orders, then making 50 separate queries for user!
const orders = await prisma.order.findMany();
for (const order of orders) {
  const user = await prisma.user.findUnique({ where: { id: order.userId } });
}`,
                goodCode: `// Single query using Prisma include:
const orders = await prisma.order.findMany({
  include: { user: true }
});`,
                explanation: 'Making database queries inside a loop creates an N+1 query performance bottleneck that collapses databases under load.',
                howToFix: 'Use Prisma include or SQL JOINs to fetch related data in a single round-trip.'
            }
        ],
        testingInstructions: [
            'Run database migrations, execute the seed script, and verify query output in Prisma Studio.'
        ],
        finalReviewChecklist: [
            'Unique constraints on email and username',
            'Cascade delete policies configured intentionally',
            'Transactions used for multi-table writes'
        ]
    },
    {
        id: 'proj-8',
        projectNumber: 8,
        title: 'Full-Stack Task & Goal Management Platform',
        tagline: 'Complete React frontend, Express API, PostgreSQL, JWT Auth, and automated tests.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'Vitest'],
        difficulty: 'ADVANCED',
        problemStatement: 'Build a production-grade full-stack application from scratch. Features user registration, bcrypt password hashing, secure JWT authentication in HTTP-only cookies, protected CRUD endpoints, database persistence, responsive UI, and automated integration tests.',
        learningObjectives: [
            'Integrate React frontend with Express backend using secure token-based authentication',
            'Protect backend endpoints using authentication and resource authorization middleware',
            'Persist all data in PostgreSQL through Prisma ORM',
            'Write automated tests for both backend APIs and frontend components'
        ],
        prerequisites: ['All Modules 1 through 19'],
        requirements: [
            'User registration with password validation and bcrypt hashing (10 salt rounds)',
            'JWT login with tokens delivered via secure HTTP-only cookies',
            'User-specific tasks: users can only view, edit, and delete their own tasks',
            'Real-time status filtering, task searching, and date sorting',
            'Automated backend API tests using Supertest and frontend tests with Vitest'
        ],
        acceptanceCriteria: [
            'A user cannot access or modify another user\'s tasks by altering IDs in URLs',
            'Data survives browser refresh and server restarts',
            'Zero plaintext passwords stored in the database',
            'All automated tests pass cleanly'
        ],
        architectureOverview: 'Monorepo architecture: apps/web (React Vite client), apps/api (Express REST server), and packages/shared (common types and Zod schemas).',
        milestones: [
            {
                step: 1,
                title: 'Authentication Engine & DB Schema',
                description: 'Model User and Task in Prisma, implement register and login endpoints with bcrypt and JWT.',
                tasks: ['Build User model', 'Implement auth controller and JWT sign/verify'],
                hints: ['Store passwords using bcrypt.hash(password, 10).']
            },
            {
                step: 2,
                title: 'Auth Middleware & Protected Endpoints',
                description: 'Create requireAuth middleware and scope all task queries to req.user.id.',
                tasks: ['Build requireAuth middleware', 'Implement user-scoped CRUD routes'],
                hints: ['Never trust user IDs passed in request bodies; read user.id from the verified token.']
            },
            {
                step: 3,
                title: 'React Client & Auth Context',
                description: 'Build React UI with login/register forms, AuthContext, and protected routes.',
                tasks: ['Implement AuthContext', 'Create ProtectedRoute wrapper', 'Build Task UI'],
                hints: ['Handle loading states while checking initial authentication token on page load.']
            },
            {
                step: 4,
                title: 'Automated Test Suite',
                description: 'Write integration tests verifying authentication barriers and resource isolation.',
                tasks: ['Write Supertest API tests', 'Write Vitest frontend tests'],
                hints: ['Test that requesting another user\'s task returns 403 or 404.']
            }
        ],
        guidedHints: [
            'Enforce authorization on the backend, not just the frontend. If user A tries to delete user B\'s task, the backend must reject it with 403 or 404.'
        ],
        commonMistakes: [
            {
                title: 'Storing JWT tokens in localStorage',
                badCode: `localStorage.setItem('token', token); // Vulnerable to XSS theft!`,
                goodCode: `res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax'
});`,
                explanation: 'Tokens stored in localStorage can be stolen by malicious third-party scripts via Cross-Site Scripting (XSS). HTTP-only cookies cannot be read by JavaScript.',
                howToFix: 'Store session tokens in HTTP-only, secure cookies.'
            }
        ],
        testingInstructions: [
            'Run npm test in both api and web workspaces to ensure all integration test cases pass.'
        ],
        finalReviewChecklist: [
            'Authentication persists across browser refresh',
            'Data isolation between different user accounts verified',
            'Automated tests cover registration, login, and CRUD operations'
        ]
    },
    {
        id: 'proj-9',
        projectNumber: 9,
        title: 'Enterprise Mini CRM',
        tagline: 'Contacts, companies, pipeline status, search, filtering, and reporting.',
        technologies: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'TanStack Query'],
        difficulty: 'ADVANCED',
        problemStatement: 'Build a Customer Relationship Management (CRM) application managing Companies, Contacts, Deals, and Pipelines. Features server-side pagination, multi-field filtering, optimistic updates, and activity audit trails.',
        learningObjectives: [
            'Manage complex relational data structures in enterprise full-stack workflows',
            'Implement server-side pagination, sorting, and multi-parameter filtering',
            'Use TanStack Query for cache invalidation and optimistic UI updates',
            'Design clean audit trails tracking record changes over time'
        ],
        prerequisites: ['Full-Stack Integration (Module 19)', 'Testing (Module 20)'],
        requirements: [
            'Manage Companies with associated Contacts and Deals',
            'Interactive pipeline view (Lead, Contacted, Proposal, Closed-Won, Closed-Lost)',
            'Server-side paginated contacts list with search and column sorting',
            'Activity log tracking when records are created or updated'
        ],
        acceptanceCriteria: [
            'Pagination handles thousands of records efficiently using SQL limit/offset or cursor pagination',
            'Optimistic updates update UI instantly while rolling back on network failure',
            'Company deletion handles related contacts according to defined business rules'
        ],
        architectureOverview: 'Full-stack monorepo featuring TanStack Query for server state caching and Prisma for relational joins.',
        milestones: [
            {
                step: 1,
                title: 'CRM Schema & Relational Models',
                description: 'Define Company, Contact, Deal, and Activity models with appropriate relations.',
                tasks: ['Build CRM Prisma models', 'Add indexes on search fields'],
                hints: ['Index companyId and email fields for fast lookups.']
            },
            {
                step: 2,
                title: 'Paginated Backend APIs',
                description: 'Build endpoints supporting page, limit, sortField, sortOrder, and search query parameters.',
                tasks: ['Build paginated contacts controller', 'Implement total count calculations'],
                hints: ['Return { data: [...], pagination: { total, page, totalPages } } in API responses.']
            },
            {
                step: 3,
                title: 'Pipeline Kanban Board in React',
                description: 'Build visual deal pipeline with status columns and quick-update actions.',
                tasks: ['Construct Pipeline view', 'Implement status update mutation'],
                hints: ['Use optimistic updates in TanStack Query to eliminate perceived latency.']
            },
            {
                step: 4,
                title: 'Activity Feed & Reporting',
                description: 'Log record mutations and display summary analytics of won/lost deals.',
                tasks: ['Add ActivityLog entries on mutations', 'Build summary dashboard widget'],
                hints: ['Use database transactions when creating a deal and its corresponding activity entry.']
            }
        ],
        guidedHints: [
            'Use cursor-based pagination for large datasets where offset performance degrades.'
        ],
        commonMistakes: [
            {
                title: 'Unbounded database queries',
                badCode: `const contacts = await prisma.contact.findMany(); // Returns all 100,000 rows!`,
                goodCode: `const contacts = await prisma.contact.findMany({
  take: limit,
  skip: (page - 1) * limit
});`,
                explanation: 'Querying all rows without pagination causes server memory exhaustion when data grows.',
                howToFix: 'Always enforce limit and offset (or cursor) pagination on list endpoints.'
            }
        ],
        testingInstructions: [
            'Seed 100 mock contacts and verify pagination controls navigate pages correctly.'
        ],
        finalReviewChecklist: [
            'Server-side pagination verified with high record counts',
            'Optimistic updates roll back smoothly on error',
            'Activity audit log records all user changes'
        ]
    },
    {
        id: 'proj-10',
        projectNumber: 10,
        title: 'Real-Time Team Collaboration Application',
        tagline: 'Bidirectional WebSockets, real-time presence, and instant chat channels.',
        technologies: ['React', 'Node.js', 'Express', 'Socket.IO', 'WebSockets', 'Redis', 'PostgreSQL'],
        difficulty: 'ADVANCED',
        problemStatement: 'Build a team collaboration platform with real-time chat channels, user online presence indicators, typing indicators, and instant notification alerts using WebSockets.',
        learningObjectives: [
            'Understand the difference between HTTP request/response and bidirectional WebSocket connections',
            'Implement real-time messaging with Socket.IO and event listeners',
            'Manage real-time state: online presence, typing indicators, and channel joins',
            'Authenticate WebSocket handshake connections securely using JWT tokens'
        ],
        prerequisites: ['Advanced Features & WebSockets (Module 22)'],
        requirements: [
            'Multi-channel chat rooms (e.g., #general, #development, #design)',
            'Instant message delivery without polling or manual page refreshing',
            'Real-time user presence (who is online right now in the channel)',
            'Typing indicators ("Alex is typing...") with automatic timeout'
        ],
        acceptanceCriteria: [
            'Messages sent by one user appear immediately in other active browsers in the room',
            'Users who disconnect are promptly removed from the online presence list',
            'WebSocket connections are authenticated before allowing channel subscription'
        ],
        architectureOverview: 'Express HTTP server paired with Socket.IO server, sharing JWT authentication middleware and PostgreSQL message persistence.',
        milestones: [
            {
                step: 1,
                title: 'Socket.IO Server & Auth Handshake',
                description: 'Initialize Socket.IO on top of Node HTTP server and verify JWT token in connection handshake.',
                tasks: ['Configure Socket.IO server', 'Add handshake authentication middleware'],
                hints: ['Read token from socket.handshake.auth.token.']
            },
            {
                step: 2,
                title: 'Channel Rooms & Message Persistence',
                description: 'Implement socket.join(channelId) and broadcast message events to room members.',
                tasks: ['Save messages to PostgreSQL', 'Emit message event to room: io.to(channelId).emit()'],
                hints: ['Persist message to database before emitting to the room to guarantee order.']
            },
            {
                step: 3,
                title: 'React WebSocket Client Hook',
                description: 'Build a custom useSocket hook that handles connect, disconnect, and event listeners.',
                tasks: ['Build useSocket hook', 'Attach listeners inside useEffect with cleanups'],
                hints: ['Always remove event listeners in the useEffect cleanup callback to prevent duplicate handlers.']
            },
            {
                step: 4,
                title: 'Presence & Typing Indicators',
                description: 'Emit typing and stop-typing events with debounced timer.',
                tasks: ['Implement typing state', 'Manage online presence map'],
                hints: ['Clear typing indicator after 2 seconds of inactivity.']
            }
        ],
        guidedHints: [
            'Always clean up socket listeners in React useEffect returns: socket.off("message", handleMessage).'
        ],
        commonMistakes: [
            {
                title: 'Memory leaks from duplicate socket listeners',
                badCode: `useEffect(() => {
  socket.on('message', onMessage); // No cleanup! Re-attaches on every render!
});`,
                goodCode: `useEffect(() => {
  socket.on('message', onMessage);
  return () => {
    socket.off('message', onMessage);
  };
}, [socket]);`,
                explanation: 'Failing to clean up socket listeners causes messages to be handled 5, 10, or 20 times as components re-render.',
                howToFix: 'Always remove listeners in the cleanup return function.'
            }
        ],
        testingInstructions: [
            'Open two browser windows side by side, send a message in one, and verify instantaneous delivery in the other.'
        ],
        finalReviewChecklist: [
            'Handshake authentication rejects unauthorized connections',
            'Rooms cleanly isolate channel messages',
            'Presence updates accurately on tab close'
        ]
    },
    {
        id: 'proj-11',
        projectNumber: 11,
        title: 'Independent Capstone: Production SaaS Application',
        tagline: 'End-to-end architecture, implementation, automated tests, Docker, and CI/CD.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Docker', 'GitHub Actions'],
        difficulty: 'ADVANCED',
        problemStatement: 'Design and build your own independent full-stack product from concept to production readiness. Formulate requirements, design database models, define OpenAPI contracts, build the UI and backend, test extensively, containerize with Docker, and configure automated CI/CD deployment.',
        learningObjectives: [
            'Formulate software requirements and architecture independently without guided hand-holding',
            'Design normalized databases and perform safe schema migrations',
            'Build resilient frontend and backend systems adhering to clean architecture standards',
            'Containerize applications with Docker and automate tests with GitHub Actions CI'
        ],
        prerequisites: ['All Modules 1 through 25'],
        requirements: [
            'Complete production-ready software system of your choosing (e.g. Learning Management, Marketplace, SaaS Tool)',
            'Architectural Decision Record (ADR) documenting technology choices',
            'Docker Compose configuration running web, api, and postgres services',
            'Automated CI pipeline executing tests and linting on every push',
            'Comprehensive README with installation, environment config, and operational guide'
        ],
        acceptanceCriteria: [
            'Application starts seamlessly with a single command (docker compose up or npm run dev)',
            'Security audit passes with zero critical or high vulnerabilities',
            'Lighthouse performance and accessibility score > 90',
            'Demonstrates true independence as a full-stack software engineer'
        ],
        architectureOverview: 'Fully containerized multi-tier application orchestrated via Docker Compose, monitored with structured logging and health checks.',
        milestones: [
            {
                step: 1,
                title: 'Product Requirements & Architecture Blueprint',
                description: 'Define problem statement, user personas, API contracts, and database schema diagrams.',
                tasks: ['Author ARCHITECTURE.md and ADRs', 'Draft schema.prisma'],
                hints: ['Define your data models and API contracts before writing code.']
            },
            {
                step: 2,
                title: 'Backend API & Database Persistence',
                description: 'Build authenticated Express REST backend, validation schemas, and database migrations.',
                tasks: ['Build backend services', 'Write seed scripts and migrations'],
                hints: ['Write Supertest integration tests alongside API implementation.']
            },
            {
                step: 3,
                title: 'Frontend Client & Responsive Design',
                description: 'Build polished, accessible React frontend with state management and responsive styling.',
                tasks: ['Build UI views and forms', 'Implement error and loading states'],
                hints: ['Follow high-end design aesthetics with consistent tokens and accessible contrast.']
            },
            {
                step: 4,
                title: 'Containerization, CI/CD & Production Hardening',
                description: 'Author multi-stage Dockerfiles, docker-compose.yml, and GitHub Actions CI workflow.',
                tasks: ['Write Dockerfiles', 'Configure CI workflow', 'Author operational documentation'],
                hints: ['Use multi-stage Docker builds to keep production image sizes minimal.']
            }
        ],
        guidedHints: [
            'Treat production readiness as a mindset: test failure paths, secure your endpoints, handle network drops, and document setup clearly.'
        ],
        commonMistakes: [
            {
                title: 'Hardcoding secrets in source files or Dockerfiles',
                badCode: `const JWT_SECRET = "supersecret123";`,
                goodCode: `const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is missing");`,
                explanation: 'Hardcoding secrets leaks credentials to source control and makes production deployment insecure.',
                howToFix: 'Always use environment variables and document them in .env.example.'
            }
        ],
        testingInstructions: [
            'Execute all unit, integration, and linting checks; verify docker compose up launches all containers successfully.'
        ],
        finalReviewChecklist: [
            'Application fully operational from zero setup',
            'All tests passing in CI',
            'Complete documentation ready for team onboarding'
        ]
    }
];
//# sourceMappingURL=projects.js.map