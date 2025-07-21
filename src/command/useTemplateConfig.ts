import { getPathName } from "@/config/getConfig";
import { Template } from "@/interface";
import { createFilesFromTemplate } from "@/utils/file";
import * as vscode from "vscode";
import fs from "fs-extra";
import { log } from "@/channel";

export async function useTemplateConfig(uri: vscode.Uri) {
  let fileTemplate: Template[];

  try {
    const filePath = await getPathName();
    const content = fs.readFileSync(filePath, "utf-8");
    fileTemplate = JSON.parse(content) as Template[];
    log(`🚀 liu123 ~ 模板配置文件: ${JSON.stringify(fileTemplate, null, 2)}`);

    // 1. 获取用户右键点击的目标路径
    const targetUri = uri || vscode.window.activeTextEditor?.document.uri;
    if (!targetUri) {
      vscode.window.showErrorMessage("未获取到目标路径");
      return;
    }

    // 2. 读取本地模板配置
    const templates: Template[] = fileTemplate;
    if (!templates || templates.length === 0) {
      vscode.window.showErrorMessage("未找到任何模板，");
      return;
    }

    // 3. 弹出模板选择列表
    const picked = await vscode.window.showQuickPick<{
      label: string;
      description?: string;
      template: Template;
    }>(
      templates.map((t) => ({
        label: t.name,
        description: t.description,
        template: t,
      })),
      { placeHolder: "请选择要生成的模板" }
    );
    if (!picked) return;
    const template = picked.template;

    // 4. 检查模板变量，弹出输入框
    // 一次性处理所有 params 参数
    let variables: Record<string, string> = {};
    if (JSON.stringify(template).includes("${filename}")) {
      const filename = await vscode.window.showInputBox({
        prompt: "请输入文件名（不含后缀）",
      });
      if (!filename) return;

      variables.filename = filename;
    }

    // 6. 生成文件/文件夹
    await createFilesFromTemplate(targetUri.fsPath, template, variables);

    vscode.window.showInformationMessage("模板生成成功！");
  } catch (err: any) {
    vscode.window.showErrorMessage("模板生成失败: " + err.message);
  }
}
