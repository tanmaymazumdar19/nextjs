'use client'

import type { JSX } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { Skeleton } from '@nextui-org/react'
import clsx from 'clsx'

import type { Product } from '@/data'
import Button from '@/components/button'
import States from "@/components/states";

const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(date: Date): string {
  const month = months[date?.getMonth()]
  const day = date?.getDate()
  const hour = date?.getHours()
  const minutes = date?.getMinutes()
  
  return `${month} ${day}, ${hour}:${minutes} ${hour > 12 ? 'P' : 'A'}M`
}

export default function Table({
  data,
  columns,
  count,
  fetchPageItem,
  isLoading,
  limit,
  page,
}: {
  data: Product[]
  columns: ColumnDef<Product>[]
  count: number,
  fetchPageItem: (page: number) => void,
  isLoading: boolean,
  limit: number,
  page: number
}): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: count,
    debugTable: true,
  })

  return (
    <div className='p-2'>
      <div className='h-2' />
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 bg-white'>
        <thead className='text-xs text-gray-700 border-t border-[#D9DEE3]'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={
                      clsx(
                        header.id === 'created_at' || header.id === 'item'? 'w-[406px]' : 'w-[125px]',
                        'px-[6px] py-2 text-xs text-[#363A43] font-semibold'
                      )
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 && isLoading ? (
            <>
              {Array(10).fill(0).map((_, idx: number) => (
                <tr key={idx+1} className='text-xs text-gray-700 border-t border-[#D9DEE3]'>
                  <td className='px-[6px] py-2 text-[#5A6170] text-sm'>
                    <Skeleton className="w-3/5 rounded-md">
                      <div className="h-6 w-3/5 rounded-md bg-default-200"></div>
                    </Skeleton>
                  </td>
                  <td className='px-[6px] py-2 text-[#5A6170] text-sm'>
                    <Skeleton className="w-3/5 rounded-md">
                      <div className="h-6 w-3/5 rounded-md bg-default-200"></div>
                    </Skeleton>
                  </td>
                  <td className='px-[6px] py-2 text-[#5A6170] text-sm'>
                    <Skeleton className="w-3/5 rounded-md">
                      <div className="h-6 w-3/5 rounded-md bg-default-200"></div>
                    </Skeleton>
                  </td>
                  <td className='px-[6px] py-2 text-[#5A6170] text-sm'>
                    <Skeleton className="w-3/5 rounded-md">
                      <div className="h-6 w-3/5 rounded-md bg-default-200"></div>
                    </Skeleton>
                  </td>
                </tr>
              ))}
            </>
          ) : table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className='text-xs text-gray-700 border-t border-[#D9DEE3]'>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className='px-[6px] py-2 text-[#5A6170] text-sm'>
                      {cell.column.id === 'created_at'
                        ? formatDate(new Date(cell.renderValue() as string))
                        : cell.column.id === 'progress'
                          ? <States label={(cell.renderValue() as string)} state={(cell.renderValue() as string)} />
                          : flexRender(cell.column.columnDef.cell, cell.getContext())
                      }
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='flex items-center justify-between bg-white px-1 border-t border-[#D9DEE3]'>
        <span className='flex items-center gap-1 text-[#5A6170] text-xs font-medium px-[6px] py-[10px]'>
          <div>Viewing</div>
          {page} of{' '}
          {isNaN(Math.ceil(count / limit)) ? 1 : Math.ceil(count / limit)} {' '}
          results
        </span>
        
        <div className='flex gap-1'>
          <Button
            variant='mini'
            onClick={() => {
              fetchPageItem(page - 1)
              table.previousPage()
            }}
            disabled={page === 1}
          >Previous</Button>
          <Button
            variant='mini'
            onClick={() => {
              fetchPageItem(page + 1)
            }}
            disabled={!(limit * page <= count)}
          >Next</Button>
        </div>
      </div>
    </div>
  )
}
