# ProfConnect - Academic Research Management System

## Overview
ProfConnect is a comprehensive backend API for managing academic research assets. It provides a centralized platform for professors and researchers to track and organize their research papers, patents, projects, and professional portfolios.

## Tech Stack
- **Node.js & Express**: RESTful API framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication and authorization
- **Cloudinary**: File storage for documents and images
- **Google Auth**: OAuth integration for simplified login
- **Mailgen**: Email templating for notifications

## Features

### User Management
- Secure authentication with JWT and password hashing
- Google OAuth integration
- Role-based access control (admin/user)
- Profile management with avatar and cover image support

### Research Paper Management
- Create, read, update, and delete research papers
- Track publication status, citations, and metadata
- Categorize papers (journal, conference, book chapter)
- Google Scholar integration for paper data

### Patent Management
- Track patent applications and their status
- Store patent documents securely in the cloud
- Organize patents with tags and metadata

### Project Management
- Create and manage research projects
- Track project status, team members, and timelines
- Associate projects with research outputs

### Portfolio Management
- Create professional portfolios with research interests
- Link social profiles and contact information
- Showcase publications and achievements

### Collaboration Tools
- Group creation for collaborative research
- Star/favorite system for important papers
- Dashboard with research metrics and analytics

## API Endpoints

The API is organized into the following routes:
- `/api/v1/users`: User authentication and profile management
- `/api/v1/papers`: Research paper CRUD operations
- `/api/v1/patents`: Patent management
- `/api/v1/projects`: Research project management
- `/api/v1/portfolio`: Professional portfolio management
- `/api/v1/group`: Research group collaboration
- `/api/v1/star`: Favorite/star system
- `/api/v1/dashboard`: Analytics and statistics
- `/api/v1/admin`: Administrative functions

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- Cloudinary account
- Google OAuth credentials (for Google login)

### Installation
1. Clone the repository
2. Install dependencies:
