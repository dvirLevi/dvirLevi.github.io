<template>
  <div class="row" :class="seconds === 0? 'transparent-color':'main-color'">
    <div class="col">
      <h2 class="f-center text-center"><i class="las la-hourglass-half"></i>
        <div>{{seconds}}</div> : <div>{{minutes}}</div>
      </h2>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: "timer",
    data() {
      return {
        totalSeconds: 0,
        seconds: 0,
        minutes: 0,
      };
    },
    mounted() {
      setInterval(this.setTime, 1000);
    },
    methods: {
      setTime() {
        ++this.totalSeconds;
        this.seconds = this.pad(this.totalSeconds % 60);
        this.minutes = this.pad(parseInt(this.totalSeconds / 60));
      },
      pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
      }
    }
  };
</script>

<style scoped>
  .transparent-color {
    color: transparent;
  }

  h2 {
    font-weight: 400;
    font-size: 60px;
  }

  h2 div {
    width: 80px;
  }

  @media (max-width: 767.98px) {
    h2 {
      font-size: 40px;
    }

    h2 div {
      width: 45px;
    }
  }
</style>