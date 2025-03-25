'use client' 
import { MouseEventHandler, useCallback, useState } from "react";
// import data from "../app/projects/mtbench/data/data.json";
import data from "../app/projects/mtbench/data/data_leaderboard.json";

type Data = typeof data;

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = data.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        sortKey === columnKey && sortOrder === "desc"
          ? "sort-button sort-reverse"
          : "sort-button"
      }`}
    >
      ▲
    </button>
  );
}

function SortableTable({ data }: { data: Data }) {
  const [sortKey, setSortKey] = useState<SortKeys>("model_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const headers: { key: SortKeys; label: string }[] = [
    { key: "model_name", label: "Model" },
    { key: "stock_price_forecast_7_day_mae_ts", label: "Stock price predict. for 7 days under TS (MAE)" },
    { key: "stock_price_forecast_7_day_mae_ts_w_text", label: "Stock price predict. for 7 days under TS+Text (MAE)" },
    { key: "stock_price_forecast_7_day_mape_ts", label: "Stock price predict. for 7 days under TS (MAPE)" },
    { key: "stock_price_forecast_7_day_mape_ts_w_text", label: "Stock price predict. for 7 days under TS+Text (MAPE)" },
    { key: "stock_price_forecast_30_day_mae_ts", label: "Stock price predict. for 30 days under TS (MAE)" },
    { key: "stock_price_forecast_30_day_mae_ts_w_text", label: "Stock price predict. for 30 days under TS+Text (MAE)" },
    { key: "stock_price_forecast_30_day_mape_ts", label: "Stock price predict. for 30 days under TS (MAPE)" },
    { key: "stock_price_forecast_30_day_mape_ts_w_text", label: "Stock price predict. for 30 days under TS+Text (MAPE)" },
    { key: "temp_forecast_7_day_mse_ts", label: "Temp. predict. for 7 days under TS (MSE)" },
    { key: "temp_forecast_7_day_mse_ts_w_text", label: "Temp. predict. for 7 days under TS+Text (MSE)" },
    { key: "temp_forecast_7_day_mae_ts", label: "Temp. predict. for 7 days under TS (MAE)" },
    { key: "temp_forecast_7_day_mae_ts_w_text", label: "Temp. predict. for 7 days under TS+Text (MAE)" },
    { key: "temp_forecast_14_day_mse_ts", label: "Temp. predict. for 14 days under TS (MSE)" },
    { key: "temp_forecast_14_day_mse_ts_w_text", label: "Temp. predict. for 14 days under TS+Text (MSE)" },
    { key: "temp_forecast_14_day_mae_ts", label: "Temp. predict. for 14 days under TS (MAE)" },
    { key: "temp_forecast_14_day_mae_ts_w_text", label: "Temp. predict. for 14 days under TS+Text (MAE)" },
  ];

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
    [data, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return (
              <td key={row.key}>
                {row.label}{" "}
                <SortButton
                  columnKey={row.key}
                  onClick={() => changeSort(row.key)}
                  {...{
                    sortOrder,
                    sortKey,
                  }}
                />
              </td>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {sortedData().map((model) => {
          return (
            <tr key={model.model_name}>
              <td>{model.model_name}</td>
              <td>{model.stock_price_forecast_7_day_mae_ts}</td>
              <td>{model.stock_price_forecast_7_day_mae_ts_w_text}</td>
              <td>{model.stock_price_forecast_7_day_mape_ts}</td>
              <td>{model.stock_price_forecast_7_day_mape_ts_w_text}</td>
              <td>{model.stock_price_forecast_30_day_mae_ts}</td>
              <td>{model.stock_price_forecast_30_day_mae_ts_w_text}</td>
              <td>{model.stock_price_forecast_30_day_mape_ts}</td>
              <td>{model.stock_price_forecast_30_day_mape_ts_w_text}</td>
              <td>{model.temp_forecast_7_day_mse_ts}</td>
              <td>{model.temp_forecast_7_day_mse_ts_w_text}</td>
              <td>{model.temp_forecast_7_day_mae_ts}</td>
              <td>{model.temp_forecast_7_day_mae_ts_w_text}</td>
              <td>{model.temp_forecast_14_day_mse_ts}</td>
              <td>{model.temp_forecast_14_day_mse_ts_w_text}</td>
              <td>{model.temp_forecast_14_day_mae_ts}</td>
              <td>{model.temp_forecast_14_day_mae_ts_w_text}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SortableTable;
