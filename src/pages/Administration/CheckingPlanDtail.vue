<template>
    <div id="CheckingPlanDtail">

        <nav class="CheckingPlanDtail"><p>点检设备信息</p></nav>
        <div v-if="tallyPlanList" class="CheckingPlanDtail_main">
            <div class="CheckingPlanDtail_main_"><span>编号</span><p>{{tallyPlanList.ef[0].num}}</p></div>
            <div class="CheckingPlanDtail_main_"><span>类别</span><p>{{tallyPlanList.ef[0].tally_type}}</p></div>
            <div class="CheckingPlanDtail_main_"><span>描述</span><p>{{tallyPlanList.ef[0].remark}}</p></div>
        </div>
        <nav class="CheckingPlanDtail"><p>点检计划</p></nav>

        <div class="CheckingPlanDtail_footer" v-if="isFocus" @click="Add">添加计划</div>


    </div>
</template>

<script>
import PhotoSpeech from '../../components/_PhotoSpeech'
export default {
    data() {
        return {
            
        }
    },
    components: {
        'Photo-Speech': PhotoSpeech
    },
    beforeCreate(){
        this.$store.dispatch('tallyPlanList', this.$route.query.id)
    },
    computed: {
        isFocus(){
            return this.$store.state.isFocus
        },
        tallyPlanList(){
            return this.$store.state.tallyPlanList
        },
    },
    created(){
        
        
    },
    methods: {
        onSelect(item) {
            this.ShowList = false
            this.type = item
        },
        onProblem(item) {
            this.problem = false
            this.problemList = item
        },
        Add(){
            this.$router.push('/CheckingPlanAdd')
        },
    },
}
</script>

<style lang="less" scoped>
#CheckingPlanDtail{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.CheckingPlanDtail{
    width: 100%; height: 1rem; display: flex; justify-content: space-between; padding: 0.45rem 0.3rem;
    p{ color: #808080; font-size: 0.28rem; }
}

.CheckingPlanDtail_main{
    width: 100%; background:rgba(255,255,255,1); padding: 0 0.29rem;
    .CheckingPlanDtail_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; padding-bottom: 0.02rem;
        .input{ width: 85%; padding: 0; margin-top: 0.22rem; padding-bottom: 0.22rem; color:rgba(75,75,75,1); }
        span{ color:rgba(0,0,0,1); .font2; margin-right: 0.33rem; }
        p{ color:rgba(75,75,75,1); .font3; }
        .van-cell:not(:last-child)::after{ border: 0!important; }
    }
    .last{ 
        .isOpen{ width: 0.8rem; height: 0.49rem; margin-top: 0.2rem; }
    }
    div:last-child{ 
        border: 0; 
    }
}

.CheckingPlanDtail_footer{
    width: 100%; height: 0.96rem; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2; background:rgba(33,157,185,1);
    position: fixed; bottom: 0; left: 0; text-align: center;
}



</style>