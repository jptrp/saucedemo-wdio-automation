import LoginPage from '../pages/login.page'

describe('SauceDemo Login', () => {
  it('should login successfully', async () => {
    await LoginPage.open()
    await LoginPage.login('standard_user', 'secret_sauce')
    await expect(browser).toHaveUrlContaining('inventory')
  })
})
