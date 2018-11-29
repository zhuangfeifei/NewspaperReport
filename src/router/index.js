import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['@/pages/index'], resolve)

const Home = resolve => require(['@/pages/Home/Home'], resolve)
const Assign = resolve => require(['@/pages/Home/Assign'], resolve)
const Acceptance = resolve => require(['@/pages/Home/Acceptance'], resolve)
const AcceptanceAgain = resolve => require(['@/pages/Home/AcceptanceAgain'], resolve)
const Supplement = resolve => require(['@/pages/Home/Supplement'], resolve)
const Repair = resolve => require(['@/pages/Home/Repair'], resolve)
const AcceptanceEnd = resolve => require(['@/pages/Home/AcceptanceEnd'], resolve)

const Administration = resolve => require(['@/pages/Administration/Administration'], resolve)
const Fault = resolve => require(['@/pages/Administration/Fault'], resolve)
const DailyRepair = resolve => require(['@/pages/Administration/DailyRepair'], resolve)
const Equipment = resolve => require(['@/pages/Administration/Equipment'], resolve)
const Inspection = resolve => require(['@/pages/Administration/Inspection'], resolve)
const SpotCheck = resolve => require(['@/pages/Administration/SpotCheck'], resolve)
const EquipmentAddition = resolve => require(['@/pages/Administration/EquipmentAddition'], resolve)
const FacilitiesDetails = resolve => require(['@/pages/Administration/FacilitiesDetails'], resolve)
const SpotCheckTask = resolve => require(['@/pages/Administration/SpotCheckTask'], resolve)
const Check = resolve => require(['@/pages/Administration/Check'], resolve)
const Statistical = resolve => require(['@/pages/Administration/Statistical'], resolve)
const Management = resolve => require(['@/pages/Administration/Management'], resolve)
const AddEmployees = resolve => require(['@/pages/Administration/AddEmployees'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: index,
      children:[ {path:'/', component: Home}, {path:'/Administration', component: Administration} ]
    },
    { path:'/Assign', component: Assign },
    { path:'/Acceptance', component: Acceptance },
    { path:'/AcceptanceAgain', component: AcceptanceAgain },
    { path:'/Supplement', component: Supplement },
    { path:'/Repair', component: Repair },
    { path:'/AcceptanceEnd', component: AcceptanceEnd },
    
    { path:'/Fault', component: Fault },
    { path:'/DailyRepair', component: DailyRepair },
    { path:'/Equipment', component: Equipment },
    { path:'/Inspection', component: Inspection },
    { path:'/SpotCheck', component: SpotCheck },
    { path:'/EquipmentAddition', component: EquipmentAddition },
    { path:'/FacilitiesDetails', component: FacilitiesDetails },
    { path:'/SpotCheckTask', component: SpotCheckTask },
    { path:'/Check', component: Check },
    { path:'/Statistical', component: Statistical },
    { path:'/Management', component: Management },
    { path:'/AddEmployees', component: AddEmployees },

    { path: '/*', redirect: '/', },
  ]
})
