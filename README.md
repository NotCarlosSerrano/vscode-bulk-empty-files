# bulk-empty-files README

This is the README for the "bulk-empty-files" extension, designed to streamline the creation of multiple empty files in bulk. This extension simplifies file management tasks by allowing users to specify a list of filenames and extensions, and the extension will create the corresponding empty files in the selected folder.

## Features

- **Bulk Empty File Creation**: Quickly create multiple empty files at once using a simple format like `[file-1, file-2].txt` or `[file-1, file-2 , file4, File5.log].txt`.
- **Folder Selection**: Choose any folder in your workspace to generate the empty files.
- **Extension Flexibility**: Supports creating files with or without specified extensions.

## Requirements

This extension doesn't have any external dependencies. It works out-of-the-box in any workspace with access to the file system.

## Extension Settings

This extension does not add any specific settings but relies on the following configuration steps:

- **Command**: You can invoke the extension by running the command `bulk-empty-files.createEmptyFiles` in the command palette (`Ctrl+Shift+P`).

## Known Issues

- If an empty file name is provided (e.g., `[file-1, ]`), the extension skips creating that file.
- Files that already exist in the folder are skipped and not overwritten.

## Release Notes

### 1.0.0

Initial release of `bulk-empty-files`.

---

## Following extension guidelines

Ensure that you've read through the extension guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.