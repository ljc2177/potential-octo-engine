<template>
  <div id="container">
    <img src="@/assets/LittleAppleLogo.png">
    <h2 v-if="showHome">{{ gameDescription1 }}</h2>
    <p v-if="showHome">{{ gameDescription2 }}</p>
    <p v-if="showHome">{{ gameDescription3 }}</p>
    <button v-if="showHome" @click="chooseBorough">BEGIN</button>
    <p v-if="showBoroughs">{{ chooseBoroughs }}</p>
    <router-link to="/bronx/"><button v-if="showBoroughs">Bronx</button></router-link>
    <router-link to="/brooklyn/"><button v-if="showBoroughs">Brooklyn</button></router-link>
    <router-link to="/manhattan/"><button v-if="showBoroughs">Manhattan</button></router-link>
    <router-link to="/queens/"><button v-if="showBoroughs">Queens</button></router-link>
    <router-link to="/statenisland/"><button v-if="showBoroughs">Staten Island</button></router-link>
</div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      showHome: true,
      showBoroughs: false,
      gameTitle: "The Little Apple",
      gameDescription1: "Welcome to the Little Apple, where you can explore the opportunities for urban agriculture within the Big Apple!",
      gameDescription2: "One of the biggest setbacks to urban agriculture is land availability. Here, you have the power to help expand New York City's network of community gardens and urban farms by choosing their locations. To support your choices, we are providing you with all the data you need, including land use type, total area, average sunlight, and proximity to highways and areas with high food insecurity.",
      gameDescription3: "Discover what the possibilities are for your community, and how to bring them to life.",
      chooseBoroughs: "What greater community are you a member of?",
      buttonImage: require('@/assets/ButtonBG.png'),
      buttonHover: require('@/assets/ButtonHOV.png'),
      bgImage: require('@/assets/GameGradient.png'),
    };
  },
  methods: {
    chooseBorough() {
      this.showHome = !this.showHome
      this.showBoroughs = !this.showBoroughs
    },
  },
}
</script>

<style scoped>
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

#container {
  display: flex;
  position: absolute;
  margin: auto;
  flex-direction: column;
  align-items: center;
  color: black;
  justify-content: center;
  width: 50vw;
  height: 80vh;
  background-color: white;
  border-radius: 1rem;
  border: 2px solid black;
  box-shadow: 3px 3px grey;
}

h1 {
  font-size: 3vw;
  margin-bottom: 1rem;
  font-family: roboto-mono;
}

h2 {
  font-size: 1.25vw;
  margin-bottom: 1rem;
  text-align: center;
  font-family: roboto-mono;
  margin-left: 3.5rem;
  margin-right: 3.5rem;
}

p {
  font-size: 1vw;
  margin-bottom: 1rem;
  text-align: center;
  margin-left: 3.5rem;
  margin-right: 3.5rem;
  font-family: roboto-mono;
}

button {
  padding: 1vw 1.5vw;
  margin: 0.5vw;
  font-family: roboto-condensed;
  font-size: 2vh;
  font-weight: bold;
  background-color: white;
  color: #000000;
  border: 2px solid black;
  box-shadow: 3px 3px grey;
  border-radius: 0.5vw;
  cursor: pointer;
}

button:hover{
  background-color: lightgrey;
  box-shadow: 3px 3px black;
}

img {
  width: 40vw;
}
</style>
