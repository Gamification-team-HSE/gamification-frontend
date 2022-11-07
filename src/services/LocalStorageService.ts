type Schema = {
  access_token: string
  refresh_token: string
}

export class LocalStorageService {
  public static get<K extends keyof Schema>(key: K): Schema[K] | null {
    const value = localStorage.getItem(key)
    if (!value) return value

    return JSON.parse(value) as Schema[K]
  }

  public static set<K extends keyof Schema>(key: K, value: Schema[K]): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public static remove<K extends keyof Schema>(key: K): void {
    localStorage.removeItem(key)
  }
}
