# file-template 说明文档

## 1. 插件目标

- 在 VSCode 文件资源管理器（文件树）中，右键任意目录或文件时，弹出自定义菜单项（如“一键创建模板”）。
- 支持通过本地 JSON 文件配置模板，模板可包含变量（如文件名），并在生成时自动替换。
- 支持多文件、多层级目录结构的模板生成。

---

## 2. 功能需求

### 2.1 插件激活与命令注册

- 插件通过 activationEvents 激活（如 onStartupFinished 或 onCommand）。
- 在文件树目录或文件上右键，显示“一键创建模板”菜单项。
- 菜单项点击后触发模板生成命令。

### 2.2 本地模板 JSON 配置

- 约定本地 JSON 文件（如 `.vscode/file-templates.json`），用于存储模板配置。
- JSON 配置示例：

  ```json
  [
    {
      "name": "React 组件",
      "description": "创建一个基础 React 组件",
      "files": [
        {
          "name": "${filename}.tsx",
          "content": [
            "import React from 'react';",
            "export default function ${filename}() {",
            "return <div>${filename}</div>;",
            "}"
          ]
        }
      ]
    }
  ]
  ```

- 支持多个模板，每个模板可包含多个文件或文件夹结构。

### 2.3 右键菜单与命令处理

- 获取用户右键点击的目标路径。
- 读取本地 JSON 模板列表。
- 弹出模板选择列表（QuickPick）。
- 若模板包含变量（如 `${filename}`），弹出输入框（InputBox）让用户填写。

### 2.4 文件/文件夹生成逻辑

- 解析模板内容，替换变量（如 `${filename}`,...）。
- 在目标目录下生成对应文件/文件夹。
- 处理文件已存在的情况（如覆盖、跳过或提示用户）。

### 2.5 用户交互与提示

- 选择模板、输入变量的交互流程。
- 操作成功或失败时，弹出消息提示（如 window.showInformationMessage）。

---

## 3. 可扩展性

- 支持更多变量（如 `${date}`、`${author}` 等）。
- 支持模板内容为外部文件引用。
- 支持多级目录结构的模板生成。
- 支持用户自定义模板存储路径。

---

## 4. 项目结构建议

- `src/extension.ts`（插件主入口）
- `src/utils/`（工具函数，如变量替换、文件操作等）
- `src/templates/`（内置模板，可选）
- `package.json`（插件声明、菜单注册、命令注册等）

---

## 5. 非功能性需求

- 插件应兼容主流操作系统（Windows、macOS、Linux）。
- 插件应保证性能、可读性和可维护性。
- 插件应有详细的注释和文档说明。
