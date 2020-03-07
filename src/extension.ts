import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as os from 'os';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.openFolderInExplorer', (uri: vscode.Uri) => {
			const platform = os.platform();

			const command = (platform === 'win32' && 'explorer')
				|| (platform === 'linux' && 'xdg-open')
				|| (platform === 'darwin' && 'open');

			if (!command) {
				vscode.window.showWarningMessage(`Your operating system (${platform}) isn't supported.`);
				return;
			}

			cp.execSync(`${command} "${uri.fsPath}"`);
		}),
		vscode.commands.registerCommand('extension.openFolderInNewInstance', (uri: vscode.Uri) => {
			vscode.commands.executeCommand("vscode.openFolder", uri, true);
		}));
}

export function deactivate() { }