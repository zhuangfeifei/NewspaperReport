<template>
    <div id="AcceptanceAgain">

        <Acceptance-item v-if="repairDetail" :repairDetail="repairDetail"></Acceptance-item>
        
        <SupplementaryRecord-item v-if="repairDetail" :repairDetail="repairDetail"></SupplementaryRecord-item>

        <div class="AcceptanceAgain_footer">
            <div @click="$router.push({path:'/Supplement', query:{ id: repairDetail.rp[0].id }})">补充</div><div @click="$router.push({path:'/Repair', query:{ id: repairDetail.rp[0].id }})">已修好</div>
        </div>

    </div>
</template>

<script>
import AcceptanceItem from '../../components/_Acceptance'
import SupplementaryRecord from '../../components/_SupplementaryRecord'
export default {
    data() {
        return {
            isSort: false
        }
    },
    components: {
        'Acceptance-item': AcceptanceItem,
        'SupplementaryRecord-item': SupplementaryRecord,
    },
    beforeCreate(){
        let list = { repairId: this.$route.query.repairId, code: 0 }
        this.$store.dispatch('repairDetail', list)
    },
    computed: {
        repairDetail(){
            return this.$store.state.repairDetail
        },
        imgUrl(){
            return this.$store.state.imgUrl
        },
    },
    created(){
        document.title = '报修受理'
        
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
#AcceptanceAgain{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }


.AcceptanceAgain_footer{
    width: 100%; height: 0.96rem; display: flex; position: fixed; bottom: 0; left: 0; background-color: white; border-top: 1px solid #219DB9;
    div{ width: 50%; height: 100%; line-height: 0.96rem; text-align: center; color: #219DB9; .font2; }
    div:nth-child(1){
        background-color: #219DB9; color: white;
    }
}



</style>