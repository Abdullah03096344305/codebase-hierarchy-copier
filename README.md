# 📁 Codebase Hierarchy Copier

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=your-publisher-id.codebase-hierarchy-copier)

> **Instantly copy your entire codebase folder structure as a clean, readable text tree - perfect for AI context, documentation, or sharing with your team.**

## ✨ Features

- 🚀 **One-Click Copy** - Generate and copy your entire project hierarchy in seconds
- 🎯 **Smart Filtering** - Automatically ignores `node_modules`, `.git`, `dist`, and other clutter
- 🖱️ **Interactive Sidebar** - Dedicated panel with two scanning options
- 📂 **Flexible Scanning** - Scan current workspace OR pick any folder on your system
- 🎨 **Beautiful Formatting** - Clean ASCII tree structure with visual hierarchy
- 🔄 **Real-time Feedback** - Toast notifications for generation and copy status

## 📸 Screenshot

![Extension Demo](https://via.placeholder.com/800x400?text=Sidebar+Panel+with+Two+Buttons)

*Sidebar panel showing interactive buttons for instant hierarchy generation*

## 🚀 Quick Start

### Installation

1. Open **VS Code**
2. Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for `Codebase Hierarchy Copier`
4. Click **Install**

### Usage

**Method 1: Sidebar Panel (Recommended)**
1. Click the folder icon in the activity bar (left sidebar)
2. Choose either:
   - **Scan Current Active Workspace** - Uses your currently open folder
   - **Select & Scan Custom Folder** - Browse and select any folder on your system
3. The hierarchy is automatically copied to your clipboard! 📋

**Method 2: Command Palette**
- Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
- Type `Copy Codebase Hierarchy to Clipboard`
- Press Enter

### Example Output
my-project/
├── src/
│ ├── components/
│ │ ├── Header.js
│ │ └── Footer.js
│ ├── utils/
│ │ └── helpers.js
│ └── app.js
├── package.json
├── README.md
└── .gitignore


## 🎯 Use Cases

- **🤖 AI Context** - Feed your project structure to ChatGPT, Claude, or Gemini
- **📝 Documentation** - Quickly document your project folder layout
- **👥 Team Sharing** - Share codebase structure without sharing code
- **📊 Code Review** - Provide context for code review requests
- **🎓 Teaching** - Explain project organization to junior developers
- **🔍 Auditing** - Review and document legacy codebase structures

## ⚙️ Configuration

The extension automatically ignores these common folders:
- `node_modules/`
- `.git/`
- `dist/`
- `out/`
- `.DS_Store`
- `.vscode/`

*Coming soon: Custom ignore patterns via VS Code settings.*

## ⌨️ Keyboard Shortcuts

No default shortcuts assigned. You can create your own:

1. Open Keyboard Shortcuts (`Ctrl+K Ctrl+S`)
2. Search for `codebase-hierarchy-copier.copyHierarchy`
3. Add your preferred keybinding

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- VS Code (v1.85.0 or higher)

### Local Development Setup


# Clone the repository
git clone https://github.com/abdullah030963443055/codebase-hierarchy-copier.git

# Navigate to project directory
cd codebase-hierarchy-copier

# Install dependencies
npm install

# Open in VS Code
code .

# Press F5 to start debugging

# Install vsce globally
npm install -g @vscode/vsce

# Package the extension
vsce package
