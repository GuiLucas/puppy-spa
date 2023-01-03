import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import styles from './Tooltip.module.css';

type TooltipProps = {
    children: React.ReactNode
    content: string
    open: boolean
    defaultOpen: boolean

    onOpenChange: () => void
}

export function Tooltip(props: TooltipProps) {
    const { 
        children,
        content,
        open,
        defaultOpen,
        onOpenChange,
        ...otherProps
     } = props

    return <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
    >
        <TooltipPrimitive.Trigger asChild>
            {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content className={styles.TooltipContent} side="top" align="center" {...otherProps}>
            {content}
            <TooltipPrimitive.Arrow width={11} height={5} />
        </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
}
