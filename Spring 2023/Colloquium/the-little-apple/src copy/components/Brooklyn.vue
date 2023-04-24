<template>
  <div id="container">
    <div id="highlighted-div" v-if="showTour"></div>
      <div id="tour" ref="tour" v-if="showTour">
        <div v-for="(message, index) in messages" :key="index" v-show="currentMessage === index">
          <h4 ref="h4">{{ message.title }}</h4>
          <h5>{{ message.content }}</h5>
          <button v-if="currentMessage < messages.length - 1" @click="next">Next</button>
          <button v-else @click="showTour = !showTour">Get Started</button>
        </div>
      </div>  
      <div id="insights" ref="insights" v-if="showInsights">
        <span class="close-btn" @click="showInsights = false; currentQuote = Math.floor(Math.random()*19)">&times;</span>
        <div v-for="(quote, index) in quotes" :key="index" v-show="currentQuote === index">
          <p style="text-align:left; font-size: 1.75vh; padding-left: 0px; padding-right: 0px;">{{ quote.content }}</p>
        </div>
      </div>  
      <div id="highlighted-div" v-if="showConfirm"></div>
      <div id="confirm" v-if="showConfirm">
        <img src="@/assets/LittleAppleLogo.png" style="width:35vw;">
        <h2 style="text-align: center; padding-bottom:10vh;">Thank you so much for using the Little Apple to explore the possibilities for urban agriculture within your community. Here are your results:</h2>
        <h2 id="headers2">Locations Added:<br>Open Space Lost:<img src="@/assets/tooltip.png" title="Calculated only considering public land such as parks and recreational open spaces." style="height:1.5vh; width:1.5vh; padding-top:0vh; padding-bottom:0px;"><br>Individuals Served:<img src="@/assets/tooltip.png" title="Calculated based on the total area of each location. One 6x6 raised bed can serve an individual for one year by producing over 100lbs of produce. This calculation also takes into account spatial needs such as a shed." style="height:1.5vh; width:1.5vh; padding-top:0px;"></h2>
        <h2 id="data2">{{ featureCount }}<br>{{ openSpaceLost }}%<br>{{ totalIndSrv }}<br>({{ foodInsSrv }}% food insecure)<img src="@/assets/tooltip.png" title="Food insecurity data was retrieved from Feeding America and assessed by census block utilizing 2020 census data. Calculated using the distance of each lot to areas of food insecurity." style="height:1.5vh; width:1.5vh; padding-top:0vh; padding-bottom:0px;"></h2>
        <p style="padding-bottom:2vh; margin-top:0vh;">Below, you can export your locations as a CSV, start over, or return to your progress.</p>
        <div id="buttons">
          <button :class="{'active': isDownloadCSVSelected}" @click="isDownloadCSVSelected = !isDownloadCSVSelected" style="margin-left: 2vw; margin-right: 2vw;">Export CSV</button>
          <router-link to="/"><button style="margin-left: 2vw; margin-right: 2vw;">Start Over</button></router-link>
          <button @click="confirmChoices" style="margin-left: 2vw; margin-right: 2vw;">Return</button>
        </div>
      </div>
    <div id="map" ref="map">
    </div>
    <div id="controls" ref="controls" @mouseup="showPopup()">
      <router-link to="/"><img src="@/assets/LittleAppleLogo.png"></router-link>
      <div id="results" ref="results">
        <pre><h2 id="headers">Locations Added:<br>Open Space Lost:<img src="@/assets/tooltip.png" title="Calculated only considering public land such as parks and recreational open spaces." style="height:1.5vh; width:1.5vh; padding-top:0vh; padding-bottom:0px;"><br>Individuals Served:<img src="@/assets/tooltip.png" title="Calculated based on the total area of each location. One 6x6 raised bed can serve an individual for one year by producing over 100lbs of produce. This calculation also takes into account spatial needs such as a shed." style="height:1.5vh; width:1.5vh; padding-top:0px;"></h2></pre>
        <h2 id="data">{{ featureCount }}<br>{{ openSpaceLost }}%<br>{{ totalIndSrv }}<br>({{ foodInsSrv }}% food insecure)<img src="@/assets/tooltip.png" title="Food insecurity data was retrieved from Feeding America and assessed by census block utilizing 2020 census data. Calculated using the distance of each lot to areas of food insecurity." style="height:1.5vh; width:1.5vh; padding-top:0vh; padding-bottom:0px;"></h2>
      </div>
      <button ref="confirm" @click="confirmChoices">CONFIRM CHOICES</button>
      <h3>Land Use Category<img src="@/assets/tooltip.png" title="Land type includes open spaces, vacant land, and unlicensed parking lots. These land use types were determined objectively as they are most prepared for structures that support urban agriculture." style="height:1.5vh; width:1.5vh; padding-top:0px;"></h3>
      <div id="buttons">
        <button ref="os" :class="{'active': isOpenSpacesSelected}" @click="isOpenSpacesSelected = !isOpenSpacesSelected" :style="buttonStyle2">Open Spaces</button>
        <button ref="vl" :class="{'active': isVacantLotsSelected}" @click="isVacantLotsSelected = !isVacantLotsSelected" :style="buttonStyle2">Vacant Land</button>
        <button ref="upl" :class="{'active': isUnlicensedParkingLotsSelected}" @click="isUnlicensedParkingLotsSelected = !isUnlicensedParkingLotsSelected" :style="buttonStyle2">Unlicensed Parking Lots</button>
      </div>
      <h3>Total Area</h3>
      <vue-slider v-bind="options" ref="slider" v-model="area" :min="0" :max="774" :tooltip-formatter="'{value} acre(s)'" :clickable="false" :enable-cross="false" :range="true" :style="sliderStyle" :railStyle="dotStyle" :processStyle="railStyle" :tooltipStyle="railStyle"></vue-slider>
      <h3>Daily Sunlight<img src="@/assets/tooltip.png" title="Daily sunlight was calculated utilizing sunlight analysis on 3d models of the city through Grasshopper and Rhino. The analysis was performed for the dates at the beginning of growing season in mid-April to best estimate total sunlight for the entire growing season through Fall." style="height:1.5vh; width:1.5vh; padding-top:0px;"></h3>
      <vue-slider v-bind="options" v-model="sunlight" :min="2" :max="16" :range="true" :tooltip-formatter="'{value} hours'" :clickable="false" :enable-cross="false" :style="sliderStyle" :railStyle="dotStyle" :processStyle="railStyle" :tooltipStyle="railStyle"></vue-slider>
      <h3>Proximity to Highways</h3>
      <vue-slider v-bind="options" v-model="highways" :min="0" :max="3.2" :interval="0.1" :range="true" :tooltip-formatter="'{value} mile(s)'" :clickable="false" :enable-cross="false" :style="sliderStyle" :railStyle="dotStyle" :processStyle="railStyle" :tooltipStyle="railStyle"></vue-slider>
      <h3>Proximity to Food Insecurity<img src="@/assets/tooltip.png" title="Food insecurity data was retrieved from Feeding America and assessed by census block utilizing 2020 census data." style="height:1.5vh; width:1.5vh; padding-top:0px;"></h3>
      <vue-slider v-bind="options" v-model="foodins" :min="0" :max="8.4" :interval="0.1" :range="true" :tooltip-formatter="'{value} mile(s)'" :clickable="false" :enable-cross="false" :style="sliderStyle" :railStyle="dotStyle" :processStyle="railStyle" :tooltipStyle="railStyle"></vue-slider>
      <h3>Proximity to Low Income Households<img src="@/assets/tooltip.png" title="Low income households were defined by the 2020 census and corresponding poverty thresholds." style="height:1.5vh; width:1.5vh; padding-top:0px;"></h3>
      <vue-slider v-bind="options" v-model="lowinc" :min="0" :max="8.4" :interval="0.1" :range="true" :tooltip-formatter="'{value} mile(s)'" :clickable="false" :enable-cross="false" :style="sliderStyle" :railStyle="dotStyle" :processStyle="railStyle" :tooltipStyle="railStyle"></vue-slider>
      <br><button ref="clear" :style="buttonStyle2" @click="clearFilters()">Clear All Filters</button>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import Mapbox from "mapbox-gl";
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import Papa from 'papaparse';

export default {
  name: 'App',
  data() {
    return {
      messages: [
        {
          title: 'Welcome to the Little Apple!',
          content: 'Here are some tools to get started.'
        },
        {
          title: 'Here is your interactive map of Brooklyn',
          content: 'This is where you will see which potential locations fit within your parameters. To filter your locations to a specific area, simply zoom in.'
        },
        {
          title: 'This is the control panel',
          content: 'This is where you can select land use categories...'
        },
        {
          title: 'This is the control panel',
          content: '...and use sliders to set ranges for variables including total area, daily sunlight, and proximity to highways, food insecurity, and low income households.'
        },
        {
          title: 'Here is the results panel',
          content: 'As you define your parameters, this panel will update with the metrics of your chosen locations.'
        },
        {
          title: 'Again, keep an eye on the map!',
          content: 'The map will also update with locations that you can hover over to see more information as you explore.'
        },
        {
          title: 'Finally when you are done, click Confirm Choices',
          content: 'This will give you the opportunity to export your selected locations, including their metrics, as a csv file. Here, you will also have the opportunity to start again from the beginning!'
        },
        {
          title: "Now you're all set!",
          content: 'We hope that the Little Apple can help you empower your community through food.'
        },
      ],
      quotes: [
        {
          content: "In the Portland, ME urban agriculture program, the most important factors when evaluating a new potential site are: Air pollution - Even though they have built on contaminated soil by performing remediation, it's a general rule of thumb that locations farther from highways will be prioritized due to air pollution. 2. Food insecurity/low or mixed income neighborhood - Through the city's Black development grants, individuals from food insecure, low, and mixed income neighborhoods are encouraged to bring urban agriculture into their communities. 3. Size - garden plots are 10 x 15 ft with one or two individuals per plot. The more space, the more individuals that a single location can serve.",
        },
        {
          content: 'In the Washington, D.C. urban agriculture program, the most important factors when evaluating a new potential site are water access and light access. As of today, there are currently 214 urban agriculture locations throughout the D.C. metro area.',
        },
        {
          content: 'In Portland, ME, all developed urban agriculture receive a fence, access to a communal shed with tools, a composting area, and a functioning water system which is managed seasonally by the overseeing staff.',
        },
        {
          content: 'The waitlist for plots within the Portland, ME urban agriculture system is currently 800 individuals long. To promote equity, individuals who demonstrate the most need are moved to the top of the list.',
        },
        {
          content: 'In Portland, ME, urban agriculture locations are currently only being placed within parks. They have come to find that much of the time, the most ideal locations are located directly next to athletic and recreational facilities.',
        },
        {
          content: "You might think that a single plot is not a large enough area to measurably impact someone's access to food, but you can grow more than you think within a 10' x 15' plot. With the help of succession planting customized to your climate data, you can grow up to 100lbs of fresh food a year.",
        },
        {
          content: 'There are two major systems for urban agriculture: community gardens and urban farms. In Portland, ME the focus is primarily on community gardens, while in Washington, D.C the focus is primarily on urban farms. The biggest factors that contribute to whether a location will be better as a community garden or an urban farm are labor (community engagement vs. employment structure), size (urban farms require more land than community gardens), and community preferences (many communities are not open to having outside entities establish urban farms within their limits).',
        },
        {
          content: 'In Portland, ME, individuals participating in the urban agriculture program are encouraged to donate a portion of their crops to local food banks. Every location has a cooler on-site where nonprofits can pick up the donated food for their missions.',
        },
        {
          content: 'One model that has been explored in Portland, ME is a common share model: instead of individual plots, the food is all grown together and the labor/responsibilities is divided among the participating individuals. This has been a particularly good model for people who are new to growing food who want to learn more, or who are new to the area who want to meet more people and grow their sense of community.',
        },
        {
          content: 'In Portland, ME, participating individuals pay for a whole or half garden plot through a yearly fee. If you are unable to afford that, they also have a scholarship and sliding scale. If you are fortuate enough to be able to afford more, you are encouraged to pay more to help subsidize the low income programs. All participants are required to volunteer 6 hrs/season to help maintain garden. This includes flipping the compost, organizing the toolshed, and assisting other gardeners.',
        },
        {
          content: "In Portland, ME, every year a survey is distributed to participants to assess the success of the urban agriculture program. Questions include how much food they were able to grow and how that affected their family's access to food. Overwhelmingly, they have come to find that individuals record that it does allow them and their families to include more vegetables in their diet at a reduced rate.",
        },
        {
          content: 'In Washington, D.C. urban farms function through regular lease structures. "Tenants" are typically respondible for the utilities of their urban farm, however in some cases park land might have water fee subsidies.',
        },
        {
          content: 'Urban farms, by their very nature, require more work on the part of the applicant. This is because of the scale and independent oversight that comes with urban farming. That said, that autonomy also allows urban farms to independently define and support their mission.',
        },
        {
          content: "In Washington, D.C., the majority of urban farms are located on district-owned park land. Because for-profit corporations can't profit on government owned land, they are also majority nonprofit organizations.",
        },
        {
          content: "One of the greatest strengths of Washington, D.C.'s urban agriculture program is its corresponding network of urban agriculture professionals. Many of the urban farmers have been working in the space for over 10 years.",
        },
        {
          content: 'In 2020, the Washington, D.C. urban agriculture department was created to help build resources for urban farms and agriculture. Some of their programs include: an annual grant program, a tax abatement program, the Land Lease Program, and a yearly urban agriculture conference. All of these programs support the overall goal of supporting a diversity of urban farms within Washington, D.C..',
        },
        {
          content: "One key component of making urban agriculture equitable is differentiating locations between those that are being established as part of a trend and those that are being established to address a need. The best way to do this is to utilize community-centric planning when implementing potential locations and programs."
        },
        {
          content: "For the best results, plants need from 6-8 hours of direct sunlight to thrive. If you get less than this, you can still find success with herbs, but other plants will experience significantly lower yields."
        },
        {
          content: "The beginning of the growing season is in early Spring each year. If you are looking to plant from seed, you should be planting between March and April. If you are growing your produce from transplants, you should plant in May. Of course, this differs for late-season plants, and it's best to refer to your agricultural climate map."
        }
      ],
      currentMessage: 0,
      currentQuote: 0,
      buttonImage: require('@/assets/ButtonBG.png'),
      buttonHover: require('@/assets/ButtonHOV.png'),
      accessToken: "pk.eyJ1IjoibGpjMjE3NyIsImEiOiJjbDRvemp0azEwMTd3M2NwOTl2bGk5M3YxIn0.Nyn7KWoueXzgl1mYurECiw",
      mapStyle: "mapbox://styles/ljc2177/clgi4m0yl010s01pps25n40is",
      map: '#map',
      area: [0,774],
      sunlight: [2,16],
      highways: [0,3.2],
      foodins: [0,8.4],
      lowinc: [0,8.4],
      featureCount: 1413,
      openSpaceLost: 100,
      totalIndSrv: 3327500,
      foodInsSrv: 17,
      isOpenSpacesSelected: false,
      isVacantLotsSelected: false,
      isUnlicensedParkingLotsSelected: false,
      showTour: true,
      showConfirm: false,
      showInsights: false,
      isDownloadCSVSelected: false,
      options: {
        dotOptions: [{
          style: {
            'border': '2px solid black',
            'boxShadow': '1px 1px grey',
          },
        },
        {
          style: {
            'border': '2px solid black',
            'boxShadow': '1px 1px grey',
          },
        }],
      }
    };
  },
  components: {
    VueSlider,
  },
  methods: {
    next() {
      this.currentMessage++;
      // update highlightedComponents based on currentMessage
      if (this.currentMessage === 1) {
        const divMap = this.$refs.map;
        divMap.style.zIndex = 10000;
        const divTour = this.$refs.tour;
        divTour.style.height = "21vh";
        divTour.style.left = "-30.15vw";
        divTour.style.top = "-0.25vh";
      } else if (this.currentMessage === 2) {
        const divMap = this.$refs.map;
        divMap.style.zIndex = 2;
        const divCont = this.$refs.controls;
        divCont.style.zIndex = 10000;
        const divTour = this.$refs.tour;
        divTour.style.height = "13vh";
        divTour.style.left = "0vw";
        divTour.style.top = "40vh";
      } else if (this.currentMessage === 3) {
        const divTour = this.$refs.tour;
        divTour.style.height = "17vh";
        divTour.style.top = "60vh";
      } else if (this.currentMessage === 4) {
        const divRes = this.$refs.results;
        divRes.style.backgroundColor = "yellow";
        const divTour = this.$refs.tour;
        divTour.style.height = "15vh";
        divTour.style.top = "13vh";
      } else if (this.currentMessage === 5) {
        const divTour = this.$refs.tour;
        divTour.style.height = "15vh";
        divTour.style.top = "65vh";
        divTour.style.left = "20vw";
        const divRes = this.$refs.results;
        divRes.style.backgroundColor = "#ffffff";
        const divMap = this.$refs.map;
        divMap.style.zIndex = 10000;
      } else if (this.currentMessage === 6) {
        const divCon = this.$refs.confirm;
        divCon.style.backgroundColor = "yellow";
        const divTour = this.$refs.tour;
        divTour.style.height = "24vh";
        divTour.style.top = "25vh";
        divTour.style.left = "0vw";
      } else if (this.currentMessage === 7) {
        const divCon = this.$refs.confirm;
        divCon.style.backgroundColor = "#ffffff";
        const divCont = this.$refs.controls;
        divCont.style.zIndex = 900;
        const divMap = this.$refs.map;
        divMap.style.zIndex = 900;
        const divTour = this.$refs.tour;
        divTour.style.height = "15vh";
        divTour.style.top = "30vh";
      }
    },
  clearFilters() {
      this.area= [0,774];
      this.sunlight= [2,16];
      this.highways= [0,3.2];
      this.foodins= [0,8.4];
      this.lowinc= [0,8.4];
      this.isOpenSpacesSelected= false;
      this.isVacantLotsSelected= false;
      this.isUnlicensedParkingLotsSelected= false;
    },
    confirmChoices() {
    this.showConfirm = !this.showConfirm
    },
    showPopup() {
      const randNum = Math.floor(Math.random()*10)
      if (randNum%4 === 0){
        return this.showInsights=true
      }
    },
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGpjMjE3NyIsImEiOiJjbDRvemp0azEwMTd3M2NwOTl2bGk5M3YxIn0.Nyn7KWoueXzgl1mYurECiw'

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ljc2177/clgt02h5p003w01qmgvtr7ox2',
      minZoom: 11,
      center: [-73.994767, 40.654112],
      maxBounds: [
        [-74.238,40.495], // Southwest coordinates
        [-73.699,40.856] // Northeast coordinates
      ],
    })

    const filterLayers = ['brooklyn-aw5u6h'];

    const filterData = {
      'Acres': this.area,
      'Sun_Hours': this.sunlight,
      'Distance_H': this.highways,
      'Distance_F': this.foodins,
      'Distance_P': this.lowinc,
    };

    // Create filter for potential locations
    const updateFilter = () => {
      const filterExpression = ['all'];

      // add button filters
      const selectedCategories = [];

      if (this.isOpenSpacesSelected) {
        selectedCategories.push('Open Spaces');
      }
      if (this.isVacantLotsSelected) {
        selectedCategories.push('Vacant Land');
      }
      if (this.isUnlicensedParkingLotsSelected) {
        selectedCategories.push('Unlicensed Parking Lots');
      }

      if (selectedCategories.length > 0) {
        const conditions = selectedCategories.map(category => ['==', ['get', 'layer'], category]);
        filterExpression.push(['any', ...conditions]);
      }

      // add slider filters
      for (const [key, value] of Object.entries(filterData)) {
        filterExpression.push(['>=', ['get', key], value[0]], ['<=', ['get', key], value[1]]);
      }

      map.setFilter(filterLayers[0], filterExpression);

      // add filter stats
      const visibleFeatures = map.queryRenderedFeatures({
        layers: filterLayers,
        filter: map.getFilter(filterLayers),
      });

      const totalSpaceLost = visibleFeatures.reduce((acc, feature) => {
        return (acc + feature.properties['%SpaceLost']);
      }, 0);

      const totalIndSrv = visibleFeatures.reduce((acc, feature) => {
        return (acc + feature.properties['IndSrv']);
      }, 0);

      const foodIndSrv = visibleFeatures.reduce((acc, feature) => {
        return (acc + feature.properties['FoodInsSrv']);
      }, 0);
      
      this.featureCount = visibleFeatures.length;
      this.openSpaceLost = Math.floor(totalSpaceLost*100);
      this.totalIndSrv = totalIndSrv;
      this.foodInsSrv = Math.floor((foodIndSrv/totalIndSrv)*100);
    };

    this.$watch('area', () => {
      filterData['Acres'] = this.area;
      updateFilter();
    });

    this.$watch('sunlight', () => {
      filterData['Sun_Hours'] = this.sunlight;
      updateFilter();
    });

    this.$watch('highways', () => {
      filterData['Distance_H'] = this.highways;
      updateFilter();
    });

    this.$watch('foodins', () => {
      filterData['Distance_F'] = this.foodins;
      updateFilter();
    });

    this.$watch('lowinc', () => {
      filterData['Distance_P'] = this.lowinc;
      updateFilter();
    });

    this.$watch('isOpenSpacesSelected', () => {
      updateFilter();
    });

    this.$watch('isVacantLotsSelected', () => {
      updateFilter();
    });

    this.$watch('isUnlicensedParkingLotsSelected', () => {
      updateFilter();
    });

    const downloadCSV = () => {
      const features = map.queryRenderedFeatures({
        layers: ['brooklyn-aw5u6h']
      });
      const fields = ['Borough', 'Block', 'Lot', 'CD', 'ZipCode', 'Address', 'OwnerName', 'HistDist', 'Acres', 'Gov_Iden', 'layer', 'SqFt', 'Sun_Hours', '%SpaceLost', 'IndSrv', 'FloodZone', 'Distance_H', 'Distance_P', 'Distance_T', 'Distance_F', 'ZoningDist', 'FoodInsSrv', '%FoodIns'];
      const csv = Papa.unparse({
        fields: fields,
        data: features.map(feature => feature.properties)
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'BrooklynUrbanAgLocations.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    this.$watch('isDownloadCSVSelected', () => {
      downloadCSV();
      this.isDownloadCSVSelected = !this.isDownloadCSVSelected;
    })
  },
  computed: {
    buttonStyle2() {
      return {
        'background-color': 'transparent',
        'border': 'solid',
        'border-color': '#89f0c3',
        'border-radius': '0.5rem',
        'float': 'left',
        'height': '5vh',
        'width': '7vw',
        'text-align': 'center',
        'padding': '0',
        'color': 'black',
        'margin-left': '0.5vw',
        'font-size': '1.2vh'
      };
    },
    sliderStyle() {
      return {
        'width': '20vw',
        'height': '1vh',
        'padding': '0px',
      };
    },
    dotStyle() {
      return {
        'background-color': 'white',
        'border': '2px solid black',
      };
    },
    railStyle() {
      return {
        'backgroundColor': '#89f0c3',
        'font-family': 'roboto-condensed',
        'color': 'black',
        'border-top-color': '#89f0c3',
      };
    },
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
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
  flex-direction: column;
  align-items: left;
  justify-content: left;
  width: 95vw;
  height: 92vh;
  background-color: none;
  border-radius: 1rem;
  border: 2px solid black;
  box-shadow: 3px 3px grey;
}

#highlighted-div {
  z-index: 9999;
  position: absolute;
  margin-left: -2.5vw;
  margin-top: -4vh;
  width: 100vw;
  height: 100vh;
  background-color: rgb(10,10,10,0.3);
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
}

#tour{
  z-index: 11100;
  position: absolute;
  color: black;
  width: 40vw;
  height: 13vh;
  background-color: #ffffff;
  border: 2px solid black;
  box-shadow: 3px 3px grey;
  margin-top: 0px;
  border-radius: 1rem;
  text-align: center;
  justify-content: center;
  bottom: 45vh;
  margin-left: 30vw;
}

#insights{
  z-index: 21100;
  position: absolute;
  color: black;
  width: 25vw;
  height: 22vh;
  background-color: #89f0c3;
  border: 2px solid black;
  box-shadow: 3px 3px grey;
  border-radius: 1rem;
  text-align: center;
  overflow-y:auto;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 0px;
  padding-right: 0px;
  justify-content: center;
  bottom: 2vh;
  right: 2vw;
}

.close-btn {
        position: absolute;
        color: #000000;
        top: 0vh;
        left: 90%;
        padding: 10px;
        cursor: pointer;
}

#map {
  height: 100%;
  width: 100%;
  transform: translate3d(0,0,0);
  border-radius: 1rem;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

#buttons {
  margin-top: 0px;
}

#controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  position: absolute;
  left: -2px;
  top: -2px;
  width: 27vw;
  height: 92vh;
  background-color: #ffffff;
  border-radius: 1rem;
  border: 2px solid black;
  box-shadow: 3px 0px grey;
  z-index: 900;
}

#results{
  height: 8vw;
  position: relative;
  width: 23vw;
  margin-top: 2vh;
  background-color: #89f0c3;
  border-radius: 1rem;
  color: black;
  border: 2px solid black;
  box-shadow: 3px 3px #808080;
  z-index: 900;
  margin-bottom: 2vh;
}

#headers {
  z-index: 5000;
  position: absolute;
  margin-top: 1vh;
}

#data {
  z-index: 100;
  text-align: right;
  position: relative;
  margin-top: -0.55vh;
  margin-right: 1vw;
}

pre {
  margin-top: 0vh;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: roboto-mono;
}

h2 {
  font-size: 1.1vw;
  font-weight: bold;
  padding-left: 1vw;
  text-align: left;
  font-family: roboto-mono;
}

h3 {
  font-size: 1vw;
  font-weight: bold;
  padding-left: 1vw;
  text-align: left;
  padding-bottom: 0px;
  font-family: roboto-mono;
}

h4 {
  font-size: 1.75vw;
  font-weight: bold;
  font-family: roboto-mono;
  padding-left: 3vw;
  margin-bottom: 2vh;
  padding-right: 3vw;
  margin-top: 2vh;
}

h5 {
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  margin-left: 2rem;
  margin-top: 0vh;
  margin-right: 2rem;
  margin-bottom: 3vh;
  font-family: roboto-mono;
  font-weight: lighter;
  padding-top: 0rem;
}

p {
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  font-family: roboto-mono;
}

button {
  padding: 1vw 1.5vw;
  margin: 0.5vw;
  font-family: roboto-condensed;
  font-size: 1.75vh;
  font-weight: bold;
  background-color: white;
  color: #000000;
  border: 2px solid black;
  box-shadow: 3px 3px grey;
  border-radius: 0.5vw;
  cursor: pointer;
  z-index: 30000;
}

button:hover{
  background-color: lightgrey;
  box-shadow: 3px 3px black;
}

img {
  padding-top: 2rem;
  width: 20vw;
  z-index: 20000;
}

#confirm {
  display: flex;
  position: absolute;
  margin: auto;
  flex-direction: column;
  align-items: center;
  padding:0vw 4vw;
  justify-content: center;
  width: 46vw;
  height: 65vh;
  margin-left: 20vw;
  margin-top: 8vh;
  background-color: #ffffff;
  border-radius: 1rem;
  border: 2px solid black;
  box-shadow: 3px 3px grey;
  z-index: 30000;
}

#headers2 {
  z-index: 5000;
  position: absolute;
  margin-left: -7vw;
  padding-bottom: 1vh;
  padding-top: 2vh;
  text-align: left;
  margin-top: 8vh;
}

#data2 {
  z-index: 100;
  text-align: right;
  position: relative;
  margin-right: -7vw;
  padding-bottom: 1vh;
  padding-top: 2vh;
  text-align: right;
  margin-top: -11.25vh;
}
</style>
