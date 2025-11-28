import LoginPage from '../../pages/login.page'
import InventoryPage from '../../pages/inventory.page'
import CartPage from '../../pages/cart.page'
import CheckoutPage from '../../pages/checkout.page'

describe('End-to-End: Complete Purchase Flow', () => {
  it('should complete full purchase journey from login to checkout', async () => {
    // Step 1: Login
    await LoginPage.open()
    await expect(LoginPage.isLoginPageDisplayed()).resolves.toBe(true)
    await LoginPage.login('standard_user', 'secret_sauce')

    // Step 2: Verify inventory page
    await expect(InventoryPage.isInventoryPageDisplayed()).resolves.toBe(true)
    const productCount = await InventoryPage.getProductCount()
    await expect(productCount).toBeGreaterThan(0)

    // Step 3: Add multiple products to cart
    const productsToAdd = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ]

    for (const product of productsToAdd) {
      await InventoryPage.addProductToCart(product)
    }

    // Step 4: Verify cart badge
    const cartCount = await InventoryPage.getCartItemCount()
    await expect(cartCount).toBe(productsToAdd.length)

    // Step 5: Navigate to cart
    await InventoryPage.clickShoppingCart()
    await expect(CartPage.isCartPageDisplayed()).resolves.toBe(true)

    // Step 6: Verify cart contents
    const cartItems = await CartPage.getAllCartItemNames()
    await expect(cartItems.length).toBe(productsToAdd.length)

    for (const product of productsToAdd) {
      await expect(cartItems).toContain(product)
    }

    // Step 7: Proceed to checkout
    await CartPage.proceedToCheckout()
    await expect(CheckoutPage.isOnCheckoutInfoPage()).resolves.toBe(true)

    // Step 8: Fill checkout information
    const customerInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    }
    await CheckoutPage.fillCheckoutInformation(
      customerInfo.firstName,
      customerInfo.lastName,
      customerInfo.postalCode
    )

    // Step 9: Continue to overview
    await CheckoutPage.continueToOverview()
    await expect(CheckoutPage.isOnOverviewPage()).resolves.toBe(true)

    // Step 10: Verify order summary
    const overviewItemCount = await CheckoutPage.getOverviewItemCount()
    await expect(overviewItemCount).toBe(productsToAdd.length)

    const subtotal = await CheckoutPage.getSubtotal()
    const tax = await CheckoutPage.getTax()
    const total = await CheckoutPage.getTotal()

    await expect(parseFloat(subtotal)).toBeGreaterThan(0)
    await expect(parseFloat(tax)).toBeGreaterThan(0)

    const expectedTotal = parseFloat(subtotal) + parseFloat(tax)
    await expect(parseFloat(total)).toBeCloseTo(expectedTotal, 2)

    // Step 11: Complete checkout
    await CheckoutPage.finishCheckout()
    await expect(CheckoutPage.isCheckoutComplete()).resolves.toBe(true)

    // Step 12: Verify success message
    const completionMsg = await CheckoutPage.getCompletionMessage()
    await expect(completionMsg).toContain('Your order has been dispatched')

    // Step 13: Navigate back to home
    await CheckoutPage.backToHome()
    await expect(InventoryPage.isInventoryPageDisplayed()).resolves.toBe(true)

    // Step 14: Verify cart is empty
    const finalCartCount = await InventoryPage.getCartItemCount()
    await expect(finalCartCount).toBe(0)

    // Step 15: Logout
    await InventoryPage.logout()
    await expect(LoginPage.isLoginPageDisplayed()).resolves.toBe(true)
  })

  it('should handle partial cart removal and checkout', async () => {
    // Login and add products
    await LoginPage.open()
    await LoginPage.login('standard_user', 'secret_sauce')

    await InventoryPage.addProductToCart('Sauce Labs Backpack')
    await InventoryPage.addProductToCart('Sauce Labs Bike Light')
    await InventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt')

    // Go to cart and remove one item
    await InventoryPage.clickShoppingCart()
    await CartPage.removeItemFromCart('Sauce Labs Bike Light')

    const remainingItems = await CartPage.getCartItemCount()
    await expect(remainingItems).toBe(2)

    // Complete checkout with remaining items
    await CartPage.proceedToCheckout()
    await CheckoutPage.fillCheckoutInformation('Jane', 'Smith', '54321')
    await CheckoutPage.continueToOverview()

    const overviewCount = await CheckoutPage.getOverviewItemCount()
    await expect(overviewCount).toBe(2)

    await CheckoutPage.finishCheckout()
    await expect(CheckoutPage.isCheckoutComplete()).resolves.toBe(true)

    // Cleanup
    await CheckoutPage.backToHome()
    await InventoryPage.logout()
  })
})
