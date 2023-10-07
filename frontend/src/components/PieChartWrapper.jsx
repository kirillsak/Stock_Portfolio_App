import PieChart from "./PieChart";
import "../PieChartWrapper.css";

function PieChartWrapper({ data }) {
  if (Object.keys(data).length > 0) {
    return (
      <div className="pie-chart-container">
        <PieChart data={data} />
      </div>
    );
  }
  return null;
}

export default PieChartWrapper;
