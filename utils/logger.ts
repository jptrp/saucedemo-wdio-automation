/**
 * Custom logger for test execution
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export class Logger {
  private static formatMessage(level: LogLevel, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString()
    const dataStr = data ? ` | Data: ${JSON.stringify(data)}` : ''
    return `[${timestamp}] [${level}] ${message}${dataStr}`
  }

  /**
   * Log debug message
   * @param message - Message to log
   * @param data - Additional data
   */
  static debug(message: string, data?: unknown): void {
    console.log(this.formatMessage(LogLevel.DEBUG, message, data))
  }

  /**
   * Log info message
   * @param message - Message to log
   * @param data - Additional data
   */
  static info(message: string, data?: unknown): void {
    console.log(this.formatMessage(LogLevel.INFO, message, data))
  }

  /**
   * Log warning message
   * @param message - Message to log
   * @param data - Additional data
   */
  static warn(message: string, data?: unknown): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, data))
  }

  /**
   * Log error message
   * @param message - Message to log
   * @param error - Error object or additional data
   */
  static error(message: string, error?: unknown): void {
    console.error(this.formatMessage(LogLevel.ERROR, message, error))
  }

  /**
   * Log test step
   * @param stepName - Name of the test step
   * @param stepNumber - Step number
   */
  static step(stepName: string, stepNumber?: number): void {
    const prefix = stepNumber ? `Step ${stepNumber}:` : 'Step:'
    this.info(`${prefix} ${stepName}`)
  }

  /**
   * Log test assertion
   * @param assertion - Assertion description
   * @param result - Result of assertion
   */
  static assertion(assertion: string, result: boolean): void {
    const status = result ? '✓' : '✗'
    this.info(`${status} Assertion: ${assertion}`, { passed: result })
  }
}
