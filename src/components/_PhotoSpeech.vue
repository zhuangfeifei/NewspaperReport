<template>
    <div id="_PhotoSpeech">

        <div class="_PhotoSpeech_main">
            <div class="_PhotoSpeech_main_">
                <span>图片</span>
                <section class="_PhotoSpeech_main_files">
                    <img class="camera" src="../assets/img/camera.png" alt=""><span>拍照/添加照片</span>
                    <van-uploader class="_PhotoSpeech_main_file" :after-read="onRead" :disabled="imgFile.length > 2"></van-uploader>
                    <section class="_PhotoSpeech_main_files_img">
                        <div v-for="(item,index) in imgFile" :key="index">
                            <img :src="item.content" alt="">
                            <img @click="deletes(index)" class="delet" src="../assets/img/deleteImg.png" alt="">
                        </div>
                    </section>
                </section>
            </div>
            <div v-if="voice != false ? true : voice" class="_PhotoSpeech_main_">
                <span>语音</span>
                <section class="_PhotoSpeech_main_files">
                    <img class="Voice" src="../assets/img/Voice.png" alt=""><span>按住说话</span>
                    <div class="_PhotoSpeech_main_files_Voice" @touchstart='touchStart' @touchend='touchend'>
                        <section :class="{isVoices: isVoice}"></section>
                        <img v-if="isVoice" src="../assets/img/opening.png" alt="">
                        <span v-if="!isVoice && recording.END >= 0">{{parseInt((recording.END - recording.START)/1000)}}”</span>
                    </div>
                    <img v-if="serverId != ''" @click="VoiceDelet" class="Voice_delet" src="../assets/img/deleteImg.png" alt="">
                </section>
            </div>
        </div>

    </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            isVoice:false, imgFile:[], isFile: true,
            recording:{
                START: 0, END: 0, recordTimer:'', localId:''
            }
        }
    },
    props:['voice'],
    components: {
        
    },
    beforeCreate(){
        
    },
    computed: {
        serverId(){
            return this.$store.state.serverId
        },
    },
    created(){
        // console.log(this.voice, this.voice != false ? true : this.voice)
        
        this.wx()
    },
    methods: {
        onRead(file) {
            // console.log(file)
            this.imgFile.push(file)
            this.$store.commit('imgFile_', this.imgFile)
        },
        voiceing(){
            this.isVoice = true
            setTimeout(()=>{
                this.isVoice = false
            },5000)
        },
        deletes(index){
            this.imgFile.splice(index,1)
            this.$store.commit('imgFile_', this.imgFile)
        },
        VoiceDelet(){
            this.$store.commit('serverID', '')
            this.recording.END = 0
            this.recording.START = 0
        },
        touchStart(){
            this.isVoice = true
            if(this.serverId == ''){
                this.recording.START = new Date().getTime()
                this.recording.recordTimer = setTimeout(()=>{
                    wx.startRecord({
                        success: res =>{
                            // console.log('开始')
                        },
                        cancel: function () {
                            alert('用户拒绝授权录音');
                        }
                    });
                },500);
            }else{
                wx.playVoice({
                    localId: this.recording.localId // 需要播放的音频的本地ID，由stopRecord接口获得
                });
                let time = this.recording.END - this.recording.START
                setTimeout(()=>{
                    this.isVoice = false
                }, time)
            }
        },
        touchend(){
            if(this.serverId == ''){
                this.recording.END = new Date().getTime()
                if((this.recording.END - this.recording.START) < 500){
                    this.recording.END = 0
                    this.recording.START = 0
                    //小于300ms，不录音
                    clearTimeout(this.recording.recordTimer);
                }else{
                    this.isVoice = false
                    wx.stopRecord({
                        success: res=> {
                            // console.log(res)
                            this.recording.localId = res.localId;
                            this.uploadVoice();
                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
                }
            }
        },
        uploadVoice(){
            //调用微信的上传录音接口把本地录音先上传到微信的服务器
            //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
            wx.uploadVoice({
                localId: this.recording.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: res=> {
                    //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
                    this.$store.commit('serverID', res.serverId)
                }
            });
        },
        wx(){
            this.$store.dispatch('shire')
            .then(res =>{
                wx.config({
                    beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.corpid, // 必填，企业微信的corpID
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonce, // 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名，见附录1
                    jsApiList: ['startRecord','stopRecord','uploadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(()=>{
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    
                    // console.log(1)
                    
                });
            })
            .catch(err => console.log(err))
        },
    },
    destroyed(){
        this.$store.commit('imgFile_', '')
        this.$store.commit('serverID', '')
    }
}
</script>

<style lang="less" scoped>
#_PhotoSpeech{
    width: 100%;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }


._PhotoSpeech_main{
    width: 100%; background:rgba(255,255,255,1);
    ._PhotoSpeech_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between;
        span{ color:rgba(0,0,0,1); .font2; }
        ._PhotoSpeech_main_files{ 
            width: 90%; position: relative;
            span{ float: right; color: rgba(239,63,74,1); font-size: 0.24rem; .font3; }
            .camera{ width: 0.48rem; height: 0.39rem; margin-top: 0.23rem; float: right; margin-left: 0.2rem; }
            ._PhotoSpeech_main_file{ position: absolute; top: 0; right: 0; width: 40%; height: 0.8rem; opacity: 0; }
            ._PhotoSpeech_main_files_img{
                width: 100%; clear: both; padding-left: 0.4rem; display: flex;
                div{
                    width: 1.56rem; height: 1.56rem; margin-right: 0.2rem; margin-bottom: 0.3rem; position: relative;
                    img{ width: 1.56rem; height: 1.56rem; }
                    .delet{ width: 0.25rem; height: 0.25rem; position: absolute; right: -0.125rem; top: -0.125rem; }
                }
            }
            .Voice{ width: 0.3rem; height: 0.48rem; margin-top: 0.2rem; float: right; margin-left: 0.2rem; }
            ._PhotoSpeech_main_files_Voice{
                clear: both; width: 4rem; height: 0.66rem; border: 0.015rem solid #4B4B4B; border-radius: 0.5rem; margin-bottom: 0.35rem; margin-left: 0.4rem;
                span{ line-height: 0.66rem; float: right; margin-right: 1.7rem; color:rgba(75,75,75,1); .font2; }
                img{ width: 0.85rem; height: 0.06rem; margin: 0.3rem 0; margin-left: 1.1rem; pointer-events: none; }
                & section{
                    width: 0.24rem; height: 0.36rem; margin: 0.13rem 0.16rem; border-radius: 50%; float: left;
                    background: url('../assets/img/play.png') no-repeat; background-size: 0.24rem 0.36rem;
                }
                .isVoices{
                    background: url('../assets/img/playing.png') no-repeat; background-size: 0.24rem 0.36rem;
                    -webkit-animation: dong 1s linear 0s infinite alternate;
                    animation: dong 1s linear 0s infinite alternate;
                }
                -webkit-user-select:none;
                -moz-user-select:none;
                -ms-user-select:none;
                user-select:none; 
            }
            .Voice_delet{
                width: 0.25rem; height: 0.25rem; position: absolute; right: 1rem; top: 1.05rem;
            }
        }
    }
    div:last-child{ 
        border: 0; 
        .isOpen{ width: 0.8rem; height: 0.49rem; margin-top: 0.2rem; }
    }
}

@keyframes dong{
    from{
        width: 0.05rem;
    }
    to{
        width: 0.3rem; 
    }
}
@-webkit-keyframes dong{
    from{
        width: 0.05rem; 
    }
    to{
        width: 0.3rem;
    }
}

</style>