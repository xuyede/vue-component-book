import Message from './message-method'

const withInstallFunction = <T>(fn: T, name: string) => {
  ;(fn as any).install = (app) => {
    app.config.globalProperties[name] = fn
  }

  return fn
}

export const IMessage = withInstallFunction(Message, '$message')


export default IMessage
