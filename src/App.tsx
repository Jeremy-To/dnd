// App.tsx
import { useState } from 'react';
import {
	DndContext,
	DragEndEvent,
	useSensor,
	useSensors,
	PointerSensor,
	closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './Column';
import { Item } from './types';
import styles from './App.module.css';

const initialItems: { [key: string]: Item[] } = {
	column1: [
		{ id: '1', content: 'Item 1' },
		{ id: '2', content: 'Item 2' },
		{ id: '3', content: 'Item 3' },
	],
	column2: [
		{ id: '4', content: 'Item 4' },
		{ id: '5', content: 'Item 5' },
	],
};

export default function App() {
	const [items, setItems] = useState(initialItems);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	const findContainer = (id: string) => {
		if (id in items) {
			return id;
		}
		return Object.keys(items).find((key) =>
			items[key].some((item) => item.id === id)
		);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;

		const activeId = active.id as string;
		const overId = over.id as string;

		const activeContainer = findContainer(activeId);
		const overContainer = findContainer(overId);

		if (!activeContainer || !overContainer) return;

		if (activeContainer === overContainer) {
			// Same container sorting
			const activeIndex = items[activeContainer].findIndex(
				(item) => item.id === activeId
			);
			const overIndex = items[activeContainer].findIndex(
				(item) => item.id === overId
			);

			if (activeIndex !== overIndex) {
				setItems((prev) => ({
					...prev,
					[activeContainer]: arrayMove(
						prev[activeContainer],
						activeIndex,
						overIndex
					),
				}));
			}
		} else {
			// Moving between containers
			setItems((prev) => {
				const activeItems = [...prev[activeContainer]];
				const overItems = [...prev[overContainer]];

				const activeIndex = activeItems.findIndex(
					(item) => item.id === activeId
				);
				const overIndex = overItems.findIndex((item) => item.id === overId);

				// Remove from active container
				const [item] = activeItems.splice(activeIndex, 1);

				// Insert into new container
				overItems.splice(
					overIndex >= 0 ? overIndex : overItems.length,
					0,
					item
				);

				return {
					...prev,
					[activeContainer]: activeItems,
					[overContainer]: overItems,
				};
			});
		}
	};

	return (
		<div className={styles.container}>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className={styles.columns}>
					{Object.keys(items).map((columnId) => (
						<Column
							key={columnId}
							id={columnId}
							title={columnId === 'column1' ? 'Column 1' : 'Column 2'}
							items={items[columnId]}
						/>
					))}
				</div>
			</DndContext>
		</div>
	);
}
