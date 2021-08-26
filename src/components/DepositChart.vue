<script>
  import Chart from 'chart.js'
  import { generateChart } from 'vue-chartjs'

  Chart.defaults.LineWithLine = Chart.defaults.line;
  Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
        var activePoint = this.chart.tooltip._active[0],
        ctx = this.chart.ctx,
        x = activePoint.tooltipPosition().x,
        y = activePoint.tooltipPosition().y,
        topY = this.chart.scales['y-axis-0'].top,
        bottomY = this.chart.scales['y-axis-0'].bottom;

         // draw line
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = 1;
         ctx.strokeStyle = '#b9b7ff';
         ctx.stroke();

        // draw point
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.strokeStyle = '#6b70ed';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        ctx.fill();   


         ctx.restore();
      }
   }
  })

  const CustomLine = generateChart('custom-line', 'LineWithLine')
  export default {
    name: 'DepositChart',
    extends: CustomLine,
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
          elements: {
            point:{
              radius: 0
            }
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
                zeroLineWidth: 0.5,
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
            intersect: false, 
            mode: "index",
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

