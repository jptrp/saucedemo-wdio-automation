import BasePage from './base.page'

class LoginPage extends BasePage {
  // Selectors
  get username() {
    return $('#user-name')
  }
  get password() {
    return $('#password')
  }
  get loginBtn() {
    return $('#login-button')
  }
  get errorMessage() {
    return $('[data-test="error"]')
  }
  get loginLogo() {
    return $('.login_logo')
  }

  /**
   * Open login page
   */
  async open(): Promise<void> {
    await super.open('https://www.saucedemo.com/')
    await this.waitForPageLoad()
  }

  /**
   * Perform login action
   * @param user - Username
   * @param pass - Password
   */
  async login(user: string, pass: string): Promise<void> {
    await this.setValue(this.username, user)
    await this.setValue(this.password, pass)
    await this.click(this.loginBtn)
  }

  /**
   * Check if login page is displayed
   * @returns True if on login page
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.loginLogo)
  }

  /**
   * Get error message text
   * @returns Error message text
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForDisplayed(this.errorMessage)
    return await this.getText(this.errorMessage)
  }

  /**
   * Check if error message is displayed
   * @returns True if error message is shown
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.errorMessage)
  }

  /**
   * Clear login form
   */
  async clearForm(): Promise<void> {
    await this.clearValue(this.username)
    await this.clearValue(this.password)
  }
}

export default new LoginPage()
