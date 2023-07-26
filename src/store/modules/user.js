import { setToken, removeToken } from 'utils/auth'
import { setStore, getStore,clearStore } from 'utils/store'
import { encryption, deepClone } from 'utils/util'
import { loginByUsername, getUserInfo, getMenu, getTopMenu, logout, refeshToken } from '@/api/user'
import { formatPath } from '@/router/avue-router'

const user = {
  state: {
    userInfo: {},
    permission: {},
    roles: [],
    menuId: {},
    menu: getStore({ name: 'menu' }) || [],
    menuAll: getStore({ name: 'menuAll' }) || [],
    token: getStore({ name: 'token' }) || '',
  },
  actions: {
    //根据用户名登录
    // LoginByUsername ({ commit }, userInfo = {}) {
    //   const user = encryption({
    //     data: userInfo,
    //     type: 'Aes',
    //     key: 'avue',
    //     param: ['useranme', 'password']
    //   });

    //   return new Promise((resolve) => {
    //     loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then(res => {
    //       const data = res.data.data;
    //       commit('SET_TOKEN', data);
    //       commit('DEL_ALL_TAG', []);
    //       commit('CLEAR_LOCK');
    //       resolve();
    //     })
    //   })
    // },
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.username, userInfo.password).then(res => {
          // window.localStorage.setItem('userInfo',JSON.stringify(res.data.data.loginUser))
          commit('SET_TOKEN', res.access_token);
          // commit('SET_REFRESH_TOKEN', res.access_token);
          // return;
          commit('DEL_ALL_TAG', []);
          commit('CLEAR_LOCK');
          resolve();
        })
      })
    },
    //根据手机号登录
    LoginByPhone({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then(res => {
          const data = res.data.data;
          commit('SET_TOKEN', data.accessToken);
          commit('DEL_ALL_TAG', []);
          commit('CLEAR_LOCK');
          resolve();
        })
      })
    },
    GetUserInfo({ commit },) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {

          const data = res.data.data;

          commit('SET_USERIFNO', data.sysUser);
          console.log("GetUserInfo",data.sysUser)
          commit('SET_ROLES', data.roles);
          commit('SET_PERMISSION', data.permissions)
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //刷新token
    RefeshToken({ state, commit }) {
      return new Promise((resolve, reject) => {
        refeshToken(state.refeshToken).then(res => {
          const data = res.data.data;
          commit('SET_TOKEN', data);
          resolve(data);
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {

        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_MENUALL_NULL', []);
          commit('SET_MENUALL', []);
          commit('SET_MENU', [])
          commit('SET_ROLES', [])
          commit('DEL_ALL_TAG', []);
          commit('CLEAR_LOCK');
          clearStore();

          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //注销session
    FedLogOut({ commit }) {
      return new Promise(resolve => {

        commit('SET_TOKEN', '')
        commit('SET_MENUALL_NULL', []);
        commit('SET_MENU', [])
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG', []);
        commit('CLEAR_LOCK');
        clearStore()
        removeToken()
        resolve()
      })
    },
    GetTopMenu() {
      return new Promise(resolve => {
        getTopMenu().then((res) => {
          const data = res.data.data || []
          resolve(data)
        })
      })
    },
    //获取系统菜单
    GetMenu({ commit }) {
      return new Promise(resolve => {
        getMenu().then((res) => {
          const data = res.data.data
            // console.log(data)
            let menu = deepClone(data);
            menu.forEach(ele => formatPath(ele, true));
            commit('SET_MENUALL', menu)
            commit('SET_MENU', menu)
            resolve(menu)
        })
      })
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token;
      setStore({ name: 'token', content: state.token, type:true })
    },
    SET_MENUID(state, menuId) {
      state.menuId = menuId;
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_MENUALL: (state, menuAll) => {
      let menu = state.menuAll;
      menuAll.forEach(ele => {
        let index = menu.findIndex(item => item.path == ele.path)
        if (index == -1) {
          menu.push(ele);
        } else {
          menu[index] = ele;
        }
      })
      state.menuAll = menu
      setStore({ name: 'menuAll', content: state.menuAll, type:true })
    },
    SET_MENUALL_NULL: (state) => {
      state.menuAll = []
      setStore({ name: 'menuAll', content: state.menuAll, type:true})
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({ name: 'menu', content: state.menu, type:true })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = {};
      permission.forEach(ele => {
        state.permission[ele] = true;
      });
    }
  }

}
export default user
