export const lessons = [
    // ==========================================
    // Module 1, Lesson 1: How Computers Work & Execute Code
    // ==========================================
    {
        id: 'les-1-1',
        moduleId: 'mod-1',
        slug: 'how-computers-work-and-execute-code',
        order: 1,
        title: 'How Computers Think & Execute Code',
        subtitle: 'From Silicon and Transistors to Human-Readable Instructions',
        estimatedMinutes: 12,
        difficulty: 'BEGINNER',
        section1_whatYouWillLearn: [
            'Understand the fundamental difference between physical hardware and digital software.',
            'Explain how the Central Processing Unit (CPU) and Random Access Memory (RAM) work together.',
            'Define what source code is and why humans do not write raw binary (1s and 0s).',
            'Describe how an instruction travels from your text editor to silicon execution.'
        ],
        section2_simpleEnglishConcept: `At its core, a computer is not a conscious brain; it is an ultra-fast electronic calculator. 

Hardware refers to the physical components you can touch—like the metal chips, memory sticks, screen, and keyboard. Software refers to the invisible instructions that tell that hardware what to do.

Inside your computer's Central Processing Unit (CPU) are billions of microscopic electronic switches called transistors. Each switch can either be ON (electricity flowing, represented as 1) or OFF (no electricity, represented as 0). 

Because humans cannot easily write or think in billions of 1s and 0s, we write **source code**—instructions written in English-like programming languages. A computer program is simply a structured recipe of actions written by a human and translated so the computer's CPU can execute it step by step.`,
        section3_whyNeeded: `Imagine trying to cook a gourmet dinner if recipes were only written in quantum chemical equations. It would take weeks to prepare a single meal, and a single mistake would ruin everything.

Without programming languages and operating systems, programmers would have to manually toggle electrical voltages or write raw binary machine code to perform even the simplest task, like showing a letter on a screen. 

Programming languages exist so human beings can express complex logic, build creative applications, and automate tasks quickly without having to worry about physical electrical currents.`,
        section4_howItWorks: {
            steps: [
                {
                    stepNumber: 1,
                    title: 'Authoring Source Code',
                    description: 'A developer types instructions using a text editor or IDE (such as VS Code) into a text file, for example index.js or app.py.'
                },
                {
                    stepNumber: 2,
                    title: 'Loading into Memory (RAM)',
                    description: 'When you tell the computer to run your file, the Operating System reads the file from disk storage (SSD) and loads the instructions into high-speed temporary memory (RAM).'
                },
                {
                    stepNumber: 3,
                    title: 'Translation (Compiling or Interpreting)',
                    description: 'A specialized program (a compiler or interpreter) translates the English-like syntax into binary machine code that your specific CPU understands.'
                },
                {
                    stepNumber: 4,
                    title: 'Fetch, Decode, Execute Cycle',
                    description: 'The CPU reads each instruction from RAM, decodes what electrical switches need to flip, and executes the math or logic millions of times per second.'
                }
            ],
            mentalModelOrDiagram: `[Developer writes code in text file]
                │
                ▼
      [Loaded into RAM]
                │
                ▼
[Compiler / Interpreter translates to Machine Code]
                │
                ▼
[CPU: Fetch -> Decode -> Execute instructions]`
        },
        section5_syntaxAndExamples: {
            overview: 'Here is what an instruction looks like in human-readable code versus what the machine actually does.',
            codeBlocks: [
                {
                    language: 'javascript',
                    filename: 'welcome.js',
                    code: `// This is a human instruction:
const userName = "Alex";
const greeting = "Welcome to StackPath Academy, " + userName + "!";

console.log(greeting);`,
                    explanation: `Line 1: We instruct the computer to reserve a small box in RAM labeled "userName" and store the text "Alex".
Line 2: We combine that text into a new sentence stored in "greeting".
Line 4: We invoke console.log, which tells the operating system to draw those characters onto the screen.`
                }
            ]
        },
        section6_realWorldApplication: `Every time you unlock your smartphone, stream a video on Netflix, or check your bank balance online, billions of CPU execution cycles just like this occur. When you write a web application later in this academy, your JavaScript code will execute inside the user's browser CPU to render buttons, handle clicks, and process data.`,
        section7_commonMistakes: [
            {
                title: 'Assuming the computer knows what you intended',
                badCode: `// Trying to print without quotes
console.log(Hello World);`,
                goodCode: `// Explicitly wrapping text in quotation marks
console.log("Hello World");`,
                explanation: 'Computers have zero intuition. If you omit quotes around text, the computer assumes Hello and World are variables or keywords and throws a SyntaxError.',
                howToFix: 'Always wrap human text in single or double quotes so the computer knows it is literal text data (a string).'
            }
        ],
        section8_guidedPractice: {
            task: 'Predict the computer memory state: If you store the number 10 in a variable named "score", then add 5 to it, what value is stored in RAM?',
            hints: [
                'Think of a variable as a labeled storage container in memory.',
                'Initial state: score contains 10.',
                'Action: score = score + 5.'
            ],
            expectedBehavior: 'The container "score" will hold the value 15.',
            successCriteria: [
                'Understand that variables hold values in memory.',
                'Recognize that updating a variable changes its stored contents in RAM.'
            ],
            starterCode: `let score = 10;
score = score + 5;
console.log(score);`,
            solution: `15`,
            solutionExplanation: `The computer allocates memory for 'score' with value 10, then fetches that value, adds 5 using its CPU arithmetic unit, and overwrites the memory container with 15.`
        },
        section9_knowledgeCheckQuestions: [
            {
                question: 'What is the primary role of the CPU in a computer?',
                options: [
                    'To permanently store your photos and videos when the power is turned off',
                    'To execute calculations and instructions step-by-step at high speed',
                    'To physically connect your computer to Wi-Fi networks',
                    'To generate web pages directly without needing software'
                ],
                correctIndex: 1,
                explanation: 'The CPU (Central Processing Unit) is the processing engine that performs arithmetic, logic, and instruction execution.'
            },
            {
                question: 'Why do software engineers write code in languages like JavaScript or Python instead of raw binary?',
                options: [
                    'Because computers actually do not understand binary at all',
                    'Because binary is too slow for modern internet connections',
                    'Because human-readable code allows developers to express complex logic reliably without managing millions of 0s and 1s by hand',
                    'Because operating systems forbid binary files from running'
                ],
                correctIndex: 2,
                explanation: 'Programming languages provide human-friendly abstractions that compilers or interpreters translate into binary machine instructions.'
            },
            {
                question: 'What happens to the data stored in temporary memory (RAM) when a computer is powered off?',
                options: [
                    'It is automatically backed up to the internet',
                    'It is lost immediately because RAM is volatile memory',
                    'It is converted into a permanent PDF file',
                    'It remains intact forever until deleted by the user'
                ],
                correctIndex: 1,
                explanation: 'RAM is volatile memory; it requires electrical power to retain data. Permanent storage (SSD/HDD) retains data when powered down.'
            }
        ],
        section10_rememberThesePoints: [
            'Hardware is the physical machine; software is the set of instructions that controls it.',
            'The CPU executes calculations; RAM holds the active instructions and data temporarily.',
            'Source code is English-like instructions written by humans.',
            'Computers execute exactly what you write, not what you intended to write.'
        ],
        section11_independentMasteryCriteria: [
            'Can explain the role of CPU, RAM, and storage in your own words without checking notes.',
            'Can explain what happens when you run a program.',
            'Can clearly distinguish between source code and machine code.'
        ],
        advancedDeepDive: {
            title: 'Transistors, Logic Gates & Moore\'s Law',
            content: `A modern computer processor contains upwards of 15 billion transistors etched at the nanometer scale. By combining transistors into arrangements called Logic Gates (AND, OR, NOT, XOR), the computer can perform basic binary addition. By chaining millions of these gates together, the processor can execute billions of arithmetic operations, 3D graphics renders, and encrypted network transmissions every second.`
        }
    },
    // ==========================================
    // Module 1, Lesson 2: Interpreted vs Compiled Languages
    // ==========================================
    {
        id: 'les-1-2',
        moduleId: 'mod-1',
        slug: 'interpreted-vs-compiled-languages',
        order: 2,
        title: 'Interpreted vs Compiled Languages',
        subtitle: 'How Source Code Becomes Machine Reality',
        estimatedMinutes: 14,
        difficulty: 'BEGINNER',
        section1_whatYouWillLearn: [
            'Understand the fundamental difference between compiling and interpreting code.',
            'Discover why languages like C++ and Rust produce standalone executable binary files.',
            'Understand how JavaScript, Python, and modern Just-In-Time (JIT) engines execute code.',
            'Recognize how this impacts web development in browsers and on Node.js servers.'
        ],
        section2_simpleEnglishConcept: `Before a computer can run your code, it has to be translated from human words into machine language. There are two primary ways to do this translation:

1. **Compilation (Ahead-of-Time):** Imagine translating an entire book from English to Spanish all at once before giving it to the reader. Once translated, any Spanish speaker can read the finished book immediately at top speed without needing a translator in the room. This is what compiled languages (like C, Go, or Rust) do.

2. **Interpretation (Just-In-Time):** Imagine having a live interpreter standing next to you, translating sentence by sentence as you speak. You can start speaking right away without waiting for the whole book to be translated, but the interpreter must accompany you everywhere. This is how interpreted languages (like traditional Python and JavaScript) work.`,
        section3_whyNeeded: `Why isn't every language compiled or interpreted? Because each approach solves a different engineering trade-off:

- If you are building a flight control system or an operating system kernel, you need raw, blistering execution speed with zero translation delays. You choose a compiled language.
- If you are building websites where code is sent over the internet on demand and must run immediately across Windows, Mac, Linux, and Android devices without re-compiling for each device, you need a flexible interpreted runtime. This is why JavaScript was designed for the web.`,
        section4_howItWorks: {
            steps: [
                {
                    stepNumber: 1,
                    title: 'Compiled Workflow',
                    description: 'Source Code (.c / .rs) ➔ Compiler (gcc / rustc) ➔ Native Machine Binary (.exe / .bin) ➔ CPU runs binary directly.'
                },
                {
                    stepNumber: 2,
                    title: 'Interpreted Workflow',
                    description: 'Source Code (.js / .py) ➔ Runtime Engine (V8 in Chrome / Node) reads and executes line by line.'
                },
                {
                    stepNumber: 3,
                    title: 'Modern JIT (Just-In-Time) Hybrid',
                    description: 'Modern JavaScript engines (like Google V8) do both: they start interpreting immediately so pages load instantly, then compile hot (frequently repeated) functions into machine code in background threads for lightning performance.'
                }
            ],
            mentalModelOrDiagram: `[Compiled]:    Source Code ──(Compile Once)──> Native Binary (.exe) ──> Runs fast directly
[Interpreted]: Source Code ──(Read on the fly by Interpreter)──> Runs via Engine`
        },
        section5_syntaxAndExamples: {
            overview: 'In JavaScript (the language of full-stack web development), you can run files directly using Node.js without a separate compilation step.',
            codeBlocks: [
                {
                    language: 'bash',
                    filename: 'terminal',
                    code: `# Running a JavaScript file directly through Node's V8 engine:
node server.js

# Output immediately appears in terminal:
Server listening on port 3000...`,
                    explanation: 'Node.js is the runtime engine that interprets and executes your JavaScript code outside of the browser.'
                }
            ]
        },
        section6_realWorldApplication: `When you open a web page, the server sends raw JavaScript text to your browser. Your browser’s internal JavaScript engine (such as V8 in Google Chrome or SpiderMonkey in Firefox) parses that code and runs it immediately on your screen. You do not need to download and install an .exe file just to use a website.`,
        section7_commonMistakes: [
            {
                title: 'Confusing Java with JavaScript',
                explanation: 'Despite having "Java" in their names, Java and JavaScript are two entirely different programming languages created by different companies for different purposes.',
                howToFix: 'Remember: "Java is to JavaScript as Car is to Carpet." StackPath Academy uses JavaScript and TypeScript, the standard languages of full-stack web development.'
            }
        ],
        section8_guidedPractice: {
            task: 'Identify whether JavaScript in a browser is purely ahead-of-time compiled or executed via a runtime engine.',
            hints: [
                'Do you download an installer file every time you visit a website?',
                'Who reads and executes the script tags in an HTML page?'
            ],
            expectedBehavior: 'Identify that the browser contains a JavaScript runtime engine (like V8) that parses and executes code.',
            successCriteria: [
                'Correctly categorize JavaScript as a runtime-interpreted/JIT-compiled language.'
            ],
            solution: 'JavaScript runs in a browser runtime engine (like Google V8), which interprets and JIT-compiles code on the fly.',
            solutionExplanation: 'Because the web requires instant cross-platform compatibility, browsers include built-in engines to execute code directly as it arrives.'
        },
        section9_knowledgeCheckQuestions: [
            {
                question: 'Which of the following describes a compiled language?',
                options: [
                    'Code is translated line-by-line while the user is actively using the program',
                    'Source code is completely translated into machine code before distribution, creating an executable file',
                    'It can only run inside Google Chrome',
                    'It cannot perform arithmetic calculations'
                ],
                correctIndex: 1,
                explanation: 'Compiled languages undergo translation prior to execution, producing machine binaries.'
            },
            {
                question: 'What is the primary advantage of interpreted languages on the web?',
                options: [
                    'They allow the browser to receive script files and run them instantly across any operating system without prior device-specific compilation',
                    'They do not require any CPU power',
                    'They can never produce errors',
                    'They are physically etched into your computer motherboard'
                ],
                correctIndex: 0,
                explanation: 'Interpreted code provides cross-platform portability and instant execution without compiling separate binaries for Windows, macOS, and Linux.'
            }
        ],
        section10_rememberThesePoints: [
            'Compiled languages translate everything upfront into machine code.',
            'Interpreted languages translate code on the fly as it runs.',
            'JavaScript uses modern Just-In-Time (JIT) compilation inside browser and Node.js engines for high speed.',
            'Java and JavaScript are completely distinct languages.'
        ],
        section11_independentMasteryCriteria: [
            'Can clearly articulate the trade-offs between compiled and interpreted languages.',
            'Can explain why JavaScript was chosen as the universal language of the web.'
        ]
    },
    // ==========================================
    // Module 2, Lesson 1: How the Internet & World Wide Web Work
    // ==========================================
    {
        id: 'les-2-1',
        moduleId: 'mod-2',
        slug: 'how-the-internet-and-web-work',
        order: 1,
        title: 'How the Internet & World Wide Web Work',
        subtitle: 'From Undersea Cables and IP Addresses to Packets and Ports',
        estimatedMinutes: 15,
        difficulty: 'BEGINNER',
        section1_whatYouWillLearn: [
            'Understand the crucial distinction between the Internet and the World Wide Web.',
            'Explain what IP addresses, domain names, and DNS (Domain Name System) are.',
            'Trace how data is chopped into packets and travels across physical networks.',
            'Understand the Client-Server architecture that powers every full-stack app.'
        ],
        section2_simpleEnglishConcept: `The **Internet** and the **World Wide Web** are not the same thing:

- **The Internet** is the physical global network of computers connected together by cables, fiber optics, routers, and satellite links. It is the global highway system.
- **The World Wide Web (the Web)** is one specific service that travels on that highway—a collection of web pages, documents, and media linked together by URLs and viewed through web browsers. Other things travel on the internet too, like email (SMTP) and file transfers (FTP).

Every computer connected to the internet has a unique numerical address called an **IP Address** (like \`142.250.190.46\`), just like every house on a street has a mailing address.

Because humans remember names like \`google.com\` better than numbers, the internet uses **DNS (Domain Name System)**—which acts like the contacts list on your phone, translating domain names into IP addresses.`,
        section3_whyNeeded: `Imagine if you had to memorize a 12-digit number for every website you wanted to visit, and every time the website upgraded their computer servers, the number changed. The web would be unusable for normal people.

DNS, IP routing, and standardized network protocols allow billions of independent computers around the globe to discover and talk to each other reliably in milliseconds, regardless of what brand or operating system they run.`,
        section4_howItWorks: {
            steps: [
                {
                    stepNumber: 1,
                    title: 'Entering a URL',
                    description: 'You type https://example.com into your browser address bar and press Enter.'
                },
                {
                    stepNumber: 2,
                    title: 'DNS Lookup',
                    description: 'Your browser asks DNS servers: "What is the IP address for example.com?" The DNS server responds with an IP (e.g., 93.184.216.34).'
                },
                {
                    stepNumber: 3,
                    title: 'TCP Handshake & Connection',
                    description: 'Your browser establishes a reliable connection (TCP/IP handshake) with the server at that IP address on port 443 (HTTPS).'
                },
                {
                    stepNumber: 4,
                    title: 'HTTP Request & Response',
                    description: 'Your browser sends an HTTP GET request asking for the webpage. The server responds with HTML, CSS, and JavaScript files.'
                },
                {
                    stepNumber: 5,
                    title: 'Browser Rendering',
                    description: 'Your browser parses the HTML into the DOM, applies CSS styles, and renders the visual website onto your screen.'
                }
            ],
            mentalModelOrDiagram: `[Browser / Client] 
       │ 1. Ask: What is example.com's IP?
       ▼
   [DNS Server] ──> Responds: 93.184.216.34
       │
       │ 2. Send HTTP GET Request to 93.184.216.34:443
       ▼
[Web Server] ──> Responds: HTTP 200 OK + HTML/CSS/JS payload
       │
       ▼
[Browser renders page on screen]`
        },
        section5_syntaxAndExamples: {
            overview: 'Here is what an actual HTTP request and response look like in plain text behind the scenes.',
            codeBlocks: [
                {
                    language: 'http',
                    filename: 'HTTP Request (Browser -> Server)',
                    code: `GET /index.html HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html`,
                    explanation: 'The browser specifies the method (GET), the path (/index.html), and metadata headers like the host and accepted formats.'
                },
                {
                    language: 'http',
                    filename: 'HTTP Response (Server -> Browser)',
                    code: `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 125

<!DOCTYPE html>
<html>
  <head><title>Example</title></head>
  <body><h1>Welcome to the Web!</h1></body>
</html>`,
                    explanation: 'The server returns a status code (200 OK), response headers describing the data, and the actual HTML document.'
                }
            ]
        },
        section6_realWorldApplication: `As a full-stack developer, this is your daily bread: your frontend code (React) will run in the user's browser, construct HTTP requests, send them across the internet, and your backend server (Node.js/Express) will receive those requests, query a database (PostgreSQL), and send back JSON responses.`,
        section7_commonMistakes: [
            {
                title: 'Confusing Client with Server',
                explanation: 'Beginners often blur where code is running. The client is the user\'s device/browser. The server is a computer sitting in a data center waiting to answer requests.',
                howToFix: 'Always ask yourself: "Is this code running on the user\'s laptop (client) or on our remote server?"'
            }
        ],
        section8_guidedPractice: {
            task: 'Trace the lifecycle of visiting a website: Order these 4 events from first to last: (A) Browser renders HTML, (B) User enters URL, (C) DNS resolves IP address, (D) Server sends HTTP response.',
            hints: [
                'Can the browser talk to the server before it knows the server\'s IP address?',
                'Can the browser render before receiving the HTML?'
            ],
            expectedBehavior: 'Correct order: B -> C -> D -> A',
            successCriteria: [
                'Correctly sequence URL entry -> DNS resolution -> Server response -> Browser render.'
            ],
            starterCode: `// Sequence: [ ? , ? , ? , ? ]`,
            solution: `B -> C -> D -> A`,
            solutionExplanation: `1. User enters URL (B)
2. DNS translates domain to IP address (C)
3. Server receives request and sends HTTP response (D)
4. Browser parses response and renders HTML (A)`
        },
        section9_knowledgeCheckQuestions: [
            {
                question: 'What is the role of DNS on the internet?',
                options: [
                    'It speeds up your computer processor',
                    'It acts as the internet\'s directory, translating human-friendly domain names to numerical IP addresses',
                    'It encrypts your hard drive against malware',
                    'It converts HTML files into CSS files'
                ],
                correctIndex: 1,
                explanation: 'DNS (Domain Name System) translates domain names (like stackpath.dev) into computer IP addresses (like 192.0.2.1).'
            },
            {
                question: 'In client-server architecture, which entity initiates the HTTP request?',
                options: [
                    'The database server',
                    'The client (e.g., the user\'s web browser)',
                    'The undersea fiber optic cable',
                    'The domain registrar'
                ],
                correctIndex: 1,
                explanation: 'In standard HTTP client-server architecture, the client initiates the request and the server responds.'
            }
        ],
        section10_rememberThesePoints: [
            'The Internet is the global network; the Web is the collection of hyperlinked pages that runs on it.',
            'Every server has an IP address; DNS maps memorable domain names to those IP addresses.',
            'Clients (browsers) request data; servers provide responses.',
            'Communication happens through standardized HTTP requests and status codes.'
        ],
        section11_independentMasteryCriteria: [
            'Can clearly draw and explain the client-server request/response cycle.',
            'Can explain what happens when you press Enter in a browser address bar.'
        ]
    },
    // ==========================================
    // Module 3, Lesson 1: Command Line & Terminal Navigation
    // ==========================================
    {
        id: 'les-3-1',
        moduleId: 'mod-3',
        slug: 'command-line-and-terminal-navigation',
        order: 1,
        title: 'Command Line & Terminal Navigation',
        subtitle: 'Talking Directly to Your Operating System Without a Mouse',
        estimatedMinutes: 14,
        difficulty: 'BEGINNER',
        section1_whatYouWillLearn: [
            'Understand what a terminal / command line interface (CLI) is.',
            'Master essential filesystem commands (pwd, ls/dir, cd, mkdir, rm).',
            'Understand relative paths vs absolute paths.',
            'Run commands, scripts, and applications with confidence.'
        ],
        section2_simpleEnglishConcept: `A Graphical User Interface (GUI) is what most people use: you look at icons on a desktop and double-click folders with a mouse. 

A **Command Line Interface (CLI)**, or terminal, is a text-based way to talk directly to your operating system. Instead of clicking on a folder icon, you type a command and press Enter.

Why do software engineers use the terminal?
1. **Speed:** Typing a command can create 20 folders, download 10 libraries, and start a local web server in 3 seconds.
2. **Servers have no screens:** Real cloud servers running in AWS or Google Cloud do not have a monitor, mouse, or desktop window. They are controlled 100% through the command line.`,
        section3_whyNeeded: `Without the terminal, you cannot run modern developer tools like Node.js, Git, Vite, Docker, or database migration scripts. Learning basic terminal navigation is like learning how to hold a steering wheel before driving a car.`,
        section4_howItWorks: {
            steps: [
                {
                    stepNumber: 1,
                    title: 'Opening the Prompt',
                    description: 'The terminal shows your current location in the filesystem (the Current Working Directory, or cwd).'
                },
                {
                    stepNumber: 2,
                    title: 'Entering a Command',
                    description: 'You type the name of an executable program (like cd, ls, or node) followed by optional flags and arguments.'
                },
                {
                    stepNumber: 3,
                    title: 'OS Execution',
                    description: 'The shell parses your text, finds the program, executes it, and prints the output (stdout or stderr) back into your terminal window.'
                }
            ],
            mentalModelOrDiagram: `[Command: cd my-app] ──> Shell moves your current location into 'my-app' folder
[Command: ls / dir]   ──> Shell lists all files and folders in that directory
[Command: node app.js]──> Shell instructs Node.js to execute 'app.js'`
        },
        section5_syntaxAndExamples: {
            overview: 'Here are the most fundamental commands you will use every day. Works across PowerShell, Mac Terminal, and Linux Bash.',
            codeBlocks: [
                {
                    language: 'bash',
                    filename: 'Terminal Cheat Sheet',
                    code: `# 1. Print current working directory:
pwd

# 2. List files and folders in current directory:
ls         # (or 'dir' on Windows PowerShell)

# 3. Change directory (go into a folder):
cd projects

# 4. Go up one folder level:
cd ..

# 5. Create a new directory:
mkdir my-new-website

# 6. Create an empty file:
touch index.html   # (or New-Item index.html on PowerShell)

# 7. Check Node.js version:
node -v`,
                    explanation: 'cd .. moves up one directory level. Dot (.) means current directory; double dot (..) means parent directory.'
                }
            ]
        },
        section6_realWorldApplication: `When you build web apps in this academy, you will use the terminal to run "npm run dev" to launch your local development server, "git commit" to save your code checkpoints, and "npx prisma migrate" to update your database tables.`,
        section7_commonMistakes: [
            {
                title: 'Running commands in the wrong directory',
                badCode: `// Trying to run app.js while still in your home folder:
node app.js
// Error: Cannot find module 'app.js'`,
                goodCode: `// Navigating to where the file actually lives first:
cd projects/my-app
node app.js`,
                explanation: 'The terminal looks for files in your current working directory. If you are not in the folder where the file lives, it will fail.',
                howToFix: 'Run "pwd" and "ls" (or dir) to verify you are inside the correct project folder before running scripts.'
            }
        ],
        section8_guidedPractice: {
            task: 'If your terminal is currently in "C:/Users/Alex/projects" and you want to enter the "website" folder inside it, what command do you type?',
            hints: [
                'Which command changes your current folder?',
                'Specify the target folder name as the argument.'
            ],
            expectedBehavior: 'cd website',
            successCriteria: [
                'Use the "cd" command correctly with the folder argument.'
            ],
            starterCode: `cd [folder_name]`,
            solution: `cd website`,
            solutionExplanation: `'cd' stands for 'change directory'. Typing 'cd website' moves your terminal session into the 'website' subdirectory.`
        },
        section9_knowledgeCheckQuestions: [
            {
                question: 'What does "cd .." do in a terminal?',
                options: [
                    'Deletes all files in the current folder',
                    'Navigates up one level to the parent directory',
                    'Clears the screen',
                    'Shuts down your computer'
                ],
                correctIndex: 1,
                explanation: '".." represents the parent directory. Running "cd .." moves up one directory level.'
            },
            {
                question: 'Why do cloud servers require terminal commands rather than mouse clicks?',
                options: [
                    'Because cloud servers are too old to support mice',
                    'Because cloud servers are lightweight headless machines optimized for remote text-based command execution without GUI overhead',
                    'Because mice are illegal in server rooms',
                    'Because terminals consume more electricity'
                ],
                correctIndex: 1,
                explanation: 'Production servers run without graphical desktop interfaces (headless) to maximize performance, security, and automation.'
            }
        ],
        section10_rememberThesePoints: [
            'The terminal is a text interface to talk directly to your operating system.',
            'pwd prints where you are; ls (or dir) lists files; cd moves between folders.',
            'cd .. moves up to the parent directory.',
            'Always verify your current working directory before running code.'
        ],
        section11_independentMasteryCriteria: [
            'Can open your terminal and navigate to any directory on your computer.',
            'Can create folders, list files, and inspect current directories without using a mouse.'
        ]
    },
    // ==========================================
    // Module 4, Lesson 1: Semantic HTML5 Structure
    // ==========================================
    {
        id: 'les-4-1',
        moduleId: 'mod-4',
        slug: 'semantic-html5-structure',
        order: 1,
        title: 'Semantic HTML5 & Document Architecture',
        subtitle: 'Structuring Content for Humans, Screen Readers, and Search Engines',
        estimatedMinutes: 15,
        difficulty: 'BEGINNER',
        section1_whatYouWillLearn: [
            'Understand what HTML (HyperText Markup Language) is and how tags, elements, and attributes work.',
            'Master the standard HTML5 boilerplate document structure (doctype, html, head, body).',
            'Differentiate between semantic elements (<header>, <nav>, <main>, <article>, <section>, <footer>) and generic tags (<div>, <span>).',
            'Explain why semantic HTML is critical for accessibility (a11y) and SEO.'
        ],
        section2_simpleEnglishConcept: `HTML is the skeleton of every website. If a web application were a human body:
- **HTML** is the bones and organs (the structure and content).
- **CSS** is the skin, hair, and clothing (the colors, layout, and appearance).
- **JavaScript** is the muscles and brain (the interactive behavior and dynamic responses).

HTML works using **tags** enclosed in angle brackets: \`<p>\` starts a paragraph, and \`</p>\` closes it.

**Semantic HTML** means using tags that describe the meaning of the content, rather than just what it looks like. For example, instead of wrapping your navigation menu in a generic \`<div>\`, you wrap it in a \`<nav>\`. A screen reader used by a visually impaired person can announce "Navigation landmark", and search engines like Google know exactly where your primary site links are.`,
        section3_whyNeeded: `If you build a website using only generic \`<div>\` and \`<span>\` tags (often called "div soup"), screen readers for blind users cannot tell a button from a paragraph, keyboard tab navigation breaks, and search engine crawlers struggle to rank your content. Semantic HTML provides accessibility, search visibility, and maintainability for free.`,
        section4_howItWorks: {
            steps: [
                {
                    stepNumber: 1,
                    title: 'HTML Parsing',
                    description: 'The browser reads the HTML document from top to bottom.'
                },
                {
                    stepNumber: 2,
                    title: 'DOM Tree Construction',
                    description: 'The browser converts tags into nodes in a hierarchical tree structure called the Document Object Model (DOM).'
                },
                {
                    stepNumber: 3,
                    title: 'Accessibility Tree Creation',
                    description: 'The browser builds an Accessibility Tree that screen readers use to announce navigation landmarks, headings, and interactive buttons.'
                }
            ],
            mentalModelOrDiagram: `<!DOCTYPE html>
└── <html>
    ├── <head> (Metadata, title, CSS links - invisible to users)
    └── <body> (Everything visible on screen)
        ├── <header> (Logo, site title)
        │   └── <nav> (Navigation links)
        ├── <main> (Unique page content)
        │   └── <article> or <section>
        └── <footer> (Copyright, legal, social links)`
        },
        section5_syntaxAndExamples: {
            overview: 'Here is a complete, accessible, modern semantic HTML5 page structure.',
            codeBlocks: [
                {
                    language: 'html',
                    filename: 'index.html',
                    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StackPath Academy - Learn Full Stack</title>
  </head>
  <body>
    <header>
      <h1>StackPath Academy</h1>
      <nav aria-label="Main Navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/curriculum">Curriculum</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article>
        <h2>Module 4: Semantic HTML</h2>
        <p>HTML provides meaning and structure to web content.</p>
      </article>
    </main>

    <footer>
      <p>&copy; 2026 StackPath Academy. All rights reserved.</p>
    </footer>
  </body>
</html>`,
                    explanation: '<!DOCTYPE html> tells the browser to use modern standard HTML5 parsing. <main> denotes the central content unique to this page.'
                }
            ]
        },
        section6_realWorldApplication: `Every modern web framework, including React and Next.js, compiles down into HTML elements in the browser. When you write JSX components in React later in this academy, you will write semantic HTML tags inside your components.`,
        section7_commonMistakes: [
            {
                title: 'Using multiple <h1> tags per page',
                badCode: `<h1>Welcome to my site</h1>
<h1>About me</h1>
<h1>My projects</h1>`,
                goodCode: `<h1>Welcome to my site</h1>
<h2>About me</h2>
<h2>My projects</h2>`,
                explanation: 'A web page should contain exactly one <h1> tag representing the primary topic of the page. Subsections should use <h2>, then <h3> in order.',
                howToFix: 'Reserve <h1> for the main page headline. Use <h2> through <h6> for subsections.'
            },
            {
                title: 'Using <div> instead of <button> for clickable actions',
                badCode: `<div onclick="saveItem()">Save</div>`,
                goodCode: `<button type="button" onclick="saveItem()">Save</button>`,
                explanation: 'A <div> cannot be focused by pressing the Tab key, nor can it be activated by pressing the Enter or Space key on a keyboard. A real <button> is accessible out of the box.',
                howToFix: 'Always use real <button> elements for interactive actions.'
            }
        ],
        section8_guidedPractice: {
            task: 'Transform a generic "div soup" container into semantic HTML for a website navigation bar containing two links ("Home" and "About").',
            hints: [
                'Use the semantic element designed for navigation.',
                'Use an unordered list (<ul>) and list items (<li>) with anchor tags (<a>).'
            ],
            expectedBehavior: 'A <nav> element wrapping a list of navigation links.',
            successCriteria: [
                'Use <nav> tag.',
                'Use <a> tags with href attributes.'
            ],
            starterCode: `<div class="nav-container">
  <div class="link">Home</div>
  <div class="link">About</div>
</div>`,
            solution: `<nav aria-label="Main Navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`,
            solutionExplanation: '<nav> communicates navigation landmarks to screen readers, while <ul> and <li> establish structured list relationships.'
        },
        section9_knowledgeCheckQuestions: [
            {
                question: 'What is the purpose of Semantic HTML?',
                options: [
                    'To make websites load without an internet connection',
                    'To use tags that describe the meaning and role of content, improving accessibility and SEO',
                    'To automatically style pages without needing CSS',
                    'To connect directly to SQL databases'
                ],
                correctIndex: 1,
                explanation: 'Semantic HTML uses tags that convey content meaning (<header>, <nav>, <article>) rather than purely generic containers (<div>).'
            },
            {
                question: 'How many <h1> tags should a standard web page typically have?',
                options: [
                    'Zero',
                    'Exactly one main <h1> per page',
                    'At least 10 on every page',
                    'As many as you want for every paragraph'
                ],
                correctIndex: 1,
                explanation: 'Standard best practices and SEO guidelines dictate a single <h1> representing the document title or primary subject.'
            }
        ],
        section10_rememberThesePoints: [
            'HTML provides the structure and skeleton of the web page.',
            'Semantic tags (<header>, <nav>, <main>, <article>, <footer>) communicate meaning to browsers and screen readers.',
            'Never replace native interactive elements like <button> with styled <div> tags.',
            'Use proper heading hierarchy (<h1> down to <h6>) without skipping levels.'
        ],
        section11_independentMasteryCriteria: [
            'Can construct a valid HTML5 document skeleton from memory.',
            'Can identify and replace generic div soup with semantic HTML5 elements.'
        ]
    },
    // ==========================================
    // Module 5, Lesson 1: The CSS Box Model & Flexbox
    // ==========================================
    {
        id: 'les-5-1',
        moduleId: 'mod-5',
        slug: 'css-box-model-and-flexbox',
        order: 1,
        title: 'The CSS Box Model & Modern Flexbox Layouts',
        subtitle: 'Mastering Spacing, Sizing, and 1-Dimensional Alignment',
        estimatedMinutes: 16,
        difficulty: 'BEGINNER',
        section1_whatYouWillLearn: [
            'Deconstruct the four layers of the CSS Box Model: Content, Padding, Border, Margin.',
            'Understand why "box-sizing: border-box" is an essential standard in modern web styling.',
            'Master Flexbox alignment properties: display: flex, justify-content, align-items, flex-direction, and gap.',
            'Build responsive, beautifully spaced component layouts without hacks.'
        ],
        section2_simpleEnglishConcept: `In CSS, **every single element on your screen is a rectangular box**, even if it looks like a circle or text.

The **CSS Box Model** consists of 4 concentric layers from inside to outside:
1. **Content:** The actual text, image, or icon inside the box.
2. **Padding:** The clear cushion space *inside* the box, between the content and the border (like bubble wrap inside a parcel).
3. **Border:** The edge or outline surrounding the padding and content.
4. **Margin:** The invisible buffer space *outside* the box that pushes neighboring elements away.

**Flexbox** is a modern CSS layout tool that lets you align and distribute multiple boxes in a row or column effortlessly, centering items and controlling how they stretch or shrink.`,
        section3_whyNeeded: `Before modern CSS and Flexbox, centering an item both vertically and horizontally required confusing math, absolute positioning tricks, or clumsy table layouts. 

Furthermore, by default in old CSS (content-box), if you gave a box a width of 200px and added 20px of padding, the box became 240px wide—breaking your layouts! With modern CSS (\`box-sizing: border-box\`) and Flexbox, layouts behave predictably and responsively.`,
        section4_howItWorks: {
            steps: [
                {
                    stepNumber: 1,
                    title: 'Setting Border-Box',
                    description: '*, *::before, *::after { box-sizing: border-box; } ensures width and height include padding and borders.'
                },
                {
                    stepNumber: 2,
                    title: 'Declaring a Flex Container',
                    description: 'display: flex turns an element into a flex container, transforming its immediate children into flex items.'
                },
                {
                    stepNumber: 3,
                    title: 'Aligning on Main Axis',
                    description: 'justify-content controls horizontal alignment along the main axis (flex-start, center, space-between).'
                },
                {
                    stepNumber: 4,
                    title: 'Aligning on Cross Axis',
                    description: 'align-items controls vertical alignment across the cross axis (stretch, center, flex-start).'
                }
            ],
            mentalModelOrDiagram: `┌──────────────── Margin (Outside space) ───────────────┐
│  ┌───────────── Border (Visible outline) ──────────┐  │
│  │  ┌────────── Padding (Inside cushion) ───────┐  │  │
│  │  │  ┌─────── Content (Text / Children) ────┐ │  │  │
│  │  │  │                                      │ │  │  │
│  │  │  └──────────────────────────────────────┘ │  │  │
│  │  └───────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘`
        },
        section5_syntaxAndExamples: {
            overview: 'Here is how to create a perfect centered navigation bar with modern Flexbox and clean Box Model tokens.',
            codeBlocks: [
                {
                    language: 'css',
                    filename: 'styles.css',
                    code: `/* Modern reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Flexbox Navigation Bar */
.navbar {
  display: flex;
  justify-content: space-between; /* Pushes logo to left, menu to right */
  align-items: center;            /* Perfectly centers items vertically */
  padding: 1rem 2rem;             /* 16px top/bottom, 32px left/right */
  background-color: #0f172a;      /* Dark slate neutral */
  border-bottom: 1px solid #1e293b;
}

.nav-links {
  display: flex;
  gap: 1.5rem;                    /* Clean spacing between items */
  list-style: none;
}`,
                    explanation: 'justify-content: space-between pushes the ends apart, while align-items: center prevents uneven vertical jumping.'
                }
            ]
        },
        section6_realWorldApplication: `Every modern dashboard, navigation bar, card header, and button group you see on Stripe, Linear, or GitHub uses Flexbox and the Box Model. In Tailwind CSS, you will write this daily as \`flex items-center justify-between gap-4\`.`,
        section7_commonMistakes: [
            {
                title: 'Using margin instead of gap in flex containers',
                badCode: `.nav-item {
  margin-right: 16px; /* Last item still has margin-right! */
}`,
                goodCode: `.nav-container {
  display: flex;
  gap: 16px; /* Automatically spaces only between items */
}`,
                explanation: 'Applying margin-right to all children leaves unwanted spacing after the final child. The modern CSS gap property only adds space BETWEEN flex children.',
                howToFix: 'Use the gap property directly on the parent flex container.'
            }
        ],
        section8_guidedPractice: {
            task: 'Write CSS to perfectly center an element both horizontally and vertically inside a parent container.',
            hints: [
                'Set the container display to flex.',
                'Which property centers along the main axis?',
                'Which property centers along the cross axis?'
            ],
            expectedBehavior: 'A container with display: flex, justify-content: center, and align-items: center.',
            successCriteria: [
                'Use display: flex.',
                'Use justify-content: center.',
                'Use align-items: center.'
            ],
            starterCode: `.center-box {
  display: /* ? */;
  justify-content: /* ? */;
  align-items: /* ? */;
}`,
            solution: `.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
            solutionExplanation: 'display: flex establishes a flex formatting context; justify-content: center centers along the main axis, and align-items: center centers along the cross axis.'
        },
        section9_knowledgeCheckQuestions: [
            {
                question: 'Which box model layer sits directly between the content and the border?',
                options: [
                    'Margin',
                    'Padding',
                    'Outline',
                    'Transform'
                ],
                correctIndex: 1,
                explanation: 'Padding is the interior spacing between the content and its border.'
            },
            {
                question: 'What does "box-sizing: border-box" achieve?',
                options: [
                    'It forces all borders to be red',
                    'It includes padding and border within the element\'s declared width and height, preventing layout expansion',
                    'It deletes margins automatically',
                    'It converts text into uppercase'
                ],
                correctIndex: 1,
                explanation: 'border-box causes the specified width and height to include the padding and border, preventing unexpected layout blowups.'
            }
        ],
        section10_rememberThesePoints: [
            'Every element is a box composed of Content, Padding, Border, and Margin.',
            'Always use box-sizing: border-box for predictable sizing.',
            'Use display: flex with justify-content (main axis) and align-items (cross axis).',
            'Use gap on flex containers for clean, consistent spacing between items.'
        ],
        section11_independentMasteryCriteria: [
            'Can draw the 4 layers of the Box Model and explain where padding vs margin applies.',
            'Can align any row of elements using Flexbox and gap without layout glitches.'
        ]
    },
    // ==========================================
    // Module 6, Lesson 1: JavaScript Variables, Types & Memory
    // ==========================================
    {
        id: 'les-6-1',
        moduleId: 'mod-6',
        slug: 'javascript-variables-types-and-memory',
        order: 1,
        title: 'JavaScript Variables, Primitive Types & Memory',
        subtitle: 'Storing, Mutating, and Referencing Data in Code',
        estimatedMinutes: 15,
        difficulty: 'BEGINNER',
        section1_whatYouWillLearn: [
            'Differentiate between const and let variable declarations, and understand why var is obsolete.',
            'Understand JavaScript primitive types (string, number, boolean, null, undefined, symbol, bigint).',
            'Understand the fundamental difference between Primitives (stored by value) and Objects (stored by reference).',
            'Avoid subtle mutation and equality bugs in production code.'
        ],
        section2_simpleEnglishConcept: `A **variable** is a labeled box in your computer's memory that holds a value. 

In modern JavaScript, we declare variables with two keywords:
- \`const\` (constant): For values that will not be reassigned. Use this by default for 95% of your code!
- \`let\`: For values that will be reassigned (like a counter in a loop or a toggle flag).
*(We avoid the old \`var\` keyword because it has unpredictable scoping rules).*

JavaScript has two categories of data types:
1. **Primitives (Values):** Simple, indivisible pieces of data—like numbers (42), strings ("Hello"), and booleans (true/false). When you copy a primitive, you make a fresh clone of the value.
2. **Objects & Arrays (References):** Collections of data. When you assign an object to another variable, you do **not** copy the object—you copy a reference (memory address) pointing to the same object in RAM!`,
        section3_whyNeeded: `Understanding value vs reference is the #1 reason beginners introduce bugs when updating state in React or managing databases. If you mutate an object thinking you made a copy, you might accidentally alter customer records or prevent React from re-rendering components.`,
        section4_howItWorks: {
            steps: [
                {
                    stepNumber: 1,
                    title: 'Stack Memory (Primitives)',
                    description: 'Primitive values are allocated directly in stack memory. Fast, fixed-size, and copied by value.'
                },
                {
                    stepNumber: 2,
                    title: 'Heap Memory (Objects & Arrays)',
                    description: 'Objects and arrays can grow to arbitrary sizes, so they are stored in heap memory. The variable on the stack only holds a pointer (address) to the heap location.'
                },
                {
                    stepNumber: 3,
                    title: 'Reference Sharing',
                    description: 'If two variables hold the same pointer, modifying a property through one variable affects both because they point to the exact same memory location.'
                }
            ],
            mentalModelOrDiagram: `Primitives (By Value):
a = 10  ──> [10]
b = a   ──> [10] (independent copy)
b = 20  ──> a is still 10!

Objects (By Reference):
user1 = { name: "Sam" } ──> [Address 0x4F: { name: "Sam" }]
user2 = user1           ──> [Address 0x4F: Points to same object!]
user2.name = "Alex"     ──> user1.name is now also "Alex"!`
        },
        section5_syntaxAndExamples: {
            overview: 'Here is how variables, types, and references behave in real JavaScript code.',
            codeBlocks: [
                {
                    language: 'javascript',
                    filename: 'types.js',
                    code: `// 1. Primitive values (Copied by value)
let scoreA = 100;
let scoreB = scoreA; // scoreB gets its own copy of 100
scoreB = 250;
console.log(scoreA); // Still 100!

// 2. Objects (Copied by reference)
const student1 = { name: "Maria", grade: "A" };
const student2 = student1; // student2 points to the SAME object in heap!

student2.grade = "A+";
console.log(student1.grade); // "A+"! Both changed because they share memory.

// 3. To make a true independent clone:
const student3 = { ...student1, grade: "B" }; // Spread operator makes a shallow copy
console.log(student1.grade); // Still "A+"`,
                    explanation: 'Using the object spread syntax ({ ...student1 }) creates a new object in memory rather than sharing the reference.'
                }
            ]
        },
        section6_realWorldApplication: `In React applications (Module 11), component state must be treated as **immutable**. When updating user profiles or shopping cart items, you must never modify objects directly (\`user.name = "new"\`); you create a new copy using spread syntax so React detects the change and updates the screen.`,
        section7_commonMistakes: [
            {
                title: 'Confusing const with immutability',
                badCode: `const user = { name: "Jordan" };
// Beginners think const means you cannot change properties!
user.name = "Taylor"; // This is 100% valid JavaScript!`,
                goodCode: `const user = { name: "Jordan" };
// const means the *variable binding* cannot be reassigned:
// user = { name: "Taylor" }; // Error: Assignment to constant variable.`,
                explanation: 'const prevents you from reassigning the variable to a different memory address, but the object itself can still be mutated.',
                howToFix: 'Remember that const locks the pointer, not the contents inside the referenced object.'
            }
        ],
        section8_guidedPractice: {
            task: 'Given an array of fruits `const fruits = ["apple", "banana"];`, create an independent copy named `moreFruits` and add "orange" to it without modifying the original array.',
            hints: [
                'Use the array spread operator [...fruits] to create a new array.',
                'Then push to moreFruits or include "orange" in the spread definition.'
            ],
            expectedBehavior: 'fruits has 2 items; moreFruits has 3 items.',
            successCriteria: [
                'Do not mutate the original fruits array.',
                'Use the spread operator.'
            ],
            starterCode: `const fruits = ["apple", "banana"];
// Create an independent copy with "orange" added:
const moreFruits = /* ? */;`,
            solution: `const fruits = ["apple", "banana"];
const moreFruits = [...fruits, "orange"];
console.log(fruits);     // ["apple", "banana"]
console.log(moreFruits); // ["apple", "banana", "orange"]`,
            solutionExplanation: 'The array spread operator copies the elements into a new array literal, keeping the original array untouched.'
        },
        section9_knowledgeCheckQuestions: [
            {
                question: 'Which variable keyword should you prefer by default in modern JavaScript?',
                options: [
                    'var',
                    'const',
                    'global',
                    'let'
                ],
                correctIndex: 1,
                explanation: 'Prefer const by default to prevent accidental reassignment, using let only when a variable must change.'
            },
            {
                question: 'What happens when you execute `const a = { x: 1 }; const b = a; b.x = 2;`?',
                options: [
                    'a.x remains 1, while b.x becomes 2',
                    'Both a.x and b.x are now 2 because objects are assigned by reference',
                    'JavaScript throws a ReferenceError',
                    'b creates a deep clone of a'
                ],
                correctIndex: 1,
                explanation: 'Objects are assigned by reference. Both variables point to the same object in memory, so mutating one mutates both.'
            }
        ],
        section10_rememberThesePoints: [
            'Use const by default; use let only when reassignment is required.',
            'Primitives (numbers, strings, booleans) are copied by value.',
            'Objects and Arrays are stored on the heap and referenced by pointer.',
            'Spread syntax ({...obj}, [...arr]) creates a shallow copy of an object or array.'
        ],
        section11_independentMasteryCriteria: [
            'Can explain the difference between stack and heap memory in simple English.',
            'Can demonstrate safe copying of arrays and objects without accidental mutation.'
        ]
    },
    // ==========================================
    // Module 13, Lesson 1: HTTP REST APIs & Client-Server Contracts
    // ==========================================
    {
        id: 'les-13-1',
        moduleId: 'mod-13',
        slug: 'http-rest-apis-and-contracts',
        order: 1,
        title: 'HTTP REST APIs & Client-Server Communication',
        subtitle: 'Designing Predictable Contracts, Methods, and Status Codes',
        estimatedMinutes: 16,
        difficulty: 'INTERMEDIATE',
        section1_whatYouWillLearn: [
            'Understand what an API (Application Programming Interface) is and why REST dominates the web.',
            'Map HTTP verbs (GET, POST, PUT, PATCH, DELETE) to CRUD operations accurately.',
            'Master standard HTTP status code ranges (2xx Success, 4xx Client Error, 5xx Server Error).',
            'Design clean, RESTful URL endpoints and consistent JSON response schemas.'
        ],
        section2_simpleEnglishConcept: `An **API (Application Programming Interface)** is a formalized menu for two software programs to communicate.

Think of a restaurant:
- You (the **Client / Frontend**) sit at a table.
- The kitchen (the **Server / Backend**) prepares the food.
- The waiter (the **API**) takes your order, carries it to the kitchen, and brings back the dish.

**REST (Representational State Transfer)** is an architectural standard for web APIs. In REST:
- Everything is modeled as a **resource** (nouns like \`/users\`, \`/courses\`, \`/tasks\`).
- Actions are determined by standard **HTTP methods** (verbs like GET, POST, DELETE).
- Data is transmitted in universal **JSON (JavaScript Object Notation)** format.`,
        section3_whyNeeded: `Without RESTful standards, every backend developer would invent arbitrary URLs. One developer might write \`/fetchUser?id=12\`, another \`/get_user_now\`, and another \`/doDeleteStudent\`. 

Standard REST constraints provide a universal, predictable convention that any frontend, mobile app, or external partner can consume without guesswork.`,
        section4_howItWorks: {
            steps: [
                {
                    stepNumber: 1,
                    title: 'The Request',
                    description: 'Client sends: METHOD /path + Headers + optional Body (JSON).'
                },
                {
                    stepNumber: 2,
                    title: 'Server Routing & Middleware',
                    description: 'Express matches the path, runs auth/validation middleware, and executes business logic.'
                },
                {
                    stepNumber: 3,
                    title: 'Database Interaction',
                    description: 'Backend queries database using SQL or Prisma ORM.'
                },
                {
                    stepNumber: 4,
                    title: 'The Response',
                    description: 'Server returns: Status Code (e.g. 200, 201, 404) + Headers + JSON Body.'
                }
            ],
            mentalModelOrDiagram: `[React Frontend] 
       │ HTTP POST /api/tasks (JSON: { title: "Study SQL" })
       ▼
[Express Backend Router]
       │ Validate request with Zod -> Verify Auth Token
       ▼
[Prisma ORM] ──> INSERT INTO tasks ... ──> [PostgreSQL Database]
       │
       ▼
[Express Backend] ──> Responds: 201 Created + JSON: { id: "101", title: "Study SQL" }
       │
       ▼
[React Frontend] ──> Updates UI immediately with new task`
        },
        section5_syntaxAndExamples: {
            overview: 'Here is the canonical mapping of HTTP verbs to resource actions, along with standard status codes.',
            codeBlocks: [
                {
                    language: 'http',
                    filename: 'RESTful Resource Routing: /api/tasks',
                    code: `GET    /api/tasks          -> 200 OK         (Fetch list of tasks)
GET    /api/tasks/:id      -> 200 OK / 404   (Fetch single task by ID)
POST   /api/tasks          -> 201 Created    (Create new task from JSON body)
PATCH  /api/tasks/:id      -> 200 OK         (Update specific fields of task)
DELETE /api/tasks/:id      -> 204 No Content (Remove task by ID)`,
                    explanation: 'Notice that URLs use plural nouns (/tasks), never verbs. The action is determined strictly by the HTTP method.'
                }
            ]
        },
        section6_realWorldApplication: `Every full-stack application you build—from StackPath Academy to Stripe or Airbnb—is built on this exact REST client-server protocol. The frontend makes asynchronous fetch requests, and the backend routes them to controller services.`,
        section7_commonMistakes: [
            {
                title: 'Putting verbs inside REST endpoint URLs',
                badCode: `POST /api/createTask
GET  /api/deleteTaskById?id=5`,
                goodCode: `POST   /api/tasks
DELETE /api/tasks/5`,
                explanation: 'REST endpoints represent nouns/resources. The HTTP verb already expresses the action. Putting "create" or "delete" in the URL is non-standard and redundant.',
                howToFix: 'Use plural nouns for resource paths and let HTTP verbs specify the action.'
            },
            {
                title: 'Returning 200 OK when an error occurred',
                badCode: `// Server returns 200 OK with error JSON:
res.status(200).json({ success: false, error: "Task not found" });`,
                goodCode: `// Server returns proper 404 status code:
res.status(404).json({ message: "Task with ID 5 was not found" });`,
                explanation: 'Returning 200 OK for errors breaks frontend error-handling libraries (like TanStack Query or Axios), which rely on HTTP status codes to trigger error states.',
                howToFix: 'Always return appropriate status codes: 400 for bad input, 401 for unauthorized, 404 for not found, 500 for server crash.'
            }
        ],
        section8_guidedPractice: {
            task: 'Design the REST endpoint and HTTP method to update the completion status of a task with ID "42".',
            hints: [
                'Which HTTP method is used for partial updates?',
                'What should the resource URL look like?'
            ],
            expectedBehavior: 'PATCH /api/tasks/42',
            successCriteria: [
                'Use PATCH method for partial update.',
                'Use plural resource URL with the resource ID path parameter.'
            ],
            starterCode: `[METHOD] /api/[resource]/[id]`,
            solution: `PATCH /api/tasks/42`,
            solutionExplanation: 'PATCH updates specific fields on an existing resource, and /api/tasks/42 identifies the specific task.'
        },
        section9_knowledgeCheckQuestions: [
            {
                question: 'Which HTTP status code should a server return when a new resource is successfully created?',
                options: [
                    '200 OK',
                    '201 Created',
                    '204 No Content',
                    '301 Moved Permanently'
                ],
                correctIndex: 1,
                explanation: '201 Created explicitly indicates that the request succeeded and resulted in the creation of a new resource.'
            },
            {
                question: 'What is the primary difference between 401 Unauthorized and 403 Forbidden?',
                options: [
                    '401 means the database is offline; 403 means the server crashed',
                    '401 means authentication is missing or invalid (who are you?); 403 means authenticated user lacks permission (you cannot do this)',
                    'They are identical and can be used interchangeably',
                    '401 is only used on mobile phones'
                ],
                correctIndex: 1,
                explanation: '401 indicates missing/invalid authentication credentials. 403 indicates the user is recognized but lacks permission for that specific resource.'
            }
        ],
        section10_rememberThesePoints: [
            'REST endpoints represent nouns (resources), not verbs.',
            'Use GET (read), POST (create), PATCH (partial update), DELETE (remove).',
            'Always return semantically accurate HTTP status codes (2xx, 4xx, 5xx).',
            'Transmit payloads in structured JSON format.'
        ],
        section11_independentMasteryCriteria: [
            'Can design an entire REST API specification for a blog, store, or task app from scratch.',
            'Can explain the meaning of status codes 200, 201, 204, 400, 401, 403, 404, and 500 without looking at a cheat sheet.'
        ]
    }
];
//# sourceMappingURL=lessons.js.map