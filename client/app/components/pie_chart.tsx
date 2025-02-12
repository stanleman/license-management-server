import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PieChartAnalysis = () => {

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={800} height={400}>
                <Pie
                    data={data}
                    // cx={120}
                    // cy={200}
                    innerRadius={90}
                    // outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartAnalysis;