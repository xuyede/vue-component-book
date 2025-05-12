<template>
  <div ref="displayRef"></div>
</template>

<script lang="ts" setup name="IDisplay">
import { createApp, defineComponent, onMounted, ref } from 'vue';


const props = defineProps({
  code: {
    type: String,
    default: ''
  }
})

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

    const Component = defineComponent(parseStrToFunc)
    const app = createApp(Component).mount(document.createElement('div'))
    displayRef.value.appendChild(app.$el)

    if (css.value !== '') {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.id = 'deye';
      style.innerHTML = css.value;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }
}

onMounted(() => {
  renderCode()
})

</script>