const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let tasks = [];

app.get("/", (req, res) => {

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    task => task.status === "Pending"
  ).length;

  const completedTasks = tasks.filter(
    task => task.status === "Completed"
  ).length;

  res.render("dashboard", {
    tasks,
    totalTasks,
    pendingTasks,
    completedTasks
  });
});

// Add Task Page
app.get("/add-task", (req, res) => {
  res.render("add-task");
});

// Add Task Logic
app.post("/add-task", (req, res) => {

  const { title, description, priority } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    description,
    priority,
    status: "Pending"
  };

  tasks.push(newTask);

  res.redirect("/");
});

// Edit Page
app.get("/edit-task/:id", (req, res) => {

  const task = tasks.find(
    t => t.id == req.params.id
  );

  res.render("edit-task", { task });
});

// Update Task
app.post("/update-task/:id", (req, res) => {

  const task = tasks.find(
    t => t.id == req.params.id
  );

  task.title = req.body.title;
  task.description = req.body.description;
  task.priority = req.body.priority;

  res.redirect("/");
});

// Delete Task
app.get("/delete-task/:id", (req, res) => {

  tasks = tasks.filter(
    t => t.id != req.params.id
  );

  res.redirect("/");
});

// Status Update
app.get("/status-task/:id", (req, res) => {

  const task = tasks.find(
    t => t.id == req.params.id
  );

  if (task.status === "Pending") {
    task.status = "In Progress";
  }
  else if (task.status === "In Progress") {
    task.status = "Completed";
  }

  res.redirect("/");
});

app.listen(8000, () => {
  console.log("Server Running On Port 8000");
});