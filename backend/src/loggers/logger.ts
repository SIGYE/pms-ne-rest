// src/middleware/morganLogger.ts
import morgan from "morgan";

// Add a custom timestamp token
morgan.token("timestamp", () => new Date().toISOString());

// Define custom format
const customFormat = "[:timestamp] :method :url :status - :response-time ms";
const morganLogger = morgan(customFormat);
console.log("Morgan logger initialized with timestamped format 🚀");

export default morganLogger;
