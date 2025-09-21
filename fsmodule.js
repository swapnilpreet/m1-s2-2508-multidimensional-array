const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// Folder to store files
const DATA_DIR = path.join(__dirname, "data");

// Helper: get full path of a file
const getFilePath = (filename) => path.join(DATA_DIR, filename);

// -------------------- ROUTES --------------------

// GET: List all files
app.get("/files", (req, res) => {
  fs.readdir(DATA_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: "Error reading directory" });
    res.json({ files });
  });
});

// GET: Read a specific file
app.get("/files/:filename", (req, res) => {
  const filePath = getFilePath(req.params.filename);
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(404).json({ error: "File not found" });
    res.json({ content: data });
  });
});

// POST: Create a new file
app.post("/files", (req, res) => {
  const { filename, content } = req.body;
  if (!filename) return res.status(400).json({ error: "Filename is required" });

  const filePath = getFilePath(filename);

  fs.writeFile(filePath, content || "", (err) => {
    if (err) return res.status(500).json({ error: "Error creating file" });
    res.json({ message: "File created successfully!", filename });
  });
});

// PATCH: Append content to a file
app.patch("/files/:filename", (req, res) => {
  const filePath = getFilePath(req.params.filename);
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  fs.appendFile(filePath, "\n" + content, (err) => {
    if (err) return res.status(404).json({ error: "File not found" });
    res.json({ message: "Content appended successfully!", filename: req.params.filename });
  });
});

// PUT: Overwrite a file
app.put("/files/:filename", (req, res) => {
  const filePath = getFilePath(req.params.filename);
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  fs.writeFile(filePath, content, (err) => {
    if (err) return res.status(404).json({ error: "File not found" });
    res.json({ message: "File overwritten successfully!", filename: req.params.filename });
  });
});

// DELETE: Delete a file
app.delete("/files/:filename", (req, res) => {
  const filePath = getFilePath(req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(404).json({ error: "File not found" });
    res.json({ message: "File deleted successfully!", filename: req.params.filename });
  });
});

// -------------------- START SERVER --------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// 1. Create a file

// POST http://localhost:3000/files
// Content-Type: application/json

// {
//   "filename": "notes.txt",
//   "content": "This is my first note."
// }


// 2. Append content

// PATCH http://localhost:3000/files/notes.txt
// Content-Type: application/json

// {
//   "content": "Adding another line."
// }


// 3. Read file

// GET http://localhost:3000/files/notes.txt


// 4. List all files

// GET http://localhost:3000/files


// 5. Delete file

// DELETE http://localhost:3000/files/notes.txt



// scynconous code fs

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// Folder to store files
const DATA_DIR = path.join(__dirname, "data");

// Helper: get full path of a file
const getFilePath = (filename) => path.join(DATA_DIR, filename);

// -------------------- ROUTES --------------------

// GET: List all files
app.get("/files", (req, res) => {
  try {
    const files = fs.readdirSync(DATA_DIR); // sync method
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: "Error reading directory" });
  }
});

// GET: Read a specific file
app.get("/files/:filename", (req, res) => {
  const filePath = getFilePath(req.params.filename);
  try {
    const data = fs.readFileSync(filePath, "utf-8"); // sync method
    res.json({ content: data });
  } catch (err) {
    res.status(404).json({ error: "File not found" });
  }
});

// POST: Create a new file
app.post("/files", (req, res) => {
  const { filename, content } = req.body;
  if (!filename) return res.status(400).json({ error: "Filename is required" });

  const filePath = getFilePath(filename);
  try {
    fs.writeFileSync(filePath, content || ""); // sync method
    res.json({ message: "File created successfully!", filename });
  } catch (err) {
    res.status(500).json({ error: "Error creating file" });
  }
});

// PATCH: Append content to a file
app.patch("/files/:filename", (req, res) => {
  const filePath = getFilePath(req.params.filename);
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    fs.appendFileSync(filePath, "\n" + content); // sync method
    res.json({ message: "Content appended successfully!", filename: req.params.filename });
  } catch (err) {
    res.status(404).json({ error: "File not found" });
  }
});

// PUT: Overwrite a file
app.put("/files/:filename", (req, res) => {
  const filePath = getFilePath(req.params.filename);
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    fs.writeFileSync(filePath, content); // sync method
    res.json({ message: "File overwritten successfully!", filename: req.params.filename });
  } catch (err) {
    res.status(404).json({ error: "File not found" });
  }
});

// DELETE: Delete a file
app.delete("/files/:filename", (req, res) => {
  const filePath = getFilePath(req.params.filename);
  try {
    fs.unlinkSync(filePath); // sync method
    res.json({ message: "File deleted successfully!", filename: req.params.filename });
  } catch (err) {
    res.status(404).json({ error: "File not found" });
  }
});

// -------------------- START SERVER --------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
