import { type Annotation } from '@opencodegraph/schema'
import clsx from 'clsx'
import { useCallback, useRef, useState, type FunctionComponent } from 'react'
import styles from './Chip.module.css'
import { Popover } from './Popover'

/**
 * A single OpenCodeGraph annotation, displayed as a "chip".
 */
export const Chip: FunctionComponent<{
    annotation: Annotation
    className?: string
    popoverClassName?: string
}> = ({ annotation, className, popoverClassName }) => {
    const [popoverVisible, setPopoverVisible] = useState(false)
    const showPopover = useCallback((): void => setPopoverVisible(true), [])
    const hidePopover = useCallback((): void => setPopoverVisible(false), [])

    const anchorRef = useRef<HTMLElement>(null)

    return (
        <aside className={clsx(styles.chip, className)} ref={anchorRef}>
            <header onMouseEnter={showPopover} onMouseLeave={hidePopover} onFocus={showPopover} onBlur={hidePopover}>
                <h4 className={styles.title}>{annotation.title}</h4>
                {annotation.url && <a className={styles.stretchedLink} aria-hidden={true} href={annotation.url} />}
            </header>
            {annotation.ui?.detail && anchorRef.current && (
                <Popover anchor={anchorRef.current} visible={popoverVisible}>
                    <aside className={clsx(styles.popoverContent, popoverClassName)}>
                        {/* TODO(sqs): support markdown */}
                        <p className={styles.detail}>{annotation.ui?.detail}</p>
                    </aside>
                </Popover>
            )}
        </aside>
    )
}

/**
 * A list of OpenCodeGraph annotations (displayed as "chips").
 */
export const ChipList: FunctionComponent<{
    annotations: Annotation[]
    className?: string
    chipClassName?: string
    popoverClassName?: string
}> = ({ annotations, className, chipClassName, popoverClassName }) => (
    <div className={clsx(styles.list, className)}>
        {annotations.map((annotation, i) => (
            <Chip
                key={annotation.url ?? i}
                annotation={annotation}
                className={chipClassName}
                popoverClassName={popoverClassName}
            />
        ))}
    </div>
)