export type NotificationErrorProps = {
  message: string,
  context: string
}

export default class Notification {

  private _errors: NotificationErrorProps[] = []

  get errors(): NotificationErrorProps[] {
    return this._errors
  }

  addError(error: NotificationErrorProps) {
    this.errors.push(error)
  }

  hasErrors(): boolean {
    return this._errors.length > 0
  }

  messages(context?: string): string {
    let messages = ''
    const setComma = (index: number, errors: NotificationErrorProps[]) => index !== errors.length - 1 ? ', ' : ''

    if (context) {
      const errorsByContext = this._errors.filter(error => error.context === context)
      errorsByContext.forEach((error: NotificationErrorProps, index: number) => {
        messages += `${error.context}: ${error.message}${setComma(index, errorsByContext)}`
      })
    } else {
      this._errors.forEach((error: NotificationErrorProps, index: number) => {
        messages += `${error.context}: ${error.message}${setComma(index, this.errors)}`
      })
    }
    return messages
  }

}