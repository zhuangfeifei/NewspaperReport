<template>
    <div id="Acceptance">

        <Acceptance-item v-if="repairDetail" :repairDetail="repairDetail"></Acceptance-item>

        <div class="Acceptance_footer">
            <div @click="show = true">我来处理</div><div @click="$router.push({path:'/Assign', query:{id: repairDetail.rp[0].id}})">我来指派</div>
        </div>

        <van-dialog v-model="show" show-cancel-button :before-close="beforeClose" :title="'确认自己处理?'"></van-dialog>

    </div>
</template>

<script>
import AcceptanceItem from '../../components/_Acceptance'
export default {
    data() {
        return {
            show: false
        }
    },
    components: {
        'Acceptance-item': AcceptanceItem
    },
    beforeCreate(){
        let list = { repairId: this.$route.query.repairId, code: 0 }
        this.$store.dispatch('repairDetail', list)
    },
    computed: {
        repairDetail(){
            return this.$store.state.repairDetail
        },
    },
    created(){
        document.title = '报修受理'
        
    },
    methods: {
        beforeClose(action, done) {
            if (action === 'confirm') {
                let list = { assignUserId: this.$store.state.userId, repairId: this.repairDetail.rp[0].id, psRemark: ''}
                this.$store.dispatch('receiveAndAssigned', list)
                done()
            } else {
                done()
            }
        }
    },
}
</script>

<style lang="less" scoped>
#Acceptance{
    width: 100%; height: 100vh; background:rgba(246,246,246,1);
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }


.Acceptance_footer{
    width: 100%; height: 0.96rem; display: flex; position: fixed; bottom: 0; left: 0; background-color: white; border-top: 1px solid #219DB9;
    div{ width: 50%; height: 100%; line-height: 0.96rem; text-align: center; color: #219DB9; .font2; }
    div:nth-child(1){
        background-color: #219DB9; color: white;
    }
}


</style>