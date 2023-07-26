<template>
  <basic-container>
    <avue-crud :data="data" :option="option"  v-model:page="page"></avue-crud>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      page: {
        total: 2,
        currentPage: 1,
        pageSize: 10
      },
      data: [
        {
          username: "asdasd",
          tel: "13123456789",
          name: "张三",
          type: "监管用户",
          status: "有效",
          time: "2022-10-13 15.53",
        },
        {
          username: "asdasd",
          tel: "13123456789",
          name: "李四",
          type: "监管用户",
          status: "有效",
          time: "2022-10-13 15.53",
        },
      ],
      option: {
        index: true,
        indexLabel: "序号",
        border: true,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "用户名",
            prop: "username",
            search: true,
          },
          {
            label: "手机号",
            prop: "tel",
            search: true,
          },
          {
            label: "姓名",
            prop: "name",
            search: true,
          },
          {
            label: "用户类型",
            prop: "type",
            search:true,
          },
          {
            label: "状态",
            prop: "status",
            search:true,
          },
          {
            label: "创建时间",
            prop: "time",
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
