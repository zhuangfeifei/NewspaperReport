webpackJsonp([14],{"5q7+":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),function(t){var i=e("Cofq"),a=e.n(i);s.default={data:function(){return{list:{repairId:"",dealRemark:"",dealAudioUrl:"",dealPath:"",workHours:"",parts:""},isFocus:!0}},components:{"Photo-Speech":a.a},computed:{imgFile:function(){return this.$store.state.imgFile}},created:function(){document.title="已修好",this.list.repairId=this.$route.query.id,this.focus()},methods:{add:function(){var t=this;""!=this.list.repairId&&""!=this.list.dealRemark&&""!=this.list.workHours&&""!=this.list.parts?(this.$toast.loading({mask:!0,message:"加载中...",duration:0}),""!=this.imgFile?this.$store.dispatch("uploadPicture").then(function(s){t.list.dealPath=s.message,t.$store.dispatch("repairOk",t.list)}).catch(function(t){}):this.$store.dispatch("repairOk",this.list)):this.$dialog.alert({title:"必填信息为空！",message:""}).then(function(){})},focus:function(){var s=this;t(document).ready(function(){var e=t(window).height();window.addEventListener("resize",function(){t(window).height()<e?s.isFocus=!1:s.isFocus=!0})})}}}}.call(s,e("7t+N"))},"97Xn":function(t,s){},BOQe:function(t,s,e){e("97Xn");var i=e("VU/8")(e("5q7+"),e("JDzH"),"data-v-427c96e7",null);t.exports=i.exports},JDzH:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"Repair"}},[e("div",{staticClass:"Repair_main"},[e("div",{staticClass:"Repair_main_"},[e("span",[t._v("维修描述")]),e("van-field",{staticClass:"input",attrs:{type:"textarea",placeholder:"简单描述处理结果",rows:"1",autosize:""},model:{value:t.list.dealRemark,callback:function(s){t.$set(t.list,"dealRemark",s)},expression:"list.dealRemark"}})],1),t._v(" "),e("div",{staticClass:"Repair_main_"},[e("span",[t._v("维修工时")]),e("div",[e("van-field",{staticClass:"input inputs",attrs:{type:"textarea",placeholder:"0",rows:"1",autosize:""},model:{value:t.list.workHours,callback:function(s){t.$set(t.list,"workHours",s)},expression:"list.workHours"}}),t._v("小时")],1)]),t._v(" "),e("div",{staticClass:"Repair_main_"},[e("span",[t._v("维修备件")]),e("van-field",{staticClass:"input",attrs:{type:"textarea",placeholder:"请输入维修所用备件",rows:"1",autosize:""},model:{value:t.list.parts,callback:function(s){t.$set(t.list,"parts",s)},expression:"list.parts"}})],1),t._v(" "),e("Photo-Speech")],1),t._v(" "),t.isFocus?e("div",{staticClass:"Repair_footer",on:{click:t.add}},[t._v("提交")]):t._e()])},staticRenderFns:[]}}});
//# sourceMappingURL=14.eeb3c29976b64060ff6f.js.map