// SortableItem.tsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './types';
import styles from './DraggableItem.module.css';

interface SortableItemProps {
	item: Item;
}

export default function SortableItem({ item }: SortableItemProps) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: item.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={styles.item}
			{...attributes}
			{...listeners}
		>
			{item.content}
		</div>
	);
}
