<template>
    <div id="index">

        <router-view v-if="isIf"></router-view>

        <bottom-item></bottom-item>

    </div>
</template>
<script>
import bottom from '@/components/_bottom'
export default {
    data() {
        return {
            
        }
    },
    components: {
        "bottom-item": bottom,
    },
    beforeCreate(){
        
    },
    computed:{
        isIf(){
            if(this.$store.state.userId != ''){
                return true
            }
        }
    },
    mounted(){
        if(this.$store.state.userId == null){
            console.log('12313')
            this.$router.go(0)
        }
    },
    methods: {
        
    },
}
</script>
<style lang="less">
#index{
    width: 100%; height: 100%; padding-bottom: 1rem; background:rgba(246,246,246,1);
}
</style>


