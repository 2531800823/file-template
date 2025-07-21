import * as vscode from "vscode";

export const outputChannel = vscode.window.createOutputChannel("File Template");

export function log(message: string) {
  outputChannel.appendLine(message);
}

export function clearChannel() {
  outputChannel.clear();
}

export function showChannel() {
  outputChannel.show(true);
}

export function hideChannel() {
  outputChannel.hide();
}
