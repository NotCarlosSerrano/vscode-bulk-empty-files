// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const regex = /^\[\s*([a-zA-Z0-9\s\-_]*(\.[a-zA-Z0-9]+)*\s*,\s*)*[a-zA-Z0-9\s\-_]*(\.[a-zA-Z0-9]+)*\s*\]\s*(\.(\w+))?$/;

async function getAllFolders(folderPath: string): Promise<string[]> {
    let folders: string[] = [folderPath];
    const entries = await fs.promises.readdir(folderPath, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            const subFolderPath = path.join(folderPath, entry.name);
            folders = folders.concat(await getAllFolders(subFolderPath));
        }
    }
    return folders;
}

function parseFilesToCreate(filesToCreate: string): string[] {
	let filesToCreateWithoutExtension:string;
	// Check if there is extension
	if (!filesToCreate.includes('.')) {
		filesToCreateWithoutExtension = filesToCreate;
	} else {
		// Remove the extension if there is one before ]
		if (filesToCreate.lastIndexOf(']') < filesToCreate.lastIndexOf('.')) {
			filesToCreate = filesToCreate.slice(0, filesToCreate.lastIndexOf('.'));
		}
		filesToCreateWithoutExtension = filesToCreate;
	}

	// Remove the brackets
	const filesToCreateWithoutBrackets = filesToCreateWithoutExtension.slice(0, filesToCreateWithoutExtension.lastIndexOf(']')).slice(filesToCreateWithoutExtension.indexOf('[') + 1);

	// Split the files
	const files = filesToCreateWithoutBrackets.split(',');
	
	return files.map((file) => file.trim());
}

function createEmptyFile(filePath: string): void {
	fs.writeFileSync(filePath, '');
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const disposableCreateEmptyFiles = vscode.commands.registerCommand('bulk-empty-files.createEmptyFiles', async (uri: vscode.Uri) => {
		let folderPath:string|undefined = uri?.fsPath;
		if (!uri || !uri.fsPath) {
			const folders = vscode.workspace.workspaceFolders;
			if (!folders) {
				vscode.window.showErrorMessage('No workspace folders found');
				return;
			}

			let allFolders: string[] = [];
			for (const folder of folders) {
				allFolders = allFolders.concat(await getAllFolders(folder.uri.fsPath));
			}

			folderPath = await vscode.window.showQuickPick(allFolders, {
				placeHolder: 'Select the folder to create the empty files in'
			});

			if (!folderPath) {
				vscode.window.showErrorMessage('No folder selected');
				return;
			}
		}

        const filesToCreate = await vscode.window.showInputBox({
            placeHolder: 'Enter the format of the empty files to create (e.g. [empty-file-0, empty-file-1].txt)',
			validateInput: (value: string) => {
				if (!value) {
					return 'No files provided';
				}
				if (!regex.test(value)) {
					return 'Invalid input. Please provide a correct format';
				}
				return null;
			}
        });

		if (!filesToCreate) {
			vscode.window.showErrorMessage('No files provided');
			return;
		}

		const files = parseFilesToCreate(filesToCreate);

		const extension = path.extname(filesToCreate);

		let createdFilesCount = 0;

		for (let i = 0; i < files.length; i++) {
			const fileName = files[i];
			let filePath = '';
			
			// Check if the file already has an extension
			if (path.extname(fileName)) {
				filePath = path.join(folderPath, fileName);
			} else {
				filePath = path.join(folderPath, `${fileName}${extension}`);
			}

			// Check file name, if there is empty file name, skip it
			if (path.basename(filePath) === extension) {
				continue;
			}

			// Check if the file already exists
			if (fs.existsSync(filePath)) {
				continue;
			}

			createEmptyFile(filePath);
			createdFilesCount++;
		}
        
        vscode.window.showInformationMessage(`${createdFilesCount} empty files created in ${folderPath}`);
    });

    context.subscriptions.push(disposableCreateEmptyFiles);
}

// This method is called when your extension is deactivated
export function deactivate() {}
