type Schema = {
  authToken: string
  isDark: boolean
  lang: 'ru-RU' | 'en-US'
  isAdmin: boolean
}

export class LocalStorageService {
  public static get<K extends keyof Schema>(key: K): Schema[K] | null {
    const value = localStorage.getItem(key)
    if (!value) return null

    return value as Schema[K]
  }

  public static set<K extends keyof Schema>(key: K, value: Schema[K]): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public static remove<K extends keyof Schema>(key: K): void {
    localStorage.removeItem(key)
  }
}
