<template>
  <div ref="displayRef"></div>
</template>

<script lang="ts" setup name="IDisplay">
import { onMounted, ref, createVNode, render, onBeforeUnmount } from 'vue';

const instances: any = []

const props = defineProps({
  code: {
    type: String,
    default: ''
  }
})

const id = ref('123')
const el = ref<any>(null)
const html = ref('')
const js = ref('')
const css = ref('')

const getSource = (source: string, type: string) => {
  const regex = new RegExp(`<${type}[^>]*>`)

  let openingTag: any = source.match(regex)

  if (!openingTag) {
    return ''
  } else {
    openingTag = openingTag[0]
  }

  return source.slice(
    source.indexOf(openingTag) + openingTag.length,
    source.lastIndexOf(`</${type}>`)
  )
}

const splitCode = () => {
  const script = getSource(props.code, 'script').replace('export default', 'return')
  const style = getSource(props.code, 'style');
  const template = '<div id="ddd">' + getSource(props.code, 'template') + '</div>';

  js.value = script
  html.value = template
  css.value = style
}

const displayRef = ref<any>(null)
const renderCode = () => {
  splitCode()

  if (html.value && js.value) {
    const parseStrToFunc = new Function(js.value)()

    parseStrToFunc.template = html.value

    const container = document.createElement('div')
    el.value = container

    const vm = createVNode(
      parseStrToFunc
    )

    render(vm, container)
    instances.push({ vm })
    displayRef.value.appendChild(container.firstElementChild)

    if (css.value !== '') {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.id = id.value;
      style.innerHTML = css.value;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }
}

const destroyCode = () => {
  const $target = document.getElementById(id.value)

  if ($target) {
    $target.parentNode?.removeChild($target)
  }

  if (el.value) {
    displayRef.value.removeChild(el.value.firstElementChild)
    el.value = null
  }
}

onMounted(() => {
  renderCode()
})

onBeforeUnmount(() => {
  destroyCode()
})

</script>