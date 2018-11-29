<template>
    <div v-cloak id="_Acceptance" v-if="!isLoading">

        <nav class="_Acceptance">
            <van-row><van-col span="6">流程单号：</van-col>
            <van-col span="18" class="_Acceptance_OddNumbers">
                <span>{{repairDetail.rp[0].process_num}}</span><img v-if="repairDetail.rp[0].emer_status == 2" src="../assets/img/emergency.png" alt=""></van-col>
            </van-row>
        </nav>

        <div class="_Acceptance_main">
            <div class="_Acceptance_main_list">
                <span>报修分类</span><div>{{repairDetail.rp[0].category_name}}<div>日常报修</div></div>
            </div>
            <div class="_Acceptance_main_list">
                <span>问题描述</span><div>{{repairDetail.rp[0].pro_del}}</div>
            </div>
            <div class="_Acceptance_main_list">
                <span>发生地址</span><div>{{repairDetail.rp[0].happen_add}}</div>
            </div>
            <div class="_Acceptance_main_list">
                <span>备注</span><div>{{repairDetail.rp[0].remarks}}</div>
            </div>
            <div class="_Acceptance_main_list">
                <span>图片</span>
                <div v-if="repairDetail.rp[0].path != ''" @click="imgPreview(repairDetail.rp[0].path)">
                    <img class="_Acceptance_content_img" v-for="(item,index) in repairDetail.rp[0].path.split(',')" :key="index" :src="imgUrl+item" alt="">
                </div>
            </div>
            <div class="_Acceptance_main_list">
                <span>语音</span><div class="audio" @click="play(repairDetail.rp[0].audio_url)">语音({{repairDetail.rp[0].audio_url != '' ? 1 : 0}})</div>
            </div>
            <div class="_Acceptance_main_list" v-if="repairDetail.rp[0].status == 0">
                <span>报修人</span><div>{{repairDetail.rp[0].repairDeptName}} {{repairDetail.rp[0].repairUserName}}</div>
            </div>
            <div class="_Acceptance_main_list" v-if="repairDetail.rp[0].status == 0">
                <span>报修时间</span><div>{{repairDetail.rp[0].create_time}}</div>
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
        play(url){
            if(url != ''){
                var myAuto = document.getElementById('myaudio');
                myAuto.src = `${this.imgUrl}video/${url}`
                myAuto.play();
            }
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
    },
}
</script>

<style lang="less" scoped>

[v-cloak] {
  display: none;
}

#_Acceptance{
    width: 100%; background:rgba(246,246,246,1);
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

._Acceptance{
    width: 100%; height: 0.88rem; line-height: 0.88rem; background-color: white; padding-left: 0.3rem;
    color:rgba(0,0,0,1); .font2;
    ._Acceptance_OddNumbers{ 
        display: flex; justify-content: space-between;
        img{ width: 1.71rem; height: 0.88rem; }
    }
}

._Acceptance_main{
    width: 100%; margin-top: 0.2rem; background-color: white; padding: 0.6rem 0.3rem 0.2rem 0.3rem;
    ._Acceptance_main_list{
        width: 100%; display: flex; justify-content: space-between; margin-bottom: 0.3rem;
        span{ font-size: 0.28rem; color:rgba(0,0,0,1);.font3; } 
        div{
            width: calc(100% - 1.8rem); position: relative; color:rgba(75,75,75,1); font-size: 0.28rem;.font3;
            div{ 
                width: 1.6rem; height: 0.6rem; text-align: center; line-height: 0.6rem; color: #219DB9; border: 0.02rem solid #219DB9; 
                border-radius: 0.3rem; font-size: 0.28rem; .font2; position: absolute; right: 0; top: -0.1rem; 
            }
            ._Acceptance_content_img{ width: 1.5rem; height: 1.5rem; margin-top: 0.05rem; margin-right: 0.15rem; }
        }
        .audio{ color:rgba(237,109,0,1); }
    }
}



</style>