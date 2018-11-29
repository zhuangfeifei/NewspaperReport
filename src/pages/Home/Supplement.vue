<template>
    <div id="Supplement">

        <div class="Supplement_main">
            <div class="Supplement_main_"><span>描述</span><van-field class="input" v-model="list.suppleRemark" type="textarea" placeholder="简单描述处理结果" rows="1" autosize /></div>
            <Photo-Speech></Photo-Speech>
            <div class="Supplement_main_ last"><span>报修人可见</span><img class="isOpen" @click="list.isSee == 0 ? list.isSee = 1 : list.isSee = 0" :src="list.isSee == 0 ? img[0] : img[1]" alt=""></div>
        </div>

        

        <div class="Supplement_footer" v-if="isFocus" @click="add">提交</div>

    </div>
</template>

<script>
import PhotoSpeech from '../../components/_PhotoSpeech'
export default {
    data() {
        return {
            img:[require('../../assets/img/no.png'),require('../../assets/img/open.png')],isOpen:false,isVoice:false,message:'',
            list:{ suppleRemark:'', suppleAudioUrl:'', supplePath:'', isSee:0, repairId:'' },
            isFocus:true
        }
    },
    components: {
        'Photo-Speech': PhotoSpeech
    },
    computed: {
        imgFile(){
            return this.$store.state.imgFile
        },  
    },
    created(){
        document.title = '补充'

        this.list.repairId = this.$route.query.id

        this.focus()
    },
    methods: {
        add(){
            if(this.list.suppleRemark != '' && this.list.repairId != ''){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration:0
                })
                if(this.imgFile != ''){
                    this.$store.dispatch('uploadPicture')
                    .then(res =>{
                        // console.log(res)
                        this.list.supplePath = res.message
                        this.$store.dispatch('addSupplement', this.list)
                    })
                    .catch(err =>{})
                }else{
                    this.$store.dispatch('addSupplement', this.list)
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
    },
}
</script>

<style lang="less" scoped>
#Supplement{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.Supplement_main{
    width: 100%; background:rgba(255,255,255,1); padding: 0 0.29rem;
    .Supplement_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between;
        .input{ width: 85%; padding: 0; margin-top: 0.22rem; padding-bottom: 0.22rem; color:rgba(75,75,75,1); }
        span{ color:rgba(0,0,0,1); .font2; }
    }
    .last{ 
        border-bottom: 0; border-top: 0.01rem solid #CECECE;
        .isOpen{ width: 0.8rem; height: 0.49rem; margin-top: 0.2rem; }
    }
}

.Supplement_footer{
    width: 100%; height: 0.96rem; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2; background:rgba(33,157,185,1);
    position: fixed; bottom: 0; left: 0; text-align: center;
}



</style>