<template>
  <div id="app">
    <SnakeGame />
  </div>
</template>

<script>
import SnakeGame from './components/SnakeGame.vue';

export default {
  name: 'App',
  components: {
    SnakeGame
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
