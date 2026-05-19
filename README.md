# Codebase Hierarchy Copier

A lightweight and powerful VS Code extension that instantly generates and copies a clean directory tree structure of your project or any selected folder.

Perfect for:

- AI prompts (ChatGPT, Claude, Gemini)
- Documentation
- Project overviews
- GitHub READMEs
- Architecture discussions
- Debugging and code reviews

---

# ✨ Features

## 📁 Scan Current Workspace

Quickly generate the hierarchy of the currently opened VS Code workspace.

## 📂 Scan Any Custom Folder

Choose any folder from your computer and generate its structure instantly.

## 📋 Auto Copy to Clipboard

The generated hierarchy is automatically copied to your clipboard.

## 🚫 Smart Ignore System

Automatically ignores unnecessary folders/files like:

```text
node_modules
.git
dist
out
.vscode
.DS_Store
```

## ⚡ Fast Recursive Scanning

Efficiently traverses nested folders while maintaining a clean tree structure.

---

# 🖥 Sidebar Interface

Access the extension directly from the VS Code sidebar.

Buttons available:

- Scan Current Active Workspace
- Select & Scan Custom Folder

---

# 🚀 Command Palette Commands

Open Command Palette:

```text
Ctrl + Shift + P
```

Available commands:

```text
Copy Current Workspace Hierarchy
```

```text
Select & Copy Folder Hierarchy
```

---

# 📌 Example Output

```text
my-project/
├── src/
│   ├── components/
│   ├── utils/
│   └── pages/
├── public/
├── package.json
└── README.md
```

---

# 📦 Installation

Install directly from the VS Code Marketplace:

## Marketplace

https://marketplace.visualstudio.com/items?itemName=AbdullahNazirDev.codebase-hierarchy-copier

---

# 🛠 Usage

## Method 1 — Sidebar

1. Open VS Code
2. Open the "Hierarchy Copier" sidebar panel
3. Click:
   - Scan Current Active Workspace
   - OR Select & Scan Custom Folder
4. Paste the copied hierarchy anywhere

---

## Method 2 — Command Palette

1. Press:

```text
Ctrl + Shift + P
```

2. Run one of:

```text
Copy Current Workspace Hierarchy
```

or

```text
Select & Copy Folder Hierarchy
```

---

# 🔥 Best Use Cases

- Sharing project structures with AI
- Creating architecture documentation
- Quickly understanding unfamiliar repositories
- Posting clean folder trees on GitHub
- Team collaboration
- Technical discussions

---

# ⚙️ Upcoming Features

Planned future updates:

- Preview before copy
- Custom ignore patterns
- Export to Markdown
- Export to TXT file
- Depth limit controls
- Include/exclude extensions
- One-click GitHub README insertion
- Tree visualization improvements

---

# 🐞 Report Issues

Found a bug or want a feature?

Please open an issue on GitHub.

---

# ⭐ Support

If you find this extension useful, consider leaving a rating on the VS Code Marketplace.