<template>
  <basic-container>
    <h3>表单例子</h3>
    {{ form }}
    <avue-form :option="option"
               v-model="form"
               :upload-before="uploadBefore"
               :upload-after="uploadAfter"></avue-form>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        string: '',
      },
      option: {
        labelWidth: 110,
        column: [
          {
            label: "用户名",
            prop: "username",
            row: true
          }, {
            label: '下拉框',
            prop: 'select2',
            type: 'select',
            dicUrl: 'http://172.16.14.16:10033/sys/link/dict/list',
            res: 'data.data'

          }, {
            label: '字符串图片组',
            prop: 'string',
            dataType: 'string',
            type: 'upload',
            propsHttp: {
              res: 'data'
            },
            tip: '只能上传jpg/png文件，且不超过500kb',
            action: 'http://172.16.14.16:10033/file/upload/1'
          },
          {
            label: "密码",
            prop: "password",
            type: "password",
            row: true
          },
          {
            label: "再次输入密码",
            prop: "passwords",
            type: "password",
            row: true
          },
          {
            label: "申请日期",
            prop: "date",
            type: "date",
            row: true,
            valueFormat :"YYYY-MM-DD",
            format:"YYYY-MM-DD"
          },
          {
            label: "个性签名",
            prop: "textarea",
            type: "textarea",
            minRows: 8,
            row: true
          }
        ]
      }
    }
  },
  methods: {
    uploadBefore(file, done, loading, column) {
      console.log(file, column)
      //如果你想修改file文件,由于上传的file是只读文件，必须复制新的file才可以修改名字，完后赋值到done函数里,如果不修改的话直接写done()即可
    },
    uploadAfter(res, done, loading, column) {
      console.log(res, column)
    }
  }
};
</script>

<style>
</style>
