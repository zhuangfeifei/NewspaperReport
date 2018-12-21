<template>
    <div id="Equipment">

        <nav class="Equipment"><p>填写报修缺陷信息</p> <div>设备设施</div></nav>
        <div class="Equipment_main">
            <div class="Equipment_main_ last"><span>紧急</span><img class="isOpen" @click="list.emerStatus == 1 ? list.emerStatus = 2 : list.emerStatus = 1" :src="list.emerStatus == 1 ? img[0] : img[1]" alt=""></div>
            <div class="Equipment_main_" @click="ShowList = true">
                <span>名称</span><p class="input input_mores">{{type.name}}</p>
                <img class="more" src="../../assets/img/more.png" alt="">
            </div>
            <div class="Equipment_main_"><span>编号</span><p class="input input_mores input_moress">{{type.num}}</p></div>
            <div class="Equipment_main_"><span>地点</span><p class="input input_mores input_moress">{{type.address}}</p></div>
            <div class="Equipment_main_" @click="problem = true">
                <span>类别</span><p class="input input_mores">{{problemList.name}}</p>
                <img class="more" src="../../assets/img/more.png" alt="">
            </div>
            <div class="Equipment_main_"><span>描述</span><van-field class="input" v-model="list.proDel" type="textarea" placeholder="请对缺陷情况进行适当描述" rows="1" autosize /></div>
            <div class="Equipment_main_"><span>备注</span><van-field class="input" v-model="list.remarks" type="textarea" placeholder="添加备注" rows="1" autosize /></div>
        </div>
        <nav class="Equipment"><p>添加语音或拍照</p></nav>
        <div class="Equipment_main">
            <Photo-Speech></Photo-Speech>
        </div>

        <div class="Equipment_footer" v-if="isFocus" @click="Add">确定提交</div>

        <van-actionsheet v-if="lists" v-model="ShowList" :actions="lists" @select="onSelect" />
        <van-actionsheet v-if="getRepairCategoryList" v-model="problem" :actions="getRepairCategoryList" @select="onProblem" />

    </div>
</template>

<script>
import PhotoSpeech from '../../components/_PhotoSpeech'
export default {
    data() {
        return {
            img:[require('../../assets/img/no.png'),require('../../assets/img/open.png')],isOpen:false,isVoice:false,message:'',
            type:'', ShowList: false, problem: false, problemList:'',
            list:{ equfacId:'', repairSourceId: 2, emerStatus: 1, categoryId:'', proDel:'', remarks:'', happenAdd:'', audioUrl:'', path:'' }
        }
    },
    components: {
        'Photo-Speech': PhotoSpeech
    },
    beforeCreate(){
        this.$store.dispatch('list')
        this.$store.dispatch('getRepairCategoryList')
    },
    computed: {
        lists(){
            let array = []
            if(this.$store.state.list == ''){
                array.push({ name:'暂无', disabled: true })
            }else{
                for(let val of this.$store.state.list){
                    array.push({ name: val.equfac_name, equfacId: val.id, num: val.num, address: val.address })
                }
            }
            return array
        },
        getRepairCategoryList(){
            return this.$store.state.getRepairCategoryList
        },
        imgFile(){
            return this.$store.state.imgFile
        },
        serverID(){
            return this.$store.state.serverId
        },
        isFocus(){
            return this.$store.state.isFocus
        },
    },
    created(){
        document.title = '设备设施'
        
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
#Equipment{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.Equipment{
    width: 100%; height: 1rem; display: flex; justify-content: space-between; padding: 0.45rem 0.3rem;
    p{ color: #808080; font-size: 0.28rem; }
    div{ 
        width: 1.4rem; height: 0.4rem; text-align: center; line-height: 0.4rem; border: 0.02rem solid #EF3F4A; border-radius: 0.2rem; 
        font-size: 0.24rem; color: #EF3F4A;
    }
}

.Equipment_main{
    width: 100%; background:rgba(255,255,255,1); padding: 0 0.29rem;
    .Equipment_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between; padding-bottom: 0.02rem;
        .input{ width: 85%; padding: 0; margin-top: 0.22rem; padding-bottom: 0.22rem; color:rgba(75,75,75,1); }
        .input_more{ width: 65%; }
        .input_mores{ width: 77%; margin: 0; padding: 0; }
        .input_moress{ width: 85%; }
        span{ color:rgba(0,0,0,1); .font2; }
        .sweep{ width: 0.4rem; height: 0.4rem; margin-top: 0.25rem; }
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

.Equipment_footer{
    width: 100%; height: 0.96rem; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2; background:rgba(33,157,185,1);
    position: fixed; bottom: 0; left: 0; text-align: center;
}



</style>