<template>
    <div id="Administration">

        <div class="Administration">
            <div @click="go(item)" v-for="(item,index) in list" :key="index">
                <img :src="item.img" alt="">
                <p>{{item.name}}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[
                { name:'故障报修', img:require('../../assets/img/Fault.png'), url:'/Fault', isUrl:'faultRepair' },
                { name:'随机巡检', img:require('../../assets/img/Inspection.png'), url:'', isUrl:'' },
                // { name:'随机巡检', img:require('../../assets/img/Inspection.png'), url:'/Inspection', isUrl:'' },
                { name:'设备设施', img:require('../../assets/img/SpotCheck.png'), url:'/SpotCheck', isUrl:'tallyEquFac' },
                { name:'点检任务', img:require('../../assets/img/SpotCheckTask.png'), url:'', isUrl:'chaeckTask' },
                // { name:'点检任务', img:require('../../assets/img/SpotCheckTask.png'), url:'/SpotCheckTask', isUrl:'chaeckTask' },
                { name:'点检管理', img:require('../../assets/img/SpotInspectionManagement.png'), url:'', isUrl:'' },
                // { name:'点检管理', img:require('../../assets/img/SpotInspectionManagement.png'), url:'/SpotCheck', isUrl:'' },
                { name:'点检计划', img:require('../../assets/img/CheckingPlan.png'), url:'', isUrl:'chaeckTask' },
                // { name:'点检计划', img:require('../../assets/img/CheckingPlan.png'), url:'/CheckingPlan', isUrl:'chaeckTask' },
                { name:'统计分析', img:require('../../assets/img/StatisticalAnalysis.png'), url:'', isUrl:'chackTaskTj' },
                // { name:'统计分析', img:require('../../assets/img/StatisticalAnalysis.png'), url:'/Statistical', isUrl:'chackTaskTj' },
                { name:'团队管理', img:require('../../assets/img/TeamManagement.png'), url:'/Management', isUrl:'teamM' },
            ]
        }
    },
    components: {
        
    },
    computed: {
        
    },
    created(){
        document.title = '报修管理'
        
    },
    methods: {
        go(item){
            if(item.isUrl != ''){
                this.$store.dispatch('isPermission', item)
            }else{
                this.$router.push({path:item.url})
            }
        }
    },
}
</script>

<style lang="less" scoped>
#Administration{
    width: 100%; height: calc(100vh - 1rem); background:rgba(246,246,246,1);
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }


.Administration{
    width: 100vw; display: flex; flex-wrap: wrap;
    div{
        width: calc(100% / 3); height: 2.5rem; text-align: center; border: 0.01rem solid #CECECE; 
        margin-left: -0.01rem; margin-top: -0.01rem;
        p{ font-size: 0.26rem; color:rgba(0,0,0,1); .font2; line-height: 0.5rem; }
    }
    div:nth-child(3n+1){ margin-left: 0; }
    div:nth-child(-n+3){ margin-top: 0; }
    div:nth-child(1){ img{ width: 0.72rem; height: 0.66rem; } padding-top: 0.67rem; }
    div:nth-child(2){ img{ width: 0.72rem; height: 0.72rem; } padding-top: 0.60rem; }
    div:nth-child(3){ img{ width: 0.72rem; height: 0.72rem; } padding-top: 0.60rem; }
    div:nth-child(4){ img{ width: 0.66rem; height: 0.72rem; } padding-top: 0.64rem; }
    div:nth-child(5){ img{ width: 0.70rem; height: 0.54rem; } padding-top: 0.78rem; }
    div:nth-child(6){ img{ width: 0.63rem; height: 0.72rem; } padding-top: 0.60rem; }
    div:nth-child(7){ img{ width: 0.72rem; height: 0.58rem; } padding-top: 0.71rem; }
    div:nth-child(8){ img{ width: 0.72rem; height: 0.58rem; } padding-top: 0.71rem; }
}

</style>