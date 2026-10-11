import { GlossaryTerm } from '@stackpath/shared';

export const glossary: GlossaryTerm[] = [
  {
    term: 'API',
    abbreviation: 'API',
    fullForm: 'Application Programming Interface',
    category: 'Fundamentals',
    simpleExplanation: 'A standardized set of rules and protocols that allows one software application to talk to another software application.',
    whyItMatters: 'APIs are the connective tissue of the modern internet. Your frontend React website uses an API to ask your backend Express server for user profiles, weather data, or payment transactions.',
    example: 'A mobile banking app calling an API to check your current account balance.',
    relatedTerms: ['REST', 'HTTP', 'JSON', 'Endpoint']
  },
  {
    term: 'DOM',
    abbreviation: 'DOM',
    fullForm: 'Document Object Model',
    category: 'Frontend',
    simpleExplanation: 'The tree-like structure that a web browser creates in memory when it reads your HTML document. Each tag becomes an interactive object that JavaScript can inspect, change, or delete.',
    whyItMatters: 'Without the DOM, web pages would be completely static like printed paper. The DOM is what lets JavaScript change text on a button when you click it, or display a dropdown menu.',
    example: 'document.getElementById("submit-btn").innerText = "Saved!";',
    relatedTerms: ['HTML', 'JavaScript', 'Virtual DOM', 'Event Listener']
  },
  {
    term: 'DNS',
    abbreviation: 'DNS',
    fullForm: 'Domain Name System',
    category: 'Fundamentals',
    simpleExplanation: 'The internet\'s address book. It translates human-friendly website names like "google.com" into the computer IP addresses (like 142.250.190.46) needed to route network packets.',
    whyItMatters: 'Humans cannot memorize 12-digit numbers for every website they visit. DNS translates names instantly so the web remains usable.',
    example: 'Typing stackpath.dev in your browser triggers a DNS query to find the server\'s IP address.',
    relatedTerms: ['IP Address', 'Server', 'TCP/IP', 'URL']
  },
  {
    term: 'HTTP',
    abbreviation: 'HTTP',
    fullForm: 'HyperText Transfer Protocol',
    category: 'Fundamentals',
    simpleExplanation: 'The foundational communication protocol used by web browsers and servers to request and send web pages, images, and data.',
    whyItMatters: 'Every time you open a website, click a button, or submit a form, your browser is sending HTTP requests and reading HTTP responses.',
    example: 'GET /index.html HTTP/1.1 sent by Chrome to an Apache or Node.js web server.',
    relatedTerms: ['HTTPS', 'Request', 'Response', 'Status Code', 'REST']
  },
  {
    term: 'HTTPS',
    abbreviation: 'HTTPS',
    fullForm: 'HyperText Transfer Protocol Secure',
    category: 'Security',
    simpleExplanation: 'The encrypted version of HTTP. All communication between the browser and server is encrypted using TLS/SSL so eavesdroppers cannot steal passwords, credit cards, or personal messages.',
    whyItMatters: 'Without HTTPS, anyone on the same Wi-Fi network could see your private passwords and session cookies in plaintext.',
    example: 'The padlock icon in your browser URL bar indicating traffic is encrypted.',
    relatedTerms: ['HTTP', 'SSL/TLS', 'Encryption', 'Security']
  },
  {
    term: 'IP Address',
    abbreviation: 'IP',
    fullForm: 'Internet Protocol Address',
    category: 'Fundamentals',
    simpleExplanation: 'A unique numerical identifier assigned to every device connected to a computer network, allowing devices to locate and send messages to each other.',
    whyItMatters: 'Just like letters need physical mailing addresses to arrive in your mailbox, internet data packets need IP addresses to reach your computer.',
    example: 'IPv4 address like 192.168.1.1 or IPv6 address like 2001:0db8:85a3::8a2e:0370:7334.',
    relatedTerms: ['DNS', 'Port', 'Networking', 'Router']
  },
  {
    term: 'JSON',
    abbreviation: 'JSON',
    fullForm: 'JavaScript Object Notation',
    category: 'Fundamentals',
    simpleExplanation: 'A lightweight, human-readable text format for storing and exchanging structured data between computers.',
    whyItMatters: 'JSON is the universal data currency of web development. Even if your frontend is React and your backend is Python or Go, both communicate using JSON.',
    example: '{"name": "Alex", "role": "Developer", "isEnrolled": true}',
    relatedTerms: ['API', 'REST', 'JavaScript', 'Serialization']
  },
  {
    term: 'SQL',
    abbreviation: 'SQL',
    fullForm: 'Structured Query Language',
    category: 'Database',
    simpleExplanation: 'The standard programming language used to communicate with and manipulate relational databases like PostgreSQL, MySQL, and SQLite.',
    whyItMatters: 'Almost every enterprise application stores users, orders, and products in relational databases. SQL lets you filter, sort, join, and aggregate millions of records in milliseconds.',
    example: 'SELECT * FROM users WHERE email = \'alex@example.com\';',
    relatedTerms: ['PostgreSQL', 'Relational Database', 'Prisma', 'ORM']
  },
  {
    term: 'ORM',
    abbreviation: 'ORM',
    fullForm: 'Object-Relational Mapping',
    category: 'Database',
    simpleExplanation: 'A tool that lets software developers query and interact with database tables using the objects and types of their chosen programming language instead of writing raw SQL strings.',
    whyItMatters: 'ORMs like Prisma provide compile-time type safety, automated migrations, auto-completion, and defense against SQL injection vulnerabilities.',
    example: 'const user = await prisma.user.findUnique({ where: { id: 1 } });',
    relatedTerms: ['SQL', 'Prisma', 'Database', 'PostgreSQL']
  },
  {
    term: 'JWT',
    abbreviation: 'JWT',
    fullForm: 'JSON Web Token',
    category: 'Security',
    simpleExplanation: 'A digitally signed, tamper-proof compact token used to securely transmit identity claims between a client and a server.',
    whyItMatters: 'Allows servers to verify a user\'s identity without querying the database on every single request, enabling scalable, stateless authentication.',
    example: 'A 3-part base64 token (header.payload.signature) sent in an HTTP Authorization header or cookie.',
    relatedTerms: ['Authentication', 'Authorization', 'Cookie', 'Session']
  },
  {
    term: 'CORS',
    abbreviation: 'CORS',
    fullForm: 'Cross-Origin Resource Sharing',
    category: 'Security',
    simpleExplanation: 'A security mechanism implemented in web browsers that prevents websites on one domain (origin) from making unauthorized requests to a server on a different domain.',
    whyItMatters: 'Stops malicious websites from silently making requests to your banking API while you have a banking tab open.',
    example: 'Access-Control-Allow-Origin: https://my-frontend-app.com header sent by the Express server.',
    relatedTerms: ['HTTP', 'Security', 'Same-Origin Policy', 'Browser']
  },
  {
    term: 'CI/CD',
    abbreviation: 'CI/CD',
    fullForm: 'Continuous Integration & Continuous Deployment',
    category: 'DevOps',
    simpleExplanation: 'An automated pipeline practice where code changes are automatically tested, linted, built, and deployed to live servers every time a developer commits code.',
    whyItMatters: 'Eliminates manual human deployment errors and catches bugs in automated test runners before bad code ever reaches paying users.',
    example: 'GitHub Actions running Vitest tests whenever a Pull Request is opened.',
    relatedTerms: ['DevOps', 'Git', 'Docker', 'Testing']
  }
];
