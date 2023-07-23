type severity = "INFO" | "WARN" | "ERROR"

export const log = (logLevel: severity, ...message: any[]) => {
    if (logLevel === "INFO") console.log(`INFO   [${new Date().toLocaleString()}] -`, ...message)
    if (logLevel === "WARN") console.warn(`WARN   [${new Date().toLocaleString()}] -`, ...message)
    if (logLevel === "ERROR") console.error(`\x1b[31mERROR  [${new Date().toLocaleString()}]\x1b[0m -`, ...message)
}