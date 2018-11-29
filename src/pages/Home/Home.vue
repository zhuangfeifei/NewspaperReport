<template>
    <div id="Home">

        <nav class="Home">
            <div class="Home_tab">
                <div v-for="(item,index) in tab_list" :key="index" :class="{Home_active: homeTab == index}" @click="tab(index)">{{item}}</div>
            </div>
        </nav>

        <div class="Home_main">
            <div class="Home_main_Statistics"><span>共计{{daily_repairList.length}}条</span><p v-if="homeTab > 0" @click="checke = !checke"><img :src="checke ? checked[0] : checked[1]" alt=""> 与我相关</p></div>
            <div class="Home_list" @click="details(item.id)" v-for="(item,index) in daily_repairList" :key="index">
                <section><img :src="item.repair_source_id == 0 ? img[1] : img[0]" alt=""><img v-if="item.status == 3" class="complete" src="../../assets/img/complete.png" alt=""></section>
                <div class="Home_list_content">
                    <div><p>{{item.process_num}}</p><span v-if="homeTab == 0">待受理</span><span class="ing" v-if="homeTab == 2 && item.status == 2">待确认</span><span v-if="homeTab == 2 && item.status == 3" class="end">已完成</span></div>
                    <div>{{item.pro_del}}</div>
                    <div><span>报修人：{{item.repairUserName}}</span><span v-if="item.work_time">{{homeTab == 0 ? item.create_time.substring(5) : homeTab == 1 ? item.deal_time.substring(5) : item.work_time.substring(5)}}</span></div>
                    <p v-if="homeTab == 1" class="supplement">补充（{{item.suppleCount}}）</p>
                </div>
            </div>
        </div>

        <div v-if="daily_repairList.length == 0" class="Home_no">
            <van-icon name="records" size="0.7rem" color="#CECECE"/>
            <p>暂无相关任务</p>
        </div>
        

    </div>
</template>

<script>
export default {
    data() {
        return {
            tab_list:[ '新报修','待维修','已修好' ],
            img:[require('../../assets/img/Repairing.png'),require('../../assets/img/inspect.png') ],
            checke: false,
            checked:[require('../../assets/img/checked.png'),require('../../assets/img/checke.png') ],
        }
    },
    components: {
        
    },
    beforeCreate(){
        
    },
    computed: {
        daily_repairList(){
            return this.$store.state.daily_repairList
        },
        homeTab(){
            return this.$store.state.homeTab
        },
    },
    created(){
        document.title = '报事报修'
        
        this.$nextTick(()=>{
            this.tab(this.homeTab)
        })
    },
    methods: {
        tab(index){
            this.$store.commit('HOMETAB', index)
            this.$store.dispatch('daily_repairList', index)
        },
        details(id){
            if(this.homeTab == 0) { 
                this.$router.push({path:'/Acceptance', query:{repairId: id}}) 
                return
            }
            if(this.homeTab == 1) {
                this.$router.push({path:'/AcceptanceAgain', query:{repairId: id}})
                return
            }
            if(this.homeTab == 2) {
                this.$router.push({path:'/AcceptanceEnd', query:{repairId: id}})
                return
            }
            // if(this.tabShow == 0) this.$router.push({path:'/Acceptance'})
        }
    },
}
</script>

<style lang="less" scoped>
#Home{
    width: 100%; min-height: calc(100vh - 1rem); background:rgba(246,246,246,1); padding-top: 1rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.Home{
    width: 100%; height: 1rem; padding-top: 0.2rem; .font2; position: fixed; top: 0; left: 0; background:rgba(246,246,246,1); z-index: 10;
    .Home_tab{
        width: 6.86rem; height: 0.58rem; margin: 0 auto; display: flex; color: #219DB9;
        border: 0.03rem solid #219DB9; border-radius: 0.1rem; box-shadow:0px 0.2rem 0.8rem 0px rgba(38,38,38,0.1);
        div{
            width: 33.33%; height: 100%; text-align: center; line-height: 0.54rem; font-size: 0.26rem;
        }
        div:nth-child(1){ border-top-left-radius: 0.05rem; border-bottom-left-radius: 0.05rem; border-right: 0.03rem solid #219DB9; }
        div:nth-child(3){ border-top-right-radius: 0.05rem; border-bottom-right-radius: 0.05rem; border-left: 0.03rem solid #219DB9; }
        .Home_active{
            background-color: #219DB9; color: white;
        }
    }
}

.Home_main{
    width: 100%; padding: 0.4rem 0.3rem; background-color: white;
    .Home_main_Statistics{ 
        display: flex; justify-content: space-between;
        font-size: 0.28rem; color:rgba(128,128,128,1); .font3; border-bottom: 0.01rem solid rgba(206,206,206,1); padding-bottom: 0.1rem;
        p{ color:rgba(0,0,0,1); .font2; }
        img{ width: 0.27rem; height: 0.27rem; }
    } 
    .Home_list{
        width: 100%; display: flex; margin-top: 0.4rem; padding-bottom: 0.08rem;
        section{
            width: 1rem; height: 1rem; position: relative;
            img{ width: 100%; height: 100%; }
            .complete{ width: 0.36rem; height: 0.36rem; position: absolute; bottom: 0; right: 0; }
        }
        .Home_list_content{
            width: calc(100% - 0.3rem - 1rem); margin-left: 0.3rem;
            div{
                width: 100%;
                display: flex; justify-content: space-between; line-height: 0.35rem;
            }
            div:nth-child(1){
                p{ color:rgba(0,0,0,1); .font1; }
                span{ font-size: 0.28rem; .font2; color:rgba(237,109,0,1); }
            }
            div:nth-child(2){
                color:rgba(234,22,22,1); .font3; line-height: 0.45rem; height: 0.45rem;
                overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;
            }
            div:nth-child(3){
                color:rgba(128,128,128,1); .font3; margin-top: 0.15rem; 
                span{ font-size: 0.28rem; }
            }
            .supplement{ font-size: 0.28rem; color: #ED6D00; .font2; margin-top: 0.1rem;}
            .ing{ color: rgba(3,169,244,1)!important; }
            .end{ color: rgba(128,128,128,1)!important; }
        }
    }
}


.Home_no{
    width: 100%; text-align: center; padding-top: 2rem;
    p{ font-size: 0.24rem; color: #CECECE; line-height: 0.6rem; }
}


</style>