import LoginPage from '../../pages/login.page'
import InventoryPage from '../../pages/inventory.page'
import CartPage from '../../pages/cart.page'

describe('Cart Functionality Tests', () => {
  beforeEach(async () => {
    await LoginPage.open()
    await LoginPage.login('standard_user', 'secret_sauce')
    await InventoryPage.isInventoryPageDisplayed()
  })

  afterEach(async () => {
    await InventoryPage.logout()
  })

  it('should add single product to cart', async () => {
    await InventoryPage.addProductToCart('Sauce Labs Backpack')
    const cartCount = await InventoryPage.getCartItemCount()
    await expect(cartCount).toBe(1)
  })

  it('should add multiple products to cart', async () => {
    await InventoryPage.addProductToCart('Sauce Labs Backpack')
    await InventoryPage.addProductToCart('Sauce Labs Bike Light')
    await InventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt')
    const cartCount = await InventoryPage.getCartItemCount()
    await expect(cartCount).toBe(3)
  })

  it('should remove product from cart on inventory page', async () => {
    await InventoryPage.addProductToCart('Sauce Labs Backpack')
    await InventoryPage.addProductToCart('Sauce Labs Bike Light')
    await InventoryPage.removeProductFromCart('Sauce Labs Backpack')
    const cartCount = await InventoryPage.getCartItemCount()
    await expect(cartCount).toBe(1)
  })

  it('should display correct items in cart', async () => {
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light']

    for (const product of productsToAdd) {
      await InventoryPage.addProductToCart(product)
    }

    await InventoryPage.clickShoppingCart()
    await expect(CartPage.isCartPageDisplayed()).resolves.toBe(true)

    const cartItems = await CartPage.getAllCartItemNames()
    await expect(cartItems).toEqual(expect.arrayContaining(productsToAdd))
  })

  it('should remove product from cart page', async () => {
    await InventoryPage.addProductToCart('Sauce Labs Backpack')
    await InventoryPage.addProductToCart('Sauce Labs Bike Light')
    await InventoryPage.clickShoppingCart()

    await CartPage.removeItemFromCart('Sauce Labs Backpack')
    const itemCount = await CartPage.getCartItemCount()
    await expect(itemCount).toBe(1)
  })

  it('should continue shopping from cart', async () => {
    await InventoryPage.addProductToCart('Sauce Labs Backpack')
    await InventoryPage.clickShoppingCart()
    await CartPage.continueShopping()
    await expect(InventoryPage.isInventoryPageDisplayed()).resolves.toBe(true)
  })

  it('should display empty cart correctly', async () => {
    await InventoryPage.clickShoppingCart()
    const isEmpty = await CartPage.isCartEmpty()
    await expect(isEmpty).toBe(true)
  })

  it('should persist cart items across page navigation', async () => {
    await InventoryPage.addProductToCart('Sauce Labs Backpack')
    await InventoryPage.clickShoppingCart()
    await CartPage.continueShopping()
    const cartCount = await InventoryPage.getCartItemCount()
    await expect(cartCount).toBe(1)
  })
})
