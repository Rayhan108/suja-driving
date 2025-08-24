import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, BarChart, Bar, Rectangle } from "recharts";
import User from "./User";

const PracticeSession = () => {
const data = [
    { name: "Jan", Hazard: 8, Theory: 12 },
    { name: "Feb", Hazard: 15, Theory: 18 },
    { name: "Mar", Hazard: 20, Theory: 25 },
    { name: "Apr", Hazard: 30, Theory: 35 },
    { name: "May", Hazard: 22, Theory: 28 },
    { name: "Jun", Hazard: 10, Theory: 16 },
    { name: "Jul", Hazard: 17, Theory: 22 },
    { name: "Aug", Hazard: 14, Theory: 19 },
    { name: "Sep", Hazard: 26, Theory: 33 },
    { name: "Oct", Hazard: 19, Theory: 23 },
    { name: "Nov", Hazard: 25, Theory: 30 },
    { name: "Dec", Hazard: 28, Theory: 34 }
];


  // Since your VendorData doesn't have a uv field, we need to adjust the ticks dynamically based on the max value of Hazard
  const maxVendorValue = Math.max(...data.map((item) => item.Hazard));

  // Calculate ticks for Vendor Growth dynamically (step by 10)
  const vendorTicks = [];
  for (let i = 0; i <= maxVendorValue; i += 10) {
    vendorTicks.push(i);
  }

  return (
    <div className="w-[90%] mx-auto gap-3">
      {/* User charts */}
      <User />
      
      {/* <div className="p-5 bg-[#3F5EAB] rounded-xl" style={{ height: "300px" }}>
        <p className="font-title text-lg py-3 font-bold tracking-wide">
          Practice Session
        </p>
        <ResponsiveContainer width="100%" height="100%" className={"pb-12"}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="white" /> 
            <YAxis
              ticks={vendorTicks}
              tickFormatter={(tick) => `${tick}`}
              stroke="white" 
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Theory" 
              fill="#01FFD5"
              activeBar={<Rectangle fill="gold" />}
            />
            <Bar
              dataKey="Hazard" 
              fill="#FFC300"
              activeBar={<Rectangle fill="pink" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default PracticeSession;
