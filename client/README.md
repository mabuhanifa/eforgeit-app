# Test_School - Client Application

This is the frontend for the Test_School Competency Assessment Platform, built with React, TypeScript, and Vite.

## Technology Stack

- **Framework**: React.js
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit & RTK Query
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form
- **Schema Validation**: Zod

## Getting Started

Follow these instructions to get the client application running on your local machine.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  **Navigate to the client directory:**

    ```bash
    cd client
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

### Environment Variables

The client application needs to know the URL of the backend API.

1.  Create a local environment file by copying the example file:

    ```bash
    cp .env.example .env.local
    ```

2.  Open the `.env.local` file. The default value should be correct for local development:
    ```
    VITE_API_BASE_URL=http://localhost:5000
    ```

### Running the Application

1.  **Important:** Make sure the backend server is running first. (See the `server/README.md` for instructions).

2.  **Start the client development server:**
    ```bash
    npm run dev
    ```

The application will now be available at `http://localhost:5173`.
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
