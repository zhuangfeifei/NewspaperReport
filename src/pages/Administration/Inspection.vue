<template>
    <div id="Inspection">

        <nav class="Inspection"><p>填写巡检缺陷信息</p></nav>
        <div class="Inspection_main">
            <div class="Inspection_main_ last"><span>紧急</span><img class="isOpen" @click="isOpen = !isOpen" :src="isOpen ? img[1] : img[0]" alt=""></div>
            <div class="Inspection_main_">
                <span>名称</span><van-field class="input input_more" v-model="message" type="textarea" placeholder="请选择缺陷设备名称" rows="1" autosize />
                <img class="sweep" src="../../assets/img/sweep.png" alt="">
                <img class="more" src="../../assets/img/more.png" alt="">
            </div>
            <div class="Inspection_main_"><span>编号</span><van-field class="input" v-model="message" type="textarea" placeholder="设备自动带出" rows="1" autosize /></div>
            <div class="Inspection_main_"><span>地点</span><van-field class="input" v-model="message" type="textarea" placeholder="设备自动带出" rows="1" autosize /></div>
            <div class="Inspection_main_">
                <span>类别</span><van-field class="input input_mores" v-model="message" type="textarea" placeholder="请选择问题类别" rows="1" autosize />
                <img class="more" src="../../assets/img/more.png" alt="">
            </div>
            <div class="Inspection_main_"><span>描述</span><van-field class="input" v-model="message" type="textarea" placeholder="请对缺陷情况进行适当描述" rows="1" autosize /></div>
            <div class="Inspection_main_"><span>备注</span><van-field class="input" v-model="message" type="textarea" placeholder="添加备注" rows="1" autosize /></div>
        </div>
        <nav class="Inspection"><p>添加语音或拍照</p></nav>
        <div class="Inspection_main">
            <Photo-Speech></Photo-Speech>
        </div>

        

        <div class="Inspection_footer">确定提交</div>

    </div>
</template>

<script>
import PhotoSpeech from '../../components/_PhotoSpeech'
export default {
    data() {
        return {
            img:[require('../../assets/img/no.png'),require('../../assets/img/open.png')],isOpen:false,isVoice:false,message:''
        }
    },
    components: {
        'Photo-Speech': PhotoSpeech
    },
    computed: {
        
    },
    created(){
        document.title = '随机巡检'
        
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
#Inspection{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.Inspection{
    width: 100%; height: 1rem; display: flex; justify-content: space-between; padding: 0.45rem 0.3rem;
    p{ color: #808080; font-size: 0.28rem; }
    div{ 
        width: 1.4rem; height: 0.4rem; text-align: center; line-height: 0.4rem; border: 0.02rem solid #EF3F4A; border-radius: 0.2rem; 
        font-size: 0.24rem; color: #EF3F4A;
    }
}

.Inspection_main{
    width: 100%; background:rgba(255,255,255,1); padding: 0 0.29rem;
    .Inspection_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between; padding-bottom: 0.02rem;
        .input{ width: 85%; padding: 0; margin-top: 0.22rem; padding-bottom: 0.22rem; color:rgba(75,75,75,1); }
        .input_more{ width: 65%; }
        .input_mores{ width: 77%; }
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

.Inspection_footer{
    width: 100%; height: 0.96rem; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2; background:rgba(33,157,185,1);
    position: fixed; bottom: 0; left: 0; text-align: center;
}



</style>