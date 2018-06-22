export const SET_PAGE_SCROLL_POSITION = 'SET_PAGE_SCROLL_POSITION';

export const state = () => {
    return {
        // 保存登录信息
        userInfo: {},
        isreload: true,
        // 页面切换显示loading
        isLoading: false
    };
};

export const mutations = {
    // 设置登录用户信息
    SETUSERINFO (state, userInfo) {
        state.userInfo = {
          username: userInfo.data.username, // 用户名  （需要缓存）
          pwd: userInfo.data.pwd,
          dateLogin: userInfo.data.dateLogin, // 登陆日期
          ipLogin: userInfo.data.ipLogin, // 登陆的id
          realname: userInfo.data.realname, // 真实姓名
          mobile: userInfo.data.mobile, // 手机号
          isLock: userInfo.data.isLock, // 是否锁定
          type: userInfo.data.type, // 用户类型 0管理员 1：医生
          defaultVisitTempleId: userInfo.data.defaultVisitTempleId, // 默认随访模板
          departmentId: userInfo.data.departmentId, // 部门
          departmentName: userInfo.data.departmentName, // 部门名字
          id: userInfo.data.id, // id
          laterhours: userInfo.laterhours, // 距离上次的登录时间
          aipictureurl: userInfo.aipictureurl, // url接口前缀
          aiPictureCode: userInfo.data.aiPictureCode
        }
    },
    // 退出登录
    SIGNOUT (state) {
        /* 清空用户登录信息 */
        state = {}
        /* window.location.href="/#/index/main"; */
    },
    // 切换是否需要重载
    updateIsReload (state) {
        state.isreload = !state.isreload
    },
    // 切换显示状态
    updateLoadingStatus (state, payload) {
        let times = 0
        if (!payload.isLoading) {
            times = 1000
        }
        setTimeout(() => {
            state.isLoading = payload.isLoading
        }, times)
    }
};

export const actions = {
    /* 设置用户登录信息 */
    SetUserInfo ({ commit, state }, userInfo) {
        commit('SETUSERINFO', userInfo)
      },
    /* 退出登录 */
    SignOut ({ commit }) {
        commit('SIGNOUT')
    }
};

export const getters = {
    getReload (state) {
        return state.isreload
      },
    /* 返回用户信息 */
    getUserInfo (state) {
        return state.userInfo
    },
    /* 返回用户id */
    getUserInfoUserId (state, getters) {
        return getters.getUserInfo.id
    },
    /* 返回用户token */
    getUserInfoToken (state, getters) {
        return getters.getUserInfo.token
    },
    /* 返回主地址 */
    getApiUrl (state, getters) {
        return getters.getUserInfo.aipictureurl
    },
    /* 返回用户名  */
    getRealname (state, getters) {
        return getters.getUserInfo.realname
    },
    /* 返回距离上次登录时间  */
    getLastHours (state, getters) {
        return getters.getUserInfo.laterhours
    },
    /* 返回科室  */
    getdepartment (state, getters) {
        return getters.getUserInfo.departmentName
    }
};