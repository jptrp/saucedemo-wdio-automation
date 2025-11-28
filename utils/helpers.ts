/**
 * Helper utility functions for common test operations
 */

export class TestHelpers {
  /**
   * Generate random string
   * @param length - Length of string
   * @returns Random string
   */
  static generateRandomString(length: number = 10): string {
    return Math.random()
      .toString(36)
      .substring(2, length + 2)
  }

  /**
   * Generate random email
   * @param domain - Email domain
   * @returns Random email address
   */
  static generateRandomEmail(domain: string = 'test.com'): string {
    return `test_${this.generateRandomString(8)}@${domain}`
  }

  /**
   * Generate random number in range
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Random number
   */
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * Format currency
   * @param amount - Amount to format
   * @param currency - Currency symbol
   * @returns Formatted currency string
   */
  static formatCurrency(amount: number, currency: string = '$'): string {
    return `${currency}${amount.toFixed(2)}`
  }

  /**
   * Parse currency string to number
   * @param currencyString - String to parse
   * @returns Numeric value
   */
  static parseCurrency(currencyString: string): number {
    return parseFloat(currencyString.replace(/[^0-9.-]+/g, ''))
  }

  /**
   * Get current timestamp
   * @returns ISO timestamp string
   */
  static getTimestamp(): string {
    return new Date().toISOString()
  }

  /**
   * Format date
   * @param date - Date to format
   * @param format - Format string
   * @returns Formatted date string
   */
  static formatDate(date: Date = new Date(), format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return format.replace('YYYY', String(year)).replace('MM', month).replace('DD', day)
  }

  /**
   * Wait for specific time
   * @param ms - Milliseconds to wait
   */
  static async sleep(ms: number): Promise<void> {
    await browser.pause(ms)
  }

  /**
   * Scroll to top of page
   */
  static async scrollToTop(): Promise<void> {
    await browser.execute(() => window.scrollTo(0, 0))
  }

  /**
   * Scroll to bottom of page
   */
  static async scrollToBottom(): Promise<void> {
    await browser.execute(() => window.scrollTo(0, document.body.scrollHeight))
  }

  /**
   * Check if array contains all expected elements
   * @param actual - Actual array
   * @param expected - Expected elements
   * @returns True if all elements are present
   */
  static arrayContainsAll<T>(actual: T[], expected: T[]): boolean {
    return expected.every((item) => actual.includes(item))
  }

  /**
   * Get random element from array
   * @param array - Array to pick from
   * @returns Random element
   */
  static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }

  /**
   * Shuffle array
   * @param array - Array to shuffle
   * @returns Shuffled array
   */
  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  /**
   * Take screenshot with timestamp
   * @param baseName - Base name for screenshot
   */
  static async takeScreenshot(baseName: string = 'screenshot'): Promise<void> {
    const timestamp = Date.now()
    await browser.saveScreenshot(`./reports/screenshots/${baseName}_${timestamp}.png`)
  }

  /**
   * Log test info
   * @param message - Message to log
   * @param data - Additional data
   */
  static logInfo(message: string, data?: unknown): void {
    const timestamp = this.getTimestamp()
    console.log(`[${timestamp}] INFO: ${message}`, data || '')
  }

  /**
   * Log error
   * @param message - Error message
   * @param error - Error object
   */
  static logError(message: string, error?: unknown): void {
    const timestamp = this.getTimestamp()
    console.error(`[${timestamp}] ERROR: ${message}`, error || '')
  }
}
