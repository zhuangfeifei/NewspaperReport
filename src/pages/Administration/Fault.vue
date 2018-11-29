<template>
    <div id="Fault">

        <nav class="Fault">
            <div @click="$router.push({path:'/DailyRepair'})">日常设备</div><div @click="$router.push({path:''})">设备设施</div>
            <!-- <div @click="$router.push({path:'/DailyRepair'})">日常设备</div><div @click="$router.push({path:'/Equipment'})">设备设施</div> -->
        </nav>

    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    components: {
        
    },
    computed: {
        
    },
    created(){
        document.title = '故障报修'
        
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
#Fault{
    width: 100%; height: 100vh; background:rgba(246,246,246,1);
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }


.Fault{
    width: 100%; display: flex;
    div{ 
        width: 3.15rem; height: 3.15rem; background-color: rgba(33,205,209,0.1);; border: 0.03rem solid rgba(33,157,185,1); margin-left: 0.4rem; text-align: center; line-height: 3.15rem;
        font-size: 0.6rem; border-radius: 0.1rem; color:rgba(0,0,0,1); .font2; margin-top: 3rem;
    }
}

</style>