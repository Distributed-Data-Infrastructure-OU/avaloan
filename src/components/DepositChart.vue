<script>
import { Line } from 'vue-chartjs'

  export default {
    name: 'DepositChart',
    extends: Line,
    props: {
      items: {
        type: Array,
        default: []
      },
      height: null,
      width: null,
    },
    data() {
      return {
        maxY: 0,
        minX: 0,
        maxX: 0,
        gradient: null
      }
    },
    mounted () {
      this.renderChart(this.data, this.options)
    },
    computed: {
      values() {
        if (this.items == null || this.items.length == 0) {
          return [];
        }
        let maximumY = 0;

        let currentDeposit = 0;

        let dataPoints = this.items.slice().reverse().map(
          (e) => {
            let value = e.type == "Deposit" ? e.value : -e.value;
            currentDeposit += value;

            if (currentDeposit > maximumY) maximumY = currentDeposit;

            return {
              x: e.time.getTime(),
              y: currentDeposit
            }
          }
        );

        dataPoints.push(
          {
            x: Date.now(),
            y: dataPoints.slice(-1)[0].y
          }
        )

        this.maxY = maximumY;
        this.minX = dataPoints[0].x;
        this.maxX = dataPoints.slice(-1)[0].x;

        return dataPoints;
      },
      data() {
        return {
          datasets: [
            {
              fill: false,
              steppedLine: 'before',
              data: this.values,
              borderColor: (context) => this.borderColor(context),
              borderWidth: 4
            }
          ]
        };
      },
      options() {
        console.log('updating options')
        return {
          aspectRatio: 4, 
          height: null,
          width: null,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false,
              type: 'time',
              gridLines: {
                  drawOnChartArea: false
              },
              ticks: {
                display: false,
                beginAtZero: false,
                min: this.minX - (this.maxX - this.minX) / 50,
                max: this.maxX + (this.maxX - this.minX) / 50
              }
            }],
            yAxes: [{
              gridLines: {
                borderDash: [8, 4],
                drawOnChartArea: true,
                tickMarkLength: 0,
                drawBorder: false,
              },
              ticks: {
                maxTicksLimit: 2,
                min: 0,
                max: this.maxY + this.maxY/20,
                fontFamily: 'Montserrat',
                padding: 10,
              }
            }]
          } ,
          tooltips: {
            backgroundColor: '#6b70ed',
            titleFontFamily: 'Montserrat',
            bodyFontFamily: 'Montserrat',
            displayColors: false,
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': ';
                }
                label += (Math.round(tooltipItem.yLabel * 100) / 100).toLocaleString('en-US');
                return label + ' AVAX';
              }
            }
          }   
        }
      }
    },
    watch: {
      values() {
        this.renderChart(this.data, this.options);
      },
      options() {
        this.renderChart(this.data, this.options);
      }
    },
    methods: {
      getGradient(ctx, chartArea) {
        if (this.gradient === null) {

          let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
          gradient.addColorStop(0.5, 'rgba(255, 216, 177, 0.8)');
          gradient.addColorStop(1, 'rgba(0, 128, 0, 0.6)');

          return gradient;
        }
      },
      borderColor(context) {
        const chart = context.chart;
        const {ctx, chartArea} = chart;

        if (!chartArea) {
          // This case happens on initial chart load
          return null;
        }

        return this.getGradient(ctx, chartArea);
      }
    }
  }
</script>

<style lang="scss" scoped>
canvas {
  width: 100% !important;
  height: unset !important;
}
</style>

