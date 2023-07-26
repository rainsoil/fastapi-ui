<template>
  <basic-container>
    <avue-crud
        v-model="form"
        :option="option"
        :data="data"
        ref="crud"
        @row-save="rowSave"
        @row-update="rowUpdate"
        :permission="permission"
        @row-del="rowDel"
    >
      <template #icon="scope">
        <i :class="scope.row.icon" style="font-size: 24px"></i>
      </template>
      <template #menu="{row}">
        <el-button
            text
            type="primary"
            icon="el-icon-plus"
            @click.stop="handleAdd(row)"
        >增加
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {fetchMenuTree, addObj, putObj, remove} from "@/api/admin/menu";
import {baseUrl} from '@/config/env';
import iconList from "@/config/iconList";
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      // parentId: undefined,
      form: {},
      data: [],
      tenantId: "",
      permission: {},
      option: {
        border: true,
        menuWidth: 250,
        // index: true,
        rowKey: "id",
        rowParentKey: "parentId",
        // defaultExpandAll:true,
        column: [
          {
            label: "菜单名称",
            prop: "name",
            width: 200,
            order: 4,
            span: 24,
            display: true,
            rules: [
              {
                required: true,
                message: "请输入菜单名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "图标",
            prop: "icon",
            type: "icon",
            width: 100,
            order: 5,
            span: 24,
            minRows: 6,
            iconList: iconList,
            display: true
          },
          {
            label: "排序",
            prop: "sort",
            width: 80,
            order: 2,
            display: true,
            type: "number",
            rules: [
              {
                required: true,
                message: "请输入菜单排序",
                trigger: "blur",
              },
            ],
          },
          {
            label: "组件路径",
            prop: "path",
            width: 300,
            order: 3,
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入路由地址",
                trigger: "click",
              },
            ],
          },
          {
            label: "菜单类型",
            prop: "type",
            type: "radio",
            order: 7,
            value: '0',
            dicData: [{
              label: '菜单',
              value: '0',
            }, {
              label: '按钮',
              value: '1',
            }, {
              label: '未知',
              value: '2',
            }]
          },
          {
            label: "路由缓冲",
            prop: "keepAlive",
            type: "radio",
            order: 1,
            hide: true,
            value: '0',
            dicData: [{
              label: '否',
              value: '0',
            }, {
              label: '是',
              value: '1',
            }]
          },
          {
            label: "上级菜单",
            prop: "parentId",
            type: "tree",
            order: 6,
            // dicUrl: baseUrl +"/menu",
            dicData: [],
            hide: true,
            checkStrictly: true,
            props: {
              label: "name",
            },
            rules: [
              {
                required: true,
                message: "请选择上级菜单",
                trigger: "click",
              },
            ],
          },
          {
            label: "权限标识",
            prop: "permission",
            display: false
          },
        ],
      },
    };
  },
  created() {
    this.getList()
    this.tenantId = this.userInfo.tenantId
    if (this.tenantId != 1)
      this.permission = {

        delBtn: false,
        addBtn: false,
        menu: false,
      }
  },
  mounted() {
  },
  methods: {
    dealTreeData(treeData) {
      const data = treeData.map((item) => ({
        ...item,
        value: item.id,
        children: (item.children && item.children.length)
            ? this.dealTreeData(item.children)
            : null,
      }));
      return data;
    },
    getList() {
      fetchMenuTree().then((res) => {
        const childrenVal = this.dealTreeData(res.data.data)
        this.data = childrenVal;
        const treeOption = this.findObject(this.option.column, 'parentId')
        treeOption.dicData = [{value: -1, parentId: -1, id: -1, name: '根菜单', children: childrenVal}]
      });
    },
    rowDel(row, index, done) {
      // done(row);
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.getList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
    },
    rowSave(row, done) {
      addObj(row).then((res) => {
            done();
            this.getList();
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          },
          (error) => {
            window.console.log(error);
          }
      );
    },
    rowUpdate(row, index, done) {
      row['menuId'] = row.id
      putObj(row).then((res) => {
        done();
        this.getList();
        this.$message({
          type: "success",
          message: "保存成功!",
        });
      })
    },
    handleAdd(row) {
      // this.$refs.crud.data.parentId = row.parentId;
      this.$refs.crud.option.column.filter((item) => {
        if (item.prop === "parentId") {
          item.value = row.id;
          item.addDisabled = true;
        }
      });
      this.$refs.crud.rowAdd();
    },
  },
};
</script>

<style lang="scss" scoped>
.avue-icon{
  display: block;
}
</style>
