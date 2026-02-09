import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { useGetUserChartsQuery } from '../../redux/feature/others/othersApi';

const User = () => {
    const {data:userChart}=useGetUserChartsQuery(undefined)
    // console.log("user charts--->",userChart);
    // Data for 12 months
    const chartsData =userChart?.data?.chartData


    return (
        <div className="p-5 bg-[#3F5EAB] rounded-xl" style={{ height: "300px" }}>
            <p className="font-title text-lg py-3 font-bold tracking-wide">User</p>
            <ResponsiveContainer width="100%" height="100%" className={"pb-12"}>
                <LineChart
                    data={chartsData}
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
                    <Line type="monotone" dataKey="totalUser" stroke="#ffffff" fill="#35BEBD" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default User;
