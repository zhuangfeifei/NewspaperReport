<template>
    <div id="CheckingPlan">

        <nav class="CheckingPlan">
            <div>
                <input class="CheckingPlan_input" type="text" v-model="value" placeholder="搜索">
                <img src="../../assets/img/Search.png" alt="">
            </div>
        </nav>

        <div class="CheckingPlan_main">
            <div class="CheckingPlan_main_Statistics"><span>共计{{getTallyPlan.length}}条</span></div>
            <div class="CheckingPlan_list" @click="$router.push({path:'/CheckingPlanDtail', query:{id: item.id}})" v-for="(item,index) in getTallyPlan" :key="index">
                <p>{{item.num}}</p>
                <section>{{item.address+item.equfac_name}}</section>
                <span :class="{colors: item.is_tally_plan == 0}">{{item.is_tally_plan == 1 ? '已定' : '未定'}}</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            value:'',
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('getTallyPlan')
    },
    computed: {
        getTallyPlan(){
            return this.$store.state.getTallyPlan
        }
    },
    created(){
        document.title = '点检计划'
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
#CheckingPlan{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1);
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.CheckingPlan{
    width: 100%; height: 1.32rem; .font2; background:linear-gradient(90deg,rgba(33,205,209,1),rgba(33,157,185,1)); padding: 0 0.3rem; padding-top: 0.4rem;
    div{
        width: 100%; height: 0.72rem; background-color: white; border-radius: 0.1rem; position: relative;
        .CheckingPlan_input{ width: 100%; height: 0.72rem; border: 0; background: none; padding-left: 0.62rem; }
        img{ position: absolute; top: 0.22rem; left: 0.2rem; width: 0.28rem; height: 0.28rem; }
    }
}

.CheckingPlan_main{
    width: 100%; padding: 0.4rem 0.3rem 0 0.3rem; background-color: white;
    .CheckingPlan_main_Statistics{ 
        display: flex; justify-content: space-between;
        font-size: 0.28rem; color:rgba(128,128,128,1); .font3; border-bottom: 0.01rem solid rgba(206,206,206,1); padding-bottom: 0.1rem;
        p{ color:rgba(0,0,0,1); .font2; }
        img{ width: 0.27rem; height: 0.27rem; }
    } 
    .CheckingPlan_list{
        width: 100%; height: 1.24rem; display: flex; border-bottom: 0.01rem solid rgba(206,206,206,1);
        display: flex; justify-content: space-between; align-items: center;
        p{ color:rgba(0,0,0,1); .font1; }
        section{ width: 60%; color:rgba(75,75,75,1); .font3; }
        span{ color:rgba(33,157,185,1); .font2; font-size: 0.28rem; }
        .colors{ color:rgba(239,63,74,1); }
    }
    .CheckingPlan_list:last-child{
        border: 0;
    }
}

</style>