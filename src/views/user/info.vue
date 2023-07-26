<template>
  <div class="user-info">
    <el-row :span="24">
      <el-col :span="8">
        <basic-container>
          <div class="user-info__content">
            <div class="user-info__detail-desc">
              <el-descriptions
                  column="1" border title="用户信息">
                <el-descriptions-item label-class-name="labelClass" label="租户名称">{{ form.name }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="labelClass" label="统一社会信用代码">{{ form.uniscid }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="labelClass" label="法定代表人">{{ form.fzr }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="labelClass" label="经营地址">{{ form.addr }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="labelClass" label="邮箱">{{ form.email }}</el-descriptions-item>
              </el-descriptions>


              <!--              <p>·<span>{{form.name}}</span></p>-->
              <!--              <p>·<span>{{form.uniscid}}</span></p>-->
              <!--              <p>·<span>{{form.fzr}}</span></p>-->
              <!--              <p>·<span>{{form.addr}}</span></p>-->
              <!--              <p>·<span>{{form.email}}</span></p>-->
              <!--              <p><i class="el-icon-location-information"></i><span>{{form.dz}}</span></p>-->
            </div>
            <div class="user-info__divider"></div>
            <h4>标签</h4>
            <div class="user-info__tags">
              <el-tag effect="plain"
                      v-for="(tag,index) in tags"
                      :key="index">
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </basic-container>
      </el-col>
      <el-col :span="16">
        <basic-container>
          <el-tabs v-model="activeName">
            <el-tab-pane label="个人信息"
                         :name="0">
              <el-form :model="form" :rules="rules" ref="form" label-width="130px">
                <!--                <el-form-item label="用户名">-->
                <!--                  <el-input v-model="form.username"></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item prop="name" label="租户名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="uniscid" label="统一社会信用代码">
                  <el-input v-model="form.uniscid"></el-input>
                </el-form-item>
                <el-form-item prop="fzr" label="法定代表人	">
                  <el-input v-model="form.fzr"></el-input>
                </el-form-item>
                <el-form-item prop="addr" label="经营地址">
                  <el-input v-model="form.addr"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item prop="businessType" label="经营类型">
                  <el-select style="width: 100%;" v-model="form.businessType" class="m-2">
                    <el-option
                        v-for="item in [{label:'企业',value:'0'},{label:'个人',value:'1'}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSubmit">确认</el-button>
                  <el-button @click="$router.go(-1)">取消</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码"
                         :name="1">
              <el-form label-width="110px">
                <el-form-item label="原密码"
                              prop="oldpassword">
                  <el-input type="password"
                            v-model="form.password"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码"
                              prop="newpassword">
                  <el-input type="password"
                            v-model="form.newpassword"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码"
                              prop="newpasswords">
                  <el-input type="password"
                            v-model="form.newpasswords"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">确认</el-button>
                  <el-button>重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </basic-container>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {fetchInfo, saveInfo} from "@/api/sys/userInfo";

export default {
  data() {
    function isEmail (s) {
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
    }
    let validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    return {
      activeName: 0,
      tags: [],
      form: {},
      rules: {
        name: [
          {required: true, message: '请输入租户名称', trigger: 'blur'}
        ],
        uniscid: [
          {required: true, message: '请输入统一社会信用代码', trigger: 'blur'},
          {min:18,max:18,message: "请输入正确的统一社会信用代码", trigger: "blur"}
        ],
        fzr: [
          {required: true, message: '请输入法定代表人', trigger: 'blur'}
        ],
        addr: [
          {required: true, message: '请输入经营地址', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur',},
          {message:"请输入正确的邮箱",validator: validateEmail,trigger: 'blur'}
        ],
        businessType:[
          {required: true, message: '请输选择经营类型', trigger: 'change'}
        ]
      }
    };
  },
  created() {
    this.getInfo()
  },
  methods: {

    getInfo() {
      const tenantId = JSON.parse(localStorage.getItem("userInfo")).tenantId
      fetchInfo(tenantId).then(res => {
        console.log(res.data.data)
        this.form = res.data.data
        if (res.data.data.businessScope.length != 0) {
          this.tags = res.data.data.businessScope.split(",")
        }
      })
    },
    handleSubmit() {
      // this.$message({
      //   message: this.form,
      //   type: "success"
      // });
      this.$refs.form.validate(valid=>{
        if(valid){
          saveInfo(this.form).then(res => {
            // console.log(res)
            this.$message.success("保存成功")
          })
        }else {
          return
        }
      })

    },
    handleChange(item) {
      this.type = item.prop;
    }
  }
};
</script>

<style lang="scss">
.user-info {
  .avue-tabs {
    padding: 0 10px;
  }

  .el-tabs__content {
    padding: 20px 0;
  }

  &__img {
    display: block;
    margin: 0 auto;
    border-radius: 100%;
    width: 100px;
    height: 100px;
  }

  &__name {
    text-align: center;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 0;
    margin-top: 10px;
  }

  &__setting {
    margin-bottom: 12px;
    display: block;
    font-size: 12px;
    color: #409eff;
    text-align: center;
  }

  &__desc {
    text-align: center;
    width: 200px;
    margin: 0 auto;
  }

  &__detail-desc {
    margin-top: 50px;
    font-size: 14px;

    p {
      margin-bottom: 10px;
    }

    span {
      margin-left: 10px;
    }
  }

  &__divider {
    border-top: 1px dashed #e8e8e8;
    display: block;
    height: 0;
    width: 100%;
    margin: 24px 0;
    clear: both;
  }

  &__tags {
    .el-tag {
      margin: 0 5px 5px 0;
    }
  }
}

.labelClass {
  width: 150px;
}
</style>
