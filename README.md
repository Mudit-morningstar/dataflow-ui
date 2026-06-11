# dataflow-ui

A React component library for data-heavy interfaces — tables, filters, charts, and core UI primitives. Built with TypeScript, Tailwind v4, and Recharts.

[**Live Storybook →**](https://dataflow-ui.vercel.app)

---

## Install

```bash
npm install dataflow-ui
```

### Peer dependencies

```bash
npm install react react-dom recharts
```

---

## Setup

Import the stylesheet in your app entry point:

```ts
import 'dataflow-ui/dist/index.css'
```

---

## Components

### Button

```tsx
import { Button } from 'dataflow-ui'

<Button variant="primary" size="md">Save</Button>
<Button variant="secondary" loading>Saving…</Button>
<Button variant="danger">Delete</Button>
```

Variants: `primary` | `secondary` | `ghost` | `danger`  
Sizes: `sm` | `md` | `lg`

---

### Input / Select / Checkbox / Toggle

```tsx
import { Input, Select, Checkbox, Toggle } from 'dataflow-ui'

<Input label="Email" placeholder="you@example.com" error="Required" />

<Select label="Role" options={[{ label: 'Admin', value: 'admin' }]} />

<Checkbox label="Remember me" checked={checked} onChange={setChecked} />

<Toggle checked={enabled} onChange={setEnabled} />
```

---

### Badge / Tag / Tooltip

```tsx
import { Badge, Tag, Tooltip } from 'dataflow-ui'

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>

<Tag onRemove={() => remove(id)}>typescript</Tag>

<Tooltip content="Saved automatically">
  <span>hover me</span>
</Tooltip>
```

Badge variants: `default` | `success` | `warning` | `danger` | `info`

---

### FilterBar

Composable filter row — combine `SearchInput`, `MultiSelect`, and `DateRangePicker` inside a `FilterBar` shell.

```tsx
import { FilterBar, SearchInput, MultiSelect, DateRangePicker } from 'dataflow-ui'

<FilterBar label="Filters" onClearAll={clearAll}>
  <SearchInput value={q} onChange={setQ} placeholder="Search…" />
  <MultiSelect
    label="Status"
    options={[
      { label: 'Active', value: 'active' },
      { label: 'Archived', value: 'archived' },
    ]}
    value={statuses}
    onChange={setStatuses}
  />
  <DateRangePicker value={range} onChange={setRange} />
</FilterBar>
```

---

### DataTable

Sort, paginate, per-column header filters, row actions, and skeleton loading — zero external dependencies beyond React.

```tsx
import { DataTable } from 'dataflow-ui'
import type { Column, RowAction } from 'dataflow-ui'

type User = { id: number; name: string; role: string; status: string }

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    filterable: true,
    filterOptions: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
    cell: (row) => <Badge variant={row.status === 'active' ? 'success' : 'default'}>{row.status}</Badge>,
  },
]

const actions: RowAction<User>[] = [
  { label: 'Edit', onClick: (row) => edit(row) },
  { label: 'Delete', onClick: (row) => remove(row), variant: 'danger' },
]

<DataTable
  data={users}
  columns={columns}
  rowKey="id"
  rowActions={actions}
  pageSize={20}
  loading={isLoading}
/>
```

---

### Charts

Thin wrappers over [Recharts](https://recharts.org) with shared color tokens and a consistent loading/empty state.

#### LineChart

```tsx
import { LineChart } from 'dataflow-ui'

<LineChart
  data={[
    { month: 'Jan', revenue: 4200, costs: 2800 },
    { month: 'Feb', revenue: 5100, costs: 3100 },
  ]}
  xKey="month"
  series={[
    { key: 'revenue', label: 'Revenue' },
    { key: 'costs', label: 'Costs' },
  ]}
  height={300}
  yTickFormatter={(v) => `$${v.toLocaleString()}`}
/>
```

#### BarChart

```tsx
import { BarChart } from 'dataflow-ui'

<BarChart
  data={monthlyData}
  xKey="month"
  series={[{ key: 'signups', label: 'Sign-ups' }]}
  height={300}
/>
```

#### PieChart

```tsx
import { PieChart } from 'dataflow-ui'

<PieChart
  data={[
    { label: 'Direct', value: 40 },
    { label: 'Organic', value: 35 },
    { label: 'Referral', value: 25 },
  ]}
  height={300}
/>
```

All charts accept `loading` (renders skeleton) and `emptyMessage` props.

---

## Color tokens

```ts
import { CHART_COLORS } from 'dataflow-ui'
// ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
```

---

## Development

```bash
npm run storybook     # component explorer on localhost:6006
npm run dev           # Vite dev server
npm run build:lib     # build for npm → dist/
```

---

## License

MIT
