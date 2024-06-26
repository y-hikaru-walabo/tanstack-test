import {
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

const data = [
	{ id: 1, text: "aaaaa" },
	{ id: 2, text: "bbbbb" },
	{ id: 3, text: "ccccc" },
	{ id: 4, text: "ddddd" },
	{ id: 5, text: "eeeee" },
	{ id: 6, text: "ffffff" },
	{ id: 7, text: "gggggg" },
	{ id: 8, text: "hhhhhh" },
	{ id: 9, text: "iiiiii" },
	{ id: 10, text: "jjjjjjjjj" },
];

// biome-ignore lint/suspicious/noExplicitAny: any allow
const { accessor } = createColumnHelper<any>();
const columns = [
	accessor("id", {
		header: "id",
	}),
	accessor("text", {
		header: "テキスト",
	}),
];

export const useTableGenerator = () => {
	const table = useReactTable({
		data,
		columns,
		getSortedRowModel: getSortedRowModel(),
		defaultColumn: { cell: ({ getValue }) => getValue() },
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		enableGlobalFilter: true,
	});

	return { table };
};
