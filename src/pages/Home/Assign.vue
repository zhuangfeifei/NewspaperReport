<template>
    <div id="Assign">

        <!-- <nav class="Assign">
            <div v-for="(item,index) in tab_list" :key="index" :class="{Assign_active: tabShow == index}" @click="tab(index)">{{item}}</div>
        </nav> -->

        <div class="Assign_main">
            <van-collapse v-if="maintenancePeoList" v-model="activeNames" accordion>
                <van-collapse-item name="1">
                    <div slot="title"><span class="collapse_title">维修人</span></div>
                    <div class="classList" :class="{Only: maintenancePeoList.length == 1}" @click="userList = OneItem" v-for="(OneItem,OneIndex) in maintenancePeoList" :key="OneIndex">
                        <span>{{OneItem.name}}</span><img :src="userList.userid == OneItem.userid ? img[1] : img[0]" alt="">
                    </div>
                    <div v-if="maintenancePeoList.length == 0" class="Assign_main_">暂无</div>
                </van-collapse-item>
            </van-collapse>
        </div>  

        <van-cell-group class="Assign_input">
            <span>附言</span><van-field class="Assign_input_" v-model="value" type="textarea" placeholder="对处理人说几句" rows="1" autosize/>
        </van-cell-group>

        <div class="Assign_btn" @click="show = true">发送派单</div>

        <van-dialog v-model="show" show-cancel-button :before-close="beforeClose" :title="'指派维修人：'+userList.name"></van-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {
            tabShow: 0, tab_list:[ '部 门','角 色' ], activeNames: ['0'], activeName: ['0'],userList: '',
            img:[require('../../assets/img/checke.png'),require('../../assets/img/checkeds.png')],
            value:'', show: false, repairId: ''
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('maintenancePeoList')
    },
    computed: {
        maintenancePeoList(){
            return this.$store.state.maintenancePeoList
        }
    },
    created(){
        document.title = '指派处理人'

        this.repairId = this.$route.query.id
    },
    methods: {
        tab(index){
            this.tabShow = index
        },
        beforeClose(action, done) {
            if (action === 'confirm') {
                let list = { assignUserId: this.userList.userId, repairId: this.repairId, psRemark: this.value }
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
#Assign{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.Assign{
    width: 100%; height: 0.86rem; .font2; display: flex;
    div{  
        width: 50%; height: 100%; text-align: center; line-height: 0.86rem; font-size: 0.28rem;
    }
    .Assign_active{ border-bottom: 0.04rem solid #219DB9; color: #219DB9; }
}

.Assign_main{
    width: 100%; background-color: white;
    .collapse_title{ color:rgba(75,75,75,1); font-size: 0.3rem; .font2; }
    .collapse_title::before{
        content: ''; display: inline-block;  width: 0.06rem; height: 0.3rem; background:rgba(33,157,185,1);
        margin-right: 0.3rem; border-radius: 0.03rem; position: relative; top: 0.04rem;
    }
    .classList{
        width: 100%; height: 0.9rem; padding-left: 0.66rem; border-bottom: 0.01rem solid #eee; line-height: 0.9rem;
        img{ width: 0.27rem; height: 0.27rem; float: right; position: relative; top: 0.3rem; }
    }
    .classList:first-child{ height: 0.6rem; line-height: 0.4rem; img{ top: 0.1rem; } }
    .classList:last-child{ height: 0.6rem; border: 0; }
    .Only{ height: 0.4rem!important; }
}

.Assign_input{
    margin-top: 0.2rem; display: flex; padding-left: 0.3rem; line-height: 0.9rem;
    span{ color:rgba(0,0,0,1); .font2; }
    .Assign_input_{ width: 80%; padding: 0.22rem 0 0.22rem 0.6rem; color:rgba(75,75,75,1); }
}


.Assign_btn{
    width: 4rem; height: 0.96rem; margin: 1.28rem auto; text-align: center; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2;
    background:linear-gradient(90deg,rgba(248,142,146,1),rgba(239,63,74,1)); border-radius: 0.48rem; margin-bottom: 0;
}


.Assign_main_{
    text-align: center; color: gray;
}

</style>