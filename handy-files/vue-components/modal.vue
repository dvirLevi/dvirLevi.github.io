<template>
  <div id="myModal" class="modal" @click.stop="$emit('customEvent')">
    <!-- Modal content -->
    <div class="modal-con img-cover" :style="myStyle">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  // @ is an alias to /src


  export default {
    name: 'Modal',
    props: {
      myStyle: Object
    }
  }
</script>

<style scoped>
  /* The Modal (background) */
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    /* Stay in place */
    z-index: 1001;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  /* Modal Content */
  .modal-con {
    background-color: #fefefe;
    margin: auto;
    width: 40%;
    border-radius: 20px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    opacity: 1;
    transform: translateY(0px);
    animation-name: op;
    animation-duration: .3s;
  }



  @keyframes op {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }

    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  .x {
    position: absolute;
    left: 0;
    top: 0;
    margin: 20px 0px 0px 20px;
    color: #000;
  }


  @media (max-width: 767.98px) {

    .modal-con {
      width: 77%;
    }

  }
</style>