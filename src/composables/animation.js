<script setup>
import { useMotion } from '@vueuse/motion'

const target = ref<HTMLElement>()

const motionInstance = useMotion(target, {
    initial: {
        opacity: 0,
        y: 100
    },
    enter: {
        opacity: 1,
        y: 0
    }
})
</script>