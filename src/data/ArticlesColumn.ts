import {h} from 'vue'


export const ARTICLES_COLUMN = [
  {
    label: '#',
    key: 'index',
    width: 32,
    align: 'center',
    renderCell: (row: Record<any, any>, index: number) => {
      return h('div', { class: 'data-index' }, index + 1)
    },
  },
  {
    label: 'Title',
    key: 'title',
    width: 120,
    renderCell: (row: Record<any, any>) => {
      return h('div', { class: 'data-title' }, row.title)
    },
  },
  {
    label: 'Author',
    key: 'author',
    width: 192,
    renderCell: (row: Record<any, any>) => row.author.username,
  },
  {
    label: 'Tag List',
    key: 'tagList',
    width: 400,
    renderCell: (row: Record<any, any>) => row.tagList.join(', '),
  },
  {
    label: 'Excerpt',
    key: 'body',
    width: 448,
    renderCell: (row: Record<any, any>) => {
      return row.body?.split(' ').slice(0, 20).join(' ')
    },
  },
  {
    label: 'Created',
    key: 'createdAt',
    width: 120,
    renderCell: (row: Record<any, any>) => {
      return new Date(row.createdAt).toLocaleDateString()
    },
  },
]
