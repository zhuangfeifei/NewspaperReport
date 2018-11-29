<template>
    <div id="Check">

        <nav class="Check"><p>基础信息</p></nav>
        <div class="Check_main">
            <div class="Check_main_">
                <span>设备名称</span><van-field class="input input_more" v-model="message" type="textarea" placeholder="请选择缺陷设备名称" rows="1" autosize />
                <img class="sweep" src="../../assets/img/sweep.png" alt="">
                <img class="more" src="../../assets/img/more.png" alt="">
            </div>
            <div class="Check_main_"><span>设备地址</span><van-field class="input" v-model="message" type="textarea" placeholder="请输入地址" rows="1" autosize /></div>
            <div class="Check_main_"><span>点检结果</span><div><span>正常(2)</span><span>故障(0)</span><span>未检(0)</span></div></div>
        </div>
        <nav class="Check"><p>检查信息</p></nav>
        <div class="Check_main">
            <div class="Check_main_ last"><span>1</span><img class="isOpen" @click="isOpen = !isOpen" :src="isOpen ? img[1] : img[0]" alt=""></div>
            <div class="Check_main_ last"><span>2</span><img class="isOpen" @click="isOpen = !isOpen" :src="isOpen ? img[1] : img[0]" alt=""></div>
        </div>
        <nav class="Check"><p>缺陷信息</p></nav>
        <div class="Check_main">
            <div class="Check_main_"><span>描述</span><van-field class="input inputs" v-model="message" type="textarea" placeholder="请对缺陷情况进行适当描述" rows="1" autosize /></div>
            <Photo-Speech></Photo-Speech>
        </div>

        

        <div class="Check_footer">
            <div @click="$router.push({path:'/'})">保存</div><div @click="$router.push({path:'/'})">保存并提交</div>
        </div>

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
        document.title = '检查'
        
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
#Check{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.Check{
    width: 100%; height: 1rem; display: flex; justify-content: space-between; padding: 0.45rem 0.3rem;
    p{ color: #808080; font-size: 0.28rem; }
    div{ 
        width: 1.4rem; height: 0.4rem; text-align: center; line-height: 0.4rem; border: 0.02rem solid #EF3F4A; border-radius: 0.2rem; 
        font-size: 0.24rem; color: #EF3F4A;
    }
}

.Check_main{
    width: 100%; background:rgba(255,255,255,1); padding: 0 0.29rem;
    .Check_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between; padding-bottom: 0.02rem;
        .input{ width: 77%; padding: 0; margin-top: 0.22rem; padding-bottom: 0.22rem; color:rgba(75,75,75,1); }
        .input_more{ width: 60%; }
        .inputs{ width: 85%; }
        span{ color:rgba(0,0,0,1); .font2; }
        .sweep{ width: 0.4rem; height: 0.4rem; margin-top: 0.25rem; }
        .more{ width: 0.16rem; height: 0.29rem; margin-top: 0.3rem; }
        .van-cell:not(:last-child)::after{ border: 0!important; }
        div{ span{ margin-left: 0.3rem; .font2; } span:nth-child(1){ color: #219DB9; } span:nth-child(2){ color: #ED6D00; } span:nth-child(3){ color: #EF3F4A; } }
    }
    .last{ 
        .isOpen{ width: 0.8rem; height: 0.49rem; margin-top: 0.2rem; }
    }
    div:last-child{ 
        border: 0; 
    }
}

.Check_footer{
    width: 100%; height: 0.96rem; display: flex; position: fixed; bottom: 0; left: 0; background-color: white; border-top: 1px solid #219DB9;
    div{ width: 50%; height: 100%; line-height: 0.96rem; text-align: center; color: #219DB9; .font2; }
    div:nth-child(1){
        background-color: #219DB9; color: white;
    }
}

</style>