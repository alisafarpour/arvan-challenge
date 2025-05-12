<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Button from "@/components/Button.vue";
import Section from "@/components/Section.vue";
import SvgView from "@/components/SvgView.vue";
import Info from "@/assets/icons/info.svg";
import Warning from "@/assets/icons/warning.svg";

const props = defineProps<{
  isOpen: boolean
  variant: 'info' | 'warning'
  title: string
  message?: string
  onClick: () => void
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal">
        <Section :title="title" >
          <div class="content">
            <div :class="['modal-icon', variant]">
              <div class="icon">
              <SvgView :icon="variant === 'info' ? Info : Warning" :size="24"  :color="variant === 'info' ? '#17B24A' : '#D61E20'" />
              </div>
            </div>
            <p class="modal-message">{{message ?? 'your message'}}</p>
          </div>
        </Section>

        <footer class="modal-footer" :style="variant === 'warning' ? { flexDirection: 'row-reverse' , justifyContent: 'flex-start' } : {}">
          <Button
              variant="secondary"
              :onClick="() => $emit('close')"
          >
            Cancel
          </Button>
          <Button
              :variant="variant === 'warning' ? 'error' : 'primary'"
              :onClick="onClick"
          >
            {{ variant === 'warning' ? 'Delete' : 'Confirm' }}
          </Button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
  .modal-icon {
    width: 56px;
    height: 56px;
    border-radius: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    color: $color-neutral-default;

    .icon {
      position: absolute;
      transform: -50% -50%;
    }
    &.info {
      background: #E3F6E9;
    }

    &.warning {
      background: #FAE4E4;
    }
  }

  .modal-message {
    @include body2;
    color: $color-neutral-default;
  }

.modal-footer {
  border-top: 1px solid $border-color;
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>