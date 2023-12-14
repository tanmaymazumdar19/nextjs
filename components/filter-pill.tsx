'use client'

import type { JSX } from 'react'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

import Button from './button'
import { states } from '@/constant/states'

import ArrowDownIcon from '@/assets/arrow-down.svg'
import PlusIcon from '@/assets/plus.svg'

export interface FilterPillProps {
  label: string
  value?: string
  onChange?: (key: string) => void
}

export default function FilterPill(props: Readonly<FilterPillProps>): JSX.Element {
  const value = props.value
  const ref = useRef()
  const chip = useRef()
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState(new Set())
  const [val, setVal] = useState<string>('')

  function onStateChange(): void {
    // @ts-ignore
    props.onChange?.([...filter][0] ?? val)
  }

  return (
    <div>
      <div
        className={clsx(
          'p-[5px] h-6 rounded-full border border-[#C1C8D1] flex gap-1 items-center text-[12px] text-[#6A7383] cursor-pointer bg-white',
          value ? '' : 'border-dashed'
        )}
        onClick={() => setOpen((prev: boolean) => !prev)}
        // @ts-expect-error
        ref={chip}
      >
        <PlusIcon />
        {props.label}
        {value ? (
          <>
            {' '}
            | <p className='text-[#007AFF] text-xs font-medium capitalize'>{value}</p>
            <ArrowDownIcon />
          </>
        ) : null}
      </div>
      {/* @ts-expect-error */}
      <div ref={ref} />

      {open
        ? createPortal(
            <div
              className={clsx(
                'flex flex-col gap-4 w-[300px] p-4 bg-white border border-gray-200 rounded-[10px] shadow absolute'
              )}
              // @ts-expect-error
              style={{ top: `${chip.current.getBoundingClientRect().bottom + 8}px` }}
            >
              <h1 className='text-xl font-medium text-gray-900'>Filter by {props.label}</h1>
              <div className='flex items-center gap-2 w-full'>
                <p className='font-normal text-gray-700 min-w-[78px]'>is equal to</p>

                {props.label === 'State' ? (
                  <Select
                    variant='bordered'
                    placeholder='Select a state'
                    className='max-w-xs'
                    {...(value ? { defaultSelectedKeys: [(value ?? '').toLowerCase()] } : {})}
                    // @ts-expect-error
                    onSelectionChange={setFilter}
                  >
                    {states.map((state: { id: string; label: string }) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </Select>
                ) : (
                  <Input
                    label=''
                    type='text'
                    variant='bordered'
                    defaultValue={value ?? ''}
                    classNames={{ inputWrapper: ['h-[34px]'] }}
                    onChange={(e: any) => setVal(e.target.value)}
                  />
                )}
              </div>
              <Button variant='normal' onClick={() => {
                onStateChange()
                setOpen(false)
              }}>
                Apply
              </Button>
            </div>,
            // @ts-expect-error
            ref.current
          )
        : null}
    </div>
  )
}
