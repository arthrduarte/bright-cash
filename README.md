# Financial Management Platform

A comprehensive financial management platform that empowers users to gain deep insights into their financial health through intuitive tracking, visualization, and analysis of income, expenses, and cash flow.

## Features

- Track income, expenses, and investments
- Visualize spending patterns with interactive charts
- Filter transactions by date range
- Detailed transaction history
- Responsive design for all devices

## Installation Options

### Option 1: Using Replit (Recommended)

1. Visit the Replit project page
2. Click the "Fork" button to create your own copy
3. The environment will be automatically set up with all dependencies
4. Click the "Run" button to start the application

### Option 2: Local Development

1. Prerequisites:
   - Node.js 20 or later
   - npm (comes with Node.js)
   - Git (for cloning the repository)

2. Installation Steps:
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd <project-directory>

   # Install dependencies
   npm install

   # Create SQLite database
   # The database will be automatically initialized when you start the application
   ```

3. Environment Setup:
   - No additional environment variables are required for basic functionality
   - The SQLite database will be created automatically on first run

4. Running the application:
   ```bash
   # Start the development server
   npm run dev
   ```

5. The application will be available at `http://localhost:5000`

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Express.js
- Database: SQLite with Drizzle ORM
- Styling: Tailwind CSS + shadcn/ui
- Charts: Recharts
- Form Handling: React Hook Form + Zod

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable React components
  - `/src/pages` - Application pages
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions and constants
- `/server` - Express.js backend
- `/shared` - Shared types and schemas
- `/migrations` - Database migrations

## License

MIT