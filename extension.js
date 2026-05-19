// @ts-check
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // 1. Command for scanning the open workspace
    let copyCurrentDisposable = vscode.commands.registerCommand('codebase-hierarchy-copier.copyCurrent', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No active workspace folder open! Use the button below to pick a folder.');
            return;
        }
        handleHierarchyGeneration(workspaceFolders[0].uri.fsPath, workspaceFolders[0].name);
    });

    // 2. Command for scanning a chosen external folder
    let pickAndCopyDisposable = vscode.commands.registerCommand('codebase-hierarchy-copier.pickAndCopy', async () => {
        const options = {
            canSelectMany: false,
            canSelectFolders: true,
            canSelectFiles: false,
            openLabel: 'Select Folder to Copy Hierarchy'
        };

        const folderUri = await vscode.window.showOpenDialog(options);
        if (folderUri && folderUri[0]) {
            const targetPath = folderUri[0].fsPath;
            const targetName = path.basename(targetPath);
            handleHierarchyGeneration(targetPath, targetName);
        }
    });

    context.subscriptions.push(copyCurrentDisposable, pickAndCopyDisposable);

    // 3. Register the interactive Sidebar Panel UI Provider
    const provider = new SidebarWebviewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('hierarchyCopierSidebarView', provider)
    );
}

/**
 * Common orchestration logic
 * @param {string} folderPath 
 * @param {string} folderName 
 */
async function handleHierarchyGeneration(folderPath, folderName) {
    vscode.window.showInformationMessage(`Generating hierarchy for: ${folderName}...`);
    const hierarchyText = `${folderName}/\n` + generateTree(folderPath);
    await vscode.env.clipboard.writeText(hierarchyText);
    vscode.window.showInformationMessage('Codebase hierarchy copied to clipboard! 📋');
}

/**
 * Helper function to recursively map out the folder tree
 * @param {string} dirPath
 * @param {string} [prefix='']
 * @returns {string}
 */
function generateTree(dirPath, prefix = '') {
    let result = '';
    try {
        const items = fs.readdirSync(dirPath);
        // Default ignored files to keep your outputs clean
        const ignored = ['node_modules', '.git', 'dist', 'out', '.DS_Store', '.vscode'];
        const filteredItems = items.filter(item => !ignored.includes(item));

        filteredItems.forEach((item, index) => {
            const isLast = index === filteredItems.length - 1;
            const itemPath = path.join(dirPath, item);
            const isDirectory = fs.statSync(itemPath).isDirectory();

            const marker = isLast ? '└── ' : '├── ';
            result += `${prefix}${marker}${item}${isDirectory ? '/' : ''}\n`;

            if (isDirectory) {
                const nextPrefix = prefix + (isLast ? '    ' : '│   ');
                result += generateTree(itemPath, nextPrefix);
            }
        });
    } catch (error) {
        result += `${prefix}── (Error reading directory)\n`;
    }
    return result;
}

/**
 * Class mapping the interactive panel interface inside VS Code's sidebar
 */
class SidebarWebviewProvider {
    /**
     * @param {vscode.Uri} _extensionUri
     */
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }

    /**
     * @param {vscode.WebviewView} webviewView
     */
    resolveWebviewView(webviewView) {
        webviewView.webview.options = {
            enableScripts: true
        };

        webviewView.webview.html = this._getHtmlForWebview();

        // Relay messages back from frontend panel clicks to actual extension commands
        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'runCopyCurrent':
                    vscode.commands.executeCommand('codebase-hierarchy-copier.copyCurrent');
                    return;
                case 'runPickAndCopy':
                    vscode.commands.executeCommand('codebase-hierarchy-copier.pickAndCopy');
                    return;
            }
        });
    }

    _getHtmlForWebview() {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    padding: 15px;
                    color: var(--vscode-foreground);
                    font-family: var(--vscode-font-family);
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .description {
                    font-size: 12px;
                    margin-bottom: 8px;
                    opacity: 0.8;
                }
                button {
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    padding: 8px 12px;
                    text-align: center;
                    width: 100%;
                    cursor: pointer;
                    border-radius: 2px;
                    font-weight: 500;
                }
                button:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
                .secondary-btn {
                    background-color: var(--vscode-button-secondaryBackground);
                    color: var(--vscode-button-secondaryForeground);
                }
                .secondary-btn:hover {
                    background-color: var(--vscode-button-secondaryHoverBackground);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <p class="description">Select an action below to build and copy a text representation of your directory tree map.</p>
                
                <button id="currentBtn">Scan Current Active Workspace</button>
                <button id="pickBtn" class="secondary-btn">Select & Scan Custom Folder...</button>
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                
                document.getElementById('currentBtn').addEventListener('click', () => {
                    vscode.postMessage({ command: 'runCopyCurrent' });
                });

                document.getElementById('pickBtn').addEventListener('click', () => {
                    vscode.postMessage({ command: 'runPickAndCopy' });
                });
            </script>
        </body>
        </html>`;
    }
}

function deactivate() {}

module.exports = { activate, deactivate };