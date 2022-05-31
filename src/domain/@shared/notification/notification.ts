type NotificationError = {
  message: string,
  context: string
}

export default class Notification {

  private errors: NotificationError[] = []

  addError(error: NotificationError) {
    this.errors.push(error)
  }

  messages(context?: string): string {
    let messages = ''
    const setComma = (index: number, errors: NotificationError[]) => index !== errors.length - 1 ? ', ' : ''

    if (context) {
      const errorsByContext = this.errors.filter(error => error.context === context)
      errorsByContext.forEach((error: NotificationError, index: number) => {
        messages += `${error.context}: ${error.message}${setComma(index, errorsByContext)}`
      })
    } else {
      this.errors.forEach((error: NotificationError, index: number) => {
        messages += `${error.context}: ${error.message}${setComma(index, this.errors)}`
      })
    }
    return messages
  }

}