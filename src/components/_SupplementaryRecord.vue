<template>
    <div v-cloak id="_SupplementaryRecord" v-if="!isLoading">

        <div class="SupplementaryRecord" v-if="repairDetail != '' && repairDetail.slList.length > 0">
            <nav class="SupplementaryRecord_nav"><span>补充记录</span><span @click="sort">倒序查看</span></nav>
            <div class="SupplementaryRecord_list" v-for="(item,index) in repairDetail.slList" :key="index">
                <van-row>
                    <van-col span="3"><section><img :src="item.avatar" alt=""></section></van-col>
                    <van-col span="21">
                        <div class="SupplementaryRecord_list_">
                            <div class="SupplementaryRecord_list_name"><span>{{item.suppleDeptName}} {{item.suppleUserName}}</span><span v-if="item.is_see == 1">报修人可见</span></div>
                            <p class="SupplementaryRecord_list_date">{{item.supple_time}}</p>
                            <div class="SupplementaryRecord_list_content">{{item.supple_remark}}</div>
                            <p class="SupplementaryRecord_list_img"><span @click="play(item.supple_audio_url)">语音</span><span>({{item.supple_audio_url != '' ? 1 : 0}})</span><span @click="imgPreview(item.supple_path)">照片</span><span>({{item.supple_path.split(',').length || 0}})</span></p>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>

        <audio id="myaudio" ref="myaudio">
            <source src="" ref="myaudio1" type="audio/type='audio/ogg'" />
            <source src="" ref="myaudio2" type="audio/mpeg" />
        </audio>

    </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
    data() {
        return {
            
        }
    },
    props:['repairDetail'],
    components: {
        
    },
    computed: {
        imgUrl(){
            return this.$store.state.imgUrl
        },
        isLoading(){
            return this.$store.state.isLoading
        },
    },
    created(){
        
        
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
        play(url){
            if(url != ''){
                // this.$refs.myaudio1.src =  `${this.imgUrl}video/${url}`
                // this.$refs.myaudio2.src =  `${this.imgUrl}video/${url}`
                // this.$refs.myaudio.play()
                // console.log(this.$refs.myaudio1.src)
                // console.log(this.$refs.myaudio2.src)
                var myAuto = document.getElementById('myaudio');
                myAuto.src = `${this.imgUrl}video/${url}`
                myAuto.play();
                // console.log(myAuto)
                // myAuto.pause();
                // setTimeout(function () {
                //     myAuto.play();
                // }, 150);
            }
        }
    },
}
</script>

<style lang="less" scoped>

[v-cloak] {
  display: none;
}

#_SupplementaryRecord{
    width: 100%; background:rgba(246,246,246,1);
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.SupplementaryRecord{
    width: 100%; background-color: white; margin-top: 0.2rem; padding-bottom: 0.48rem;
    .SupplementaryRecord_nav{
        width: 100%; height: 0.88rem; line-height: 0.88rem; color:rgba(0,0,0,1); .font2; border-bottom: 0.01rem solid rgba(206,206,206,1); padding:  0 0.3rem;
        span:nth-child(2){ font-size: 0.24rem; color:rgba(234,22,22,1); .font3; float: right; }
    }
    .SupplementaryRecord_list{
        width: 100%; padding: 0 0.3rem; margin-top: 0.48rem;
        section{
            width: 100%; height: 100%;
            img{ width: 0.64rem; height: 0.64rem; border-radius: 50%; }
        }
        .SupplementaryRecord_list_{
            width: 100%;
            .SupplementaryRecord_list_name{
                width: 100%; height: 0.3rem; display: flex; justify-content: space-between; line-height: 0.3rem; color:rgba(0,0,0,1); .font3;
                span{ font-size: 0.28rem; }
                span:nth-child(2){ color:rgba(75,75,75,1); }
            }
            .SupplementaryRecord_list_date{ font-size: 0.24rem; color:rgba(75,75,75,1); .font3; line-height: 0.5rem; }
            .SupplementaryRecord_list_content{ 
                width: 100%; max-height: 0.8rem; line-height: 0.4rem;
                font-size: 0.28rem; color:rgba(0,0,0,1); .font3; 
                overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
            }
            .SupplementaryRecord_list_img{  
                color:rgba(237,109,0,1); .font3; line-height: 0.6rem; 
                span:nth-child(2n-1){ text-decoration: underline; } 
                span:nth-child(2n){ margin-right: 0.56rem; } 
            }
        }
    }
}



</style>