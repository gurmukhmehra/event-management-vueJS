import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import  { router }  from './router'

import { MotionPlugin } from '@vueuse/motion'
import { createVfm } from 'vue-final-modal'
import  VueGoogleMaps from '@fawmi/vue-google-maps'
import LoadScript from "vue-plugin-load-script";
import Toast, { POSITION} from "vue-toastification";

// Import the CSS or use your own!
import '@/assets/css/style.css'
import 'vue-final-modal/style.css'
import "vue-toastification/dist/index.css";


const app = createApp(App)
app.config.errorHandler = (err, instance, info) => {
  // console.log(err)
  // console.log(instance)
  // console.log(info)
}
const pinia = createPinia()
const vfm = createVfm()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(vfm)
app.use(MotionPlugin, {
    directives: {
      'pop-bounce-visible-once': {
        initial: {
          scale: 0.3,
          opacity: 0
        },
        visibleOnce: {
          scale: 1,
          opacity: 1,
          transition: {
            duration: 1000,
            type: 'keyframes',
            ease: 'backOut',
          },         
        },
      },
      'pop-bounce': {
        initial: {
          scale: 0.3,
          opacity: 0
        },
        enter: {
          scale: 1,
          opacity: 1,
          transition: {
            duration: 1000,
            type: 'keyframes',
            ease: 'backOut',
          }, 
        },
      },
      'left-in-visible-once': {
        initial: {
          x: '-100px',
          opacity: 0
        },
        visibleOnce: {
          x: 0,
          opacity: 1,
          transition: {
            duration: 1000,
            type: 'keyframes',
            ease: 'backInOut',
          }, 
        },
      },
      'right-in-visible-once': {
        initial: {
          x: '100px',
          opacity: 0
        },
        visibleOnce: {
          x: 0,
          opacity: 1,
          transition: {
            duration: 1000,
            type: 'keyframes',
            ease: 'backInOut',
          }, 
        },
      },
      'left-in': {
        initial: {
          x: '-100px',
          opacity: 0
        },
        enter: {
          x: 0,
          opacity: 1,
          transition: {
            duration: 1000,
            type: 'keyframes',
            ease: 'backInOut',
          }, 
        },
      },
      'right-in': {
        initial: {
          x: '100px',
          opacity: 0
        },
        enter: {
          x: 0,
          opacity: 1,
          transition: {
            duration: 1000,
            type: 'keyframes',
            ease: 'backInOut',
          }, 
        },
      }
    },
  })
const options = {
    // You can set your default options here
    position: POSITION.TOP_CENTER,
    transition: "Vue-Toastification__bounce",
    maxToasts: 5,
    pauseOnHover: true,
    timeout: 5000,
    newestOnTop: true,
  //   transition: {
  //     enter: "fade-enter-active",
  //     leave: "Vue-Toastification__bounce-leave-active",
  //     move: "fade-move"
  // }
};

app.use(Toast, options);
app.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyBcQnUaN-5919oel8Y4bwx6W98xKW5GUiM',
      libraries: "places"
  },
})
app.use(LoadScript);
app.mount('#app')
