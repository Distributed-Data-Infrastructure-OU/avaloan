import Vue from 'vue'

export default function setupFilters() {

  Vue.filter("usd", function (value, avaxPrice) {
    if (!value) return "$0";
    let usd = value * avaxPrice;
    return "$" + usd.toFixed(2);
  });

  Vue.filter("usd-precise", function (value) {
    if (!value) return "$0";
    return "$" + value.toFixed(12);
  });

  Vue.filter("avax", function (value) {
    if (!value) return "0";
    return value.toFixed(2) + " AVAX";
  });

  Vue.filter("full", function (value, avaxPrice) {
    if (!value) return "";
    let usd = value * avaxPrice;
    return value.toFixed(2) + " AVAX ($" + usd.toFixed(2) + ")";
  });

  Vue.filter("units", function (value) {
    if (!value) return "0";
    return value.toFixed(3);
  });

  Vue.filter("percent", function (value) {
    if (!value) return "0%";
    return (value * 100).toFixed(2) + "%";
  });

  Vue.filter("tx", function (value) {
    if (!value) return "";
    return value.substr(0, 6) + "..." + value.substr(value.length - 4);
  });
}
