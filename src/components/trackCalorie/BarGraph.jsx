import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarGraph({ data, timeRange, nutrientTab }) {
    return data && <ResponsiveContainer width="100%" height="100%" className="mt-12">
        <BarChart
            width={300}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={timeRange === "weekly" ? "day" : "week"} />
            <YAxis />
            <Tooltip />
            <Legend />
            {nutrientTab === "calories" && <Bar dataKey="calories" fill="#1a5e63" activeBar={<Rectangle stroke="blue" />} />}
            {nutrientTab === "protein" && <Bar dataKey="protein" fill="#3b82f6" activeBar={<Rectangle stroke="blue" />} />}
            {nutrientTab === "fats" && <Bar dataKey="fats" fill="#f59e0b" activeBar={<Rectangle stroke="blue" />} />}
        </BarChart>
    </ResponsiveContainer>
}