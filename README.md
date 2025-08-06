<div align="center">
  <img src="frontend/public/logo.png" alt="Citizens Advice Logo" width="100" height="100" />
  <h1>Citizens Advice SORT</h1>
  <h3>Junior Developer Practical Solution – Lashmy Habib</h3>
</div>

---

## Overview

This is my solution to the full-stack practical exercise for the Junior Developer role at Citizens Advice SORT. The application is built using a Python (FastAPI) backend and a Next.js frontend.

Based on the limited context provided, I’ve made the assumption that the data represents a sample of content from an internal adviser guidance system, designed to help advisers support clients more effectively. With this in mind, I’ve aimed to mirror the tone and formatting found on the [citizensadvice.org.uk](https://www.citizensadvice.org.uk) website to ensure the user interface feels familiar and accessible.

---

## Task Breakdown

### Backend
- **Parsed and identified cited sources** from the `mock.json` content, gracefully handling missing or malformed references.
- **Replaced document IDs** with fully-qualified URLs based on the source metadata. I have also set up error logging for when this is not possile due to discrepancies between the article reference ID's and the content.
- **Fetched and applied favicon URLs** for each source; a default icon is shown where no favicon is available. I have used icons from the Heroicons library throughout the project, as well as to replace missing favicons.

### Frontend
- **Displayed each piece of guidance content** with its associated cited and uncited sources clearly listed.
- **Included favicons** for each source, enhancing visual recognition and trust.
- **Applied accessible, user-friendly formatting**, closely following the Citizens Advice website's style for consistency and usability.

---

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd junior-developer
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   poetry install --no-root
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

Use the provided Makefile for easy setup:

```bash
# Install all dependencies
make install

# Start the backend server
make run-backend

# Start the frontend development server
make run-frontend
```

Or run manually:

**Backend:**
```bash
cd backend
poetry run fastapi dev main.py
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## API Endpoints

- `GET /data` - Returns the list of data
