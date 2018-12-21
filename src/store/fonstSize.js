import store from './store'
(function () {
    let deviceWidth = document.documentElement.clientWidth || document.body.clientWidth
    let htmlDom = document.getElementsByTagName('html')[0]
    htmlDom.style.fontSize = deviceWidth / (750 / 100) + 'px'   // 750 设计图大小  100 换算rem

    let win_h = $(window).height();// 防止输入框获焦，position失效
    window.addEventListener('resize', ()=> {
        $(window).height() < win_h ? store.commit('isFocus', false) : store.commit('isFocus', true)
    });
})()