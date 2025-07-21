import fs from "fs-extra";
import * as path from "path";
import { replaceTemplateVariables } from "./template";
import { Template } from "@/interface";
import * as vscode from "vscode";
import { log } from "@/channel";

/**
 * 在目标目录下批量生成文件
 * @param targetDir 目标目录绝对路径
 * @param files 文件数组（含 name, content）
 */
export async function createFilesFromTemplate(
  targetDir: string,
  template: Template,
  variables: Record<string, string>
): Promise<void> {
  const isDir = fs.statSync(targetDir).isDirectory();
  log(`🚀 liu123 ~ 是否是文件夹: ${isDir}`);

  if (template.type === "file") {
    const pathname = isDir ? targetDir : path.dirname(targetDir);
    log(`🚀 liu123 ~ 当前文件夹路径: ${pathname}`);
    createFile(pathname, template, variables);
    return;
  }
  if (template.type === "folder") {
    if (!isDir) {
      vscode.window.showErrorMessage(
        "目标路径不是一个文件夹，请选择一个文件夹"
      );
      return;
    }

    log(`🚀 liu123 ~ 当前文件夹路径: ${targetDir}`);
    createFolder(targetDir, template, variables);
    return;
  }
}

function createFile(
  targetDir: string,
  template: Template,
  variables: Record<string, string>
) {
  const filesToCreate = replaceTemplateVariables(template.files, variables);
  log(
    `🚀 liu123 ~ 替换后的文件数组: ${JSON.stringify(filesToCreate, null, 2)}`
  );
  log(`🚀 liu123 ~ 当前文件夹路径: ${targetDir}`);
  log(`🚀 liu123 ~ 变量: ${JSON.stringify(variables, null, 2)}`);
  for (const file of filesToCreate) {
    const filePath = path.join(targetDir, file.name);
    // 若父目录不存在则递归创建
    const dir = path.dirname(filePath);
    fs.ensureDirSync(dir);
    // 处理文件已存在的情况（此处直接覆盖，可扩展为弹窗提示）
    const content = Array.isArray(file.content)
      ? file.content.join("\n")
      : file.content;

    fs.writeFileSync(filePath, content, "utf-8");
  }
}

function createFolder(
  targetDir: string,
  template: Template,
  variables: Record<string, string>
) {
  const dir = path.join(targetDir, variables.filename);
  fs.ensureDirSync(dir);

  const filesToCreate = replaceTemplateVariables(template.files, variables);

  for (const file of filesToCreate) {
    const filePath = path.join(dir, file.name);
    const content = Array.isArray(file.content)
      ? file.content.join("\n")
      : file.content;

    fs.writeFileSync(filePath, content, "utf-8");
  }
}
