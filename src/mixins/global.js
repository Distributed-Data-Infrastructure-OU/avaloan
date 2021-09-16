import { mapState } from 'vuex';

export default {
  data() {
    return {
    }
  },
  methods: {
    toUSD(avax) {
      if (this.avaxPrice) {
        return avax * this.avaxPrice;
      }
    }
  },
  computed: {
    ...mapState('prices', {
      avaxPrice: state => state.avaxPrice,
    }),
    isMobile() {
      console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  }
};
