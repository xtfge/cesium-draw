<!--
@Author:zhangbo
@Date:2019-03-28 10:52:19
@E-mail:zhangb@geovie.com.cn
@Last Modified by:zhangbo
@Last Modified time:2019-03-28 10:52:19
-->
<template>
  <!--<div id="contextmenubox" :style="{height: height+'px'}" v-show="isShow" oncontextmenu="return false">-->
    <!--<div v-for="(eventHandler,key) in contextMenuItems" :id="key" @click="eventHandler(triggerObj);Bus.$emit('contextMenuHide')">{{key}}</div>-->
  <!--</div>-->
</template>

<script>
  export default {
    data() {
      return {
        isShow:false,
        triggerObj:''
      }
    },
    props:{
      contextMenuItems:{
        default:{'menu1':console.log}
      }
    },
    computed:{
      height(){
        const h=20+30*Object.keys(this.contextMenuItems).length
        return h<100?100:h
      }
    },
    mounted(){
      const _this=this
      Bus.$on('contextMenuHide',()=>{
        const context=document.getElementById('contextmenubox')
        if(context){
          document.body.removeChild(context)
        }
      })
      //Bus.$on('contextMenuShow',()=>this.isShow=true)
      Bus.$on('setContextMenuPosition',_this.setPosition)
      window.createContextMenu=_this.createContextMenu

    },
    methods: {
      createContextMenu(viewer) {
        const _this=this
        const context=document.getElementById('contextmenubox')
        if(context){
          document.body.removeChild(context)
        }
        const contextDiv=document.createElement('div')
        contextDiv.oncontextmenu=function () {
          return false
        }
        contextDiv.id='contextmenubox'
        contextDiv.style.height=_this.height+'px'
        for(let key in _this.contextMenuItems){
          const item=document.createElement('div')
          item.innerText=key
          item.onclick=function () {
            _this.contextMenuItems[key]()
            Bus.$emit('contextMenuHide')
          }
          contextDiv.appendChild(item)
        }
        if(_this.$store.state.doubleViewer&&viewer===_this.$store.state.earth){
          contextDiv.style.marginLeft="50%"
        }
        document.body.appendChild(contextDiv)
      },
      setPosition(position,viewer=null){
        // const position=this.position
        let x,y

        // const width=document.documentElement.scrollWidth || document.body.scrollWidth;
        // const height=document.documentElement.scrollHeight || document.body.scrollHeight;
        if(position.x>190){
          x=position.x-170
        }
        else{
          x=position.x+10
        }
        if(position.y>this.height){
          y=position.y-this.height+40
        }else{
          y=position.y
        }
        $("#contextmenubox").css('left',x)
        $("#contextmenubox").css('top',y)
      }


    }
  }
</script>

<style>
#contextmenubox{
  position: fixed;
  width: 180px;
  left: 200px;
  top:100px;
  z-index: 999;
  background-color: #FFFFFF;
  border: 1px solid #CDC9C9;
  border-radius:3px 3px 3px 3px;
  color:#000000;
  visibility:visible;

  padding-top: 10px;
}
#contextmenubox>div{
  width: 85%;
  height: 30px;
  line-height: 30px;
  vertical-align: center;
  text-align: left;
  padding-left: 15%;
}
#contextmenubox>div:hover{
  width: 85%;
  background-color: #EAEAEA;
  height: 30px;
  line-height: 30px;
  vertical-align: center;
  text-align: left;
  padding-left: 15%;
}
</style>
