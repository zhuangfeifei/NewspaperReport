<template>
    <div class="bottom" v-if="userId">

        <div class="footer">
            <div v-for="(item,index) in list" :key="index" @click="changes(index)">
                <img :src="actives == index ? item.icon : item.icons" :class="{circular: index == 1}" alt="">
                <p :class="{bottom_active: actives == index}">{{item.name}}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[
                { name: '看板', icon: require('../assets/img/Kanbans.png'), icons: require('../assets/img/Kanban.png'), url:'/' },
                { name: '', icon: require('../assets/img/circular.png'), icons: require('../assets/img/circular.png'), url:'/Fault' },
                { name: '报修管理', icon: require('../assets/img/Repairs.png'), icons: require('../assets/img/Repair.png'), url:'/Administration' },
            ],
        }
    },
    computed:{
        actives(){
            return this.$store.state.active
        },
        userId(){
            return this.$store.state.userId
        },
    },
    methods: {
        changes(index){
            this.$store.commit('ACTIVE', index)
            this.$router.push({path: this.list[index].url})
        }
    },
}
</script>

<style lang="less" scoped>
#bottom{
    width: 100%; height: 1rem; position: fixed; bottom: 0; left: 0;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.footer{
    width: 100%; height: 1rem; position: fixed; bottom: 0; left: 0; display: flex; 
    border-top: 0.01rem solid rgba(206,206,206,1); background:rgba(255,255,255,1);
    div{
        width: 33.33%; height: 100%; text-align: center; padding-top: 0.1rem;
        img{ width: 0.48rem; height: 0.48rem; }
        .circular{ width: 0.64rem; height: 0.64rem; margin-top: 0.05rem; }
        p{ color:rgba(75,75,75,1); font-size: 0.22rem; line-height: 0.2rem; .font3; }
        .bottom_active{ color:rgba(239,63,74,1); }
    }
}
</style>