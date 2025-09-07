Here's the updated README.md with Electron integration included:

# XianFire Framework Documentation

> **Engineered by Christian I. Cabrera** — Instructor I, College of Computer Studies  
> *Lightweight JS Framework for Events-Driven & Integrative Programming 2*


## 🔥 Overview

**XianFire** is a minimal, Lightweight JS Framework for rapidly scaffolding full-stack web applications with built-in authentication, database integration (MySQL or MongoDB), **Electron desktop app support**, and dynamic code generation.

Designed for **fast prototyping**, **student projects**, **desktop applications**, and **small-to-medium applications** — especially for **Events-Driven Programming and Integrative Programming 2** at Mindoro State University.


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


## 📦 Installation & Setup

### 1. Generate a new project

```bash
npm create xianfires@latest myApp
```

You'll be prompted to choose:

- **Template Type**: `Default Template` or `With CRUD Functions`
- **Database**: `MongoDB` or `MySQL`
- **Electron**: Include Electron for desktop app support (optional)

> 💡 *If you don't specify a name, it defaults to `xianfire-app`.*


### 2. Install dependencies

```bash
cd myApp
npm install
```


### 3. Run database migration

```bash
npm run migrate
```

> ✅ Creates database (MySQL) or collections (MongoDB) + syncs models.


### 4. Start development server

```bash
npm run dev
```

🌐 Web app runs at → `http://localhost:3000`


### 5. (If Electron chosen) Run desktop app

```bash
# Development mode (server + Electron)
npm run electron-dev

# Production build
npm run electron
```


## 🗂️ Project Structure

```
myApp/
├─ controllers/
│  ├─ authController.js      # Login/Register/Dashboard logic (if CRUD)
│  ├─ homeController.js      # Home page handler
│  └─ *.js                   # Your generated controllers
├─ models/
│  ├─ db.js                  # Sequelize connection (MySQL only)
│  ├─ userModel.js           # Default User model
│  └─ *.js                   # Your generated models
├─ routes/
│  └─ index.js               # Main route definitions
├─ views/
│  ├─ home.xian
│  ├─ login.xian             # If CRUD template chosen
│  ├─ register.xian
│  ├─ dashboard.xian
│  └─ *.xian                 # Your custom views
├─ public/
│  └─ tailwind.css           # Pre-configured Tailwind
├─ electron/                 🆕 Electron desktop app files
│  └─ main.js                # Electron main process
├─ create.js                 # CLI generator for models & controllers
├─ migrate.js                # Database initializer
├─ index.js                  # Server entry point
├─ package.json
└─ node_modules/
```


## ⚡ Core Features

### 1. `.xian` Template Engine

Render views with `res.render("filename")` — no complex templating needed.

**Example: `views/home.xian`**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <link href="/tailwind.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
  <h1 class="text-3xl font-bold text-center mt-10">Welcome to XianFire 🔥</h1>
  <p class="text-center mt-4">Home Page</p>
</body>
</html>
```


### 2. Authentication (CRUD Template Only)

| Route             | Method | Description                     |
|------------------|--------|---------------------------------|
| `/`              | GET    | Home page                       |
| `/login`         | GET    | Render login form               |
| `/login`         | POST   | Authenticate user               |
| `/register`      | GET    | Render registration form        |
| `/register`      | POST   | Create new user                 |
| `/dashboard`     | GET    | Protected dashboard (session)   |
| `/logout`        | GET    | Destroy session & redirect      |
| `/forgot-password`| GET   | Forgot password page (stub)     |


### 3. Database Support

#### 🐘 MySQL (Sequelize)

- Connection defined in `models/db.js`
- Models use `sequelize.define()`
- Migration creates DB + tables

#### 🍃 MongoDB (Mongoose)

- Connection handled in `migrate.js`
- Models use `mongoose.Schema`
- Migration ensures collections exist


### 4. 🖥️ Electron Desktop App (Optional)

XianFire includes seamless Electron integration:

- **Single codebase**: Same app runs as web and desktop
- **Automatic server management**: Express server runs inside Electron
- **Native menus**: File and View menus with standard shortcuts
- **Cross-platform**: Build for Windows, macOS, and Linux

**Electron Features:**
- Native window with proper dimensions (1200x800)
- Development tools integration
- Standard application menu
- Secure context isolation
- Build system ready for distribution


## 🧰 CLI Code Generator

After project setup, generate models and controllers dynamically:

### ➕ Generate a Model

```bash
npm run create:model Product
```

→ Creates `models/Product.js`:

```js
import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Product = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

export { sequelize };
```

> ✅ Fields are customizable — edit after generation.


### ➕ Generate a Controller

```bash
npm run create:controller productController
```

→ Creates `controllers/productController.js` with full CRUD:

```js
import { Product } from "../models/Product.js";

export const getAllProducts = async (req, res) => { ... };
export const createProduct = async (req, res) => { ... };
export const getProductById = async (req, res) => { ... };
export const updateProduct = async (req, res) => { ... };
export const deleteProduct = async (req, res) => { ... };
```

> ✅ Auto-imports matching model. Uses PascalCase ↔ camelCase conversion.


## 🚀 Usage Examples

### 1. Create a User (MySQL)

```js
import { User } from './models/userModel.js';
import bcrypt from 'bcrypt';

const hashed = await bcrypt.hash('mypassword', 10);
await User.create({
  name: "Jane Doe",
  email: "jane@example.com",
  password: hashed
});
```


### 2. Find and Authenticate User

```js
import bcrypt from "bcrypt";
import { User } from "./models/userModel.js";

const user = await User.findOne({ where: { email: "jane@example.com" } });
if (user && await bcrypt.compare("mypassword", user.password)) {
  console.log("✅ Login successful!");
} else {
  console.log("❌ Invalid credentials");
}
```


### 3. Add a New Route

In `routes/index.js`:

```js
import { getAllProducts } from "../controllers/productController.js";

// Add after existing routes
router.get("/api/products", getAllProducts);
```

Then visit → `http://localhost:3000/api/products`


### 4. Run as Desktop App

If you chose Electron during setup:

```bash
# Development mode (auto-reload)
npm run electron-dev

# Production mode
npm run electron

# Build distributable packages
npm run dist
```

→ Creates executable files in `dist/` folder for all platforms


## 💾 Migration System

Run anytime to ensure DB structure is synced:

```bash
npm run migrate
```

- **MySQL**: Creates DB (if missing) + drops & recreates tables (`sync({ force: true })`)
- **MongoDB**: Connects + ensures collections exist by inserting/deleting dummy doc

> ⚠️ **Warning**: MySQL migration wipes existing data. Use `sync()` without `force` in production.


## 🛠️ Configuration

### MySQL Connection (`models/db.js`)

```js
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("myApp", "root", "your_password_here", {
  host: "localhost",
  dialect: "mysql",
});
```

> 🔐 Update username/password as needed.


### MongoDB URI (`migrate.js`)

```js
const DB_URI = `mongodb://127.0.0.1:27017/myApp`;
```

> 🌐 Change host/port if MongoDB runs elsewhere.


### Electron Configuration (`package.json`)

The Electron build is pre-configured with:
- App ID: `com.xianfire.app`
- Output directory: `dist/`
- Proper file inclusion/exclusion patterns
- Multi-platform support


## ⚙️ Available Scripts

| Command                  | Description                          |
|--------------------------|--------------------------------------|
| `npm run dev`            | Start server with auto-reload (nodemon) |
| `npm start`              | Start server (production)            |
| `npm run migrate`        | Initialize/sync database             |
| `npm run create:model <Name>` | Generate Sequelize model      |
| `npm run create:controller <nameController>` | Generate Express controller |
| `npm run electron-dev`   | 🆕 Run Electron app in development   |
| `npm run electron`       | 🆕 Run Electron app (production)     |
| `npm run dist`           | 🆕 Build distributable packages      |


## 🧩 Extending XianFire

You can easily extend the framework:

- ✅ **Add Models** → `models/YourModel.js`
- ✅ **Add Controllers** → `controllers/yourController.js`
- ✅ **Add Routes** → Import in `routes/index.js`
- ✅ **Add Views** → `views/yourpage.xian`
- ✅ **Add CSS/JS** → `public/` folder
- ✅ **Integrate Frontend** → Vue, React, Svelte via CDN or build tools
- ✅ **Customize Electron** → Modify `electron/main.js` for native features


## 📌 Important Notes

- 🔐 Always ensure **MySQL** or **MongoDB** service is running before `npm run migrate`.
- 🍪 Authentication relies on **express-session** — configure `secret` in `index.js` for production.
- 🧪 Generated controllers assume RESTful conventions — adjust routes as needed.
- 🖥️ **Electron**: The same app runs identically in browser and desktop environments
- 📦 **Distribution**: Use `npm run dist` to create installers for Windows, macOS, and Linux
- 🧑‍💻 For student projects: Great for demos, capstones, and rapid MVP development


## 🎓 Learning Path for Students

1. Generate project → `npm create xianfires@latest myProject`
2. Choose **CRUD + MySQL + Electron** for full-stack + desktop experience
3. Run `npm run migrate` → `npm run dev`
4. Visit `http://localhost:3000` → Register a user
5. Use `npm run create:model Book` → `npm run create:controller bookController`
6. Add routes → Test API endpoints
7. Customize views → Add Tailwind styling
8. Test desktop version → `npm run electron-dev`
9. Build distributable → `npm run dist`
10. Deploy web version to Render/Vercel/Heroku

✅ **You're now ready to build blazing-fast web AND desktop apps with XianFire!**


---

## 🔧 Editor Setup (VS Code)

To enable **HTML syntax highlighting** for `.xian` template files in **Visual Studio Code**, add this configuration to your VS Code `settings.json`:

### ✅ Step-by-Step

1. Open VS Code
2. Press `Ctrl + ,` (Windows/Linux) or `Cmd + ,` (Mac) to open **Settings**
3. Click the **"Open Settings (JSON)"** icon in the top right (looks like a file with curly braces `{}`)
4. Add or merge this snippet into your `settings.json`:

```json
{
  "files.associations": {
    "*.xian": "html"
  }
}
```

5. Save the file.

✅ Now all `.xian` files will be highlighted as HTML — including autocomplete, formatting, and error detection!

---

### 🖼️ Example Before & After

| Before (No association)        | After (HTML highlighting)       |
|-------------------------------|--------------------------------|
| Plain text, no colors         | ✅ Syntax-highlighted HTML     |
| No tag autocomplete           | ✅ `<div>`, `class=`, etc. work|
| Hard to read                  | ✅ Easy to develop templates   |


> "Simplicity is the ultimate sophistication." — Designed for Mindoro State University students to learn, build, and ship without boilerplate headaches.

**Now with desktop app superpowers! 🚀**

Happy coding!
