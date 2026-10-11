export const quizzes = {
    // Module 1 Quiz: Introduction to Computers & Programming
    'mod-1': [
        {
            id: 'q-mod1-1',
            quizId: 'mod-1',
            type: 'MULTIPLE_CHOICE',
            question: 'Which computer component is responsible for executing arithmetic, logic, and program instructions step-by-step?',
            options: [
                'The Solid State Drive (SSD)',
                'The Central Processing Unit (CPU)',
                'The Random Access Memory (RAM)',
                'The Network Interface Card (NIC)'
            ],
            correctOptionIndex: 1,
            explanation: 'The CPU is the primary processing unit that fetches, decodes, and executes instructions at clock frequencies of billions of cycles per second.'
        },
        {
            id: 'q-mod1-2',
            quizId: 'mod-1',
            type: 'CODE_PREDICTION',
            question: 'What will be printed to the screen when this code runs?\n\nlet count = 5;\ncount = count * 2;\nconsole.log(count);',
            options: [
                '5',
                'count * 2',
                '10',
                'Undefined'
            ],
            correctOptionIndex: 2,
            explanation: 'The variable "count" starts at 5. The CPU multiplies 5 by 2, yielding 10, and updates the variable in memory. console.log prints 10.'
        },
        {
            id: 'q-mod1-3',
            quizId: 'mod-1',
            type: 'FIND_BUG',
            question: 'Identify the error in this snippet:\n\nconst language = "JavaScript";\nlanguage = "TypeScript";',
            options: [
                'Missing semicolon after "JavaScript"',
                'Cannot reassign a variable declared with "const"',
                'TypeScript is not a valid string',
                'JavaScript variables must start with a dollar sign'
            ],
            correctOptionIndex: 1,
            explanation: 'Variables declared with "const" (constant) cannot be reassigned to a new value. To allow reassignment, use "let".'
        },
        {
            id: 'q-mod1-4',
            quizId: 'mod-1',
            type: 'MULTIPLE_CHOICE',
            question: 'What is the key difference between interpreted and compiled programming languages?',
            options: [
                'Compiled languages can only run on Apple computers',
                'Compiled languages translate source code into machine code ahead of time; interpreted languages translate code on the fly at runtime',
                'Interpreted languages cannot use numbers or mathematical operations',
                'Compiled languages do not require a CPU'
            ],
            correctOptionIndex: 1,
            explanation: 'Compilers produce standalone binary executables ahead of time, while interpreters translate and execute instructions dynamically during program execution.'
        }
    ],
    // Module 2 Quiz: Internet & Web Fundamentals
    'mod-2': [
        {
            id: 'q-mod2-1',
            quizId: 'mod-2',
            type: 'MULTIPLE_CHOICE',
            question: 'What is the role of the Domain Name System (DNS)?',
            options: [
                'It translates human-readable domain names into numerical IP addresses',
                'It converts CSS styles into JavaScript code',
                'It formats HTML pages for mobile phones',
                'It prevents computer fans from overheating'
            ],
            correctOptionIndex: 0,
            explanation: 'DNS functions like the phonebook of the internet, translating domain names (like example.com) to machine IP addresses (like 93.184.216.34).'
        },
        {
            id: 'q-mod2-2',
            quizId: 'mod-2',
            type: 'MULTIPLE_CHOICE',
            question: 'In standard HTTP communication, which party initiates the request?',
            options: [
                'The database server',
                'The client (e.g. web browser)',
                'The internet service provider',
                'The web server'
            ],
            correctOptionIndex: 1,
            explanation: 'In the client-server model, the client initiates the HTTP request and the server responds.'
        },
        {
            id: 'q-mod2-3',
            quizId: 'mod-2',
            type: 'MULTIPLE_CHOICE',
            question: 'What does the HTTP 404 status code indicate?',
            options: [
                'The server crashed due to a database failure',
                'The requested resource could not be found on the server',
                'The request was successful and data was created',
                'The user is not logged in'
            ],
            correctOptionIndex: 1,
            explanation: '404 Not Found means the server reached the domain successfully, but the requested path/file does not exist.'
        }
    ],
    // Module 4 Quiz: HTML
    'mod-4': [
        {
            id: 'q-mod4-1',
            quizId: 'mod-4',
            type: 'MULTIPLE_CHOICE',
            question: 'Which of the following is an example of a Semantic HTML element?',
            options: [
                '<div>',
                '<span>',
                '<article>',
                '<font>'
            ],
            correctOptionIndex: 2,
            explanation: '<article> is a semantic element that clearly describes its content and role to both the browser and screen readers, unlike generic containers like <div> and <span>.'
        },
        {
            id: 'q-mod4-2',
            quizId: 'mod-4',
            type: 'FIND_BUG',
            question: 'Why is `<div onclick="submitForm()">Submit</div>` an accessibility anti-pattern?',
            options: [
                '<div> tags cannot display text in blue',
                'A generic <div> cannot be focused by keyboard Tab navigation and is not announced as an interactive action by screen readers',
                'onclick only works on <h1> tags',
                'Forms cannot be submitted from desktop computers'
            ],
            correctOptionIndex: 1,
            explanation: 'Accessible interfaces require native interactive elements (<button>) which support keyboard focus, Enter/Space activation, and correct ARIA roles automatically.'
        }
    ],
    // Module 13 Quiz: REST APIs
    'mod-13': [
        {
            id: 'q-mod13-1',
            quizId: 'mod-13',
            type: 'MULTIPLE_CHOICE',
            question: 'Which HTTP method should be used to create a new resource in a RESTful API?',
            options: [
                'GET',
                'POST',
                'DELETE',
                'OPTIONS'
            ],
            correctOptionIndex: 1,
            explanation: 'POST is the standard REST method for submitting data to create a new subordinate resource.'
        },
        {
            id: 'q-mod13-2',
            quizId: 'mod-13',
            type: 'MULTIPLE_CHOICE',
            question: 'Which HTTP status code should be returned after successfully creating a new record?',
            options: [
                '200 OK',
                '201 Created',
                '204 No Content',
                '304 Not Modified'
            ],
            correctOptionIndex: 1,
            explanation: '201 Created explicitly confirms the request succeeded and resulted in the creation of a new resource.'
        }
    ]
};
//# sourceMappingURL=quizzes.js.map