import * as vscode from "vscode";

import { getPathName } from "@/config/getConfig";

export async function editTemplateConfig() {
  try {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showErrorMessage("未找到工作区，无法编辑模板配置。");
      return;
    }
    const filePath = await getPathName();

    // 打开模板配置文件
    const doc = await vscode.workspace.openTextDocument(filePath);
    await vscode.window.showTextDocument(doc);
  } catch (err: any) {
    vscode.window.showErrorMessage("打开模板配置失败: " + err.message);
  }
}
