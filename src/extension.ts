import * as vscode from "vscode";
import { getPathName } from "./config/getConfig";
import { createTemplate } from "./command/createTemplate";
import { editTemplateConfig } from "./command/editTemplateConfig";

/**
 * 插件激活时调用
 * @param context vscode 扩展上下文
 */
export async function activate(context: vscode.ExtensionContext) {
  try {
    const filePath = await getPathName();
    require(filePath);
    // 添加一个提示框
    vscode.window.showInformationMessage("file-template activate");
  } catch (error) {
    console.error("file-template 激活失败:", error);

    vscode.window.showErrorMessage(`file-template 激活失败: ${error}`);
    return;
  }

  const createTemplateCommand = vscode.commands.registerCommand(
    "file-template.createTemplate",
    createTemplate
  );

  const editTemplateConfigCommand = vscode.commands.registerCommand(
    "file-template.editTemplateConfig",
    editTemplateConfig
  );

  context.subscriptions.push(createTemplateCommand);
  context.subscriptions.push(editTemplateConfigCommand);
}

/**
 * 插件停用时调用
 */
export function deactivate() {}
