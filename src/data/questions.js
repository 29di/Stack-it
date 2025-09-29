// Shared question data for the application
export const dummyQuestions = [
  {
    _id: '1',
    title: 'How to join 2 columns in a data set to make a separate column in SQL',
    description: 'I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name, and column 2 consists of last name I want a column to combine them into a full name column.',
    tags: ['SQL', 'Database'],
    votes: 5,
    answers: [
      {
        id: 1,
        content: `The || Operator.
The + Operator.
The CONCAT Function.`,
        author: 'Expert User',
        votes: 8,
        isAccepted: true,
        timeAgo: '3 hours ago'
      },
      {
        id: 2,
        content: `You can use the CONCAT function in SQL to combine two columns.
        
Here's an example:
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;

This will create a new column called 'full_name' that combines the first_name and last_name columns with a space in between.`,
        author: 'SQL Helper',
        votes: 3,
        isAccepted: false,
        timeAgo: '2 hours ago'
      }
    ],
    author: 'User Name',
    timeAgo: '5 hours ago'
  },
  {
    _id: '2',
    title: 'React useState not updating component when state changes',
    description: 'I\'m having trouble with React useState. When I update the state, the component doesn\'t re-render. I\'ve tried multiple approaches but nothing seems to work. Can someone help me understand what I\'m doing wrong?',
    tags: ['React', 'JavaScript', 'useState'],
    votes: 12,
    answers: [
      {
        id: 1,
        content: `This usually happens when you're mutating the state directly instead of creating a new object or array. React uses Object.is() comparison to determine if the state has changed.

Here are the common solutions:

1. For objects: Use spread operator
\`\`\`javascript
setState({...oldState, newProperty: value});
\`\`\`

2. For arrays: Use methods that return new arrays
\`\`\`javascript
setItems([...items, newItem]);
\`\`\``,
        author: 'ReactExpert',
        votes: 15,
        isAccepted: true,
        timeAgo: '2 hours ago'
      },
      {
        id: 2,
        content: `Make sure you're not calling setState inside the render function directly, as this can cause infinite loops. Use useEffect for side effects.`,
        author: 'HooksMaster',
        votes: 8,
        isAccepted: false,
        timeAgo: '1 hour ago'
      }
    ],
    author: 'ReactNewbie',
    timeAgo: '3 hours ago'
  },
  {
    _id: '3',
    title: 'How to center a div using CSS flexbox?',
    description: 'I\'ve been trying to center a div both horizontally and vertically using CSS flexbox, but I can\'t get it to work properly. What\'s the correct way to do this?',
    tags: ['CSS', 'Flexbox', 'HTML'],
    votes: 8,
    answers: [
      {
        id: 1,
        content: `To center a div both horizontally and vertically with flexbox:

\`\`\`css
.container {
  display: flex;
  justify-content: center; /* horizontal centering */
  align-items: center;     /* vertical centering */
  height: 100vh;           /* full viewport height */
}
\`\`\`

This is the most reliable method for centering with flexbox!`,
        author: 'CSSGuru',
        votes: 12,
        isAccepted: true,
        timeAgo: '1 hour ago'
      }
    ],
    author: 'CSSLearner',
    timeAgo: '2 hours ago'
  },
  {
    _id: '4',
    title: 'Python list comprehension vs for loop performance',
    description: 'Which is faster in Python: list comprehension or traditional for loops? I\'ve heard different opinions and would like to know the technical reasons behind the performance differences.',
    tags: ['Python', 'Performance', 'Lists'],
    votes: 15,
    answers: [
      {
        id: 1,
        content: `List comprehensions are generally faster than for loops for several reasons:

1. **Optimized at C level**: List comprehensions are implemented in C in CPython
2. **Less function call overhead**: No need to call append() repeatedly
3. **Single allocation**: The result list size is often pre-allocated

Benchmark example:
\`\`\`python
# List comprehension (faster)
squares = [x**2 for x in range(1000)]

# For loop (slower)
squares = []
for x in range(1000):
    squares.append(x**2)
\`\`\``,
        author: 'PythonPerformance',
        votes: 20,
        isAccepted: true,
        timeAgo: '45 minutes ago'
      }
    ],
    author: 'PythonEnthusiast',
    timeAgo: '1 hour ago'
  },
  {
    _id: '5',
    title: 'How to handle async/await in JavaScript properly?',
    description: 'I\'m confused about when to use async/await vs Promises in JavaScript. Can someone explain the differences and best practices for handling asynchronous operations?',
    tags: ['JavaScript', 'Async', 'Promises'],
    votes: 22,
    answers: [
      {
        id: 1,
        content: `async/await is syntactic sugar over Promises. Here are the key differences:

**Promises:**
\`\`\`javascript
fetchData()
  .then(data => processData(data))
  .then(result => console.log(result))
  .catch(error => console.error(error));
\`\`\`

**Async/Await:**
\`\`\`javascript
async function handleData() {
  try {
    const data = await fetchData();
    const result = await processData(data);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

async/await makes code more readable and easier to debug!`,
        author: 'AsyncMaster',
        votes: 25,
        isAccepted: true,
        timeAgo: '30 minutes ago'
      }
    ],
    author: 'AsyncDeveloper',
    timeAgo: '45 minutes ago'
  },
  {
    _id: '6',
    title: 'Git merge vs rebase - when to use which?',
    description: 'I\'m working on a team project and I\'m not sure when I should use git merge versus git rebase. What are the pros and cons of each approach?',
    tags: ['Git', 'Version Control'],
    votes: 18,
    answers: [],
    author: 'GitNewbie',
    timeAgo: '30 minutes ago'
  },
  {
    _id: '7',
    title: 'How to optimize MongoDB queries for better performance?',
    description: 'My MongoDB queries are running very slowly on large datasets. What are some strategies to optimize query performance? Should I be using indexes differently?',
    tags: ['MongoDB', 'Database', 'Performance'],
    votes: 9,
    answers: [],
    author: 'DatabaseDev',
    timeAgo: '25 minutes ago'
  },
  {
    _id: '8',
    title: 'Understanding Docker containers vs virtual machines',
    description: 'What\'s the difference between Docker containers and virtual machines? When should I use one over the other for my applications?',
    tags: ['Docker', 'DevOps', 'Containers'],
    votes: 13,
    answers: [],
    author: 'DevOpsEngineer',
    timeAgo: '20 minutes ago'
  },
  {
    _id: '9',
    title: 'How to implement authentication in a Node.js REST API?',
    description: 'I\'m building a REST API with Node.js and Express. What\'s the best way to implement user authentication? Should I use JWT tokens or sessions?',
    tags: ['Node.js', 'Authentication', 'REST API'],
    votes: 16,
    answers: [],
    author: 'BackendDev',
    timeAgo: '15 minutes ago'
  },
  {
    _id: '10',
    title: 'CSS Grid vs Flexbox - which layout system to choose?',
    description: 'I\'m confused about when to use CSS Grid versus Flexbox for layouts. Can someone explain the key differences and use cases for each?',
    tags: ['CSS', 'Grid', 'Flexbox'],
    votes: 11,
    answers: [],
    author: 'FrontendDev',
    timeAgo: '10 minutes ago'
  },
  {
    _id: '11',
    title: 'How to handle state management in large React applications?',
    description: 'As my React app grows, managing state becomes more complex. Should I use Redux, Context API, or something else? What are the best practices?',
    tags: ['React', 'State Management', 'Redux'],
    votes: 20,
    answers: [],
    author: 'ReactDeveloper',
    timeAgo: '5 minutes ago'
  },
  {
    _id: '12',
    title: 'Python decorators explained with practical examples',
    description: 'I keep seeing decorators in Python code but I don\'t understand how they work. Can someone explain decorators with some practical examples?',
    tags: ['Python', 'Decorators', 'Functions'],
    votes: 14,
    answers: [],
    author: 'PythonStudent',
    timeAgo: 'just now'
  },
  {
    _id: '13',
    title: 'How to optimize website performance and loading speed?',
    description: 'My website is loading slowly and I want to improve its performance. What are the most effective techniques for optimizing web performance?',
    tags: ['Performance', 'Web Optimization', 'SEO'],
    votes: 17,
    answers: [],
    author: 'WebOptimizer',
    timeAgo: 'just now'
  },
  {
    _id: '14',
    title: 'Understanding closures in JavaScript with examples',
    description: 'JavaScript closures are confusing me. I understand the basic concept but I don\'t see practical use cases. Can someone provide clear examples?',
    tags: ['JavaScript', 'Closures', 'Functions'],
    votes: 7,
    answers: [],
    author: 'JSLearner',
    timeAgo: 'just now'
  },
  {
    _id: '15',
    title: 'How to secure a web application against common vulnerabilities?',
    description: 'I\'m building a web application and want to ensure it\'s secure. What are the most common security vulnerabilities I should protect against?',
    tags: ['Security', 'Web Development', 'OWASP'],
    votes: 25,
    answers: [],
    author: 'SecurityMinded',
    timeAgo: 'just now'
  }
];