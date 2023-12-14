import type { ComponentProps, JSX } from 'react'
import clsx from 'clsx'

export interface ButtonProps extends ComponentProps<'button'> {
  variant: 'mini' | 'normal'
}

export default function Button(props: Readonly<ButtonProps>): JSX.Element {
  return (
    <>
      {props.variant === 'mini' ? (
        <button
          className={clsx(
            'w-fit h-fit py-[6px] px-2 border rounded-[6px] flex gap-[6px] items-center text-[12px]',
            props.disabled
              ? 'border-[#CBCFD64D] text-[#363A434D]'
              : 'shadow-mini bg-white border-[#CBCFD6] cursor-pointer text-[#363A43] font-semibold active:bg-[#eee]'
          )}
          {...props}
        />
      ) : null}

      {props.variant === 'normal' ? (
        <button
          className={clsx(
            'w-full h-fit p-2 border rounded-[6px] flex gap-[6px] items-center text-[12px] justify-center text-white',
            props.disabled
              ? 'border-[#CBCFD64D] bg-[#0066DF4D] text-[#363A434D]'
              : 'shadow-mini bg-[#0066DF] border-[#CBCFD6] cursor-pointer text-[#363A43] font-semibold active:bg-[#0251af]'
          )}
          {...props}
        />
      ) : null}
    </>
  )
}
