# Owndays Landing Page & Dashboard

## How to Run the Project

This project uses [Bun](https://bun.sh/) as the package manager and `json-server` for the mock backend API.

### 1. Install Dependencies
```bash
bun install
```
*(If you don't have bun installed, you can also use `npm install`)*

### 2. Start the Mock API Server
Open a terminal and run the following command to start `json-server` to serve the mock database:
```bash
bun run server
```
This will start the backend API server at `http://localhost:3001` using `db.json` as the data source.

### 3. Start the Frontend Development Server
Open a **new** terminal window and start the Vite development server:
```bash
bun run dev
```
The application will be available at `http://localhost:5173`.

---

## ✅ What's Finished

- **Landing Page + Responsive Design**
- **Registration Form + Validation**
- **Save Submissions as Data**
- **Dashboard (Totals & Chart)**
- **Filter**
- **Export to CSV**:
- **Page Visit Tracking**

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Form Validation**: React Hook Form + Zod
- **Charts**: Recharts
- **Mock Backend**: JSON Server
- **Routing**: React Router DOM

---

## ✨ Things I want to improve
- Improve the overall UI smoothness and animations
- Replace the mock API with a real backend service
- Enhance the visual design and aesthetics of the input fields

---

## 🤖 How AI was used in this project
- **Project Setup**: Initializing the project and installing dependencies.
- **Folder Structure**: Organizing the project architecture according to the planned design.
- **Styling & UI**: Implementing the website's styling to match the guidelines specified in `DESIGN.md`.
- 
