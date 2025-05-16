import { SlArrowLeft } from "react-icons/sl";
import AnalyticsTable from "../../component/Analytics/AnalyticsTable";


const Analytics = () => {
    const reports = [
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
        {
            userName:"Israa Khan",
            testName:"ADI theory test",
            lastUpdate:"12/05/25"
        },
     

    ]
    return (
        <div>
                    <div className="flex  items-center gap-5 my-3">
                      <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
                      <p className="text-[#3564d3] font-title text-3xl font-bold">
               Analytics & Reports
                      </p>
                    </div>
                    <AnalyticsTable reports={reports}/>
        </div>
    );
};

export default Analytics;