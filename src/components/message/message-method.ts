import MessageConstructor from './message.vue'
import { createVNode, render } from 'vue'

let seed = 0

const message = (options) => {
  if (typeof options === 'string') {
    options = { message: options }
  }

  const id = `message_${seed++}`

  const props = {
    id
  }

  const appendTo = options.appendTo || document.body
  const container = document.createElement('div')
  container.id = id

  const vm = createVNode(
    MessageConstructor,
    props,
    null
  )
  render(vm, container)
  vm.component?.exposed?.add({
    content: options.message,
    duration: options.duration || 3
  })

  appendTo.appendChild(container)
}

export default message