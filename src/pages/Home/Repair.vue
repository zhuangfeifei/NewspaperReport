<template>
    <div id="Repair">

        <div class="Repair_main">
            <div class="Repair_main_"><span>维修描述</span><van-field class="input" v-model="list.dealRemark" type="textarea" placeholder="简单描述处理结果" rows="1" autosize /></div>
            <div class="Repair_main_"><span>维修工时</span><div><van-field class="input inputs" v-model="list.workHours" type="textarea" placeholder="0" rows="1" autosize />小时</div></div>
            <div class="Repair_main_"><span>维修备件</span><van-field class="input" v-model="list.parts" type="textarea" placeholder="请输入维修所用备件" rows="1" autosize /></div>
            <Photo-Speech></Photo-Speech>
        </div>

        <div class="Repair_footer" v-if="isFocus" @click="add">提交</div>

    </div>
</template>

<script>
import PhotoSpeech from '../../components/_PhotoSpeech'
export default {
    data() {
        return {
            list:{ repairId:'', dealRemark:'', dealAudioUrl:'', dealPath:'', workHours:'', parts: '' },
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
        document.title = '已修好'
        this.list.repairId = this.$route.query.id

        this.focus()
    },
    methods: {
        add(){
            if(this.list.repairId != '' && this.list.dealRemark != '' && this.list.workHours != '' && this.list.parts != ''){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration:0
                })
                if(this.imgFile != ''){
                    this.$store.dispatch('uploadPicture')
                    .then(res =>{
                        // console.log(res)
                        this.list.dealPath = res.message
                        this.$store.dispatch('repairOk', this.list)
                    })
                    .catch(err =>{})
                }else{
                    this.$store.dispatch('repairOk', this.list)
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
#Repair{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.Repair_main{
    width: 100%; background:rgba(255,255,255,1); padding: 0 0.29rem;
    .Repair_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between; padding-bottom: 0.01rem;
        .input{ width: 78%; padding: 0; margin-top: 0.22rem; padding-bottom: 0.22rem; color:rgba(75,75,75,1); }
        span{ color:rgba(0,0,0,1); .font2; }
        .inputs{ width: 10%; color: #EA1616; .font3; } 
        div{ width: 78%; display: flex; }
    }
    div:last-child{ 
        border: 0; 
        .isOpen{ width: 0.8rem; height: 0.49rem; margin-top: 0.2rem; }
    }
}

.Repair_footer{
    width: 100%; height: 0.96rem; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2; background:rgba(33,157,185,1);
    position: fixed; bottom: 0; left: 0; text-align: center;
}





</style>