import { clsx } from 'clsx'

type Placement = 'top' | 'bottom' | 'left' | 'right'

const placementCva: Record<Placement, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
}

export interface TooltipProps {
  content: React.ReactNode
  placement?: Placement
  children: React.ReactElement
  className?: string
}

export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={clsx(
          'pointer-events-none absolute z-50 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100',
          placementCva[placement],
          className
        )}
      >
        {content}
      </span>
    </span>
  )
}
