import type { Project } from '../types'

export const projects: Project[] = [
  {
    number: '01',
    slug: 'converse',
    name: 'Converse',
    category: 'Real-time messaging',
    summary: 'A personal full-stack real-time messaging application.',
    year: '2025',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Mongoose'],
    accent: 'lavender',
    visual: 'chat',
    overview:
      'Converse is a personal full-stack project exploring real-time messaging. The available screens show account access, conversations, image messaging, and conversation information.',
    contribution:
      'A personal project focused on bringing the messaging experience and the server-side communication flow together.',
    technicalApproach:
      'The supplied stack pairs a React and TypeScript interface with a Node.js and Express backend, Socket.IO for real-time communication, and MongoDB with Mongoose.',
    features: [
      'Conversation list and search screens',
      'Image messaging screen',
      'Login and registration screens',
      'Conversation information view',
    ],
  },
  {
    number: '02',
    slug: 'sab-builders',
    name: 'SAB Builders',
    category: 'Construction company website',
    summary: 'A corporate website for a construction and trading business.',
    year: '2025',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Framer Motion', 'GSAP'],
    accent: 'sand',
    visual: 'construction',
    overview:
      'A corporate website for SAB Builders and Trading Inc. that presents the company, its services, and its construction work.',
    contribution:
      'The project scope covers the public-facing company website and its key information and project showcase pages.',
    technicalApproach:
      'The supplied stack combines React and TypeScript with Vite and Tailwind CSS, with React Router, Framer Motion, and GSAP listed for routing and motion.',
    features: [
      'Company information',
      'Services',
      'Project showcases and details',
      'Leadership',
      'Contact information',
    ],
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
      'The project scope spans the store-facing shopping journey and the administrative tools used to manage day-to-day retail operations.',
    technicalApproach:
      'The supplied stack uses Flask, SQLAlchemy, SQLite, and Flask-Migrate for the application and data layer, with Jinja, JavaScript, and Chart.js for the interface and reporting.',
    features: [
      'Product catalog and inventory tracking',
      'Sales and point of sale',
      'Expenses and reporting',
      'Product details, cart, checkout, and order confirmation',
    ],
  },
]
