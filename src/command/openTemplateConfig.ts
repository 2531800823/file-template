import * as vscode from "vscode";

import { getPathName } from "@/config/getConfig";
import { log } from "@/channel";

export async function openTemplateConfig() {
  try {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showErrorMessage("未找到工作区，无法编辑模板配置。");
      return;
    }
    const filePath = await getPathName();
    log(`🚀 liu123 ~ 打开配置文件路径: ${filePath}`);

    const doc = await vscode.workspace.openTextDocument(filePath);

    await vscode.window.showTextDocument(doc);
  } catch (err: any) {
    vscode.window.showErrorMessage("打开模板配置失败: " + err.message);
  }
}
