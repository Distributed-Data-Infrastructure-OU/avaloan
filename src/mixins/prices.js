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
    })
  }
};
