<template>
    <div id="DailyRepair">

        <nav class="DailyRepair"><p>填写报修缺陷信息</p> <div>日常报修</div></nav>
        <div class="DailyRepair_main">
            <div class="DailyRepair_main_ last"><p>紧急</p><img class="isOpen" @click="list.emerStatus == 1 ? list.emerStatus = 2 : list.emerStatus = 1" :src="list.emerStatus == 1 ? img[0] : img[1]" alt=""></div>
            <div class="DailyRepair_main_" @click="show = true"><span>类别</span><p class="input inputClass">{{categoryId}}</p><img class="more" src="../../assets/img/more.png" alt=""></div>
            <div class="DailyRepair_main_"><span>描述</span><van-field class="input" v-model="list.proDel" type="textarea" placeholder="请对缺陷情况进行适当描述" rows="1" autosize /></div>
            <div class="DailyRepair_main_"><span>地点</span><van-field class="input" v-model="list.happenAdd" type="textarea" placeholder="添加地点" rows="1" autosize /></div>
            <div class="DailyRepair_main_"><p>备注</p><van-field class="input" v-model="list.remarks" type="textarea" placeholder="添加备注" rows="1" autosize /></div>
        </div>
        <nav class="DailyRepair"><p>添加语音或拍照</p></nav>
        <div class="DailyRepair_main">
            <Photo-Speech></Photo-Speech>
        </div>

        <div class="DailyRepair_footer" v-if="isFocus" @click="Add">确定提交</div>

        <van-actionsheet v-if="getRepairCategoryList" v-model="show" :actions="getRepairCategoryList" @select="onSelect" />
        
    </div>
</template>

<script>
import PhotoSpeech from '../../components/_PhotoSpeech'
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            img:[require('../../assets/img/no.png'),require('../../assets/img/open.png')],isOpen:false,isVoice:false,message:'',
            show: false, categoryId:'',
            list:{ equfacId:'', repairSourceId: 1, emerStatus: 1, categoryId:'', proDel:'', remarks:'', happenAdd:'', audioUrl:'', path:'' },
            isFocus:true
        }
    },
    components: {
        'Photo-Speech': PhotoSpeech
    },
    beforeCreate(){
        this.$store.dispatch('getRepairCategoryList')
    },
    computed: {
        getRepairCategoryList(){
            return this.$store.state.getRepairCategoryList
        },
        imgFile(){
            return this.$store.state.imgFile
        },
        serverID(){
            return this.$store.state.serverId
        },
    },
    created(){
        document.title = '日常报修'
        // console.log(wx)
        
        this.focus()
    },
    methods: {
        onSelect(item){
            this.show = false
            this.categoryId = item.name
            this.list.categoryId = item.id
        },
        Add(){
            if(this.list.categoryId != '' && this.list.proDel != '' && this.list.happenAdd != ''){
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
                        this.list.audioUrl = this.serverID
                        this.$store.dispatch('reportRepair', this.list)
                    })
                    .catch(err =>{})
                }else{
                    this.list.audioUrl = this.serverID
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
        focus(){
            $(document).ready(()=>{
                var win_h = $(window).height();//关键代码
                window.addEventListener('resize', ()=> {
                    $(window).height() < win_h ? this.isFocus = false : this.isFocus = true
                });
            })
        },
        //  @focus="focus" @blur="blur"
        // focus(){
        //     let userAgent = navigator.userAgent
        //     userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1 ? this.isFocus = false : ''
        // },
        // blur(){
        //     this.isFocus = true
        // },
    },
}
</script>

<style lang="less" scoped>
#DailyRepair{
    width: 100%; height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.DailyRepair{
    width: 100%; height: 1rem; display: flex; justify-content: space-between; padding: 0.45rem 0.3rem;
    p{ color: #808080; font-size: 0.28rem; }
    div{ 
        width: 1.4rem; height: 0.4rem; text-align: center; line-height: 0.4rem; border: 0.02rem solid rgba(33,157,185,1); border-radius: 0.2rem; 
        font-size: 0.24rem; color: #219DB9;
    }
}

.DailyRepair_main{
    width: 100%; background:rgba(255,255,255,1); padding: 0 0.29rem;
    .DailyRepair_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between; padding-bottom: 0.02rem; align-items: center;
        .input{ width: 85%; padding: 0; margin-top: 0.22rem; padding-bottom: 0.22rem; color:rgba(75,75,75,1); .font3; }
        .inputClass{ width: 76%; margin: 0; padding: 0; }
        span,p{ color:rgba(0,0,0,1); .font2; }
        span::before{
            content: '*'; color: #EA1616; .font2; margin-left: -0.13rem;
        }
        .more{ width: 0.16rem; height: 0.29rem; }
    }
    .last{ 
        .isOpen{ width: 0.8rem; height: 0.49rem; }
    }
    div:last-child{ 
        border: 0; 
    }
}

.DailyRepair_footer{
    width: 100%; height: 0.96rem; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2; background:rgba(33,157,185,1);
    position: fixed; bottom: 0; left: 0; text-align: center;
}

</style>