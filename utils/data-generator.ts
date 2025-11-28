/**
 * Test data generator for creating dynamic test data
 */

export interface UserData {
  firstName: string
  lastName: string
  email: string
  postalCode: string
  phone: string
}

export interface AddressData {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export class DataGenerator {
  private static firstNames = [
    'John',
    'Jane',
    'Michael',
    'Sarah',
    'David',
    'Emily',
    'James',
    'Emma',
    'Robert',
    'Olivia'
  ]

  private static lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez'
  ]

  private static cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'Austin'
  ]

  private static states = ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI']

  /**
   * Generate random user data
   * @returns User data object
   */
  static generateUser(): UserData {
    const firstName = this.getRandomElement(this.firstNames)
    const lastName = this.getRandomElement(this.lastNames)
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${this.getRandomNumber(1, 999)}@test.com`
    const postalCode = this.generateZipCode()
    const phone = this.generatePhone()

    return { firstName, lastName, email, postalCode, phone }
  }

  /**
   * Generate random address
   * @returns Address data object
   */
  static generateAddress(): AddressData {
    const street = `${this.getRandomNumber(1, 9999)} ${this.getRandomElement(['Main', 'Oak', 'Pine', 'Maple', 'Cedar'])} ${this.getRandomElement(['St', 'Ave', 'Blvd', 'Rd'])}`
    const city = this.getRandomElement(this.cities)
    const state = this.getRandomElement(this.states)
    const zipCode = this.generateZipCode()
    const country = 'USA'

    return { street, city, state, zipCode, country }
  }

  /**
   * Generate random ZIP code
   * @returns ZIP code string
   */
  static generateZipCode(): string {
    return String(this.getRandomNumber(10000, 99999))
  }

  /**
   * Generate random phone number
   * @returns Phone number string
   */
  static generatePhone(): string {
    const areaCode = this.getRandomNumber(200, 999)
    const prefix = this.getRandomNumber(200, 999)
    const lineNumber = this.getRandomNumber(1000, 9999)
    return `${areaCode}-${prefix}-${lineNumber}`
  }

  /**
   * Generate credit card number (test format)
   * @returns Credit card number
   */
  static generateCreditCard(): string {
    const digits = Array.from({ length: 16 }, () => this.getRandomNumber(0, 9))
    return digits.join('')
  }

  /**
   * Generate random product name
   * @returns Product name
   */
  static generateProductName(): string {
    const adjectives = ['Premium', 'Deluxe', 'Ultimate', 'Pro', 'Elite', 'Advanced']
    const products = ['Backpack', 'Jacket', 'Shirt', 'Pants', 'Shoes', 'Hat']
    const colors = ['Black', 'Blue', 'Red', 'Green', 'Gray', 'White']

    return `${this.getRandomElement(adjectives)} ${this.getRandomElement(colors)} ${this.getRandomElement(products)}`
  }

  /**
   * Generate random price
   * @param min - Minimum price
   * @param max - Maximum price
   * @returns Price as number
   */
  static generatePrice(min: number = 10, max: number = 100): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }

  /**
   * Get random element from array
   * @param array - Array to pick from
   * @returns Random element
   */
  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }

  /**
   * Get random number in range
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Random number
   */
  private static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * Generate batch of users
   * @param count - Number of users to generate
   * @returns Array of user data
   */
  static generateUsers(count: number): UserData[] {
    return Array.from({ length: count }, () => this.generateUser())
  }

  /**
   * Generate test username
   * @returns Username string
   */
  static generateUsername(): string {
    return `user_${Date.now()}_${this.getRandomNumber(1000, 9999)}`
  }

  /**
   * Generate test password
   * @param length - Password length
   * @returns Password string
   */
  static generatePassword(length: number = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('')
  }
}
