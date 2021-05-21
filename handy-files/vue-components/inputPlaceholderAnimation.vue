<template>
  <div class="w-100 wrap" :style="{color: color}">
    <div class="m-lab" :style="{fontSize: ifFocus? labBSize + 'px' : labFSize + 'px', top: ifFocus? -labBSize + 'px' : labFSize - 10 + 'px' }">
      {{placeholder}}
    </div>
    <input @focus="ifFocus = true" :style="{borderBottom: `solid ${color} 2px`, color: color}" @blur="checkFocus"
      :value="modelValue" @input="emitText" :required="required" :type="type" :pattern="pattern" :minlength="minlength"
      :maxlength="maxlength">
  </div>
</template>

<script>
  export default {
    name: 'aInput',
    components: {},
    props: {
      labFSize: {
        type: Number,
        default: 23
      },
      labBSize: {
        type: Number,
        default: 18
      },
      modelValue: String,
      placeholder: String,
      color: {
        type: String,
        default: 'rgb(22, 22, 22)'
      },
      type: {
        type: String,
        default: 'text'
      },
      required: {
        type: Boolean,
        default: true
      },
      maxlength: String,
      minlength: String,
      pattern: String,
    },
    data() {
      return {
        ifFocus: false,
        text: ""
      }
    },
    methods: {
      checkFocus() {
        if (!this.text) {
          this.ifFocus = false
        }
      },
      emitText(e) {
        this.text = e.target.value;
        this.$emit('update:modelValue', e.target.value);
      }
    },
  }
</script>

<style scoped>
  .wrap {
    position: relative;
  }

  input {
    width: 100%;
    padding: 5px 5px;
    outline: none;
    border: none;
    background-color: rgba(255, 255, 255, 0);
    font-size: 25px;
  }

  .m-lab {
    position: absolute;
    top: 21%;
    transition: .2s;
    pointer-events: none;
  }



  @media (max-width: 767.98px) {
  
  }
</style>