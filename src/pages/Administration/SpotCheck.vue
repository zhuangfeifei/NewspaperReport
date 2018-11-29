<template>
    <div id="SpotCheck">

        <nav class="SpotCheck">
            <div>
                <input class="SpotCheck_input" type="text" v-model="value" placeholder="搜索">
                <img src="../../assets/img/Search.png" alt="">
            </div>
        </nav>

        <div class="SpotCheck_main">
            <div class="SpotCheck_main_Statistics"><span>共计{{list.length}}条</span></div>
            <div class="SpotCheck_list" @click="$router.push({path:'/FacilitiesDetails', query:{id: item.id}})" v-for="(item,index) in list" :key="index">
                <!-- typ 4 设施 5 设备 -->
                <section><img :src="item.type==0 ? img[0] : img[1]" alt=""></section>  
                <div class="SpotCheck_list_content">
                    <span>{{item.num}}</span><span>{{item.equfac_name}}</span>
                </div>
            </div>
        </div>
        
        <div class="SpotCheck_footer" @click="$router.push({path:'/EquipmentAddition'})">添加</div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            value:'',
            img:[require('../../assets/img/equipment.png'),require('../../assets/img/facilities.png') ],
        }
    },
    components: {
        
    },
    beforeCreate(){
        this.$store.dispatch('list')
    },
    computed: {
        list(){
            return this.$store.state.list
        }
    },
    created(){
        document.title = '报事报修'
    },
    methods: {
        
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

.SpotCheck{
    width: 100%; height: 1.32rem; .font2; background:linear-gradient(90deg,rgba(33,205,209,1),rgba(33,157,185,1)); padding: 0 0.3rem; padding-top: 0.4rem;
    div{
        width: 100%; height: 0.72rem; background-color: white; border-radius: 0.1rem; position: relative;
        .SpotCheck_input{ width: 100%; height: 0.72rem; border: 0; background: none; padding-left: 0.62rem; }
        img{ position: absolute; top: 0.22rem; left: 0.2rem; width: 0.28rem; height: 0.28rem; }
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
            width: calc(100% - 0.3rem - 1rem); height: 100%; margin-left: 0.3rem; color:rgba(0,0,0,1); line-height: 1.96rem;
            span:nth-child(1){ font-size: 0.36rem; .font1; }
            span:nth-child(2){ font-size: 0.36rem; .font3!important; color:rgba(75,75,75,1); margin-left: 0.59rem; }
            overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;
        }
    }
    .SpotCheck_list:last-child{
        border: 0;
    }
}

.SpotCheck_footer{
    width: 6.7rem; height: 0.96rem; line-height: 0.96rem; text-align: center; font-size: 0.36rem; color:rgba(255,255,255,1); .font1; 
    background:linear-gradient(90deg,rgba(33,205,209,1),rgba(33,157,185,1)); border-radius: 0.48rem; position: fixed; bottom: 0.64rem; left: 0.4rem;;
}


</style>