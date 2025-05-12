<script setup lang="ts">
import { ref, computed, defineModel, isVNode, watch, unref } from 'vue'
import Pagination from '@/components/Pagination.vue'
import {useRouter} from "vue-router";
import SvgView from '@/components/SvgView.vue'
import More from '@/assets/icons/ellipsis.svg'
import Button from "@/components/Button.vue";


interface Column {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  renderCell?: (row: any, index?: number) => string
}

const props = defineProps<{
  columns: Column[]
  data: any[]
  allDataLength?: number
  rowsPerPage?: number
  pageNumber: number
}>()

const emit = defineEmits<{
  (e: 'update:pageNumber', value: number): void
}>()

const router = useRouter();

const internalPage = ref(1)
const menuIndex = ref<number | null>(null)
const showModal = ref(false)
const modalType = ref('')
const selectedRow = ref<any>(null)

const rowsPerPage = computed(() => props.rowsPerPage ?? 10)

const totalPages = computed(() => {
  if (!props.allDataLength) {
    return Math.ceil(props.data?.length / rowsPerPage.value)
  } else {
    return Math.ceil(props.allDataLength / rowsPerPage.value)
  }
})

const paginatedData = computed(() => {
  if (props.allDataLength) {
    return unref(props.data) || []
  } else {
    const start = (currentPage.value - 1) * rowsPerPage.value
    return props.data?.slice(start, start + rowsPerPage.value)
  }
})

const currentPage = computed({
  get: () => props.pageNumber,
  set: (val: number) => emit('update:pageNumber', val),
})

const setPage = (page: number) => {
  const path = page === 1 ? "/articles" : `/articles/page/${page}`;
  router.push(path);
  currentPage.value = page
  menuIndex.value = null
  selectedRow.value = null
}

const toggleMenu = (index: number) => {
  menuIndex.value = menuIndex.value === index ? null : index
}

const openModal = (type: string, row: any) => {
  modalType.value = type
  selectedRow.value = row
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedRow.value = null
  modalType.value = ''
}
</script>

<template>
  <div class="data-grid-container">
    <div class="data-grid">
      <table class="data-table">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :style="{
                width: column.width ?? 'auto',
                minWidth: column.width ? undefined : '100px',
                textAlign: column.align ?? 'left',
                flexGrow: column.width ? '0' : '1',
              }"
            >
              {{ column.label }}
            </th>
            <th style="width: 80px; text-align: center"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in paginatedData"
            :key="`${row.slug}-${index}-${currentPage}`"
            class="table-row"
          >
            <td
              v-for="column in columns"
              :key="`${column.key}/${row.slug}`"
              :style="{
                width: column.width ? `${column.width}px` : 'auto',
                minWidth: column.width ? `${column.width}px` : '100px',
                textAlign: column.align ?? 'left',
                flexGrow: column.width ? '0' : '1',
              }"
            >
              <component
                :style="{
                  width: column.width ? `${column.width}px` : 'auto',
                  minWidth: column.width ? `${column.width}px` : '100px',
                  textAlign: column.align ?? 'left',
                  flexGrow: column.width ? '0' : '1',
                }"
                v-if="column.renderCell && !!isVNode(column.renderCell(row))"
                :is="column.renderCell(row, index)"
              />
              <div
                :style="{
                  width: column.width ? `${column.width}px` : 'auto',
                  minWidth: column.width ? `${column.width}px` : '100px',
                  textAlign: column.align ?? 'left',
                  flexGrow: column.width ? '0' : '1',
                }"
                class="data-normal"
                v-else-if="column.renderCell"
              >
                {{ column.renderCell(row, index) }}
              </div>
              <div class="data-normal" v-else>
                {{ row[column.key] }}
              </div>
            </td>
            <td style="display: flex; justify-content: center;">
              <Button :onClick="() => toggleMenu(index)" variant="secondary" just-icon><SvgView :icon="More" :size="20"/> </Button>
              <div v-if="menuIndex === index" class="menu">
                <button @click="openModal('edit', row)">Edit</button>
                <button @click="openModal('delete', row)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="Pagination-container">
      <Pagination
        v-if="!!totalPages"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-change="setPage"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-grid-container {
  width: 100%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  justify-content: center;
}

.Pagination-container {
  display: flex;
  flex-grow: 0;
  width: 100%;
  justify-content: flex-end;
}

.data-grid {
  overflow-x: auto;

  .data-table {
    overflow: auto;
    width: 100%;
    border-collapse: collapse;

    .data-normal {
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    thead {
      height: 48px;
      background-color: $color-neutral-bg-hover;
      border: 1px solid $border-color;
    }

    th {
      padding: 12px 8px;
    }

    .table-row {
      height: 48px;
      max-height: 48px;
      position: relative
    }

    .menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      background-color: $white;
      border-radius: $lg-radius;
      box-shadow: 0 4px 16px 0 #00000029;
      top: 58px;
      padding: 8px;
      z-index: 10;

      button {
        padding: 8px 12px;
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        border-radius: $md-radius;

        &:hover {
          background-color: $color-neutral-bg-hover;
        }

        &:active {
          background-color: $color-neutral-bg-press;
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
