import { mapState } from 'vuex';

export default {
  data() {
    return {
    }
  },
  methods: {

  },
  computed: {
    ...mapState('prices', {
      avaxPrice: state => state.avaxPrice,
    })
  }
};
