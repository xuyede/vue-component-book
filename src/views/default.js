// src/views/default-code.js
const code =
`<template>
    <div>
        <input v-model="message">
        {{ message }}
    </div>
</template>
<script>
    export default {
        data () {
            return {
                message: 'asd'
            }
        }
    }
</script>`;

export default code;