'use client'
import data from "../data/data_leaderboard.json";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@heroui/react";
import { useAsyncList } from "@react-stately/data";

// Define headers for each table
const headers: { key: string; label: string }[] = [
  { key: "model_name", label: "Model" },
  { key: "stock_price_forecast_7_day_mae_ts", label: "Stock price prediction \n for 7 days under TS (MAE)" },
  { key: "stock_price_forecast_7_day_mae_ts_w_text", label: "Stock price prediction for 7 days under TS+Text (MAE)" },
  { key: "stock_price_forecast_7_day_mape_ts", label: "Stock price prediction for 7 days under TS (MAPE)" },
  { key: "stock_price_forecast_7_day_mape_ts_w_text", label: "Stock price prediction for 7 days under TS+Text (MAPE)" },
  { key: "stock_price_forecast_30_day_mae_ts", label: "Stock price prediction for 30 days under TS (MAE)" },
  { key: "stock_price_forecast_30_day_mae_ts_w_text", label: "Stock price prediction for 30 days under TS+Text (MAE)" },
  { key: "stock_price_forecast_30_day_mape_ts", label: "Stock price prediction for 30 days under TS (MAPE)" },
  { key: "stock_price_forecast_30_day_mape_ts_w_text", label: "Stock price prediction for 30 days under TS+Text (MAPE)" },
  { key: "temp_forecast_7_day_mse_ts", label: "Temp. prediction for 7 days under TS (MSE)" },
  { key: "temp_forecast_7_day_mse_ts_w_text", label: "Temp. prediction for 7 days under TS+Text (MSE)" },
  { key: "temp_forecast_7_day_mae_ts", label: "Temp. prediction for 7 days under TS (MAE)" },
  { key: "temp_forecast_7_day_mae_ts_w_text", label: "Temp. prediction for 7 days under TS+Text (MAE)" },
  { key: "temp_forecast_14_day_mse_ts", label: "Temp. prediction for 14 days under TS (MSE)" },
  { key: "temp_forecast_14_day_mse_ts_w_text", label: "Temp. prediction for 14 days under TS+Text (MSE)" },
  { key: "temp_forecast_14_day_mae_ts", label: "Temp. prediction for 14 days under TS (MAE)" },
  { key: "temp_forecast_14_day_mae_ts_w_text", label: "Temp. prediction for 14 days under TS+Text (MAE)" },
  { key: "stock_trend_predict_acc_7_day_3_way_ts", label: "Stock trend prediction for 7 days 3-way under TS (Acc)" },
  { key: "stock_trend_predict_acc_7_day_3_way_ts_w_text", label: "Stock trend prediction for 7 days 3-way under TS+Text (Acc)" },
  { key: "stock_trend_predict_acc_7_day_5_way_ts", label: "Stock trend prediction for 7 days 5-way under TS (Acc)" },
  { key: "stock_trend_predict_acc_7_day_5_way_ts_w_text", label: "Stock trend prediction for 7 days 5-way under TS+Text (Acc)" },
  { key: "stock_trend_predict_acc_30_day_3_way_ts", label: "Stock trend prediction for 30 days 3-way under TS (Acc)" },
  { key: "stock_trend_predict_acc_30_day_3_way_ts_w_text", label: "Stock trend prediction for 30 days 3-way under TS+Text (Acc)" },
  { key: "stock_trend_predict_acc_30_day_5_way_ts", label: "Stock trend prediction for 30 days 5-way under TS (Acc)" },
  { key: "stock_trend_predict_acc_30_day_5_way_ts_w_text", label: "Stock trend prediction for 30 days 5-way under TS+Text (Acc)" },
  { key: "temp_trend_predict_acc_past_ts", label: "Temp. trend prediction past under TS (Acc)" },
  { key: "temp_trend_predict_acc_past_ts_w_text", label: "Temp. trend prediction past under TS+Text (Acc)" },
  { key: "temp_trend_predict_acc_future_ts", label: "Temp. trend prediction future under TS (Acc)" },
  { key: "temp_trend_predict_acc_future_ts_w_text", label: "Temp. trend prediction future under TS+Text (Acc)" },
  { key: "stock_indicator_predict_mse_7_day_macd_ts", label: "MACD prediction for 7 days under TS (MSE)" },
  { key: "stock_indicator_predict_mse_7_day_macd_ts_w_text", label: "MACD prediction for 7 days under TS+Text (MSE)" },
  { key: "stock_indicator_predict_mse_7_day_bb_ts", label: "Bollinger Bands prediction for 7 days under TS (MSE)" },
  { key: "stock_indicator_predict_mse_7_day_bb_ts_w_text", label: "Bollinger Bands prediction for 7 days under TS+Text (MSE)" },
  { key: "stock_indicator_predict_mse_30_day_macd_ts", label: "MACD prediction for 30 days under TS (MSE)" },
  { key: "stock_indicator_predict_mse_30_day_macd_ts_w_text", label: "MACD prediction for 30 days under TS+Text (MSE)" },
  { key: "stock_indicator_predict_mse_30_day_bb_ts", label: "Bollinger Bands prediction for 30 days under TS (MSE)" },
  { key: "stock_indicator_predict_mse_30_day_bb_ts_w_text", label: "Bollinger Bands prediction for 30 days under TS+Text (MSE)" },
  { key: "temp_predict_max_mse_ts", label: "Temp. prediction max under TS (MSE)" },
  { key: "temp_predict_max_mse_ts_w_text", label: "Temp. prediction max under TS+Text (MSE)" },
  { key: "temp_predict_max_mae_ts", label: "Temp. prediction max under TS (MAE)" },
  { key: "temp_predict_max_mae_ts_w_text", label: "Temp. prediction max under TS+Text (MAE)" },
  { key: "temp_predict_min_mse_ts", label: "Temp. prediction min under TS (MSE)" },
  { key: "temp_predict_min_mse_ts_w_text", label: "Temp. prediction min under TS+Text (MSE)" },
  { key: "temp_predict_min_mae_ts", label: "Temp. prediction min under TS (MAE)" },
  { key: "temp_predict_min_mae_ts_w_text", label: "Temp. prediction min under TS+Text (MAE)" },
  { key: "temp_predict_diff_mse_ts", label: "Temp. prediction diff. under TS (MSE)" },
  { key: "temp_predict_diff_mse_ts_w_text", label: "Temp. prediction diff. under TS+Text (MSE)" },
  { key: "temp_predict_diff_mae_ts", label: "Temp. prediction diff. under TS (MAE)" },
  { key: "temp_predict_diff_mae_ts_w_text", label: "Temp. prediction diff. under TS+Text (MAE)" },
  { key: "news_stock_corr_acc_7_day_3_way", label: "News stock corr. for 7 days 3-way (Acc)" },
  { key: "news_stock_corr_acc_7_day_5_way", label: "News stock corr. for 7 days 5-way (Acc)" },
  { key: "news_stock_corr_acc_30_day_3_way", label: "News stock corr. for 30 days 3-way (Acc)" },
  { key: "news_stock_corr_acc_30_day_5_way", label: "News stock corr. for 30 days 5-way (Acc)" },
  { key: "news_driven_mcqa_acc_7_day_fin", label: "News driven MCQA for 7 days for Finance data (Acc)" },
  { key: "news_driven_mcqa_acc_7_day_weather", label: "News driven MCQA for 7 days for Weather data (Acc)" },
  { key: "news_driven_mcqa_acc_30_day_fin", label: "News driven MCQA for 30 days for Finance data (Acc)" },
  { key: "news_driven_mcqa_acc_30_day_weather", label: "News driven MCQA for 30 days for Weather data (Acc)" }

];

const headers1: { key: string; label: string }[] = [
  { key: "model_name", label: "Model" },
  { key: "stock_price_forecast_7_day_mae_ts", label: "Stock price prediction \n for 7 days under TS (MAE)" },
  { key: "stock_price_forecast_7_day_mae_ts_w_text", label: "Stock price prediction for 7 days under TS+Text (MAE)" },
  { key: "stock_price_forecast_7_day_mape_ts", label: "Stock price prediction for 7 days under TS (MAPE)" },
  { key: "stock_price_forecast_7_day_mape_ts_w_text", label: "Stock price prediction for 7 days under TS+Text (MAPE)" },
  { key: "stock_price_forecast_30_day_mae_ts", label: "Stock price prediction for 30 days under TS (MAE)" },
  { key: "stock_price_forecast_30_day_mae_ts_w_text", label: "Stock price prediction for 30 days under TS+Text (MAE)" },
  { key: "stock_price_forecast_30_day_mape_ts", label: "Stock price prediction for 30 days under TS (MAPE)" },
  { key: "stock_price_forecast_30_day_mape_ts_w_text", label: "Stock price prediction for 30 days under TS+Text (MAPE)" },
  { key: "temp_forecast_7_day_mse_ts", label: "Temp. prediction for 7 days under TS (MSE)" },
  { key: "temp_forecast_7_day_mse_ts_w_text", label: "Temp. prediction for 7 days under TS+Text (MSE)" },
  { key: "temp_forecast_7_day_mae_ts", label: "Temp. prediction for 7 days under TS (MAE)" },
  { key: "temp_forecast_7_day_mae_ts_w_text", label: "Temp. prediction for 7 days under TS+Text (MAE)" },
  { key: "temp_forecast_14_day_mse_ts", label: "Temp. prediction for 14 days under TS (MSE)" },
  { key: "temp_forecast_14_day_mse_ts_w_text", label: "Temp. prediction for 14 days under TS+Text (MSE)" },
  { key: "temp_forecast_14_day_mae_ts", label: "Temp. prediction for 14 days under TS (MAE)" },
  { key: "temp_forecast_14_day_mae_ts_w_text", label: "Temp. prediction for 14 days under TS+Text (MAE)" },
];

const headers2: { key: string; label: string }[] = [
  { key: "model_name", label: "Model" },
  { key: "stock_trend_predict_acc_7_day_3_way_ts", label: "Stock trend prediction for 7 days 3-way under TS (Acc)" },
  { key: "stock_trend_predict_acc_7_day_3_way_ts_w_text", label: "Stock trend prediction for 7 days 3-way under TS+Text (Acc)" },
  { key: "stock_trend_predict_acc_7_day_5_way_ts", label: "Stock trend prediction for 7 days 5-way under TS (Acc)" },
  { key: "stock_trend_predict_acc_7_day_5_way_ts_w_text", label: "Stock trend prediction for 7 days 5-way under TS+Text (Acc)" },
  { key: "stock_trend_predict_acc_30_day_3_way_ts", label: "Stock trend prediction for 30 days 3-way under TS (Acc)" },
  { key: "stock_trend_predict_acc_30_day_3_way_ts_w_text", label: "Stock trend prediction for 30 days 3-way under TS+Text (Acc)" },
  { key: "stock_trend_predict_acc_30_day_5_way_ts", label: "Stock trend prediction for 30 days 5-way under TS (Acc)" },
  { key: "stock_trend_predict_acc_30_day_5_way_ts_w_text", label: "Stock trend prediction for 30 days 5-way under TS+Text (Acc)" },
  { key: "temp_trend_predict_acc_past_ts", label: "Temp. trend prediction past under TS (Acc)" },
  { key: "temp_trend_predict_acc_past_ts_w_text", label: "Temp. trend prediction past under TS+Text (Acc)" },
  { key: "temp_trend_predict_acc_future_ts", label: "Temp. trend prediction future under TS (Acc)" },
  { key: "temp_trend_predict_acc_future_ts_w_text", label: "Temp. trend prediction future under TS+Text (Acc)" },
];

const headers3: { key: string; label: string }[] = [
  { key: "model_name", label: "Model" },
  { key: "stock_indicator_predict_mse_7_day_macd_ts", label: "MACD prediction for 7 days under TS (MSE)" },
  { key: "stock_indicator_predict_mse_7_day_macd_ts_w_text", label: "MACD prediction for 7 days under TS+Text (MSE)" },
  { key: "stock_indicator_predict_mse_7_day_bb_ts", label: "Bollinger Bands prediction for 7 days under TS (MSE)" },
  { key: "stock_indicator_predict_mse_7_day_bb_ts_w_text", label: "Bollinger Bands prediction for 7 days under TS+Text (MSE)" },
  { key: "stock_indicator_predict_mse_30_day_macd_ts", label: "MACD prediction for 30 days under TS (MSE)" },
  { key: "stock_indicator_predict_mse_30_day_macd_ts_w_text", label: "MACD prediction for 30 days under TS+Text (MSE)" },
  { key: "stock_indicator_predict_mse_30_day_bb_ts", label: "Bollinger Bands prediction for 30 days under TS (MSE)" },
  { key: "stock_indicator_predict_mse_30_day_bb_ts_w_text", label: "Bollinger Bands prediction for 30 days under TS+Text (MSE)" },
  { key: "temp_predict_max_mse_ts", label: "Temp. prediction max under TS (MSE)" },
  { key: "temp_predict_max_mse_ts_w_text", label: "Temp. prediction max under TS+Text (MSE)" },
  { key: "temp_predict_max_mae_ts", label: "Temp. prediction max under TS (MAE)" },
  { key: "temp_predict_max_mae_ts_w_text", label: "Temp. prediction max under TS+Text (MAE)" },
  { key: "temp_predict_min_mse_ts", label: "Temp. prediction min under TS (MSE)" },
  { key: "temp_predict_min_mse_ts_w_text", label: "Temp. prediction min under TS+Text (MSE)" },
  { key: "temp_predict_min_mae_ts", label: "Temp. prediction min under TS (MAE)" },
  { key: "temp_predict_min_mae_ts_w_text", label: "Temp. prediction min under TS+Text (MAE)" },
  { key: "temp_predict_diff_mse_ts", label: "Temp. prediction diff. under TS (MSE)" },
  { key: "temp_predict_diff_mse_ts_w_text", label: "Temp. prediction diff. under TS+Text (MSE)" },
  { key: "temp_predict_diff_mae_ts", label: "Temp. prediction diff. under TS (MAE)" },
  { key: "temp_predict_diff_mae_ts_w_text", label: "Temp. prediction diff. under TS+Text (MAE)" },
];

const headers4: { key: string; label: string }[] = [
  { key: "model_name", label: "Model" },
  { key: "news_stock_corr_acc_7_day_3_way", label: "News stock corr. for 7 days 3-way (Acc)" },
  { key: "news_stock_corr_acc_7_day_5_way", label: "News stock corr. for 7 days 5-way (Acc)" },
  { key: "news_stock_corr_acc_30_day_3_way", label: "News stock corr. for 30 days 3-way (Acc)" },
  { key: "news_stock_corr_acc_30_day_5_way", label: "News stock corr. for 30 days 5-way (Acc)" },
  { key: "news_driven_mcqa_acc_7_day_fin", label: "News driven MCQA for 7 days for Finance data (Acc)" },
  { key: "news_driven_mcqa_acc_7_day_weather", label: "News driven MCQA for 7 days for Weather data (Acc)" },
  { key: "news_driven_mcqa_acc_30_day_fin", label: "News driven MCQA for 30 days for Finance data (Acc)" },
  { key: "news_driven_mcqa_acc_30_day_weather", label: "News driven MCQA for 30 days for Weather data (Acc)" }
];

function createSortableTable(headers: { key: string; label: string }[]) {
  return function SortableTableComponent() {
    const [isLoading, setIsLoading] = React.useState(true);
    type ModelItem = {
      model_name: string;
      [key: string]: any;
    }
    let list = useAsyncList<ModelItem>({
      async load({ }) {
        setIsLoading(false);
        return {
          items: data,
        };
      },

      async sort({ items, sortDescriptor }) {
        return {
          items: items.sort((a, b) => {
            let first = a[sortDescriptor.column];
            let second = b[sortDescriptor.column];
            let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

            if (sortDescriptor.direction === "descending") {
              cmp *= -1;
            }

            return cmp;
          }),
        };
      },
    });

    return (
      <Table
        aria-label="Dynamic sortable table"
        classNames={{
          table: "min-h-[400px]",
        }}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}>
        <TableHeader>
          {headers.map((h) => (
            <TableColumn key={h.key} allowsSorting className="whitespace-normal break-words text-sm max-w-[150px]">
              {h.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (

            <TableRow key={item.model_name} className="hover:bg-white/10">
              {(columnKey) => (
                <TableCell className={
                  columnKey === "model_name"
                    ? "sticky left-0 z-10 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
                    : ""}>
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };
}

// Create separate tables
const SortableTable = createSortableTable(headers);
const SortableTableTask1 = createSortableTable(headers1);
const SortableTableTask2 = createSortableTable(headers2);
const SortableTableTask3 = createSortableTable(headers3);
const SortableTableTask4 = createSortableTable(headers4);

// Export all tables
export { SortableTable, SortableTableTask1, SortableTableTask2, SortableTableTask3, SortableTableTask4 };