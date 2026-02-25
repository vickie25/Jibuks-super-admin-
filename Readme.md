# 🚀 Jibuks Super Admin

A powerful, modern, and high-performance super admin dashboard for the Jibuks platform. Built with a focus on speed, scalability, and exceptional user experience.

![Dashboard Preview](https://via.placeholder.com/1200x600?text=Jibuks+Super+Admin+Dashboard)

## ✨ Features

- **📊 Comprehensive Dashboard**: Real-time analytics and overview of system performance.
- **👥 User Management**: Detailed control over user profiles, permissions, and activities.
- **🛠️ App Management**: Oversee and configure integrated applications within the Jibuks ecosystem.
- **✅ Task Tracking**: Efficiently manage and assign system tasks.
- **⚙️ Advanced Settings**: Granular control over platform configurations.
- **💬 Chat System**: Integrated communication tools for administrators.
- **🔐 Secure Authentication**: Powered by Clerk for robust and easy-to-manage security.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vite.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/vickie25/Jibuks-super-admin-.git
    cd Jibuks-super-admin-
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory based on `.env.example`:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
    ```

4.  **Start Development Server**:
    ```bash
    npm run dev
    ```

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the application for production. |
| `npm run lint` | Runs ESLint to check for code issues. |
| `npm run preview` | Previews the production build locally. |
| `npm run format` | Checks and fixes code formatting with Prettier. |

## 📁 Project Structure

```text
src/
├── assets/          # Static assets (images, icons, etc.)
├── components/      # Shared reusable UI components
├── features/        # Feature-based modules (Auth, Users, Dashboard, etc.)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and library configurations
├── routes/          # TanStack Router route definitions
├── stores/          # Zustand state stores
├── styles/          # Global styles and Tailwind configurations
└── main.tsx         # Application entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.