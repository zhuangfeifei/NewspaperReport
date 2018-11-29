<template>
    <div id="Management">

        <nav class="Management">
            <div v-for="(item,index) in tab_list" :key="index" :class="{Management_active: tabShow == index}">{{item}}</div>
        </nav>

        <div class="Management_main">
           <div class="Management_main_" v-for="(item,index) in getUsetList" :key="index">
               <section><img :src="item.avatar" alt=""></section>
               <div class="Management_main_content">
                   <div><span>{{item.userName}}</span><p>{{item.role_type == 0 ? '报修员' : '维修人'}}</p></div>
                   <div>{{item.deptName}}</div>
               </div>
           </div>
        </div>

        <div v-if="getUsetList.length == 0" class="Home_no">
            <van-icon name="records" size="0.7rem" color="#CECECE"/>
            <p>暂无相关数据</p>
        </div>

        <div @click="$router.replace('/AddEmployees')" class="Management_btn">添加</div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            tabShow: 0, tab_list:[ '内部员工','外部人员' ],
        }
    },
    components: {
        
    },
    computed: {
        getUsetList(){
            return this.$store.state.getUsetList
        }
    },
    created(){
        document.title = '团队管理'
        this.$store.dispatch('getUsetList', this.tabShow)
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
#Management{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.Management{
    width: 100%; height: 0.86rem; .font2; display: flex;
    div{  
        width: 50%; height: 100%; text-align: center; line-height: 0.86rem; font-size: 0.28rem;
    }
    .Management_active{ border-bottom: 0.04rem solid #219DB9; color: #219DB9; }
}

.Management_main{
    width: 100%; background-color: white;
    .Management_main_{
        width: 100%; height: 1.33rem; padding: 0 0.3rem; display: flex; justify-content: space-between; align-items: center;
        section{ width: 0.72rem; height: 0.72rem; img{ width: 100%; height: 100%; border-radius: 50%; } }
        .Management_main_content{
            width: 5.88rem; height: 100%; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between; align-items: center;
            span{ color: #000000; .font2; } p{ font-size: 0.28rem; color: #4B4B4B; .font3; }
            div:nth-child(2){ color: #4B4B4B; .font3; }
        }
    }
    .Management_main_:last-child{
        .Management_main_content{ border: 0; }
    }
}


.Home_no{
    width: 100%; text-align: center; padding-top: 2rem;
    p{ font-size: 0.24rem; color: #CECECE; line-height: 0.6rem; }
}


.Management_btn{
    width: 6.7rem; height: 0.96rem; text-align: center; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2;
    background:linear-gradient(90deg,rgba(33,205,209,1),rgba(33,157,185,1)); border-radius: 0.48rem; position: fixed; left: 0.4rem; bottom: 0.72rem;
}

</style>