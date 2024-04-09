/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-tabs */
import React from "react";
import {
	GridComponent,
	Inject,
	ColumnsDirective,
	ColumnDirective,
	Search,
	Page,
} from "@syncfusion/ej2-react-grids";

// import { employeesData, employeesGrid } from "../data/dummy";
import { stocksDataWithPrice, stocksGrid } from "../data/testData";
import { Header } from "../components";

const Stocks = () => {
	const toolbarOptions = ["Search"];

	const editing = { allowDeleting: false, allowEditing: false };

	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
			<Header category="Page" title="Stocks" />
			<GridComponent
				dataSource={stocksDataWithPrice}
				width="auto"
				allowPaging
				allowSorting
				pageSettings={{ pageCount: 10 }}
				editSettings={editing}
				toolbar={toolbarOptions}
			>
				<ColumnsDirective>
					{/* eslint-disable-next-line react/jsx-props-no-spreading */}
					{stocksGrid.map((item, index) => (
						<ColumnDirective key={index} {...item} />
					))}
				</ColumnsDirective>
				<Inject services={[Search, Page]} />
			</GridComponent>
		</div>
	);
};
export default Stocks;
