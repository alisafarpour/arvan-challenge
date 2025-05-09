import { h, render } from 'vue'
import Toast from '@/components/Toast.vue'

export function useToast() {
    return (options: { type: 'success' | 'error'; title: string; description: string; duration?: number }) => {
        const mountPoint = document.createElement('div')
        document.body.appendChild(mountPoint)

        const vnode = h(Toast, {
            ...options,
            onVanish: () => document.body.removeChild(mountPoint)
        })

        render(vnode, mountPoint)
    }
}
