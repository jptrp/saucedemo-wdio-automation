export default class BasePage {
  /**
   * Open a specific URL
   * @param path - The path to navigate to (relative to base URL)
   */
  async open(path: string): Promise<void> {
    await browser.url(path)
  }

  /**
   * Wait for an element to be displayed
   * @param element - The element to wait for
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForDisplayed(element: any, timeout: number = 10000): Promise<void> {
    await element.waitForDisplayed({ timeout })
  }

  /**
   * Wait for an element to be clickable
   * @param element - The element to wait for
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForClickable(element: any, timeout: number = 10000): Promise<void> {
    await element.waitForClickable({ timeout })
  }

  /**
   * Click an element with wait
   * @param element - The element to click
   */
  async click(element: any): Promise<void> {
    await this.waitForClickable(element)
    await element.click()
  }

  /**
   * Set value in an input field with wait
   * @param element - The input element
   * @param value - The value to set
   */
  async setValue(element: any, value: string): Promise<void> {
    await this.waitForDisplayed(element)
    await element.setValue(value)
  }

  /**
   * Get text from an element
   * @param element - The element to get text from
   * @returns The element's text
   */
  async getText(element: any): Promise<string> {
    await this.waitForDisplayed(element)
    return await element.getText()
  }

  /**
   * Check if element is displayed
   * @param element - The element to check
   * @returns True if displayed, false otherwise
   */
  async isDisplayed(element: any): Promise<boolean> {
    try {
      return await element.isDisplayed()
    } catch {
      return false
    }
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad(): Promise<void> {
    await browser.waitUntil(
      async () => await browser.execute(() => document.readyState === 'complete'),
      { timeout: 30000, timeoutMsg: 'Page did not load within 30 seconds' }
    )
  }

  /**
   * Scroll element into view
   * @param element - The element to scroll to
   */
  async scrollIntoView(element: any): Promise<void> {
    await element.scrollIntoView()
  }

  /**
   * Get current URL
   * @returns Current URL
   */
  async getCurrentUrl(): Promise<string> {
    return await browser.getUrl()
  }

  /**
   * Get page title
   * @returns Page title
   */
  async getTitle(): Promise<string> {
    return await browser.getTitle()
  }

  /**
   * Take a screenshot
   * @param filename - The name for the screenshot file
   */
  async takeScreenshot(filename: string): Promise<void> {
    await browser.saveScreenshot(`./reports/screenshots/${filename}.png`)
  }

  /**
   * Refresh the page
   */
  async refresh(): Promise<void> {
    await browser.refresh()
  }

  /**
   * Navigate back
   */
  async back(): Promise<void> {
    await browser.back()
  }

  /**
   * Wait for element to exist
   * @param element - The element to wait for
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForExist(element: any, timeout: number = 10000): Promise<void> {
    await element.waitForExist({ timeout })
  }

  /**
   * Clear input field
   * @param element - The input element to clear
   */
  async clearValue(element: any): Promise<void> {
    await this.waitForDisplayed(element)
    await element.clearValue()
  }
}
