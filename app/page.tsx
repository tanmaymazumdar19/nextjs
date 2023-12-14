'use client'

import type { JSX } from 'react'
import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'

import FilterPill from '@/components/filter-pill'
import Table from '@/components/table'

import { Product, makeData } from '@/data'

export default function Home(): JSX.Element {
  const [progress, setProgress] = useState<string>('')
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "id",
        header: 'Request ID',
      },
      {
        accessorKey: "progress",
        header: 'Progress',
      },
      {
        accessorKey: "item",
        header: 'Item',
      },
      {
        accessorKey: "created_at",
        header: 'Created At',
      },
    ], []
  )

  const data: Product[] = useMemo(() => makeData(36), [])

  return (
    <main className="flex w-fit mx-auto min-h-screen flex-col gap-[19px] p-24">
      <div className='flex gap-3 items-center'>
        <FilterPill label='State' value={progress} onChange={(key: string) => setProgress(key)} />
        <FilterPill label='Request ID' />
      </div>
      <Table {...{ data, columns }} />
    </main>
  )
}
