import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

const circleSize = 76;

interface Props {
  completionPercentage: number;
}

const BarChart = ({ completionPercentage }: Props) => {
  return (
    <RadialBarChart
      width={circleSize}
      height={circleSize}
      cx={circleSize / 2}
      cy={circleSize / 2}
      innerRadius={circleSize / 2 - 10}
      outerRadius={circleSize / 2}
      barSize={circleSize / 20}
      data={[{ value: `${completionPercentage}` }]}
      startAngle={90}
      endAngle={360 + 90}
    >
      <PolarAngleAxis
        type="number"
        domain={[0, 100]}
        angleAxisId={0}
        tick={false}
      />
      <RadialBar
        background
        dataKey="value"
        cornerRadius={circleSize / 2}
        fill={completionPercentage === 100 ? "#06c6a3" : "#f79550"}
        angleAxisId={0}
      />
    </RadialBarChart>
  );
};

export default BarChart;
