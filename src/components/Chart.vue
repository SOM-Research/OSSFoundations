<template>
  <apexchart
    ref="foundationsChart"
    height="320"
    type="bar"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  name: "Chart",
  props: ["chartData"],
  data() {
    return {
      //Make the chart
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "International Scope",
            "Independent",
            "Transparent",
            "Software Product Supporter",
          ],
        },
        colors: ["#5799C7", "#FF9F4A"],
      },
      series: [
        {
          name: "Selected",
          data: [
            this.chartData.rqNatureInterY,
            this.chartData.rqNatureIndepY,
            this.chartData.rqNatureOpenY,
            this.chartData.rqSDY,
          ],
        },
        {
          name: "Unselected",
          data: [
            this.chartData.rqNatureInterN,
            this.chartData.rqNatureIndepN,
            this.chartData.rqNatureOpenN,
            this.chartData.rqSDN,
          ],
        },
      ],
    };
  },

  methods: {},

  watch: {
    chartData: {
      deep: true,
      handler() {
        this.series = [
          {
            name: "Selected",
            data: [
              this.chartData.rqNatureInterY,
              this.chartData.rqNatureIndepY,
              this.chartData.rqNatureOpenY,
              this.chartData.rqSDY,
            ],
          },
          {
            name: "Unselected",
            data: [
              this.chartData.rqNatureInterN,
              this.chartData.rqNatureIndepN,
              this.chartData.rqNatureOpenN,
              this.chartData.rqSDN,
            ],
          },
        ];
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
