import LoginPage from '../../pages/login.page'
import InventoryPage from '../../pages/inventory.page'

describe('Login Smoke Tests', () => {
  beforeEach(async () => {
    await LoginPage.open()
  })

  it('should successfully login with valid credentials', async () => {
    await LoginPage.login('standard_user', 'secret_sauce')
    await expect(InventoryPage.isInventoryPageDisplayed()).resolves.toBe(true)
  })

  it('should display error with invalid credentials', async () => {
    await LoginPage.login('invalid_user', 'wrong_password')
    await expect(LoginPage.isErrorDisplayed()).resolves.toBe(true)
    const errorMsg = await LoginPage.getErrorMessage()
    await expect(errorMsg).toContain('Epic sadface')
  })

  it('should display error with locked out user', async () => {
    await LoginPage.login('locked_out_user', 'secret_sauce')
    await expect(LoginPage.isErrorDisplayed()).resolves.toBe(true)
    const errorMsg = await LoginPage.getErrorMessage()
    await expect(errorMsg).toContain('locked out')
  })

  it('should display error when username is missing', async () => {
    await LoginPage.login('', 'secret_sauce')
    await expect(LoginPage.isErrorDisplayed()).resolves.toBe(true)
    const errorMsg = await LoginPage.getErrorMessage()
    await expect(errorMsg).toContain('Username is required')
  })

  it('should display error when password is missing', async () => {
    await LoginPage.login('standard_user', '')
    await expect(LoginPage.isErrorDisplayed()).resolves.toBe(true)
    const errorMsg = await LoginPage.getErrorMessage()
    await expect(errorMsg).toContain('Password is required')
  })
})
