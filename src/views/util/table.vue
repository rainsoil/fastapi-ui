<template>
  <basic-container>
    <h3>表格例子</h3>
    <avue-crud :option="option"
               @on-load="getList"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @rowAdd="rowAdd"
               @rowEdit="rowEdit"
               :data="data"></avue-crud>
  </basic-container>
</template>

<script>
import {baseUrl} from '@/config/env';

export default {
  data() {
    return {
      data: [],
      datas: [
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          dict: 0,
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },

        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        }
      ],
      option: {
        column: [
          {
            "primaryKey": true,
            "jdbcType": null,
            "classify": "0",
            "label": "id",
            "prop": "id",
            "width": null,
            "overHidden": false,
            "search": false,
            "searchOrder": null,
            // "display": true,
            "disabled": false,
            "addDisabled": false,
            "editDisabled": false,
            "viewDisabled": false,
            "addDisplay": true,
            "editDisplay": false,
            "viewDisplay": false,
            "type": "input",
            "dicUrl": null,
            "dictType": null,
            "res": "data.data",
            "listType": null,
            "format": null,
            "valueFormat": null,
            "action": null,
            "propsHttp": {"res": "data"},
            "hide": true
          },
          {
            label: "用户名",
            prop: "username",
            span: 14,
            row: true,
            addDisplay: false
          },
          {
            label: "姓名",
            prop: "name",
            span: 14,
            row: true
          },
          {
            label: "字典值",
            prop: "dict",
            span: 14,
            type: 'select',
            props: {
              label: 'label',
              value: 'value'
            },
            // "formatter": "${(val,value,label)=>{return value }}",
            dicData: [{
              label: '字典1',
              value: 0
            }, {
              label: '字典2',
              value: 1
            }],

            // dicUrl: baseUrl + "u/goods/dict/list"
          },
          {
            label: "密码",
            prop: "password",
            type: "password",
            span: 14,
            row: true
          },
          {
            label: "确认密码",
            prop: "newpassword",
            type: "password",
            hide: true,
            span: 14,
            row: true
          },
          {
            label: "申请日期",
            prop: "date",
            type: "date",
            span: 14,
            row: true
          },
          {
            label: "个性签名",
            prop: "textarea",
            type: "textarea",
            minRows: 8,
            span: 24,
            overHidden: true,
            row: true
          }
        ]
      }
    };
  }, created() {


    this.setProps(1);
    console.log("1111111111111")

  }, methods: {

    setProps(type) {
      this.option.column.forEach(c => {
        if (c.type == "select") {
          c.props = {}
          if (type == 1) {
            c.props = {
              label: 'label1',
              value: 'value'
            }
          } else {
            c.props = {
              label: 'label',
              value: 'value'
            }
          }

        }

        console.log(c)
      })
    },
    getList() {
      this.data = this.datas;
    }, rowSave(row, done, loading) {

      console.log(prop)
      console.log(done)
      console.log(row)
      console.log(loading)
      this.$message.success('新增成功')

    }
    ,
    rowUpdate(row, index, done, loading) {
      this.$message.success('新增成功')
    }, rowAdd() {
      console.log("rowAdd")
      this.setProps(0);
    }, rowEdit(row, index) {
      this.setProps(0);
    }

  }
};
</script>

<style>
</style>
