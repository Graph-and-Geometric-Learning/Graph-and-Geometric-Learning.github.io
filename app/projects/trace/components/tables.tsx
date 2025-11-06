import React from 'react';
import tableData1 from "../data/table1.json";
import tableData2 from "../data/table2.json";
import tableData3 from "../data/table3.json";
import tableData4 from "../data/table4.json";
import tableData5 from "../data/table5.json";

function Table1() {
  const renderCategoryCell = (row:any, index:any) => {
    if (row.category === "") {
      return <td className="category-cell-empty"></td>;
    }
    
    const prevCategory = tableData1[index - 1]?.category;
    if (row.category === prevCategory) return null;
    
    const rowSpan = tableData1.filter(r => r.category === row.category).length;
    return (
      <td rowSpan={rowSpan} className="category-cell">
        <div className="category-text">{row.category}</div>
      </td>
    );
  };

  return (
    <div className="table-wrapper">
      <h3 className="table-title">Table 1: Retrieval results on 2,000 bidirectional Text–Timeseries query pairs. “Random” indicates a non-informative retriever that ranks candidates uniformly at random. </h3>
      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th rowSpan={2} className="category-header"></th>
              <th rowSpan={2} className="retriever-header">Retriever</th>
              <th colSpan={3} className="group-header">Label Matching</th>
              <th colSpan={3} className="group-header">Modality Matching</th>
              <th colSpan={1} className="group-header">Text</th>
              <th colSpan={2} className="group-header">Time Series</th>
            </tr>
            <tr>
              <th className="metric-header">P@1 (↑)</th>
              <th className="metric-header">P@5 (↑)</th>
              <th className="metric-header">MRR (↑)</th>
              <th className="metric-header">P@1 (↑)</th>
              <th className="metric-header">P@5 (↑)</th>
              <th className="metric-header">MRR (↑)</th>
              <th className="metric-header">ROUGE (↑)</th>
              <th className="metric-header">MAE (↓)</th>
              <th className="metric-header">MSE (↓)</th>
            </tr>
          </thead>
          <tbody>
            {tableData1.map((row, index) => (
              <tr key={index} className={row.isBest ? 'best-row' : ''}>
                {renderCategoryCell(row, index)}
                <td className="retriever-cell">{row.retriever}</td>
                <td>{row.label_matching.p_at_1}</td>
                <td>{row.label_matching.p_at_5}</td>
                <td>{row.label_matching.mrr}</td>
                <td>{row.modality_matching.p_at_1}</td>
                <td>{row.modality_matching.p_at_5}</td>
                <td>{row.modality_matching.mrr}</td>
                <td>{row.text.rouge}</td>
                <td>{row.time_series.mae}</td>
                <td>{row.time_series.mse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style>{`

        .category-text {
          transform: rotate(180deg);
          white-space: nowrap;
          font-weight: bold;
        }
        
      `}</style>
    </div>
  );
}

function Table2() {
  return (
    <div className="table-wrapper">
      <h3 className="table-title">Table 2: TS-to-TS Retrieval performance comparison. Evaluation is conducted over 1000 randomly sampled weather time-series queries.</h3>
      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th className="group-header">Method</th>
              <th className="group-header">P@1</th>
              <th className="group-header">P@5</th>
              <th className="group-header">MRR</th>
              <th className="group-header">Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {tableData2.map((row:any, index:any) => (
              <tr key={index} className={row.isBest ? 'best-row' : ''}>
                <td>{row.method}</td>
                <td>{row.p_at_1.toFixed(3)}</td>
                <td>{row.p_at_5.toFixed(3)}</td>
                <td>{row.mrr.toFixed(3)}</td>
                <td>{row.time < 1 ? row.time.toFixed(3) : row.time.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Table3() {
  return (
    <div className="table-wrapper">
      <h3 className="table-title">Table 3: Forecasting performance on Weather dataset for next 24 steps under different retrieval-augmented generation settings.</h3>
      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th rowSpan={2} className="setting-header">Setting</th>
              <th colSpan={2} className="group-header">Timer-XL</th>
              <th colSpan={2} className="group-header">Time-MoE</th>
              <th colSpan={2} className="group-header">Moment</th>
              <th colSpan={2} className="group-header">TRACE</th>
            </tr>
            <tr>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
            </tr>
          </thead>
          <tbody>
            {tableData3.map((row:any, index:any) => (
              <tr key={index} className={row.isBest ? '' : ''}>
                <td>{row.setting}</td>
                <td>{row.timerXL.mae.toFixed(3)}</td>
                <td>{row.timerXL.mse.toFixed(3)}</td>
                <td>{row.timeMoE.mae.toFixed(3)}</td>
                <td>{row.timeMoE.mse.toFixed(3)}</td>
                <td>{row.moment.mae.toFixed(3)}</td>
                <td>{row.moment.mse.toFixed(3)}</td>
                <td>{row.trace.mae.toFixed(3)}</td>
                <td>{row.trace.mse.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style>{`        
        .group-header,
        .setting-header {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

function Table4() {
  const renderCategoryRow = (row:any, index:any) => {
    if (index === 0 || tableData4[index - 1].category !== row.category) {
      return (
        <tr className="category-row">
          <td colSpan={3} className="category-cell-italic">
            {row.category}
          </td>
        </tr>
      );
    }
    return null;
  };

  return (
    <div className="table-wrapper">
      <h3 className="table-title">Table 4: Weather Event Classification Results</h3>
      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th className="model-header">Model</th>
              <th className="metric-header group-header">Accuracy</th>
              <th className="metric-header group-header">F1</th>
            </tr>
          </thead>
          <tbody>
            {tableData4.map((row, index) => (
              <React.Fragment key={index}>
                {renderCategoryRow(row, index)}
                <tr className={row.isBest ? 'best-row' : ''}>
                  <td className="model-cell">{row.model}</td>
                  <td className={row.noBold ? 'no-bold' : ''}>{row.accuracy.toFixed(2)}</td>
                  <td className={row.noBold ? 'no-bold' : ''}>{row.f1.toFixed(2)}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      <style>{`
        
        .category-row td {
          border: 1px solid #e0e0e0;
          text-align: left!important;
          font-style: italic;
          font-weight: bold!important;
          padding: 4px 8px;
        }

      `}</style>
    </div>
  );
}

function Table5() {
  const renderCategoryCell = (row:any, index:any) => {
    const prevCategory = tableData5[index - 1]?.category;
    if (row.category === prevCategory) return null;
    
    const rowSpan = tableData5.filter(r => r.category === row.category).length;
    return (
      <td rowSpan={rowSpan} className="category-cell">
        <div className="category-text">{row.category}</div>
      </td>
    );
  };

  const isHighlighted = (row:any, field:any) => {
    return row.highlighted?.includes(field);
  };

  const isRedHighlighted = (row:any, field:any) => {
    return row.redHighlighted?.includes(field);
  };

  const isNoBold = (row:any, field:any) => {
    return row.noBold?.includes(field);
  };

  const getCellClass = (row: any, field: any) => {
    const classes = [];
    
    if (isNoBold(row, field)) classes.push('no-bold');
    if (isRedHighlighted(row, field)) classes.push('red-highlighted-cell');
    if (isHighlighted(row, field)) classes.push('highlighted-cell');
    
    return classes.join(' ');
  };

  return (
    <div className="table-wrapper">
      <h3 className="table-title">Table 5: Forecasting results (MAE and MSE) of full-shot models and time series foundation models on multi-variate (M) and univariate (U) datasets. Red: the best, Blue: the 2nd best.</h3>
      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th rowSpan={3} className="category-header"></th>
              <th rowSpan={3} className="model-header">Model</th>
              <th colSpan={4} className="group-header">Weather (M)</th>
              <th colSpan={4} className="group-header">Health (U)</th>
              <th colSpan={4} className="group-header">Energy (U)</th>
              <th colSpan={4} className="group-header">Environment (U)</th>
              <th rowSpan={3} className="count-header">#<br/>1<sup>st</sup></th>
            </tr>
            <tr>
              <th colSpan={2} className="subgroup-header">H = 7</th>
              <th colSpan={2} className="subgroup-header">H = 24</th>
              <th colSpan={2} className="subgroup-header">H = 12</th>
              <th colSpan={2} className="subgroup-header">H = 48</th>
              <th colSpan={2} className="subgroup-header">H = 12</th>
              <th colSpan={2} className="subgroup-header">H = 48</th>
              <th colSpan={2} className="subgroup-header">H = 48</th>
              <th colSpan={2} className="subgroup-header">H = 336</th>
            </tr>
            <tr>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
              <th className="metric-header">MAE</th>
              <th className="metric-header">MSE</th>
            </tr>
          </thead>
          <tbody>
            {tableData5.map((row, index) => (
              <tr key={index} className={row.isBest ? 'best-row' : ''}>
                {renderCategoryCell(row, index)}
                <td className="model-cell">{row.model}</td>
                <td className={getCellClass(row, 'weather_h7_mae')}>{row.weather.h7_mae.toFixed(3)}</td>
                <td className={getCellClass(row, 'weather_h7_mse')}>{row.weather.h7_mse.toFixed(3)}</td>
                <td className={getCellClass(row, 'weather_h24_mae')}>{row.weather.h24_mae.toFixed(3)}</td>
                <td className={getCellClass(row, 'weather_h24_mse')}>{row.weather.h24_mse.toFixed(3)}</td>
                <td className={getCellClass(row, 'health_h12_mae')}>{row.health.h12_mae.toFixed(3)}</td>
                <td className={getCellClass(row, 'health_h12_mse')}>{row.health.h12_mse.toFixed(3)}</td>
                <td className={getCellClass(row, 'health_h48_mae')}>{row.health.h48_mae.toFixed(3)}</td>
                <td className={getCellClass(row, 'health_h48_mse')}>{row.health.h48_mse.toFixed(3)}</td>
                <td className={getCellClass(row, 'energy_h12_mae')}>{row.energy.h12_mae.toFixed(3)}</td>
                <td className={getCellClass(row, 'energy_h12_mse')}>{row.energy.h12_mse.toFixed(3)}</td>
                <td className={getCellClass(row, 'energy_h48_mae')}>{row.energy.h48_mae.toFixed(3)}</td>
                <td className={getCellClass(row, 'energy_h48_mse')}>{row.energy.h48_mse.toFixed(3)}</td>
                <td className={getCellClass(row, 'environment_h48_mae')}>{row.environment.h48_mae.toFixed(3)}</td>
                <td className={getCellClass(row, 'environment_h48_mse')}>{row.environment.h48_mse.toFixed(3)}</td>
                <td className={getCellClass(row, 'environment_h336_mae')}>{row.environment.h336_mae.toFixed(3)}</td>
                <td className={getCellClass(row, 'environment_h336_mse')}>{row.environment.h336_mse.toFixed(3)}</td>
                <td className={`count-cell ${row.isBest ? 'red-highlighted-cell' : (row.first_count > 1 ? 'highlighted-cell' : '')}`}>{row.first_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style>{`
        .table-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .table-title {
          margin-bottom: 10px;
          font-size: 14px;
          
        }
        
        .table-container {
          overflow-x: auto;
          max-width: 100%;
        }
        
        .results-table {
          border-collapse: collapse;
          font-size: 14px;
        }
        
        .results-table th,
        .results-table td {
          border: 1px solid #7d7d7dff;
          padding: 2px 4px;
          font-weight: normal;
          text-align: center;
        }
        
        .group-header,
        .category-header,
        .model-header,
        .count-header {
          font-weight: bold !important;
        }
        
        .category-cell {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-weight: bold;
          vertical-align: middle;
          text-align: center;
        }
        
        .category-text {
          transform: rotate(180deg);
          white-space: nowrap;
        }
        
        .model-cell {
          text-align: left!important;
        }
        
        .best-row td {
          background-color: #c5c4c496 !important;
          font-weight: bold;
        }
        
        .best-row .model-cell {
          font-weight: bold;
        }
        
        .highlighted-cell {
          color: #0400ffff !important;
          text-decoration: underline;
          
        }
        
        .red-highlighted-cell {
          color: #fb1900ff !important;
          font-weight: bold !important;
          text-decoration: none;
           
        }
        
        .best-row .highlighted-cell,
        .best-row .red-highlighted-cell {
          background-color: #c5c4c4b2;
        }
        
        .count-cell {
          font-weight: normal;
        }
                
        .best-row .count-cell {
          background-color: #c5c4c4b2;
        }
        
        .best-row .no-bold {
          font-weight: normal !important;
        }

        .best-row .no-bold .highlighted-cell {
          font-weight: normal !important;
          color: #0022ffff !important;
        }
        
        sup {
          font-size: 0.7em;
        }
      `}</style>
    </div>
  );
}

export {Table1, Table2, Table3, Table4, Table5};