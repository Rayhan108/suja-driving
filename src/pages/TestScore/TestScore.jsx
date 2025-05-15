import { SlArrowLeft } from "react-icons/sl";
import TestScoreTable from "../../component/TestScore/TestScoreTable";

const TestScore = () => {
    const testData = [
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
        {
            testType:"Theory Test",
            setting:"Pass mark",
            currentValue:"80% to pass"
        },
    ]
    return (
        <div>
                    <div className="flex  items-center gap-5 my-3">
                      <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
                      <p className="text-[#3564d3] font-title text-3xl font-bold">
                   Test & Scoring Settings
                      </p>
                    </div>
                    <TestScoreTable testData={testData}/>
        </div>
    );
};

export default TestScore;