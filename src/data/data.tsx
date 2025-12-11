import { v4 as uuid } from 'uuid';

export const initBoards = [
  {
    id: uuid(),
    title: "Website Redesign",
    tasks: [
      {
        id: uuid(),
        title: "Create wireframes",
        description: "Design the basic layout and structure",
        status: "todo",
        subtasks: [
          { id: uuid(), title: "Sketch homepage", done: false },
          { id: uuid(), title: "Sketch dashboard", done: true },
        ],
      },
      {
        id: uuid(),
        title: "Prototype interactions",
        description: "Create clickable prototype",
        status: "doing",
        subtasks: [
          { id: uuid(), title: "Homepage flow", done: true },
          { id: uuid(), title: "Settings flow", done: false },
        ],
      },
    ],
  },
  {
    id: uuid(),
    title: "Mobile App Launch",
    tasks: [
      {
        id: uuid(),
        title: "Set up analytics",
        description: "Integrate Google Analytics",
        status: "todo",
        subtasks: [
          { id: uuid(), title: "Install SDK", done: true },
          { id: uuid(), title: "Track user events", done: false },
        ],
      },
      {
        id: uuid(),
        title: "App store submission",
        description: "Prepare assets and metadata",
        status: "doing",
        subtasks: [
          { id: uuid(), title: "Screenshots", done: false },
          { id: uuid(), title: "App description", done: true },
        ],
      },
    ],
  },
  {
    id: uuid(),
    title: "Marketing Campaign",
    tasks: [
      {
        id: uuid(),
        title: "Email newsletter",
        description: "Create monthly newsletter",
        status: "done",
        subtasks: [
          { id: uuid(), title: "Write copy", done: true },
          { id: uuid(), title: "Design template", done: true },
        ],
      },
      {
        id: uuid(),
        title: "Social media ads",
        description: "Schedule Instagram & Facebook ads",
        status: "todo",
        subtasks: [
          { id: uuid(), title: "Design creatives", done: false },
          { id: uuid(), title: "Set targeting", done: false },
        ],
      },
    ],
  },
  {
    id: uuid(),
    title: "Product Research",
    tasks: [
      {
        id: uuid(),
        title: "Survey existing customers",
        description: "Collect feedback for improvements",
        status: "doing",
        subtasks: [
          { id: uuid(), title: "Prepare questions", done: true },
          { id: uuid(), title: "Send survey", done: false },
        ],
      },
      {
        id: uuid(),
        title: "Analyze competitor features",
        description: "Compare features and pricing",
        status: "todo",
        subtasks: [
          { id: uuid(), title: "List top 5 competitors", done: false },
          { id: uuid(), title: "Create comparison table", done: false },
        ],
      },
    ],
  },
];
