import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4780 },
  { name: 'May', value: 5890 },
  { name: 'Jun', value: 4390 },
  { name: 'Jul', value: 5490 },
];

export const PerformanceChart = () => {
  return (
    <ResponsiveContainer width="100%" height={236}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0',
          }}
        />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
