<template>
    <div id="FacilitiesDetails">

        <div v-if="getEquAndFacDetailById" class="FacilitiesDetails_main">
            <div class="FacilitiesDetails_main_"><span>编号</span><div>{{getEquAndFacDetailById.num}}</div></div>
            <div class="FacilitiesDetails_main_"><span>类型</span><div>{{getEquAndFacDetailById.type}}</div></div>
            <div class="FacilitiesDetails_main_"><span>点检类型</span><div>{{getEquAndFacDetailById.tally_type}}</div></div>
            <div class="FacilitiesDetails_main_"><span>名称</span><div>{{getEquAndFacDetailById.equfac_name}}</div></div>
            <div class="FacilitiesDetails_main_"><span>描述</span><div>{{getEquAndFacDetailById.remark}}</div></div>
            <div class="FacilitiesDetails_main_"><span>地址</span><div>{{getEquAndFacDetailById.address}}</div></div>
            <div class="FacilitiesDetails_main_"><span>图片</span><div><img v-for="(item,index) in getEquAndFacDetailById.pictures.split(',')" :key="index" :src="imgUrl+item" alt=""></div></div>
            <div class="FacilitiesDetails_main_"><span>二维码</span><div><img :src="imgUrl+getEquAndFacDetailById.qrcode" alt=""></div></div>
            <div class="FacilitiesDetails_main_"><span>维护人</span><div>{{getEquAndFacDetailById.dealname}}</div></div>
            <div class="FacilitiesDetails_main_"><span>维护时间</span><div>{{getEquAndFacDetailById.maintenance_time}}</div></div>
        </div>

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
    beforeCreate(){
        this.$store.dispatch('getEquAndFacDetailById', this.$route.query.id)
    },
    computed: {
        getEquAndFacDetailById(){
            return this.$store.state.getEquAndFacDetailById[0]
        },
        imgUrl(){
            return this.$store.state.imgUrl
        },
    },
    created(){
        document.title = '设备设施详情'
        
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
#FacilitiesDetails{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.FacilitiesDetails_main{
    width: 100%; background:rgba(255,255,255,1); padding: 0 0.29rem;
    .FacilitiesDetails_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between;
        span{ color:rgba(0,0,0,1); .font2; }
        div{ width: 75%; color:rgba(75,75,75,1); .font3; img{ width: 1.6rem; height: 1.6rem; margin-right: 0.1rem; margin-top: 0.3rem; } }
    }
    div:last-child{ 
        border: 0; 
    }
}

.FacilitiesDetails_footer{
    width: 100%; height: 0.96rem; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2; background:rgba(33,157,185,1);
    position: fixed; bottom: 0; left: 0; text-align: center;
}





</style>