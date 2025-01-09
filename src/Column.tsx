// Column.tsx
import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { ColumnProps } from './types';
import styles from './Column.module.css';

export default function Column({ id, title, items }: ColumnProps) {
	const { setNodeRef } = useDroppable({
		id,
	});

	return (
		<div ref={setNodeRef} className={styles.column}>
			<h2 className={styles.title}>{title}</h2>
			<SortableContext
				items={items.map((item) => item.id)}
				strategy={verticalListSortingStrategy}
			>
				<div className={styles.content}>
					{items.map((item) => (
						<SortableItem key={item.id} item={item} />
					))}
				</div>
			</SortableContext>
		</div>
	);
}
