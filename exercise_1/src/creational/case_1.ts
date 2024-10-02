class Logger {

  // Holds the single instance of Logger
  private static instance: Logger;

  // Log levels
  private logLevel: "INFO" | "WARN" | "ERROR" = "INFO";

  // Private constructor to prevent instantiation
  private constructor() {}

  // Method to get the single instance of Logger
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Method to set the log level
  public setLogLevel(level: "INFO" | "WARN" | "ERROR"): void {
    this.logLevel = level;
  }

  // Method to log messages based on the current log level
  public log(message: string, level: "INFO" | "WARN" | "ERROR"): void {
    const levels = ["INFO", "WARN", "ERROR"];
    if (levels.indexOf(level) >= levels.indexOf(this.logLevel)) {
      console.log(`[${level}] ${message}`);
    }
  }
}

// Usage
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

logger1.setLogLevel("WARN");

logger1.log("This is an info message.", "INFO"); // Will not be logged
logger1.log("This is a warning message.", "WARN"); // Will be logged
logger1.log("This is an error message.", "ERROR"); // Will be logged

console.log(logger1 === logger2);

/* 
Output: 

[WARN] This is a warning message.
[ERROR] This is an error message.

true

----------------------------------------

Explanation:
The Logger class is a singleton class that ensures only one instance of the Logger class is created. 
The Logger class has a private constructor and a static method getInstance() that returns the single instance of the Logger class. 
The Logger class also has a setLogLevel() method to set the log level and a log() method to log messages based on the current log level.

A Singleton class can also be implemented by simply defining global variables in TypeScript.
*/
