<template>
  <div class="avue-logo">
    <transition name="fade">
      <span v-if="getScreen(isCollapse)"
            class="avue-logo_subtitle"
            key="0">
        {{$t('wel.logo')}}
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="getScreen(!isCollapse)">
        <span class="avue-logo_title" style="font-size: 14px"
              key="1">{{$t('wel.indexTitle')}} </span>
      </template>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "logo",
  data () {
    return {};
  },
  created () { },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  methods: {}
};
</script>
