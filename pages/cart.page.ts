import BasePage from './base.page'

class CartPage extends BasePage {
  // Selectors
  get title() {
    return $('.title')
  }
  get cartItems() {
    return $$('.cart_item')
  }
  get continueShoppingBtn() {
    return $('[data-test="continue-shopping"]')
  }
  get checkoutBtn() {
    return $('[data-test="checkout"]')
  }
  get cartBadge() {
    return $('.shopping_cart_badge')
  }
  get removeButtons() {
    return $$('[data-test^="remove"]')
  }

  /**
   * Check if cart page is displayed
   * @returns True if on cart page
   */
  async isCartPageDisplayed(): Promise<boolean> {
    await this.waitForDisplayed(this.title)
    const title = await this.getText(this.title)
    return title === 'Your Cart'
  }

  /**
   * Get cart item by name
   * @param itemName - Name of the item
   * @returns Item element
   */
  async getCartItemByName(itemName: string): Promise<WebdriverIO.Element> {
    return $(`//div[@class="inventory_item_name" and text()="${itemName}"]`)
  }

  /**
   * Remove item from cart by name
   * @param itemName - Name of the item to remove
   */
  async removeItemFromCart(itemName: string): Promise<void> {
    const itemNameFormatted = itemName.toLowerCase().replace(/\s/g, '-')
    const removeButton = $(`[data-test="remove-${itemNameFormatted}"]`)
    await this.click(removeButton)
  }

  /**
   * Get number of items in cart
   * @returns Number of cart items
   */
  async getCartItemCount(): Promise<number> {
    return (await this.cartItems).length
  }

  /**
   * Continue shopping
   */
  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingBtn)
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.click(this.checkoutBtn)
  }

  /**
   * Get all cart item names
   * @returns Array of item names
   */
  async getAllCartItemNames(): Promise<string[]> {
    const itemElements = await $$('.inventory_item_name')
    const names: string[] = []
    for (const el of itemElements) {
      names.push(await el.getText())
    }
    return names
  }

  /**
   * Check if cart is empty
   * @returns True if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    return (await this.getCartItemCount()) === 0
  }

  /**
   * Get item price by name
   * @param itemName - Name of the item
   * @returns Item price
   */
  async getItemPrice(itemName: string): Promise<string> {
    const item = await this.getCartItemByName(itemName)
    const priceElement = await item.$('.inventory_item_price')
    return await this.getText(priceElement)
  }
}

export default new CartPage()
