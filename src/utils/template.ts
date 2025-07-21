/**
 * 替换模板文件中的变量
 * @param files 模板文件数组
 * @param variables 变量对象
 * @returns 替换后的文件数组
 */
export function replaceTemplateVariables(
  files: any[],
  variables: Record<string, string>
): any[] {
  // 深拷贝并替换变量
  return files.map((file) => {
    const name = replaceVars(file.name, variables);
    let content = file.content;
    if (Array.isArray(content)) {
      content = content.map((line: string) => replaceVars(line, variables));
    } else if (typeof content === "string") {
      content = replaceVars(content, variables);
    }
    return { ...file, name, content };
  });
}

/**
 * 替换字符串中的变量
 */
function replaceVars(str: string, variables: Record<string, string>): string {
  return str.replace(/\$\{(\w+)\}/g, (_, key) => variables[key] || "");
}
