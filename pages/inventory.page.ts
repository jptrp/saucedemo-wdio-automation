import BasePage from './base.page'

class InventoryPage extends BasePage {
  // Selectors
  get title() {
    return $('.title')
  }
  get shoppingCartLink() {
    return $('.shopping_cart_link')
  }
  get shoppingCartBadge() {
    return $('.shopping_cart_badge')
  }
  get productItems() {
    return $$('.inventory_item')
  }
  get addToCartButtons() {
    return $$('[data-test^="add-to-cart"]')
  }
  get removeButtons() {
    return $$('[data-test^="remove"]')
  }
  get productSortDropdown() {
    return $('[data-test="product_sort_container"]')
  }
  get burgerMenuButton() {
    return $('#react-burger-menu-btn')
  }
  get logoutLink() {
    return $('#logout_sidebar_link')
  }

  /**
   * Check if inventory page is displayed
   * @returns True if on inventory page
   */
  async isInventoryPageDisplayed(): Promise<boolean> {
    await this.waitForDisplayed(this.title)
    // Wait for products to be fully loaded
    await browser.pause(500)
    const title = await this.getText(this.title)
    return title === 'Products'
  }

  /**
   * Get product element by name
   * @param productName - Name of the product
   * @returns Product element
   */
  async getProductByName(productName: string): Promise<WebdriverIO.Element> {
    return $(`//div[@class="inventory_item_name" and text()="${productName}"]`)
  }

  /**
   * Add product to cart by name
   * @param productName - Name of the product to add
   */
  async addProductToCart(productName: string): Promise<void> {
    const productNameFormatted = productName.toLowerCase().replace(/\s/g, '-')
    const addButton = $(`[data-test="add-to-cart-${productNameFormatted}"]`)
    await this.waitForDisplayed(addButton)
    await this.click(addButton)
  }

  /**
   * Remove product from cart by name
   * @param productName - Name of the product to remove
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const productNameFormatted = productName.toLowerCase().replace(/\s/g, '-')
    const removeButton = $(`[data-test="remove-${productNameFormatted}"]`)
    await this.click(removeButton)
  }

  /**
   * Get cart item count
   * @returns Number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    const isDisplayed = await this.isDisplayed(this.shoppingCartBadge)
    if (!isDisplayed) return 0
    const count = await this.getText(this.shoppingCartBadge)
    return parseInt(count, 10)
  }

  /**
   * Click shopping cart
   */
  async clickShoppingCart(): Promise<void> {
    await this.click(this.shoppingCartLink)
  }

  /**
   * Get all product names
   * @returns Array of product names
   */
  async getAllProductNames(): Promise<string[]> {
    const productElements = await $$('.inventory_item_name')
    const names: string[] = []
    for (const el of productElements) {
      names.push(await el.getText())
    }
    return names
  }

  /**
   * Sort products
   * @param sortOption - Sort option (az, za, lohi, hilo)
   */
  async sortProducts(sortOption: string): Promise<void> {
    await this.click(this.productSortDropdown)
    await this.productSortDropdown.selectByAttribute('value', sortOption)
  }

  /**
   * Logout from application
   */
  async logout(): Promise<void> {
    await this.click(this.burgerMenuButton)
    await this.waitForDisplayed(this.logoutLink)
    await this.click(this.logoutLink)
  }

  /**
   * Get product price by name
   * @param productName - Name of the product
   * @returns Product price as string
   */
  async getProductPrice(productName: string): Promise<string> {
    const productNameFormatted = productName.toLowerCase().replace(/\s/g, '-')
    const priceElement = $(`[data-test="inventory-item-price-${productNameFormatted}"]`)
    return await this.getText(priceElement)
  }

  /**
   * Get count of products displayed
   * @returns Number of products
   */
  async getProductCount(): Promise<number> {
    return (await this.productItems).length
  }
}

export default new InventoryPage()
