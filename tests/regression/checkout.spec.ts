import LoginPage from '../../pages/login.page'
import InventoryPage from '../../pages/inventory.page'
import CartPage from '../../pages/cart.page'
import CheckoutPage from '../../pages/checkout.page'

describe('Checkout Process Tests', () => {
  beforeEach(async () => {
    await LoginPage.open()
    await LoginPage.login('standard_user', 'secret_sauce')
    await InventoryPage.isInventoryPageDisplayed()
    await InventoryPage.addProductToCart('Sauce Labs Backpack')
    await InventoryPage.clickShoppingCart()
    await CartPage.proceedToCheckout()
  })

  afterEach(async () => {
    // Navigate back and logout if needed
    try {
      await browser.url('https://www.saucedemo.com/inventory.html')
      await InventoryPage.logout()
    } catch {
      // Already logged out
    }
  })

  it('should successfully complete checkout with valid information', async () => {
    await CheckoutPage.fillCheckoutInformation('John', 'Doe', '12345')
    await CheckoutPage.continueToOverview()
    await expect(CheckoutPage.isOnOverviewPage()).resolves.toBe(true)
    await CheckoutPage.finishCheckout()
    await expect(CheckoutPage.isCheckoutComplete()).resolves.toBe(true)
  })

  it('should display error when first name is missing', async () => {
    await CheckoutPage.fillCheckoutInformation('', 'Doe', '12345')
    await CheckoutPage.continueToOverview()
    await expect(CheckoutPage.isErrorDisplayed()).resolves.toBe(true)
    const error = await CheckoutPage.getErrorMessage()
    await expect(error).toContain('First Name is required')
  })

  it('should display error when last name is missing', async () => {
    await CheckoutPage.fillCheckoutInformation('John', '', '12345')
    await CheckoutPage.continueToOverview()
    await expect(CheckoutPage.isErrorDisplayed()).resolves.toBe(true)
    const error = await CheckoutPage.getErrorMessage()
    await expect(error).toContain('Last Name is required')
  })

  it('should display error when postal code is missing', async () => {
    await CheckoutPage.fillCheckoutInformation('John', 'Doe', '')
    await CheckoutPage.continueToOverview()
    await expect(CheckoutPage.isErrorDisplayed()).resolves.toBe(true)
    const error = await CheckoutPage.getErrorMessage()
    await expect(error).toContain('Postal Code is required')
  })

  it('should cancel checkout and return to cart', async () => {
    await CheckoutPage.cancelCheckout()
    await expect(CartPage.isCartPageDisplayed()).resolves.toBe(true)
  })

  it('should display correct item count in overview', async () => {
    await InventoryPage.open('https://www.saucedemo.com/inventory.html')
    await InventoryPage.addProductToCart('Sauce Labs Bike Light')
    await InventoryPage.clickShoppingCart()
    await CartPage.proceedToCheckout()

    await CheckoutPage.fillCheckoutInformation('John', 'Doe', '12345')
    await CheckoutPage.continueToOverview()

    const itemCount = await CheckoutPage.getOverviewItemCount()
    await expect(itemCount).toBe(2)
  })

  it('should calculate totals correctly', async () => {
    await CheckoutPage.fillCheckoutInformation('John', 'Doe', '12345')
    await CheckoutPage.continueToOverview()

    const subtotal = await CheckoutPage.getSubtotal()
    const tax = await CheckoutPage.getTax()
    const total = await CheckoutPage.getTotal()

    await expect(parseFloat(subtotal)).toBeGreaterThan(0)
    await expect(parseFloat(tax)).toBeGreaterThan(0)
    await expect(parseFloat(total)).toBeGreaterThan(parseFloat(subtotal))
  })

  it('should navigate back to home after successful checkout', async () => {
    await CheckoutPage.fillCheckoutInformation('John', 'Doe', '12345')
    await CheckoutPage.continueToOverview()
    await CheckoutPage.finishCheckout()
    await CheckoutPage.backToHome()
    await expect(InventoryPage.isInventoryPageDisplayed()).resolves.toBe(true)
  })
})
