

# XianFire Framework Documentation

> **Engineered by Christian I. Cabrera** — Instructor I, College of Computer Studies
> *Lightweight JS Framework for Events-Driven & Integrative Programming 2*

---

## 🔥 Overview

**XianFire** is a minimal, Lightweight JS Framework for rapidly scaffolding full-stack web applications with built-in authentication, database integration (MySQL or MongoDB), **Electron desktop app support**, and dynamic code generation.

Designed for **fast prototyping**, **student projects**, **desktop applications**, and **small-to-medium applications** — especially for **Events-Driven Programming and Integrative Programming 2** at Mindoro State University.

---

## ✨ Key Features

✅ Express.js server with session-based auth
✅ MySQL (Sequelize) or MongoDB (Mongoose) support
✅ **Electron desktop app integration**
✅ Auto-generated CRUD templates
✅ CLI generator for models & controllers (`create:model`, `create:controller`)
✅ Built-in migration system
✅ `.xian` custom template engine
✅ Tailwind CSS ready
✅ Zero-config setup
✅ **Cross-platform desktop builds**

---

## 📦 Installation & Setup

### Global Installation

#### macOS / Linux:

```bash
npm install -g xianfires
```

If you get permission errors, either use:

```bash
sudo npm install -g xianfires
```

or avoid sudo by using nvm or configuring an npm global prefix.

#### Windows (PowerShell as Admin):

```bash
npm install -g xianfires
```

---

### 1. Generate a new project

```bash
xianfires new myApp
```

You'll be prompted to choose:

* **Template Type**: `Default Template` or `With CRUD Functions`
* **Database**: `MongoDB` or `MySQL`
* **Electron**: Include Electron for desktop app support (optional)

> 💡 *If you don't specify a name, it defaults to `xianfire-app`.*

---

### 2. Install dependencies

```bash
cd myApp
npm install
```

---

### 3. Run database migration

```bash
npm run migrate
```

> ✅ Creates database (MySQL) or collections (MongoDB) + syncs models.

---

### 4. Start development server

```bash
npm run xian
```

🌐 Web app runs at → `http://localhost:3000`

---

### 5. (If Electron chosen) Run desktop app

```bash
# Development mode (server + Electron)
npm run xian-dev

# Production build
npm run xianca
```

---

### View XianFire Version

```bash
xianfires --version
```

### Update your Binaries

```bash
xianfires update
```

---

## 🗂️ Project Structure

```
myApp/
├─ controllers/
│  ├─ authController.js
│  ├─ homeController.js
│  └─ *.js
├─ models/
│  ├─ db.js
│  ├─ userModel.js
│  └─ *.js
├─ routes/
│  └─ index.js
├─ views/
│  ├─ home.xian
│  ├─ login.xian
│  ├─ register.xian
│  ├─ dashboard.xian
│  └─ *.xian
├─ public/
│  └─ tailwind.css
├─ electron/
│  └─ main.js
├─ create.js
├─ migrate.js
├─ index.js
├─ package.json
└─ node_modules/
```

---

## ⚡ Core Features

### 1. `.xian` Template Engine

Render views with `res.render("filename")` — no complex templating needed.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <link href="/tailwind.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
  <h1 class="text-3xl font-bold text-center mt-10">Welcome to XianFire 🔥</h1>
</body>
</html>
```

---

### 2. Authentication (CRUD Template Only)

| Route        | Method | Description         |
| ------------ | ------ | ------------------- |
| `/`          | GET    | Home page           |
| `/login`     | GET    | Login form          |
| `/register`  | POST   | Create new user     |
| `/dashboard` | GET    | Protected dashboard |
| `/logout`    | GET    | Destroy session     |

---

### 3. Database Support

#### 🐘 MySQL (Sequelize)

* Connection via `models/db.js`
* Uses `sequelize.define()`
* Migration syncs DB

#### 🍃 MongoDB (Mongoose)

* Schema via `mongoose.Schema`
* Auto-creates collections

---

### 4. 🖥️ Electron Integration

Runs Express inside Electron for desktop deployment.

---

## 🧰 CLI Code Generator

### Generate Model

```bash
npm run create:model Product
```

### Generate Controller

```bash
npm run create:controller productController
```

---

## 🚀 Usage Examples

### 1. Create User

```js
await User.create({ name: "Jane", email: "jane@example.com", password: "hashed" });
```

### 2. Add Route

```js
router.get("/api/products", getAllProducts);
```

---

## 💾 Migration System

```bash
npm run migrate
```

⚠️ Wipes MySQL tables if using `force: true`.

---

## 🛠️ Configuration

### MySQL

```js
export const sequelize = new Sequelize("myApp", "root", "password", {
  host: "localhost", dialect: "mysql",
});
```

### MongoDB

```js
const DB_URI = `mongodb://127.0.0.1:27017/myApp`;
```

---

## ⚙️ Available Scripts

| Command            | Description       |
| ------------------ | ----------------- |
| `npm run xian`     | Start dev server  |
| `npm start`        | Production        |
| `npm run migrate`  | Sync database     |
| `npm run xian-dev` | Run Electron dev  |
| `npm run xianca`   | Run Electron prod |
| `npm run dist`     | Build packages    |

---

## 🧩 Extending XianFire

Add custom models, controllers, and views seamlessly.

---

## 🎓 Learning Path

1. Create project
2. Run migrate
3. Add models/controllers
4. Run Electron build

---

## 🔧 Editor Setup (VS Code)

To enable syntax highlighting for `.xian` files:

```json
{
  "files.associations": {
    "*.xian": "html"
  }
}
```

---

# 🧱 CRUD Example: Personal Information Management

A full CRUD demonstration for managing personal info inside a XianFire app.

---

### 1. Create Model

```bash
npm run create:model PersonalInfo
```

**models/PersonalInfo.js**

```js
import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const PersonalInfo = sequelize.define("PersonalInfo", {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  contactNumber: DataTypes.STRING,
  address: DataTypes.TEXT,
  birthdate: DataTypes.DATEONLY,
});
```

---

### 2. Create Controller

**controllers/personalInfoController.js**

```js
import { PersonalInfo } from "../models/PersonalInfo.js";

export const getAllPersonalInfo = async (req, res) => {
  const persons = await PersonalInfo.findAll();
  res.render("personalinfo_list", { persons });
};

export const getPersonalInfoForm = (req, res) => res.render("personalinfo_form");

export const createPersonalInfo = async (req, res) => {
  await PersonalInfo.create(req.body);
  res.redirect("/personalinfo");
};

export const editPersonalInfo = async (req, res) => {
  const person = await PersonalInfo.findByPk(req.params.id);
  res.render("personalinfo_edit", { person });
};

export const updatePersonalInfo = async (req, res) => {
  await PersonalInfo.update(req.body, { where: { id: req.params.id } });
  res.redirect("/personalinfo");
};

export const deletePersonalInfo = async (req, res) => {
  await PersonalInfo.destroy({ where: { id: req.params.id } });
  res.redirect("/personalinfo");
};
```

---

### 3. Add Routes

**routes/index.js**

```js
import express from "express";
import {
  getAllPersonalInfo,
  getPersonalInfoForm,
  createPersonalInfo,
  editPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
} from "../controllers/personalInfoController.js";

const router = express.Router();

router.get("/personalinfo", getAllPersonalInfo);
router.get("/personalinfo/new", getPersonalInfoForm);
router.post("/personalinfo/new", createPersonalInfo);
router.get("/personalinfo/edit/:id", editPersonalInfo);
router.post("/personalinfo/edit/:id", updatePersonalInfo);
router.get("/personalinfo/delete/:id", deletePersonalInfo);

export default router;
```

---

### 4. Create Views

**views/personalinfo_list.xian**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Personal Information</title>
  <link href="/tailwind.css" rel="stylesheet">
</head>
<body class="bg-gray-50 font-sans">
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold text-blue-700 mb-4 text-center">Personal Records</h1>
    <a href="/personalinfo/new" class="bg-blue-600 text-white px-4 py-2 rounded">Add New</a>
    <table class="w-full mt-4 border">
      <thead class="bg-blue-600 text-white">
        <tr><th>Name</th><th>Email</th><th>Contact</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {{persons.map(p=>`
        <tr class="border-b">
          <td>${p.firstName} ${p.lastName}</td>
          <td>${p.email}</td>
          <td>${p.contactNumber||'—'}</td>
          <td>
            <a href="/personalinfo/edit/${p.id}" class="text-blue-600">Edit</a>
            <a href="/personalinfo/delete/${p.id}" class="text-red-600 ml-2">Delete</a>
          </td>
        </tr>`).join('')}}
      </tbody>
    </table>
  </div>
</body>
</html>
```

---

### 5. Migrate & Run

```bash
npm run migrate
npm run xian
```

Then visit:
➡️ **[http://localhost:3000/personalinfo](http://localhost:3000/personalinfo)**

You’ll have a fully working CRUD UI using Tailwind + XianFire templates.

---

> “Simplicity is the ultimate sophistication.” — Designed for Mindoro State University students to **learn, build, and ship fast** 🚀

**Now with full CRUD and desktop capabilities!**

---
