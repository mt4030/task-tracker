

# **🗂️ React Task Manager (Boards • Tasks • Subtasks)**

A lightweight, fully local, Kanban-style task manager built with **React**, **Context API**, **useReducer**, and **shadcn/ui**.
Supports multiple boards, tasks, subtasks, status updates, and automatic `localStorage` persistence.

---

## **✨ Features**

### **🧩 Boards**

* Create new boards
* Rename boards
* Delete boards

### **📌 Tasks**

* Add tasks under each board
* Edit task title, description, status
* Delete tasks
* Real-time syncing to Context + reducer

### **✅ Subtasks**

* Add subtasks
* Toggle subtask done/undone
* Delete subtasks
* Auto-updates task status:

  * **All done → `done`**
  * **All not done → `todo`**
  * **Mixed → `in-progress`**

### **💾 Persistence**

* App state stored in `localStorage`
* Loads instantly on refresh
* No backend required

### **🎨 UI**

* Built with **shadcn/ui** components
* Responsive dialogs & forms
* Clean, modern, minimal dashboard feel

---

## **🛠️ Tech Stack**

| Tech                         | Usage                        |
| ---------------------------- | ---------------------------- |
| **React**                    | UI rendering                 |
| **Context API + useReducer** | Global state management      |
| **TypeScript (optional)**    | Type-safe actions & reducers |
| **shadcn/ui**                | UI components                |
| **Lucide Icons**             | Icons                        |
| **localStorage**             | Data persistence             |
| **uuid**                     | ID generation                |

---

## **📁 Project Structure**

```
src/
 ├── components/
 │    ├── TaskDetail.tsx
 │    └── ...
 ├── context/
 │    └── TodoContext.tsx
 ├── data/
 │    └── data.ts (initial demo boards)
 ├── App.tsx
 └── main.tsx
```

---

## **⚙️ How State Works**

Everything is centralized in **TodoContext**:

* `ADD_BOARD`
* `DELETE_BOARD`
* `RENAME_BOARD`
* `ADD_TASK`
* `UPDATE_TASK`
* `DELETE_TASK`
* `ADD_SUBTASK`
* `DELETE_SUBTASK`
* `TOGGLE_TASK`
  → recalculates task status automatically

The reducer handles all complex updates immutably.

---

## **📌 Example: Subtask Toggle Logic**

When a subtask is toggled:

```ts
const updatedSubtasks = task.subtasks.map(st =>
  st.id === subtaskId ? { ...st, done: !st.done } : st
);

const calculatedStatus =
  updatedSubtasks.every(s => s.done)
    ? 'done'
    : updatedSubtasks.every(s => !s.done)
    ? 'todo'
    : 'in-progress';
```

Task status stays in sync with subtask progress automatically.

---

## **🚀 Getting Started**

### 1. Clone the repo

```
git clone https://github.com/yourname/your-repo.git
cd your-repo
```

### 2. Install dependencies

```
npm install
```

### 3. Start development server

```
npm run dev
```

The app will open at:

```
http://localhost:5173
```


---

## **🤝 Contributing**

Pull requests are welcome!

---

## **📜 License**

MIT License — free for personal & commercial use.

---

