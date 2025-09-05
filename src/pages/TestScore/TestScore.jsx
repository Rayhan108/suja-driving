import { SlArrowLeft } from "react-icons/sl";
import TestScoreTable from "../../component/TestScore/TestScoreTable";
import { useGetAllTestResultQuery } from "../../redux/feature/testScoring/testScoringApi";
import { useState } from "react";

const TestScore = () => {
    const [page, setPage] = useState(1);
  const { data: allTestResult } = useGetAllTestResultQuery(page);
  const testData = allTestResult?.data?.result;
  const meta = allTestResult?.data?.meta
      // ---- pagination state (server-side) ----
      // ---- pass this to the table ----
  const handlePageChange = (nextPage /*, pageSize */) => {
    console.log("calling functon........",nextPage);
    setPage(nextPage); // triggers RTK Query refetch because query args changed
  }
  return (
    <div>
      <div className="flex  items-center gap-5 mt-3 mb-12">
       
        <p className="text-[#3564d3] font-title text-3xl font-bold">
          Test & Scoring Settings
        </p>
      </div>
      <TestScoreTable testData={testData} handlePageChange={handlePageChange} page={page} meta={meta}/>
    </div>
  );
};

export default TestScore;
