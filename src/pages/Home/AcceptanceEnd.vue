<template>
    <div id="AcceptanceEnd">

        <Acceptance-item v-if="repairDetail" :repairDetail="repairDetail"></Acceptance-item>

        <div class="AcceptanceEnd_main" v-if="repairDetail">
            <div class="AcceptanceEnd_main_title">维修信息</div>
            <div class="AcceptanceEnd_main_content">
                <div>
                    <span>维修描述</span>
                    <section>
                        {{repairDetail.rp[0].deal_remark}}
                        <p class="SupplementaryRecord_list_img">
                            <span @click="play(repairDetail.rp[0].deal_audio_url)">语音</span><span>({{repairDetail.rp[0].deal_audio_url != '' ? 1 : 0}})</span>
                            <span @click="imgPreview(repairDetail.rp[0].deal_path)">照片</span><span v-if="repairDetail.rp[0].deal_path">({{repairDetail.rp[0].deal_path.split(',').length}})</span></p>
                    </section>
                </div>
                <div>
                    <span>维修人</span><section>{{repairDetail.rp[0].dealDeptname}} {{repairDetail.rp[0].dealUserName}}；工时 {{repairDetail.rp[0].work_hours}}</section>
                </div>
                <div>
                    <span>维修时间</span><section>{{repairDetail.rp[0].work_time}}</section>
                </div>
                <div>
                    <span>备件</span><section>{{repairDetail.rp[0].parts}}</section>
                </div>
            </div>
        </div>

        <SupplementaryRecord-item v-if="repairDetail" :repairDetail="repairDetail"></SupplementaryRecord-item>

        <div v-if="repairDetail.rp[0].status != 3" class="AcceptanceEnd_footer">
            <div @click="$router.push({path:'/Supplement'})">补充</div><div @click="confirm">维修确认</div>
        </div>

        <audio id="myaudio" ref="myaudio">
            <source src="" ref="myaudio1" type="audio/type='audio/ogg'" />
            <source src="" ref="myaudio2" type="audio/mpeg" />
        </audio>

    </div>
</template>

<script>
import { ImagePreview } from 'vant';
import AcceptanceItem from '../../components/_Acceptance'
import SupplementaryRecord from '../../components/_SupplementaryRecord'
export default {
    data() {
        return {
            isSort: false, repairId:''
        }
    },
    components: {
        'Acceptance-item': AcceptanceItem,
        'SupplementaryRecord-item': SupplementaryRecord,
    },
    beforeCreate(){
        let list = { repairId: this.$route.query.repairId, code: 0 }
        this.$store.dispatch('repairDetail', list)
    },
    computed: {
        repairDetail(){
            return this.$store.state.repairDetail
        },
        imgUrl(){
            return this.$store.state.imgUrl
        },
    },
    created(){
        document.title = '报修受理'
        
        this.repairId = this.$route.query.repairId
    },
    methods: {
        sort(){
            this.isSort = !this.isSort
            let list = { repairId: this.$route.query.repairId, code: this.isSort ? 1 : 0 }
            this.$store.dispatch('repairDetail', list)
        },
        imgPreview(imgList){
            if(imgList != ''){
                var imgArray = []
                for(let val of imgList.split(',')){
                    imgArray.push(this.imgUrl + val)
                }
                ImagePreview(imgArray)
            }
        },
        confirm(){
            this.$dialog.confirm({
                title: '确认维修？',
                message: ''
            }).then(() => {
                this.$store.dispatch('repairOkConfirm', this.repairId)
            }).catch(() => {
            // on cancel
            });
        },
        play(url){
            if(url != ''){
                var myAuto = document.getElementById('myaudio');
                myAuto.src = `${this.imgUrl}video/${url}`
                myAuto.play();
            }
        }
    },
}
</script>

<style lang="less" scoped>
#AcceptanceEnd{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }


.AcceptanceEnd_main{
    width: 100%; height: 5rem; background-color: white; margin-top: 0.2rem; 
    .AcceptanceEnd_main_title{  
        width: 100%; height: 0.88rem; line-height: 0.88rem; padding-left: 0.3rem; .font2; color:rgba(0,0,0,1); border-bottom: 0.01rem solid rgba(206,206,206,1);
    }
    .AcceptanceEnd_main_content{
        width: 100%; padding: 0 0.3rem; padding-top: 0.2rem;
        div{
            width: 100%; display: flex; justify-content: space-between; margin-top: 0.3rem;
            span{ font-size: 0.28rem; color:rgba(0,0,0,1); .font3; }
            section{
                width: calc(100% - 1.8rem); color:rgba(75,75,75,1); font-size: 0.28rem;  .font3;
                .SupplementaryRecord_list_img{  
                    span{color:rgba(237,109,0,1)!important; .font3; line-height: 0.6rem;} 
                    span:nth-child(2n-1){ text-decoration: underline; } 
                    span:nth-child(2n){ margin-right: 0.56rem; } 
                }
            }
        }
    }
}



.AcceptanceEnd_footer{
    width: 100%; height: 0.96rem; display: flex; position: fixed; bottom: 0; left: 0; background-color: white; border-top: 1px solid #219DB9;
    div{ width: 50%; height: 100%; line-height: 0.96rem; text-align: center; color: #219DB9; .font2; }
    div:nth-child(1){
        background-color: #219DB9; color: white;
    }
}

</style>