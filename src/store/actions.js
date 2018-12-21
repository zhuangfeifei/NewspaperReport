
import router from '../router'
import * as types from './types'
import Api from './api'
import Util from './storage'
import { Toast, Dialog } from 'vant'


export default {
    shire({state,commit}){   // jssdk
        return Api.fetch('/oa/api/teamM/shire', { userId: state.userId } )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                // Util.setLocal(res.data.data, 'shire')
                // commit('SHIRE')
                return Promise.resolve(res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
    uploadPicture({state}){   // 上传图片
        return Api.fetch('/oa/api/upload/uploadPicture', state.imgFile )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                return Promise.resolve(res.data)
            }
        })
        .catch(err => console.log(err))
    },
    list({state,commit}){   // 获取设备设施列表
        Api.fetch('/oa/api/equ_fac/list', { userId: state.userId, current: 1, limit: 100 } )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('LIST', res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
    getEquFacType({commit}){   // 获取设备类型接口
        Api.fetch('/oa/api/equ_fac/getEquFacType')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getEquFacType_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    gettallyType({commit}, id){   // 获取点检类型列表
        Api.fetch('/oa/api/equ_fac/gettallyType', { eaufacId: id } )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('gettallyType_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    addEqufac({state}, list){   // 新增设备设施
        list.userId = state.userId
        Api.fetch('/oa/api/equ_fac/addEqufac', list )
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
        Api.fetch('/oa/api/equ_fac/getEquAndFacDetailById', { equFacId: id } )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getEquAndFacDetailById_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    getUsetList({commit}, index){   // 获取设定角色的员工信息
        Api.fetch('/oa/api/teamM/getUsetList', { nodeType: index, current: 1, limit: 100 } )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getUsetList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    getTreeDeptUserList({commit}, index){   // 获取内部/外部员工组织机构信息列表
        Api.fetch('/oa/api/teamM/getTreeDeptUserList', { nodeType: index } )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getTreeDeptUserList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    setRoleType({}, list){   // 新增设备设施
        Api.fetch('/oa/api/teamM/setRoleType', list )
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
        Api.fetch('/oa/api/daily_repair/getRepairCategoryList')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getRepairCategoryList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    reportRepair({state}, list){   // 报修
        list.userId = state.userId
        Api.fetch('/oa/api/daily_repair/reportRepair', list )
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
        Api.fetch('/oa/api/daily_repair/list', {userId: state.userId, nodeType: nodeType, current: 1, limit: 100 } )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('daily_repairList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    repairDetail({state,commit}, list){   // 报修详细信息（包含报修和问题补充信息）
        list.userId = state.userId
        Api.fetch('/oa/api/daily_repair/repairDetail', list )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('repairDetail_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    maintenancePeoList({state,commit}){   // 获取所有的维修人列表
        Api.fetch('/oa/api/daily_repair/maintenancePeoList')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('maintenancePeoList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    receiveAndAssigned({state}, list){   // 接收处理和指派处理
        list.userId = state.userId
        Api.fetch('/oa/api/daily_repair/receiveAndAssigned', list )
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
        Api.fetch('/oa/api/daily_repair/addSupplement', list )
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
        Api.fetch('/oa/api/daily_repair/repairOk', list )
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
    repairOkConfirm({state}, repairId){   // 维修确认
        Api.fetch('/oa/api/daily_repair/repairOkConfirm', { userId:state.userId, repairId:repairId } )
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
        Api.fetch('/oa/api/teamM/isPermission', { userId:state.userId, menuNum: item.isUrl } )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200){
                res.data.data.isPermission === '1' ? router.push({path:item.url}) : Toast('您还没有权限！');
            }
        })
        .catch(err => console.log(err))
    },
    getMyTask({state,commit}, type){   // 获取当前登录人当日所有点检任务和当日已完成的点检任务
        Api.fetch('/oa/api/chack_task/getMyTask', { userId: state.userId, nodeType: type, current: 1, limit: 100 } )
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getMyTask_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    getTallyPlan({state,commit}, type){   // 获取需要点检的所有设备设施列表
        Api.fetch('/oa/api/tally_plan/getTallyPlan', { current: 1, limit: 100 })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('getTallyPlan_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    tallyPlanList({state,commit}, id){   // 获取需要点检的所有设备设施列表
        Api.fetch('/oa/api/tally_plan/tallyPlanList', { eaufacId: id })
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('tallyPlanList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
    checkPeoList({state,commit}, id){   // 获取检查人
        Api.fetch('/oa/api/tally_plan/checkPeoList')
        .then(res => {
            // console.log(res.data)
            if(res.data.code == 200) commit('checkPeoList_', res.data.data) 
        })
        .catch(err => console.log(err))
    },
}