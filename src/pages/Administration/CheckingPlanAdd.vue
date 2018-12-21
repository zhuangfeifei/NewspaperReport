<template>
    <div id="CheckingPlanAdd">

        <div class="CheckingPlanAdd_main">
            <div class="CheckingPlanAdd_main_" @click="ShowList = true">
                <span>班次</span><p class="input_more">{{type.name}}</p>
                <img class="more" src="../../assets/img/more.png" alt="">
            </div>
            <div class="CheckingPlanAdd_main_" @click="ShowList = true">
                <span>检查人</span><p class="input_mores">{{type.name}}</p>
                <img class="more" src="../../assets/img/more.png" alt="">
            </div>
        </div>

        <div class="CheckingPlanAdd_footer" @click="Add">确定提交</div>

        <van-actionsheet v-if="lists" v-model="ShowList" :actions="lists" @select="onSelect" />
        <van-actionsheet v-if="getRepairCategoryList" v-model="problem" :actions="getRepairCategoryList" @select="onProblem" />

    </div>
</template>

<script>
import PhotoSpeech from '../../components/_PhotoSpeech'
export default {
    data() {
        return {
            type:'', ShowList: false, problem: false, problemList:'',
            lists:[{name: '早班'},{name:'中班'},{name:'晚班'}], 
        }
    },
    components: {
        'Photo-Speech': PhotoSpeech
    },
    beforeCreate(){
        this.$store.dispatch('checkPeoList')
        // this.$store.dispatch('getRepairCategoryList')
    },
    computed: {
        getRepairCategoryList(){
            return this.$store.state.getRepairCategoryList
        },
    },
    created(){
        document.title = '添加计划'
        
        // this.focus()
    },
    methods: {
        onSelect(item) {
            this.ShowList = false
            this.type = item
        },
        onProblem(item) {
            this.problem = false
            this.problemList = item
        },
        Add(){
            if(this.type != ''){
                this.list.equfacId = this.type.equfacId
                this.list.categoryId = this.problemList.id
                this.list.happenAdd = this.type.address
                this.list.audioUrl = this.serverID
                this.$toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration:0
                })
                if(this.imgFile != ''){
                    this.$store.dispatch('uploadPicture')
                    .then(res =>{
                        // console.log(res)
                        this.list.path = res.message
                        this.$store.dispatch('reportRepair', this.list)
                    })
                    .catch(err =>{})
                }else{
                    this.$store.dispatch('reportRepair', this.list)
                }
            }else{
                this.$dialog.alert({
                    title: '必填信息为空！',
                    message: ''
                }).then(() => {
                // on close
                });
            }
        },
    },
}
</script>

<style lang="less" scoped>
#CheckingPlanAdd{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.CheckingPlanAdd{
    width: 100%; height: 1rem; display: flex; justify-content: space-between; padding: 0.45rem 0.3rem;
    p{ color: #808080; font-size: 0.28rem; }
    div{ 
        width: 1.4rem; height: 0.4rem; text-align: center; line-height: 0.4rem; border: 0.02rem solid #EF3F4A; border-radius: 0.2rem; 
        font-size: 0.24rem; color: #EF3F4A;
    }
}

.CheckingPlanAdd_main{
    width: 100%; background:rgba(255,255,255,1); padding: 0 0.29rem;
    .CheckingPlanAdd_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between;
        .input_more{ width: 64%; }
        .input_mores{ width: 68%; }
        span{ color:rgba(0,0,0,1); .font2; }
        .more{ width: 0.16rem; height: 0.29rem; margin-top: 0.3rem; }
        .van-cell:not(:last-child)::after{ border: 0!important; }
    }
    .last{ 
        .isOpen{ width: 0.8rem; height: 0.49rem; margin-top: 0.2rem; }
    }
    div:last-child{ 
        border: 0; 
    }
}

.CheckingPlanAdd_footer{
    width: 100%; height: 0.96rem; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2; background:rgba(33,157,185,1);
    position: fixed; bottom: 0; left: 0; text-align: center;
}



</style>