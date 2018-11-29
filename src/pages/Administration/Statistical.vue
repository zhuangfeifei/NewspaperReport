<template>
    <div id="Statistical">

        <v-chart :data="data">
            <v-scale y :options="yOptions" />
            <v-tooltip disabled />
            <v-pie :radius="0.85" series-field="name" />
            <v-legend :options="legendOptions" />
        </v-chart>

    </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VScale } from 'vux'
const map = {
  '正常': '60%',
  '故障': '22%',
  '未检': '18%',
}
export default {
    data() {
        return {
            legendOptions: {
                position: 'right',
                itemFormatter (val) {
                    return val + '  ' + map[val]
                }
            },
            yOptions: {
                formatter (val) {
                    return val * 100 + '%'
                }
            },
            map,
            data: [
                { name: '正常', percent: 0.4, a: '1' },
                { name: '故障', percent: 0.2, a: '1' },
                { name: '未检', percent: 0.18, a: '1' },
            ]
        }
    },
    components: {
        VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VScale
    },
    computed: {
        
    },
    created(){
        document.title = '点检统计'
        
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
#Statistical{
    width: 100%; height: 100vh; background:rgba(246,246,246,1);
}

.font1{ font-family:PingFang-SC-Bold; font-weight:bold; }
.font2{ font-family:PingFang-SC-Medium; font-weight:Medium; }
.font3{ font-family:PingFang-SC-Regular; font-weight:Regular; }



</style>