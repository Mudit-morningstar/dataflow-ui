import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'
import { Badge } from '../Badge/Badge'
import { FilterBar } from '../FilterBar/FilterBar'
import { SearchInput } from '../FilterBar/SearchInput'
import { MultiSelect } from '../FilterBar/MultiSelect'

const meta: Meta<typeof DataTable> = {
  title: 'DataTable/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof DataTable>

// ─── Shared data ──────────────────────────────────────────────────────────────

type Transaction = {
  id: string
  description: string
  category: string
  amount: number
  status: 'paid' | 'pending' | 'failed' | 'refunded'
  date: string
}

const ALL_DATA: Transaction[] = [
  { id: 'TXN-001', description: 'Figma Pro subscription', category: 'Software', amount: 15.00, status: 'paid', date: '2024-03-15' },
  { id: 'TXN-002', description: 'Office chair', category: 'Equipment', amount: 489.99, status: 'pending', date: '2024-03-14' },
  { id: 'TXN-003', description: 'AWS compute', category: 'Infrastructure', amount: 312.47, status: 'paid', date: '2024-03-13' },
  { id: 'TXN-004', description: 'Team lunch', category: 'Meals', amount: 134.80, status: 'paid', date: '2024-03-12' },
  { id: 'TXN-005', description: 'GitHub Enterprise', category: 'Software', amount: 210.00, status: 'failed', date: '2024-03-11' },
  { id: 'TXN-006', description: 'Notion team plan', category: 'Software', amount: 96.00, status: 'paid', date: '2024-03-10' },
  { id: 'TXN-007', description: 'Monitor stand', category: 'Equipment', amount: 79.95, status: 'paid', date: '2024-03-09' },
  { id: 'TXN-008', description: 'Conference travel', category: 'Travel', amount: 1240.00, status: 'pending', date: '2024-03-08' },
  { id: 'TXN-009', description: 'Duplicate charge', category: 'Software', amount: 15.00, status: 'refunded', date: '2024-03-07' },
  { id: 'TXN-010', description: 'Vercel Pro', category: 'Infrastructure', amount: 20.00, status: 'paid', date: '2024-03-06' },
  { id: 'TXN-011', description: 'Linear subscription', category: 'Software', amount: 96.00, status: 'paid', date: '2024-03-05' },
  { id: 'TXN-012', description: 'Mechanical keyboard', category: 'Equipment', amount: 149.00, status: 'paid', date: '2024-03-04' },
  { id: 'TXN-013', description: 'Client dinner', category: 'Meals', amount: 287.50, status: 'paid', date: '2024-03-03' },
  { id: 'TXN-014', description: 'Datadog logs', category: 'Infrastructure', amount: 450.00, status: 'failed', date: '2024-03-02' },
  { id: 'TXN-015', description: 'Hotel — NYC trip', category: 'Travel', amount: 890.00, status: 'paid', date: '2024-03-01' },
]

const statusBadge: Record<Transaction['status'], { variant: 'success' | 'warning' | 'danger' | 'default'; label: string }> = {
  paid:     { variant: 'success', label: 'Paid' },
  pending:  { variant: 'warning', label: 'Pending' },
  failed:   { variant: 'danger',  label: 'Failed' },
  refunded: { variant: 'default', label: 'Refunded' },
}

const BASE_COLUMNS = [
  { key: 'id',          header: 'ID',          sortable: true,  width: '110px' },
  { key: 'description', header: 'Description',  sortable: false },
  { key: 'category',    header: 'Category',     sortable: true  },
  {
    key: 'amount',
    header: 'Amount',
    sortable: true,
    align: 'right' as const,
    cell: (row: Transaction) => (
      <span className="font-medium tabular-nums">${row.amount.toFixed(2)}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    cell: (row: Transaction) => {
      const s = statusBadge[row.status]
      return <Badge variant={s.variant} size="sm">{s.label}</Badge>
    },
  },
  { key: 'date', header: 'Date', sortable: true, width: '110px' },
]

const HEADER_FILTER_COLUMNS = [
  { key: 'id',          header: 'ID',          sortable: true,  width: '110px' },
  { key: 'description', header: 'Description',  sortable: false },
  {
    key: 'category',
    header: 'Category',
    sortable: true,
    filterable: true,
    filterOptions: [
      { label: 'Equipment',      value: 'Equipment' },
      { label: 'Infrastructure', value: 'Infrastructure' },
      { label: 'Meals',          value: 'Meals' },
      { label: 'Software',       value: 'Software' },
      { label: 'Travel',         value: 'Travel' },
    ],
  },
  {
    key: 'amount',
    header: 'Amount',
    sortable: true,
    align: 'right' as const,
    cell: (row: Transaction) => (
      <span className="font-medium tabular-nums">${row.amount.toFixed(2)}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    filterable: true,
    filterOptions: [
      { label: 'Paid',     value: 'paid' },
      { label: 'Pending',  value: 'pending' },
      { label: 'Failed',   value: 'failed' },
      { label: 'Refunded', value: 'refunded' },
    ],
    cell: (row: Transaction) => {
      const s = statusBadge[row.status]
      return <Badge variant={s.variant} size="sm">{s.label}</Badge>
    },
  },
  { key: 'date', header: 'Date', sortable: true, width: '110px' },
]

const ROW_ACTIONS = [
  { label: 'Edit',      onClick: () => {} },
  { label: 'Duplicate', onClick: () => {} },
  { label: 'Delete',    onClick: () => {}, variant: 'danger' as const },
]

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => <DataTable data={ALL_DATA.slice(0, 5)} columns={BASE_COLUMNS} rowKey="id" />,
}

export const WithRowActions: Story = {
  render: () => (
    <DataTable data={ALL_DATA.slice(0, 5)} columns={BASE_COLUMNS} rowActions={ROW_ACTIONS} rowKey="id" />
  ),
}

export const WithPagination: Story = {
  render: () => (
    <DataTable data={ALL_DATA} columns={BASE_COLUMNS} rowActions={ROW_ACTIONS} rowKey="id" pageSize={5} />
  ),
}

export const Loading: Story = {
  render: () => <DataTable data={[]} columns={BASE_COLUMNS} loading rowKey="id" />,
}

export const Empty: Story = {
  render: () => (
    <DataTable
      data={[]}
      columns={BASE_COLUMNS}
      rowKey="id"
      emptyMessage="No transactions match your filters."
    />
  ),
}

export const WithHeaderFilters: Story = {
  render: () => (
    <DataTable
      data={ALL_DATA}
      columns={HEADER_FILTER_COLUMNS}
      rowActions={ROW_ACTIONS}
      rowKey="id"
      pageSize={5}
      headerFilters
      emptyMessage="No transactions match your filters."
    />
  ),
}

export const WithFilterBar: Story = {
  render: () => {
    const [search, setSearch] = useState('')
    const [statuses, setStatuses] = useState<string[]>([])

    const filtered = ALL_DATA.filter((row) => {
      const matchesSearch =
        !search ||
        row.description.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statuses.length === 0 || statuses.includes(row.status)
      return matchesSearch && matchesStatus
    })

    function clearAll() {
      setSearch('')
      setStatuses([])
    }

    return (
      <div className="flex flex-col gap-4">
        <FilterBar onClearAll={clearAll}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search transactions..."
            debounceMs={200}
            className="w-56"
          />
          <MultiSelect
            label="Status"
            options={[
              { label: 'Paid',     value: 'paid' },
              { label: 'Pending',  value: 'pending' },
              { label: 'Failed',   value: 'failed' },
              { label: 'Refunded', value: 'refunded' },
            ]}
            value={statuses}
            onChange={setStatuses}
          />
        </FilterBar>
        <DataTable
          data={filtered}
          columns={BASE_COLUMNS}
          rowActions={ROW_ACTIONS}
          rowKey="id"
          pageSize={5}
          emptyMessage="No transactions match your filters."
        />
      </div>
    )
  },
}
