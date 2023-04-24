<template>
<div id="app" :style="bgStyle">
  <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      bgImage: require('@/assets/CityGardenBG.png'),
    };
  },
  computed: {
    bgStyle() {
      return {
        'background-image': `url(${this.bgImage})`,
        'background-size': 'cover',
        'background-position': 'center',
      };
    },
  },
}
</script>

<style>
@font-face {
    font-family: roboto;
    src: url('~@/assets/fonts/Roboto-Regular.ttf');
}

@font-face {
    font-family: roboto-mono;
    src: url('~@/assets/fonts/RobotoMono-Regular.ttf');
}

@font-face {
    font-family: roboto-condensed;
    src: url('~@/assets/fonts/Roboto-Condensed.ttf');
}

#app {
  display: flex;
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #add8e6;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
