<template>
  <comm-my-crud ref="myCrud"/>
</template>

<script>
import commMyCrud from "@/components/my-cruds/commMyCrud.vue";
  export default  window.$crudCommons({

    components:{
    commMyCrud
  },
  watch: {
    '$route':'getData'
  },
  created() {
    this.$nextTick(()=>{
      this.getData();
    })
  },
  methods:{
    getData(){
      let option = null;
      let optionObj = import.meta.glob(`../../cruds/**/**`)["../../cruds"+this.$route.path+".js"];
      if(optionObj){
        optionObj().then(res =>{
          option = res.data
          this.$nextTick(()=>{
            this.$refs.myCrud.init(option);
          })
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
