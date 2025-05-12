import { Progress } from "antd";

const Question = () => {
      const questions = [
    { id: 1, primaryScore: 75, secondaryScore: 90 },
    { id: 2, primaryScore: 60, secondaryScore: 85 },
    { id: 3, primaryScore: 40, secondaryScore: 80 },
    { id: 4, primaryScore: 55, secondaryScore: 75 },
    { id: 5, primaryScore: 70, secondaryScore: 90 },
  ]
    return (
        <div className="w-[50%] mt-3">
            <div className="max-w-md mx-auto p-4 border-2  rounded-md bg-white text-black font-title">
      <h2 className="text-lg font-semibold mb-4">Most Difficult Questions</h2>

      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="space-y-1">
            <div className="text-sm font-medium">Question {question.id}</div>
            <div className="relative h-5">
              {/* Secondary score (gray/purple bar) */}
              <Progress
                percent={question.secondaryScore}
                showInfo={false}
                strokeColor="#7F8CB2"
                trailColor="transparent"
                className="absolute top-0 left-0 w-full"
              />
              <Progress
                percent={question.primaryScore}
                showInfo={false}
                strokeColor="#5eead4"
                trailColor="transparent"
                className="absolute top-0 left-0 w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
    );
};

export default Question;