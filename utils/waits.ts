/**
 * Custom wait utilities for enhanced test reliability
 */

export class WaitUtils {
  /**
   * Wait for element to contain specific text
   * @param element - The element to check
   * @param text - Expected text
   * @param timeout - Timeout in milliseconds
   */
  static async waitForTextToContain(
    element: WebdriverIO.Element,
    text: string,
    timeout: number = 10000
  ): Promise<void> {
    await browser.waitUntil(
      async () => {
        const elementText = await element.getText()
        return elementText.includes(text)
      },
      {
        timeout,
        timeoutMsg: `Element did not contain text "${text}" within ${timeout}ms`
      }
    )
  }

  /**
   * Wait for element to have specific attribute value
   * @param element - The element to check
   * @param attribute - Attribute name
   * @param value - Expected attribute value
   * @param timeout - Timeout in milliseconds
   */
  static async waitForAttributeValue(
    element: WebdriverIO.Element,
    attribute: string,
    value: string,
    timeout: number = 10000
  ): Promise<void> {
    await browser.waitUntil(
      async () => {
        const attrValue = await element.getAttribute(attribute)
        return attrValue === value
      },
      {
        timeout,
        timeoutMsg: `Attribute "${attribute}" did not have value "${value}" within ${timeout}ms`
      }
    )
  }

  /**
   * Wait for URL to contain specific text
   * @param urlPart - Expected URL part
   * @param timeout - Timeout in milliseconds
   */
  static async waitForUrlToContain(urlPart: string, timeout: number = 10000): Promise<void> {
    await browser.waitUntil(async () => (await browser.getUrl()).includes(urlPart), {
      timeout,
      timeoutMsg: `URL did not contain "${urlPart}" within ${timeout}ms`
    })
  }

  /**
   * Wait for element count to match expected
   * @param elements - Elements array
   * @param expectedCount - Expected count
   * @param timeout - Timeout in milliseconds
   */
  static async waitForElementCount(
    elements: Promise<WebdriverIO.ElementArray>,
    expectedCount: number,
    timeout: number = 10000
  ): Promise<void> {
    await browser.waitUntil(async () => (await elements).length === expectedCount, {
      timeout,
      timeoutMsg: `Element count did not match ${expectedCount} within ${timeout}ms`
    })
  }

  /**
   * Wait for element to be enabled
   * @param element - The element to check
   * @param timeout - Timeout in milliseconds
   */
  static async waitForEnabled(
    element: WebdriverIO.Element,
    timeout: number = 10000
  ): Promise<void> {
    await browser.waitUntil(async () => await element.isEnabled(), {
      timeout,
      timeoutMsg: `Element was not enabled within ${timeout}ms`
    })
  }

  /**
   * Wait for element to be disabled
   * @param element - The element to check
   * @param timeout - Timeout in milliseconds
   */
  static async waitForDisabled(
    element: WebdriverIO.Element,
    timeout: number = 10000
  ): Promise<void> {
    await browser.waitUntil(async () => !(await element.isEnabled()), {
      timeout,
      timeoutMsg: `Element was not disabled within ${timeout}ms`
    })
  }

  /**
   * Smart wait - combines multiple wait strategies
   * @param element - The element to wait for
   * @param timeout - Timeout in milliseconds
   */
  static async smartWait(element: WebdriverIO.Element, timeout: number = 10000): Promise<void> {
    await element.waitForExist({ timeout })
    await element.waitForDisplayed({ timeout })
    await element.waitForClickable({ timeout })
  }

  /**
   * Wait with retry logic
   * @param action - Async action to perform
   * @param maxRetries - Maximum number of retries
   * @param delayMs - Delay between retries in milliseconds
   */
  static async waitWithRetry<T>(
    action: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await action()
      } catch (error) {
        lastError = error as Error
        if (i < maxRetries - 1) {
          await browser.pause(delayMs)
        }
      }
    }

    throw lastError || new Error('Action failed after retries')
  }
}
