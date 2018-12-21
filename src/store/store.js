import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import * as types from './types'
import Api from './api'
import Util from './storage'
import mutations from './mutations'
import actions from './actions'

const state = {
    isLoading: false,
    active: 0,   // 导航
    homeTab: 0,   // 首页tab
    imgUrl: Api.urls + '/oa/kaptcha/',
    isPage: true,
    isFocus: true,
    isPassword: false,
    isGetAuthentication: 2,
    html: '',
    user: '',        // 获取用户信息
    userId: Util.getLocal('userId'),
    shire:'',
    serverId:'',
    imgFile:'',  // 上传图片
    list:'',   // 获取设备设施列表
    getEquFacType: '',  // 获取设备类型接口
    gettallyType: '',  // 获取点检类型列表
    getEquAndFacDetailById: '',  // 根据设备设施主键id查看设备设施详细
    getUsetList: '',  // 获取设定角色的员工信息
    getTreeDeptUserList: '',  // 获取内部/外部员工组织机构信息列表
    getRepairCategoryList: '',  // 报修类别获取
    daily_repairList: '',  // 获取当前登录人的所有故障报修列表
    repairDetail: '',  // 报修详细信息（包含报修和问题补充信息）
    maintenancePeoList: '',  // 获取所有的维修人列表
    getMyTask: '',  // 	获取当前登录人当日所有点检任务和当日已完成的点检任务
    getTallyPlan: '',  // 	获取需要点检的所有设备设施列表
    tallyPlanList: '',  // 	获取需要点检的所有设备设施列表
    checkPeoList: '',  // 	获取检查人
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})