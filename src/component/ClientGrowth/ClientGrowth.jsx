import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ClientGrowth = () => {
    // Data for 12 months
    const data = [
        { name: 'Jan', uv: 80 },
        { name: 'Feb', uv: 70 },
        { name: 'Mar', uv: 90 },
        { name: 'Apr', uv: 70 },
        { name: 'May', uv: 60 },
        { name: 'Jun', uv: 60 },
        { name: 'Jul', uv: 50 },
        { name: 'Aug', uv: 40 },
        { name: 'Sep', uv: 50 },
        { name: 'Oct', uv: 30 },
        { name: 'Nov', uv: 35 },
        { name: 'Dec', uv: 80 },
    ];

    const VendorData = [
        { name: '2016', uv: 8000 },
        { name: '2017', uv: 20000 },
        { name: '2018', uv: 50000 },
        { name: '2019', uv: 60000 },
        { name: '2020', uv: 6000 },
        { name: '2021', uv: 20000 },
        { name: '2022', uv: 80000 },
    
    ];
    return (
        <div className="grid grid-cols-2 gap-3">
            <div className="text-black p-5 bg-white rounded-xl" style={{ height: "220px" }}>
                <p className="font-title text-lg py-3 font-bold tracking-wide">Client Growth</p>
                <ResponsiveContainer width="100%" height="100%" className={"pb-12"}>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} tickCount={6} />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#35BEBD" fill="#35BEBD" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="text-black p-5 bg-white rounded-xl" style={{ height: "220px" }}>
                <p className="font-title text-lg py-3 font-bold tracking-wide">Vendor Growth</p>
                <ResponsiveContainer width="100%" height="100%" className={"pb-12"}>
                    <AreaChart
                        data={VendorData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                            ticks={[0, 10000, 20000, 50000, 100000]} // Set the specific ticks you want
                            tickFormatter={(tick) => `${tick / 1000}k`} // Format the tick values as 10k, 20k, etc.
                        />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#35BEBD" fill="#35BEBD" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ClientGrowth;
