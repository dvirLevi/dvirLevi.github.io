<template>
  <div class="" @click.stop="$emit('customEvent')">
    <router-link v-if="!type" tag="button" :to="link">{{text}}</router-link>
    <button v-else :type="type">{{text}}</button>
  </div>
</template>

<script>
  export default {
    name: 'ButtonLink',
    props: {
      link: String,
      text: String,
      type: {
        default: "",
        type: String
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button {
    border: none;
    background-color: var(--main-color);
    /* color: #ffffff; */
    padding: 10px;
    outline: none;
    /* margin: 5px; */
    /* margin-top: 20px; */
    font-weight: 400;
  }

  button:hover {
    background-color: #8c8c8c;
  }


  @media (max-width: 767.98px) {}
</style>