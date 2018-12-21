
import * as types from './types'
import Util from './storage'


export default {
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
    isFocus(state,res){
        state.isFocus = res
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
    getTallyPlan_(state,res){
        state.getTallyPlan = res
    },
    getMyTask_(state,res){
        state.getMyTask = res
    },
    tallyPlanList_(state,res){
        state.tallyPlanList = res
    },
    checkPeoList_(state,res){
        state.checkPeoList = res
    },
}