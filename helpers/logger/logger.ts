import * as log4js from "log4js";
import path from "path";
import fs from "fs";

const LOG_DIR = path.resolve(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "test-run.log");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

log4js.configure({
  appenders: {
    
    file: {
      type: "file",
      filename: LOG_FILE,
      flags: "a",
      layout: {
        type: "pattern",
        pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] %m",
      },
    },


    console: {
      type: "console",
      layout: {
        type: "colored",
      },
    },
  },

  categories: {
    default: {
      appenders: ["file", "console"],
      level: "info",
    },
  },
});

export const logger = log4js.getLogger();
logger.level = "info";
export const getLogFilePath = (): string => LOG_FILE;