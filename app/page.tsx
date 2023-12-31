'use client'

import type { JSX } from 'react'
import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import FilterPill from '@/components/filter-pill'
import Table from '@/components/table'

import { Product } from '@/data'

export default function Home(): JSX.Element {
  const [progress, setProgress] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [resourceId, setResourceId] = useState<string>('')
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

  const { data, isFetching } = useQuery({
    queryKey: ['products', page, progress, resourceId],
    queryFn: () => onFetchItem(page),
    placeholderData: keepPreviousData,
  })

  async function onFetchItem(page: number = 1) {
    let res = await fetch(`/api/product?page=${page}${
      progress !== '' ? `&filterType=state&filterTerm=${progress}` : ''
    }${
      resourceId !== '' ? `&filterType=resource_id&filterTerm=${resourceId}` : ''
    }`)
    return await res.json()
  }

  return (
    <>
      <div className='flex gap-3 items-center'>
        <FilterPill label='State' value={progress} onChange={(key: string) => setProgress(key)} />
        <FilterPill label='Request ID' value={resourceId} onChange={(id: string) => setResourceId(id)} />
      </div>

      <Table
        key={data?.data?.length}
        {...{
          data: data?.data ?? [],
          columns,
          count: data?.total ?? 0,
          fetchPageItem: (p: number) => setPage(p),
          isLoading: isFetching,
          limit: data?.limit ?? 10,
          page,
        }}
      />
    </>
  )
}
