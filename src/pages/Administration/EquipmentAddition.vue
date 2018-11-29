<template>
    <div id="EquipmentAddition">

        <div class="EquipmentAddition_main">
            <!-- <div class="EquipmentAddition_main_"><span>编号</span><van-field class="input" v-model="message" type="textarea" placeholder="添加后自动生成" rows="1" autosize /></div> -->
            <div class="EquipmentAddition_main_" @click="changegetEquFacType">
                <span>类型</span><span class="input input_mores">{{type}}</span>
                <img class="more" src="../../assets/img/more.png" alt="">
            </div>
            <div class="EquipmentAddition_main_" @click="changegettallyType">
                <span>点检类型</span><span class="input input_more">{{tallyType}}</span>
                <img class="more" src="../../assets/img/more.png" alt="">
            </div>
            <div class="EquipmentAddition_main_"><span>名称</span><van-field class="input" v-model="list.equFacName" type="textarea" placeholder="添加名称" rows="1" autosize /></div>
            <div class="EquipmentAddition_main_"><span>描述</span><van-field class="input" v-model="list.remark" type="textarea" placeholder="添加描述" rows="1" autosize /></div>
            <div class="EquipmentAddition_main_"><span>地址</span><van-field class="input" v-model="list.address" type="textarea" placeholder="添加地址" rows="1" autosize /></div>
            <div class="EquipmentAddition_main_ last">
                <span>点检</span>
                <div><span>是否是点检设备</span><img class="isOpen" @click="istallys" :src="isOpen ? img[1] : img[0]" alt=""></div>
            </div>
            <Photo-Speech :voice="false"></Photo-Speech>
        </div>   

        <div @click="addEqufac" v-if="isFocus" class="EquipmentAddition_footer">保存</div>

        <van-actionsheet v-if="getEquFacType" v-model="ShowgetEquFacType" :actions="getEquFacType" @select="onSelectEquFacType" />
        <van-actionsheet v-if="gettallyType" v-model="ShowgettallyType" :actions="gettallyType" @select="onSelecttallyType" />

    </div>
</template>

<script>
import PhotoSpeech from '../../components/_PhotoSpeech'
export default {
    data() {
        return {
            img:[require('../../assets/img/no.png'),require('../../assets/img/open.png')],isOpen:false,isVoice:false,message:'123',
            ShowgetEquFacType: false, ShowgettallyType: false, type: '',tallyType: '',isFocus: true,
            list:{ type: '', tallyType:'', equFacName:'', remark:'', address:'', isTally: 0, pictures:'' }
        }
    },
    components: {
        'Photo-Speech': PhotoSpeech
    },
    beforeCreate(){
        this.$store.dispatch('getEquFacType')
    },
    computed: {
        getEquFacType(){
            return this.$store.state.getEquFacType
        },
        gettallyType(){
            let array=[]
            if(this.$store.state.gettallyType == ''){
                array.push({ name:'暂无', disabled: true })
            }else{
                for(let val of this.$store.state.gettallyType){
                    array.push({name: val.tally_name, id: val.id})
                }
            }
            return array
        },
        imgFile(){
            return this.$store.state.imgFile
        },
    },
    created(){
        document.title = '设备设施添加'
        
        this.focus()
    },
    methods: {
        onSelectEquFacType(item) {
            this.ShowgetEquFacType = false
            this.type = item.name
            this.list.type = item.id
            this.$store.dispatch('gettallyType', item.id)
        },
        changegetEquFacType(){
            this.ShowgetEquFacType = true
        },
        onSelecttallyType(item) {
            this.ShowgettallyType = false
            this.tallyType = item.name
            this.list.tallyType = item.id
        },
        changegettallyType(){
            this.ShowgettallyType = true
        },
        istallys(){
            this.isOpen = !this.isOpen
            this.isOpen ? this.list.isTally = 1 : this.list.isTally = 0
        },
        addEqufac(){
            if(this.list.type != '' && this.list.tallyType != '' && this.list.equFacName != ''){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration:0
                })
                if(this.imgFile != ''){
                    this.$store.dispatch('uploadPicture')
                    .then(res =>{
                        // console.log(res)
                        this.list.pictures = res.message
                        this.$store.dispatch('addEqufac', this.list)
                    })
                    .catch(err =>{})
                }else{
                    this.$store.dispatch('addEqufac', this.list)
                }
            }else{
                this.$dialog.alert({
                    title: '必填信息为空！',
                    message: ''
                }).then(() => {
                // on close
                })
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
    }
}
</script>

<style lang="less" scoped>
#EquipmentAddition{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1.96rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }


.EquipmentAddition_main{
    width: 100%; background:rgba(255,255,255,1); padding: 0 0.29rem;
    .EquipmentAddition_main_{
        width: 100%; line-height: 0.9rem; border-bottom: 0.01rem solid #CECECE; display: flex; justify-content: space-between; padding-bottom: 0.02rem;
        .input{ width: 85%; padding: 0; margin-top: 0.22rem; padding-bottom: 0.22rem; color:rgba(75,75,75,1); .font3; }
        .input_more{ width: 68%; margin: 0; padding: 0; }
        .input_mores{ width: 77%; margin: 0; padding: 0;}
        span{ color:rgba(0,0,0,1); .font2; }
        .more{ width: 0.16rem; height: 0.29rem; margin-top: 0.3rem; }
        .van-cell:not(:last-child)::after{ border: 0!important; }
    }
    .last{ 
        .isOpen{ width: 0.8rem; height: 0.49rem; margin-top: 0.2rem; }
        div{
            height: 0.9rem;
            span{ line-height: 0.9rem; color: #EF3F4A; .font3; font-size: 0.24rem; position: relative; top: -0.15rem; left: -0.1rem; }
        }
    }
    div:last-child{ 
        border: 0; 
    }
}

.EquipmentAddition_footer{
    width: 100%; height: 0.96rem; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2; background:rgba(33,157,185,1);
    position: fixed; bottom: 0; left: 0; text-align: center;
}



</style>