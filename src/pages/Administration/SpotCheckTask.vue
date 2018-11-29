<template>
    <div id="SpotCheck">

        <nav class="Home">
            <div class="Home_tab">
                <div v-for="(item,index) in tab_list" :key="index" :class="{Home_active: tabShow == index}" @click="tab(index)">{{item}}</div>
            </div>
        </nav>

        <div class="SpotCheck_main">
            <div class="SpotCheck_main_Statistics"><span>共计2条</span></div>
            <div class="SpotCheck_list" @click="details(index)" v-for="(item,index) in 2" :key="index">
                <section><img :src="index==0 ? img[0] : img[1]" alt=""></section>
                <div class="SpotCheck_list_content">
                    <span>B管1层消防栓</span>
                    <div><span>未检(9)</span><p>已检(0)</p></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            value:'',tabShow: 0, tab_list:[ '今日任务','今日完成' ],
            img:[require('../../assets/img/TheEarly.png'),require('../../assets/img/ThisNight.png') ],
        }
    },
    components: {
        
    },
    computed: {
        
    },
    created(){
        document.title = '点检任务'
    },
    methods: {
        tab(index){
            this.tabShow = index
        },
        details(index){
            this.$router.push({path:'/Check'})
        }
    },
}
</script>

<style lang="less" scoped>
#SpotCheck{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1);
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.Home{
    width: 100%; height: 1rem; padding-top: 0.2rem; .font2;
    .Home_tab{
        width: 3.6rem; height: 0.58rem; margin: 0 auto; display: flex; color: #219DB9;
        border: 0.03rem solid #219DB9; border-radius: 0.1rem; box-shadow:0px 0.2rem 0.8rem 0px rgba(38,38,38,0.1);
        div{
            width: 50%; height: 100%; text-align: center; line-height: 0.54rem; font-size: 0.26rem;
        }
        div:nth-child(1){ border-top-left-radius: 0.05rem; border-bottom-left-radius: 0.05rem; border-right: 0.03rem solid #219DB9; }
        div:nth-child(3){ border-top-right-radius: 0.05rem; border-bottom-right-radius: 0.05rem; border-left: 0.03rem solid #219DB9; }
        .Home_active{
            background-color: #219DB9; color: white;
        }
    }
}

.SpotCheck_main{
    width: 100%; padding: 0.4rem 0.3rem 0 0.3rem; background-color: white;
    .SpotCheck_main_Statistics{ 
        display: flex; justify-content: space-between;
        font-size: 0.28rem; color:rgba(128,128,128,1); .font3; border-bottom: 0.01rem solid rgba(206,206,206,1); padding-bottom: 0.1rem;
        p{ color:rgba(0,0,0,1); .font2; }
        img{ width: 0.27rem; height: 0.27rem; }
    } 
    .SpotCheck_list{
        width: 100%; height: 1.96rem; display: flex; border-bottom: 0.01rem solid rgba(206,206,206,1);
        section{
            width: 1rem; height: 1rem; margin-top: 0.48rem;
            img{ width: 100%; height: 100%; }
        }
        .SpotCheck_list_content{
            width: calc(100% - 0.3rem - 1rem); margin-left: 0.3rem; color:rgba(0,0,0,1); line-height: 1.96rem; display: flex; justify-content: space-between;
            span{ font-size: 0.36rem; .font3; }
            div{
                line-height: 0.7rem; padding-top: 0.3rem;
                span{ font-size: 0.3rem; color: #EF3F4A; .font2; }
                p{ font-size: 0.3rem; color: #219DB9; .font2; }
            }
        }
    }
    .SpotCheck_list:last-child{
        border: 0;
    }
}



</style>