<template>
  <div class="wrap">
    <input class="ml-2" type="checkbox" name="checkbox" :checked="check" @input="toggle">
    <label for="checkbox">{{lable}}</label>
  </div>
</template>

<script>
  export default {
    name: 'myCheckbox',
    props: {
      lable: String,
      check: {
        default: true,
        type: Boolean
      }
    },
    methods: {
      toggle() {
        this.$emit('toggle')
      }
    }
  }
</script>

<style scoped>
  .wrap {
    display: flex;
    align-items: baseline;
  }

  @media (max-width: 767.98px) {}
</style>