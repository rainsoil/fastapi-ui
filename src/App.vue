<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  provide() {
    return {
      GetRouteParam: this.GetRouteParam,
    };
  },
  methods: {
    // 获取路由参数
    GetRouteParam(_param, _default) {
      var _defaultNum = "";
      if (_default) _defaultNum = _default;
      let hash = this.$route.hash;
      hash = hash.substr(1, hash.length);
      hash = "?" + hash;
      console.log(this.$route);
      let tabtype = this.getQueryStrings(hash, _param);
      if (null != tabtype) {
        tabtype = tabtype || _defaultNum;
      }
      return tabtype;
    },
    getQueryStrings(url, paraName) {
      const arrObj = url.split("?");
      if (arrObj.length > 1) {
        const arrPara = arrObj[1].split("&");
        let arr;
        for (let i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      } else {
        return "";
      }
    },
  },
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
