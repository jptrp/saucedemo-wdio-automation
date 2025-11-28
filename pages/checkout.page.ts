import BasePage from './base.page'

class CheckoutPage extends BasePage {
  // Step 1: Information
  get firstName() {
    return $('[data-test="firstName"]')
  }
  get lastName() {
    return $('[data-test="lastName"]')
  }
  get postalCode() {
    return $('[data-test="postalCode"]')
  }
  get continueBtn() {
    return $('[data-test="continue"]')
  }
  get cancelBtn() {
    return $('[data-test="cancel"]')
  }
  get errorMessage() {
    return $('[data-test="error"]')
  }

  // Step 2: Overview
  get finishBtn() {
    return $('[data-test="finish"]')
  }
  get subtotalLabel() {
    return $('.summary_subtotal_label')
  }
  get taxLabel() {
    return $('.summary_tax_label')
  }
  get totalLabel() {
    return $('.summary_total_label')
  }
  get cartItems() {
    return $$('.cart_item')
  }

  // Complete
  get completeHeader() {
    return $('.complete-header')
  }
  get completeText() {
    return $('.complete-text')
  }
  get backHomeBtn() {
    return $('[data-test="back-to-products"]')
  }

  /**
   * Fill checkout information
   * @param firstName - First name
   * @param lastName - Last name
   * @param postalCode - Postal code
   */
  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.setValue(this.firstName, firstName)
    await this.setValue(this.lastName, lastName)
    await this.setValue(this.postalCode, postalCode)
  }

  /**
   * Continue to overview
   */
  async continueToOverview(): Promise<void> {
    await this.click(this.continueBtn)
  }

  /**
   * Cancel checkout
   */
  async cancelCheckout(): Promise<void> {
    await this.click(this.cancelBtn)
  }

  /**
   * Finish checkout
   */
  async finishCheckout(): Promise<void> {
    await this.click(this.finishBtn)
  }

  /**
   * Get subtotal amount
   * @returns Subtotal as string
   */
  async getSubtotal(): Promise<string> {
    const text = await this.getText(this.subtotalLabel)
    return text.replace('Item total: $', '')
  }

  /**
   * Get tax amount
   * @returns Tax as string
   */
  async getTax(): Promise<string> {
    const text = await this.getText(this.taxLabel)
    return text.replace('Tax: $', '')
  }

  /**
   * Get total amount
   * @returns Total as string
   */
  async getTotal(): Promise<string> {
    const text = await this.getText(this.totalLabel)
    return text.replace('Total: $', '')
  }

  /**
   * Check if on checkout information page
   * @returns True if on checkout info page
   */
  async isOnCheckoutInfoPage(): Promise<boolean> {
    return await this.isDisplayed(this.firstName)
  }

  /**
   * Check if on checkout overview page
   * @returns True if on overview page
   */
  async isOnOverviewPage(): Promise<boolean> {
    return await this.isDisplayed(this.finishBtn)
  }

  /**
   * Check if checkout is complete
   * @returns True if checkout complete
   */
  async isCheckoutComplete(): Promise<boolean> {
    await this.waitForDisplayed(this.completeHeader)
    const header = await this.getText(this.completeHeader)
    return header === 'Thank you for your order!'
  }

  /**
   * Get completion message
   * @returns Completion message text
   */
  async getCompletionMessage(): Promise<string> {
    return await this.getText(this.completeText)
  }

  /**
   * Go back to home
   */
  async backToHome(): Promise<void> {
    await this.click(this.backHomeBtn)
  }

  /**
   * Get error message text
   * @returns Error message
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForDisplayed(this.errorMessage)
    return await this.getText(this.errorMessage)
  }

  /**
   * Check if error is displayed
   * @returns True if error is shown
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.errorMessage)
  }

  /**
   * Get item count in overview
   * @returns Number of items
   */
  async getOverviewItemCount(): Promise<number> {
    return (await this.cartItems).length
  }
}

export default new CheckoutPage()
