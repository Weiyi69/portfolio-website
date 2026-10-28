import type { Project } from '../types/index.js'

export const projects: Project[] = [
  {
    number: '01',
    slug: 'converse',
    name: 'Converse',
    category: 'Real-time messaging',
    summary: 'A personal full-stack real-time messaging application.',
    year: '2025',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Mongoose'],
    accent: 'lavender',
    visual: 'chat',
    overview: 'Converse is a full-stack messaging application for private conversations, file sharing, and conversation management.',
    contribution:
      "I worked on the application's full-stack development, including the frontend interface, backend APIs, database integration, and real-time communication. I focused on connecting the user experience with reliable server-side functionality and organizing the application into maintainable components and services.",
    technicalApproach:
      'I used React, TypeScript, and Tailwind CSS for the frontend, with Node.js, Express, Socket.IO, and MongoDB on the backend.',
    features: [
      'Conversation list and search screens',
      'Image messaging screen',
      'Login and registration screens',
      'Conversation information view',
    ],
    problem:
      'Converse was created to explore how a modern messaging application can support private conversations, real-time communication, and persistent message history. The goal was to build an interactive chat experience where users can communicate, share files, and manage conversations through a clean and intuitive interface.',
    keyDecisionsAndChallenges:
      'A key engineering challenge was coordinating real-time events with persistent database records. Messages are saved before being broadcast to connected users, and conversation access is authorized.',
    outcome:
      'The project demonstrates my ability to build a full-stack messaging application that combines real-time communication, persistent data, and user authentication. It also gave me practical experience with WebSocket-based communication, backend authorization, and designing interactive interfaces for multi-user applications.',
  },
  {
    number: '02',
    slug: 'sab-builders',
    name: 'SAB Builders',
    category: 'Construction company website',
    summary: 'A corporate website for a construction and trading business.',
    demoUrl: 'https://sab-builders.vercel.app',
    year: '2025',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Framer Motion', 'GSAP'],
    accent: 'sand',
    visual: 'construction',
    overview:
      'A corporate website for SAB Builders and Trading Inc. that presents the company, its services, and its construction work.',
    contribution:
      "I worked on the website's design and front-end development, building a responsive corporate website with clear content structure and intuitive navigation. I focused on presenting the company's information professionally and creating a consistent experience across desktop and mobile devices.",
    technicalApproach:
      'Built with React, TypeScript, Vite, and Tailwind CSS, with React Router for routing and Framer Motion and GSAP for animation.',
    features: [
      'Company information',
      'Services',
      'Project showcases and details',
      'Leadership',
      'Contact information',
    ],
    problem:
      "SAB Builders needed a professional website to establish its online presence and present its construction services, completed projects, and company information. The goal was to help potential clients understand the company's capabilities and explore its services.",
    keyDecisionsAndChallenges:
      'I used React, TypeScript, Vite, and Tailwind CSS to build a maintainable, responsive interface. I also used Framer Motion and GSAP for animation, focusing on visual engagement, smooth navigation, and layouts that work across screen sizes.',
    outcome:
      "The result is a corporate website designed to showcase SAB Builders' services, projects, team, and company information in a professional format. The website demonstrates my ability to build responsive business websites using modern front-end technologies.",
  },
  {
    number: '03',
    slug: 'retailflow',
    name: 'RetailFlow',
    category: 'Retail inventory and sales',
    summary: 'An inventory and sales management system for retail and clothing businesses.',
    year: '2024',
    stack: ['Python', 'Flask', 'SQLAlchemy', 'SQLite', 'Flask-Migrate', 'Jinja', 'JavaScript', 'Chart.js'],
    accent: 'peach',
    visual: 'retail',
    overview:
      'RetailFlow is an inventory and sales management system for retail and clothing businesses, with administrative workflows and a customer-facing catalog and checkout.',
    contribution:
      "I worked on the application's full-stack development, including its interface, backend logic, database models, and business workflows. I focused on helping users organize products, monitor inventory, record transactions, and review business information through a centralized dashboard.",
    technicalApproach:
      'Built with Flask, SQLAlchemy, SQLite, and Flask-Migrate for the application and data layer, with Jinja and JavaScript for the interface and Chart.js for reporting.',
    features: [
      'Product catalog and inventory tracking',
      'Sales and point of sale',
      'Expenses and reporting',
      'Product details, cart, checkout, and order confirmation',
    ],
    problem:
      'RetailFlow addresses inventory and sales management needs for retail and clothing businesses. It brings product tracking, stock management, sales transactions, expense recording, and business reporting into one application instead of relying on disconnected records or manual processes.',
    keyDecisionsAndChallenges:
      'I used Python, Flask, SQLAlchemy, and SQLite for the backend and data layer, with Jinja templates, JavaScript, and Chart.js for the interface and reporting. An important engineering consideration was keeping inventory quantities consistent with sales transactions while organizing database models and business logic for reliable recordkeeping and reporting.',
    outcome:
      'RetailFlow brings core inventory, sales, expense, and reporting workflows together in one system. The project demonstrates my ability to build database-driven web applications, implement business logic, and develop practical tools around real-world operational needs.',
  },
]
