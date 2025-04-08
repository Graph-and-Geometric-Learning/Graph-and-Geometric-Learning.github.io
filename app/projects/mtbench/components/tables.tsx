import { useState } from "react";
import { SortableTable, SortableTableTask1, SortableTableTask2, SortableTableTask3, SortableTableTask4 } from "./sortable-tables";

function Table() {
  return (
    <div className="table-wrapper">
      <SortableTable />
    </div>
  );
}

function Table1() {
  return (
    <div className="table-wrapper">
      <SortableTableTask1 />
    </div>
  );
}

function Table2() {
  return (
    <div className="table-wrapper">
      <SortableTableTask2 />
    </div>
  );
}

function Table3() {
  return (
    <div className="table-wrapper">
      <SortableTableTask3 />
    </div>
  );
}

function Table4() {
  return (
    <div className="table-wrapper">
      <SortableTableTask4 />
    </div>
  );
}

// Exporting all four tables
export { Table, Table1, Table2, Table3, Table4 };