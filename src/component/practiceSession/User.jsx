import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const User = () => {
    // Data for 12 months
    const data = [
        { name: 'Jan', uv: 0 },
        { name: 'Feb', uv: 6 },
        { name: 'Mar', uv: 4 },
        { name: 'Apr', uv: 12 },
        { name: 'May', uv: 7 },
        { name: 'Jun', uv: 9 },
        { name: 'Jul', uv: 13 },
        { name: 'Aug', uv: 7 },
        { name: 'Sep', uv: 12 },
        { name: 'Oct', uv: 6 },
        { name: 'Nov', uv: 20 },
    ];

    return (
        <div className="p-5 bg-[#3F5EAB] rounded-xl" style={{ height: "300px" }}>
            <p className="font-title text-lg py-3 font-bold tracking-wide">User</p>
            <ResponsiveContainer width="100%" height="100%" className={"pb-12"}>
                <LineChart
                    data={data}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="white" /> {/* Change XAxis text color */}
                    <YAxis
                        domain={[0, 20]}
                        ticks={[0, 4, 8, 12, 16, 20]} // Set custom tick values here
                        stroke="white"  // Change YAxis text color
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#000', color: '#fff', borderRadius: '5px', border: 'none' }} />
                    {/* Tooltip component updated with content style */}
                    <Line type="monotone" dataKey="uv" stroke="#ffffff" fill="#35BEBD" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default User;
