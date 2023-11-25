import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function App() {
  const [colors, setColors] = useState(COLORS);

  const handleColorChange = (event, index) => {
    const value = event.target.value;
    setColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = value;
      return newColors;
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-2">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          My Pie Chart
        </h1>
        <div className="flex justify-center mb-6 space-x-6">
          {colors.map((color, index) => (
            <div key={index} className="w-32">
              <label
                htmlFor={`color${index + 1}`}
                className="inline-block font-medium mb-2"
              >
                Color {index + 1}
              </label>
              <input
                type="color"
                id={`color${index + 1}`}
                name={`color${index + 1}`}
                value={color}
                onChange={(event) => handleColorChange(event, index)}
                className="block w-full"
              />
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={(entry) =>
                `${entry.name} ${(
                  (entry.value / data.reduce(
                    (acc, cur) => acc + cur.value,
                    0
                  )) *
                  100
                ).toFixed(2)}%`
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}