<template>
  <p>
    <audio ref="audio" loop src="../audio/typewriter.mp3"></audio>
    {{typeText}} <span></span>
  </p>
</template>

<script>
  // @ is an alias to /src
  // import aInput from '@/components/aInput.vue'

  export default {
    name: 'textTyping',
    props: {
      text: String,
      speed: {
        type: Number,
        default: 60
      }
    },
    data() {
      return {
        setInterval: null,
        typeText: "",
        textIndex: 0
      }
    },
    mounted() {
      this.$refs.audio.play();
      this.setInterval = setInterval(() => {
        this.typing()
      }, this.speed)
    },
    methods: {
      typing() {
        this.typeText += this.text[this.textIndex];
        if (this.textIndex === this.text.length - 1) {
          clearInterval(this.setInterval);
          this.$refs.audio.pause();
          this.$emit('end-typing');
        }
        this.textIndex++;
      }
    }
  }
</script>

<style scoped>
  span {
    border-right: 2px solid;
    animation: caret 1s steps(1) infinite;
  }

  @keyframes caret {
    50% {
      border-color: transparent;
    }
  }

  @media (max-width: 767.98px) {}
</style>