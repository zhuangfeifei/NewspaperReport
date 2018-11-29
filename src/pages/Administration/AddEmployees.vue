<template>
    <div id="AddEmployees">

        <nav class="AddEmployees">
            <div v-for="(item,index) in tab_list" :key="index" :class="{AddEmployees_active: tabShow == index}">{{item}}</div>
        </nav>

        <div v-if="getTreeDeptUserList" class="AddEmployees_main">
            <van-collapse v-model="activeNameOne" accordion>
                <van-collapse-item :name="index" v-for="(item,index) in getTreeDeptUserList" :key="index">
                    <div slot="title"><span class="collapse_title">{{item.title}}</span></div>
                    <div class="classList" @click="userList = name" v-for="(name,indexName) in item.userList" :key="indexName" :class="{Only: item.userList.length == 1}">
                        <span>{{name.name}}</span><img :src="userList.userid === name.userid ? img[1] : img[0]" alt="">
                    </div>

                    <van-collapse v-if="item.titleList.length > 0" v-model="activeNameTwo" accordion>
                        <van-collapse-item :name="OneIndex" v-for="(OneItem,OneIndex) in item.titleList" :key="OneIndex">
                            <div slot="title"><span class="collapse_title">{{OneItem.title}}</span></div>
                            <div class="classList" @click="userList = OneItems" v-for="(OneItems,indexName) in OneItem.userList" :key="indexName" :class="{Only: OneItem.userList.length == 1}">
                                <span>{{OneItems.name}}</span><img :src="userList.userid === OneItems.userid ? img[1] : img[0]" alt="">
                            </div>
                            
                            <van-collapse v-if="OneItem.titleList.length > 0" v-model="activeNameThree" accordion>
                                <van-collapse-item :name="TwoIndex" v-for="(TwoItem,TwoIndex) in OneItem.titleList" :key="TwoIndex">
                                    <div slot="title"><span class="collapse_title">{{TwoItem.title}}</span></div>
                                    <div class="classList" @click="userList = TwoItems" v-for="(TwoItems,TwoIndexs) in TwoItem.userList" :key="TwoIndexs" :class="{Only: TwoItem.userList.length == 1}">
                                        <span>{{TwoItems.name}}</span><img :src="userList.userid === TwoItems.userid ? img[1] : img[0]" alt="">
                                    </div>
                                </van-collapse-item>
                            </van-collapse>

                        </van-collapse-item>
                    </van-collapse>

                </van-collapse-item>
            </van-collapse>
        </div>


        <div class="AddEmployees_btn" @click="userList != '' ? show = true : ''">确定</div>

        <van-dialog v-model="show" show-cancel-button :before-close="beforeClose" :title="userList.name">
            <div class="AddEmployees_change"><span v-for="(item,index) in change" :key="index" @click="nodeType = index" :class="{changeActive: nodeType == index}">{{item}}</span></div>
        </van-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {
            tabShow: 0, tab_list:[ '内部员工','外部人员' ], activeNameOne: ['0'], activeNameTwo: ['0'],activeNameThree: ['0'],
            img:[require('../../assets/img/checke.png'),require('../../assets/img/checkeds.png')],
            userList:'',show: false, nodeType: 0, change:['报修人','维修人']
        }
    },
    components: {
        
    },
    beforeCreate(){
        
    },
    computed: {
        getTreeDeptUserList(){
            return this.$store.state.getTreeDeptUserList
        }
    },
    created(){
        document.title = '团队管理'

        this.$store.dispatch('getTreeDeptUserList', this.tabShow)
        
    },
    methods: {
        beforeClose(action, done) {
            if (action === 'confirm') {
                let list = { userId: this.userList.userid, nodeType: this.nodeType }
                this.$store.dispatch('setRoleType', list)
                done()
            } else {
                done()
            }
        }
    },
}
</script>

<style lang="less" scoped>
#AddEmployees{
    width: 100%; min-height: 100vh; background:rgba(246,246,246,1); padding-bottom: 1rem;
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }

.AddEmployees{
    width: 100%; height: 0.86rem; .font2; display: flex;
    div{  
        width: 50%; height: 100%; text-align: center; line-height: 0.86rem; font-size: 0.28rem;
    }
    .AddEmployees_active{ border-bottom: 0.04rem solid #219DB9; color: #219DB9; }
}

.AddEmployees_main{
    width: 100%; background-color: white;
    .collapse_title{ color:rgba(75,75,75,1); font-size: 0.3rem; .font2; }
    .collapse_title::before{
        content: ''; display: inline-block;  width: 0.06rem; height: 0.3rem; background:rgba(33,157,185,1);
        margin-right: 0.3rem; border-radius: 0.03rem; position: relative; top: 0.04rem;
    }
    .classList{
        width: 100%; height: 0.9rem; padding-left: 0.66rem; border-bottom: 0.01rem solid #eee; line-height: 0.9rem;
        img{ width: 0.27rem; height: 0.27rem; float: right; position: relative; top: 0.3rem; }
    }
    .classList:first-child{ height: 0.6rem; line-height: 0.4rem; img{ top: 0.1rem; } }
    .classList:last-child{ height: 0.6rem; border: 0; }
    .Only{ height: 0.4rem!important; margin-bottom: 0.2rem; border: 0; }
}



.AddEmployees_btn{
    width: 100%; height: 0.96rem; text-align: center; line-height: 0.96rem; font-size: 0.36rem; color:rgba(254,254,254,1); .font2;
    background-color: #219DB9; position: fixed; bottom: 0; left: 0;
}

.AddEmployees_change{
    width: 100%; height: 1rem; display: flex; justify-content: space-around; align-items: center;
    span{ border: 0.01rem solid gray; color: gray; border-radius: 0.1rem; padding: 0.05rem 0.15rem; font-size: 0.26rem; }
    .changeActive{
        border: 0.01rem solid #219DB9; color: #219DB9;
    }
}

</style>