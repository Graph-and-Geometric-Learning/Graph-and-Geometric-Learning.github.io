import { useState } from "react";
import {SortableTable, SortableTable1, SortableTable2, SortableTable3, SortableTable4} from "./sortable-table";
import data from "../data/data_leaderboard.json";
import "../styles/table.css";

function Table() {
  return (
    <div className="table-wrapper">
      <SortableTable data={data} />
    </div>
  );
}

function Table1() {
  return (
    <div className="table-wrapper">
      <SortableTable1 data={data} />
    </div>
  );
}

function Table2() {
  return (
    <div className="table-wrapper">
      <SortableTable2 data={data} />
    </div>
  );
}

function Table3() {
  return (
    <div className="table-wrapper">
      <SortableTable3 data={data} />
    </div>
  );
}

function Table4() {
  return (
    <div className="table-wrapper">
      <SortableTable4 data={data} />
    </div>
  );
}

// Exporting all four tables
export { Table, Table1, Table2, Table3, Table4 };

// export default Table;

