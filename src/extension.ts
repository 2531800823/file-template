import * as vscode from "vscode";
import { getPathName } from "./config/getConfig";
import { useTemplateConfig } from "./command/useTemplateConfig";
import { openTemplateConfig } from "./command/openTemplateConfig";
import { resetTemplate } from "./command/resetTemplate";

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

  const useTemplateConfigCommand = vscode.commands.registerCommand(
    "file-template.useTemplateConfig",
    useTemplateConfig
  );

  const openTemplateConfigCommand = vscode.commands.registerCommand(
    "file-template.openTemplateConfig",
    openTemplateConfig
  );

  const reSetTemplateCommand = vscode.commands.registerCommand(
    "file-template.resetTemplate",
    resetTemplate
  );

  context.subscriptions.push(openTemplateConfigCommand);
  context.subscriptions.push(useTemplateConfigCommand);
  context.subscriptions.push(reSetTemplateCommand);
}

/**
 * 插件停用时调用
 */
export function deactivate() {}
