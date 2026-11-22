# StudyFlow – Student Productivity Dashboard

StudyFlow is a responsive, multi-page React application designed to help students plan study tasks, track their progress, and manage study sessions using a focus timer.

## 🔗 Project Links

- **Live Website:** https://studyflow-dashboard-pkt6.onrender.com
- **GitHub Repository:** https://github.com/Neema2023/studyflow-dashboard


##  Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- JavaScript
- Browser Local Storage

##  Pages

1. **Dashboard (`/`)** – Displays task summaries, study progress, and upcoming tasks.
2. **Tasks (`/tasks`)** – Allows users to create, view, edit, delete, search, filter, sort, and complete tasks.
3. **Focus (`/focus`)** – Provides a study and break timer with Start, Pause, and Reset controls.
4. **Settings (`/settings`)** – Allows users to customize their display name, study duration, and preferences.

##  Key Features

- Task management with full CRUD functionality.
- Search tasks by title.
- Filter tasks by category and status.
- Sort tasks by due date or alphabetically.
- Validate forms to prevent empty task titles.
- Track completed, pending, and total tasks.
- Use a focus timer for study and break sessions.
- Save tasks and settings using Local Storage.
- Responsive navigation and layouts for desktop and mobile devices.

##  Component Tree & State Ownership

**State Ownership:**

The shared `tasks` and `settings` state are managed at the application level in `App.jsx`. The application passes the required data and callback functions to the relevant pages through props. This keeps shared information consistent when navigating between routes.

**Component Tree:**

```text
App
└── SiteLayout
    ├── Navbar
    ├── DashboardPage
    │   ├── SummaryCard
    │   └── UpcomingTasks
    ├── TasksPage
    │   ├── TaskForm
    │   ├── TaskFilters
    │   └── TaskCard
    ├── FocusPage
    │   └── FocusTimer
    ├── SettingsPage
    └── NotFoundPage
```

##  Custom Hooks

The project uses custom React Hooks to organize reusable functionality:

1. `useLocalStorage` – Saves and retrieves tasks and settings from browser Local Storage.
2. `useToggle` – Manages toggleable boolean state.
3. `useDocumentTitle` – Updates the browser tab title.
4. `useDebounce` – Delays search updates while the user is typing.

##  Rendering and Performance

- **State Placement:** The timer state is managed inside the Focus Timer component to avoid unnecessary updates to the entire application every second.
- **Timer Cleanup:** `useEffect` uses a cleanup function to clear the timer interval when the component unmounts or the effect changes.
- **Component Reset:** React's `key` prop is used to reset the timer component when switching between study and break sessions.
- **Derived Values:** Task summaries and filtered results are calculated from the existing task state instead of being stored as duplicate state.
- **Memoization:** `useMemo` is used where it helps avoid unnecessary calculations. React Compiler can also help optimize component rendering automatically when configured.

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Neema2023/studyflow-dashboard.git
```

### 2. Navigate to the project folder

```bash
cd studyflow-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to use the application.

### 5. Build for production

```bash
npm run build
```

##  Data Persistence

StudyFlow is a frontend-only application. It does not require a backend, external API, or database.

Tasks and user settings are saved in the browser using Local Storage, allowing the information to remain available after refreshing the page.

##  What I Learned

Through this project, I gained practical experience in building a multi-page React application, creating reusable components, managing shared state with props, handling forms and user interactions, and implementing navigation with React Router.

I also practiced using built-in and custom React Hooks, managing timer intervals with `useEffect`, working with `useRef`, saving data in Local Storage, and understanding component rendering and performance.

## Author

**Neema**



---

