/**
 * 模板类型声明
 */
export type TemplateFile = { name: string; content: string | string[] };

export interface Template {
  /** 名称 */
    name: string;
  /** 描述 */
  description?: string;
  /** 类型 */
  type: "file" | "folder";
  /** 文件 */
  files: TemplateFile[];
}
