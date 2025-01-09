// types.ts
export interface Item {
	id: string;
	content: string;
}

export interface ColumnProps {
	id: string;
	title: string;
	items: Item[];
}
