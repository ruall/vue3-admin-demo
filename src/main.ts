import { createApp } from 'vue'
import App from '/@/App.vue'
import direct from '/@/directive/index'
import router from '/@/router/index'
import { store } from '/@/store/index'
// import '/@/mock/index'
import '/@/permission'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'

import 'nprogress/nprogress.css'
import '/@/styles/index.css'
import '/@/styles/override-element-ui.scss'

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

const app = createApp(App)
direct(app)

app.use(VueViewer, {
  defaultOptions: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true
  }
})
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
