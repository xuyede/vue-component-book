<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data">
        <td v-for="col in columns">{{ row[col.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup name="ITable">
import { ref } from 'vue'

const props = defineProps({
  columns: {
    type: Array<any>,
    default () {
      return [];
    }
  },
  data: {
    type: Array<any>,
    default () {
      return [];
    }
  }
})
</script>

<style lang="scss" scoped>
table{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #e9e9e9;
}
table th{
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
table td, table th{
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
</style>