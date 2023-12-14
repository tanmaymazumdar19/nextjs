import type { ComponentProps, JSX } from 'react'
import clsx from 'clsx'

import { ESTATE } from '@/constant/states'

import CompletedIcon from '../assets/check.svg'
import DraftIcon from '../assets/draft.svg'
import PendingIcon from '../assets/pending.svg'

export interface StatesProps extends ComponentProps<'div'> {
  label: string
  state: string
}

function getStateStyle(state: string): string | null {
  if (state === ESTATE.COMPLETE) {
    return 'bg-[#B8EF814D] border-[#B8EF81] text-[#478524]'
  }

  if (state === ESTATE.DRAFT) {
    return 'bg-[#C1C8D14D] border-[#C1C8D1] text-[#6E7686]'
  }

  if (state === ESTATE.PENDING) {
    return 'bg-[#FFE6634D] border-[#FFE663] text-[#FF9900]'
  }

  return null
}

function getStateIcon(state: string) {
  if (state === ESTATE.DRAFT) {
    return DraftIcon
  }

  if (state === ESTATE.COMPLETE) {
    return CompletedIcon
  }

  if (state === ESTATE.PENDING) {
    return PendingIcon
  }
}

export default function States(props: Readonly<StatesProps>): JSX.Element {
  const stateStyle = getStateStyle(props.state)

  const StateIcon = getStateIcon(props.state)

  return (
    <div
      className={clsx(
        stateStyle,
        'py-[3px] w-fit px-1 flex gap-1 items-center border rounded text-xs h-[20px] capitalize'
      )}
    >
      {props.label}
      <StateIcon />
    </div>
  )
}
