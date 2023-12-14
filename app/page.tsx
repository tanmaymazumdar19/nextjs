'use client'

import type { JSX } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'

import FilterPill from '@/components/filter-pill'
import Table from '@/components/table'

import { Product, makeData } from '@/data'

export default function Home(): JSX.Element {
  const [progress, setProgress] = useState<string>('')
  const [product, setProduct] = useState({ data: [], total: 0, limit: 0 })
  const [page, setPage] = useState<number>(1)
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

  async function onFetchItem(page: number = 1) {
    setPage(page)
    let res = await fetch(`/api/product?page=${page}`)
    res = await res.json()
    setProduct(res as never)
  }

  useEffect(() => {
    ;(async () => {
      await onFetchItem()
    })()
  }, [])

  return (
    <>
      <div className='flex gap-3 items-center'>
        <FilterPill label='State' value={progress} onChange={(key: string) => setProgress(key)} />
        <FilterPill label='Request ID' />
      </div>
      <Table {...{ data: product.data, columns, count: product.total, fetchPageItem: onFetchItem, limit: product.limit, page }} />
    </>
  )
}
