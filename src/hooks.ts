
import { getCurrentInstance } from 'vue';

function useInstance() {
  const instance = getCurrentInstance()
  if (!instance) {
    throw 'hooks must used in setup'
  }
  return instance
}

function useFindComponentUpward (componentName) {
  const instance = useInstance()
  let parent = instance?.parent
  let name  = parent?.type.name

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.parent
    if (parent) {
      name = parent.type.name
    }
  }

  return parent
}

function useFindComponentsUpward (componentName, context) {
  let parents: any = [];
  if (!context) {
    context = useInstance()
  }
  const parent = context?.parent;

  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent)
    };
    return parents.concat(useFindComponentsUpward(componentName, parent));
  } else {
    return [];
  }
}

export {
  useInstance,
  useFindComponentUpward,
  useFindComponentsUpward
}