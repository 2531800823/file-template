import { log } from "@/channel";
import { getPathName } from "@/config/getConfig";
import fs from "fs-extra";
import { Template } from "@/interface";

export async function resetTemplate() {
  log("🚀 liu123 ~ resetTemplate");
  const filePath = await getPathName();
  fs.removeSync(filePath);

  await getPathName();

  const content = fs.readFileSync(filePath, "utf-8");
  const fileTemplate = JSON.parse(content) as Template[];
  log(`🚀 liu123 ~ 重置: ${JSON.stringify(fileTemplate, null, 2)}`);
}
