'use client' 
import { MouseEventHandler, useCallback, useState } from "react";
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
    // nulls sort after anything else
    if (a[sortKey] === null) {
        return 1;
    }
    if (b[sortKey] === null) {
        return -1;
    }
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
    { key: "stock_price_forecast_7_day_mae_ts", label: "Stock price predict. \n for 7 days under TS (MAE)" },
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
    { key: "stock_trend_predict_acc_7_day_3_way_ts", label: "Stock trend predict. for 7 days 3-way under TS (Acc)"},
    { key: "stock_trend_predict_acc_7_day_3_way_ts_w_text", label: "Stock trend predict. for 7 days 3-way under TS+Text (Acc)"},
    { key: "stock_trend_predict_acc_7_day_5_way_ts", label: "Stock trend predict. for 7 days 5-way under TS (Acc)"},
    { key: "stock_trend_predict_acc_7_day_5_way_ts_w_text", label: "Stock trend predict. for 7 days 5-way under TS+Text (Acc)"},
    { key: "stock_trend_predict_acc_30_day_3_way_ts", label: "Stock trend predict. for 30 days 3-way under TS (Acc)"},
    { key: "stock_trend_predict_acc_30_day_3_way_ts_w_text", label: "Stock trend predict. for 30 days 3-way under TS+Text (Acc)"},
    { key: "stock_trend_predict_acc_30_day_5_way_ts", label: "Stock trend predict. for 30 days 5-way under TS (Acc)"},
    { key: "stock_trend_predict_acc_30_day_5_way_ts_w_text", label: "Stock trend predict. for 30 days 5-way under TS+Text (Acc)"},
    { key: "temp_trend_predict_acc_past_ts", label: "Temp. trend predict. past under TS (Acc)"},
    { key: "temp_trend_predict_acc_past_ts_w_text", label: "Temp. trend predict. past under TS+Text (Acc)"},
    { key: "temp_trend_predict_acc_future_ts", label: "Temp. trend predict. future under TS (Acc)"},
    { key: "temp_trend_predict_acc_future_ts_w_text", label: "Temp. trend predict. future under TS+Text (Acc)"},
    { key: "stock_indicator_predict_mse_7_day_macd_ts", label: "MACD predict. for 7 days under TS (MSE)"}, 
    { key: "stock_indicator_predict_mse_7_day_macd_ts_w_text", label: "MACD predict. for 7 days under TS+Text (MSE)"},
    { key: "stock_indicator_predict_mse_7_day_bb_ts", label: "Bollinger Bands predict. for 7 days under TS (MSE)"}, 
    { key: "stock_indicator_predict_mse_7_day_bb_ts_w_text", label: "Bollinger Bands predict. for 7 days under TS+Text (MSE)"},
    { key: "stock_indicator_predict_mse_30_day_macd_ts", label: "MACD predict. for 30 days under TS (MSE)"}, 
    { key: "stock_indicator_predict_mse_30_day_macd_ts_w_text", label: "MACD predict. for 30 days under TS+Text (MSE)"},
    { key: "stock_indicator_predict_mse_30_day_bb_ts", label: "Bollinger Bands predict. for 30 days under TS (MSE)"}, 
    { key: "stock_indicator_predict_mse_30_day_bb_ts_w_text", label: "Bollinger Bands predict. for 30 days under TS+Text (MSE)"},
    { key: "temp_predict_max_mse_ts", label: "Temp. predict. max under TS (MSE)"},
    { key: "temp_predict_max_mse_ts_w_text", label: "Temp. predict. max under TS+Text (MSE)"},
    { key: "temp_predict_max_mae_ts", label: "Temp. predict. max under TS (MAE)"},
    { key: "temp_predict_max_mae_ts_w_text", label: "Temp. predict. max under TS+Text (MAE)"},
    { key: "temp_predict_min_mse_ts", label: "Temp. predict. min under TS (MSE)"},
    { key: "temp_predict_min_mse_ts_w_text", label: "Temp. predict. min under TS+Text (MSE)"},
    { key: "temp_predict_min_mae_ts", label: "Temp. predict. min under TS (MAE)"},
    { key: "temp_predict_min_mae_ts_w_text", label: "Temp. predict. min under TS+Text (MAE)"},
    { key: "temp_predict_diff_mse_ts", label: "Temp. predict. diff. under TS (MSE)"},
    { key: "temp_predict_diff_mse_ts_w_text", label: "Temp. predict. diff. under TS+Text (MSE)"},
    { key: "temp_predict_diff_mae_ts", label: "Temp. predict. diff. under TS (MAE)"},
    { key: "temp_predict_diff_mae_ts_w_text", label: "Temp. predict. diff. under TS+Text (MAE)"},
    { key: "news_stock_corr_acc_7_day_3_way", label: "News stock corr. for 7 days 3-way (Acc)"},
    { key: "news_stock_corr_acc_7_day_5_way", label: "News stock corr. for 7 days 5-way (Acc)"},
    { key: "news_stock_corr_acc_30_day_3_way", label: "News stock corr. for 30 days 3-way (Acc)"},
    { key: "news_stock_corr_acc_30_day_5_way", label: "News stock corr. for 30 days 5-way (Acc)"},
    { key: "news_driven_mcqa_acc_7_day_fin", label: "News driven MCQA for 7 days for Finance data (Acc)"},
    { key: "news_driven_mcqa_acc_7_day_weather", label: "News driven MCQA for 7 days for Weather data (Acc)"},
    { key: "news_driven_mcqa_acc_30_day_fin", label: "News driven MCQA for 30 days for Finance data (Acc)"},
    { key: "news_driven_mcqa_acc_30_day_weather", label: "News driven MCQA for 30 days for Weather data (Acc)"}

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
              <td className="headcol">{model.model_name}</td>
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
              <td>{model.stock_trend_predict_acc_7_day_3_way_ts}</td>
              <td>{model.stock_trend_predict_acc_7_day_3_way_ts_w_text}</td>
              <td>{model.stock_trend_predict_acc_7_day_5_way_ts}</td>
              <td>{model.stock_trend_predict_acc_7_day_5_way_ts_w_text}</td>
              <td>{model.stock_trend_predict_acc_30_day_3_way_ts}</td>
              <td>{model.stock_trend_predict_acc_30_day_3_way_ts_w_text}</td>
              <td>{model.stock_trend_predict_acc_30_day_5_way_ts}</td>
              <td>{model.stock_trend_predict_acc_30_day_5_way_ts_w_text}</td>
              <td>{model.temp_trend_predict_acc_past_ts}</td>
              <td>{model.temp_trend_predict_acc_past_ts_w_text}</td>
              <td>{model.temp_trend_predict_acc_future_ts}</td>
              <td>{model.temp_trend_predict_acc_future_ts_w_text}</td>
              <td>{model.stock_indicator_predict_mse_7_day_macd_ts}</td>
              <td>{model.stock_indicator_predict_mse_7_day_macd_ts_w_text}</td>
              <td>{model.stock_indicator_predict_mse_7_day_bb_ts}</td>
              <td>{model.stock_indicator_predict_mse_7_day_bb_ts_w_text}</td>
              <td>{model.stock_indicator_predict_mse_30_day_macd_ts}</td>
              <td>{model.stock_indicator_predict_mse_30_day_macd_ts_w_text}</td>
              <td>{model.stock_indicator_predict_mse_30_day_bb_ts}</td>
              <td>{model.stock_indicator_predict_mse_30_day_bb_ts_w_text}</td>
              <td>{model.temp_predict_max_mse_ts}</td>
              <td>{model.temp_predict_max_mse_ts_w_text}</td>
              <td>{model.temp_predict_max_mae_ts}</td>
              <td>{model.temp_predict_max_mae_ts_w_text}</td>
              <td>{model.temp_predict_min_mse_ts}</td>
              <td>{model.temp_predict_min_mse_ts_w_text}</td>
              <td>{model.temp_predict_min_mae_ts}</td>
              <td>{model.temp_predict_min_mae_ts_w_text}</td>
              <td>{model.temp_predict_diff_mse_ts}</td>
              <td>{model.temp_predict_diff_mse_ts_w_text}</td>
              <td>{model.temp_predict_diff_mae_ts}</td>
              <td>{model.temp_predict_diff_mae_ts_w_text}</td>
              <td>{model.news_stock_corr_acc_7_day_3_way}</td>
              <td>{model.news_stock_corr_acc_7_day_5_way}</td>
              <td>{model.news_stock_corr_acc_30_day_3_way}</td>
              <td>{model.news_stock_corr_acc_30_day_5_way}</td>
              <td>{model.news_driven_mcqa_acc_7_day_fin}</td>
              <td>{model.news_driven_mcqa_acc_7_day_weather}</td>
              <td>{model.news_driven_mcqa_acc_30_day_fin}</td>
              <td>{model.news_driven_mcqa_acc_30_day_weather}</td>

            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SortableTable;
