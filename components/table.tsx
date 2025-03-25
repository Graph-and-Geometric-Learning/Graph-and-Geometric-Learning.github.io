import { useState } from "react";
import SortableTable from "./sortable-table";
import data from "../app/projects/mtbench/data/data_leaderboard.json";
import "../styles/table.css";

function Table() {
  return (
    <div className="Table">
      <SortableTable data={data} />
    </div>
  );
}

export default Table;