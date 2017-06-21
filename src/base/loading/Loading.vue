<template>
  <div class="loading">
    <span class="circles-loader"></span>
    <p>{{loadingText}}</p>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: {
      loadingText: {
        type: String,
        default: '加载中...'
      }
    },
    mounted() {},

    methods: {
    }
  }
</script>

<style scoped lang="scss">
  @import "~sass/var";
  @-moz-keyframes circles-loader {
    0% {
      -moz-transform: rotate(-720deg);
      transform: rotate(-720deg);
    }
    50% {
      -moz-transform: rotate(720deg);
      transform: rotate(720deg);
    }
  }
  @-webkit-keyframes circles-loader {
    0% {
      -webkit-transform: rotate(-720deg);
      transform: rotate(-720deg);
    }
    50% {
      -webkit-transform: rotate(720deg);
      transform: rotate(720deg);
    }
  }
  @keyframes circles-loader {
    0% {
      -moz-transform: rotate(-720deg);
      -ms-transform: rotate(-720deg);
      -webkit-transform: rotate(-720deg);
      transform: rotate(-720deg);
    }
    50% {
      -moz-transform: rotate(720deg);
      -ms-transform: rotate(720deg);
      -webkit-transform: rotate(720deg);
      transform: rotate(720deg);
    }
  }
  /* :not(:required) hides this rule from IE9 and below */
  .circles-loader:not(:required) {
    position: relative;
    text-indent: -9999px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: $large-bg;
    border-radius: 100%;
    -moz-animation: circles-loader 3s infinite ease-in-out;
    -webkit-animation: circles-loader 3s infinite ease-in-out;
    animation: circles-loader 3s infinite ease-in-out;
    -moz-transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
  .circles-loader:not(:required)::before {
    background: rgba($mix-color,.6);
    border-radius: 100%;
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    top: 18.75px;
    left: -10.82532px;
  }
  .circles-loader:not(:required)::after {
    background: rgba(#CA1EAD, 0.6);
    border-radius: 100%;
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    top: 18.75px;
    left: 10.82532px;
  }
  .loading{
    border-radius: 20px;
    width: 100px;
    margin: 10px auto;
    background-color: rgba(#000,.3);
    text-align: center;
    padding: 20px 0;
    p{
      margin-top: 25px;
      color: $text-color-l;
    }
  }
</style>
