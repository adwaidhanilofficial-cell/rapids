# Rapids LXP - Executive Training Platform

This is a premium executive training platform built with React, Tailwind CSS, and Framer Motion.

## 🚀 Deployment Instructions

### Option 1: Deploy to GitHub Pages

1.  Initialize a git repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Link your local repository:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/rapids-lxp.git
    git push -u origin main
    ```
4.  Go to your repository **Settings > Pages**.
5.  Source: **GitHub Actions** (recommended) or deploy from a branch if you configure a workflow.

### Option 2: Deploy to Vercel (Recommended)

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run: `vercel`
3.  Follow the prompts. Vercel detects Vite and deploys automatically.

### Option 3: Deploy to Netlify

1.  Drag and drop the `dist` folder (after running `npm run build`) to Netlify Drop.

## 🛠 Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start dev server:
    ```bash
    npm run dev
    ```
3.  Build for production:
    ```bash
    npm run build
    ```

## ✨ Features

*   **Luxury UI/UX**: Custom Platinum-Gold gradients and glassmorphism.
*   **Animations**: Framer Motion transitions and CSS keyframes.
*   **Responsive**: Mobile-first design using Tailwind CSS.
