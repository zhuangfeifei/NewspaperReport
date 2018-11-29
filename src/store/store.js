import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import router from '../router'
import * as types from './types'
import axios from './api'
import Util from './storage'
import { Toast, Dialog } from 'vant'

const state = {
    isLoading: false,
    active: 0,   // 导航
    homeTab: 0,   // 首页tab
    market_wxh: Util.getLocal('market_wxh'),
    market_openId: Util.getLocal('market_openId'),
    unionId: Util.getLocal('unionId'),
    imgUrl: axios.urls + '/oa/kaptcha/',
    isPage: true,
    isPay: false,
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
}

const mutations = {
    isLoading(state,res){
        state.isLoading = res
    },
    ACTIVE(state,res){
        state.active = res
    },
    HOMETAB(state,res){
        state.homeTab = res
    },
    SHIRE(state){
        state.shire = Util.getLocal('shire')
    },
    userID(state){
        state.userId = Util.getLocal('userId')
    },
    serverID(state,res){
        state.serverId = res
    },
    imgFile_(state,res){
        if(res != ''){
            let formData = new FormData()
            for(let val of res){
                formData.append('file', val.file)
            }
            state.imgFile = formData
        }else{ state.imgFile = res }
    },
    LIST(state,res){
        state.list = res
    },
    getEquFacType_(state,res){
        state.getEquFacType = res
    },
    gettallyType_(state,res){
        state.gettallyType = res
    },
    getEquAndFacDetailById_(state,res){
        state.getEquAndFacDetailById = res
    },
    getUsetList_(state,res){
        state.getUsetList = res
    },
    getTreeDeptUserList_(state,res){
        state.getTreeDeptUserList = res
    },
    getRepairCategoryList_(state,res){
        let array = []
        for(let val of res){
            array.push({ name: val.category_name, id: val.id })
        }
        state.getRepairCategoryList = array
    },
    daily_repairList_(state,res){
        state.daily_repairList = res
    },
    repairDetail_(state,res){
        state.repairDetail = res
    },
    maintenancePeoList_(state,res){
        state.maintenancePeoList = res
    },
}

const actions = {
    shire({state,commit}){   // jssdk
        axios.api.post('/oa/api/teamM/shire', $.param({ userId: state.userId }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'shire')
                commit('SHIRE')
            }
        })
        .catch(err => console.log(err))
    },
    uploadPicture({state}){   // 上传图片
        return axios.api.post('/oa/api/upload/uploadPicture', state.imgFile )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                return Promise.resolve(res.data)
            }
        })
        .catch(err => console.log(err))
    },
    list({state,commit}){   // 获取设备设施列表
        axios.api.post('/oa/api/equ_fac/list', $.param({ userId: state.userId, current: 1, limit: 100 }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('LIST', res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
    getEquFacType({commit}){   // 获取设备类型接口
        axios.api.post('/oa/api/equ_fac/getEquFacType')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getEquFacType_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    gettallyType({commit}, id){   // 获取点检类型列表
        axios.api.post('/oa/api/equ_fac/gettallyType', $.param({ eaufacId: id}) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('gettallyType_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    addEqufac({state}, list){   // 新增设备设施
        list.userId = state.userId
        axios.api.post('/oa/api/equ_fac/addEqufac', $.param( list ) )
        .then(res => {
            // console.log(res.data)
            Toast.clear()
            if(res.data.code == 200) {
                Toast.success('添加成功！')
                router.replace('/SpotCheck')
            }
        })
        .catch(err => console.log(err))
    },
    getEquAndFacDetailById({commit}, id){   // 根据设备设施主键id查看设备设施详细
        axios.api.post('/oa/api/equ_fac/getEquAndFacDetailById', $.param({ equFacId: id}) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getEquAndFacDetailById_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    getUsetList({commit}, index){   // 获取设定角色的员工信息
        axios.api.post('/oa/api/teamM/getUsetList', $.param({ nodeType: index, current: 1, limit: 100}) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getUsetList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    getTreeDeptUserList({commit}, index){   // 获取内部/外部员工组织机构信息列表
        axios.api.post('/oa/api/teamM/getTreeDeptUserList', $.param({ nodeType: index}) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getTreeDeptUserList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    setRoleType({}, list){   // 新增设备设施
        axios.api.post('/oa/api/teamM/setRoleType', $.param( list ) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('添加成功！')
                router.replace('/Management')
            }
        })
        .catch(err => console.log(err))
    },
    getRepairCategoryList({commit}){   // 报修类别获取
        axios.api.post('/oa/api/daily_repair/getRepairCategoryList')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getRepairCategoryList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    reportRepair({state}, list){   // 报修
        list.userId = state.userId
        axios.api.post('/oa/api/daily_repair/reportRepair', $.param( list ) )
        .then(res => {
            Toast.clear()
            // console.log(res.data)
            if(res.data.code == 200) {
                Toast.success('报修成功！')
                router.replace('/')
            }
        })
        .catch(err => console.log(err))
    },
    daily_repairList({state,commit}, nodeType){   // 获取当前登录人的所有故障报修列表
        axios.api.post('/oa/api/daily_repair/list', $.param( {userId: state.userId, nodeType: nodeType, current: 1, limit: 100} ) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('daily_repairList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    repairDetail({state,commit}, list){   // 报修详细信息（包含报修和问题补充信息）
        list.userId = state.userId
        axios.api.post('/oa/api/daily_repair/repairDetail', $.param( list ) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('repairDetail_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    maintenancePeoList({state,commit}){   // 获取所有的维修人列表
        axios.api.post('/oa/api/daily_repair/maintenancePeoList')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('maintenancePeoList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    receiveAndAssigned({state}, list){   // 接收处理和指派处理
        list.userId = state.userId
        axios.api.post('/oa/api/daily_repair/receiveAndAssigned', $.param( list ) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200){
                Toast.success('指派成功！')
                router.replace('/')
            }
        })
        .catch(err => console.log(err))
    },
    addSupplement({state}, list){   // 问题补充
        list.userId = state.userId
        axios.api.post('/oa/api/daily_repair/addSupplement', $.param( list ) )
        .then(res => {
            // console.log(res.data)
            Toast.clear()
            if(res.data.code == 200){
                Toast.success('补充成功！')
                router.go(-1)
            }
        })
        .catch(err => console.log(err))
    },
    repairOk({state}, list){   // 问题补充
        list.userId = state.userId
        axios.api.post('/oa/api/daily_repair/repairOk', $.param( list ) )
        .then(res => {
            // console.log(res.data)
            Toast.clear()
            if(res.data.code == 200){
                Toast.success('提交成功！')
                router.replace('/')
            }
        })
        .catch(err => console.log(err))
    },
    repairOkConfirm({}, repairId){   // 问题补充
        axios.api.post('/oa/api/daily_repair/repairOkConfirm', $.param({ repairId:repairId }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200){
                Toast.success('确认成功！')
                router.go(-1)
            }
        })
        .catch(err => console.log(err))
    },
    isPermission({state}, item){   // 判断当前用户是否有打菜单的权限
        axios.api.post('/oa/api/teamM/isPermission', $.param({ userId:state.userId, menuNum: item.isUrl }) )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200){
                res.data.data.isPermission === '1' ? router.push({path:item.url}) : Toast('您还没有权限！');
            }
        })
        .catch(err => console.log(err))
    },
}

const getters ={
    htmls: state => state.html.replace(/;/g,'').replace(/&gt/g,'>').replace(/&lt/g,'<').replace(/&apos/g,"'").replace(/&quot/g,"\\")
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})