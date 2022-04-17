import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { defaultData } from "./utils/data";

const axios = require("axios");

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function GoEmotions() {
  const [text, setText] = useState(
    "I feel like I have no control over my life. It shouldn't be like this."
  );
  const [count, setCount] = useState(text.length);
  const [result, setResult] = useState([]);
  const [labels, setLabels] = useState(defaultData.labels);
  const [scores, setScores] = useState();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Score Percentage",
        data: scores,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  async function getSentiment() {
    const res = await axios.post("/api/classify", {
      sentence: text,
    });
    setResult(res.data);
    const dataLabels = res.data[0].map((data) => data.label);
    // console.log(dataLabels);
    setLabels(dataLabels);
    const dataScores = res.data[0].map((data) => (data.score * 100).toFixed(0));
    // console.log(dataScores);
    setScores(dataScores);
  }

  const handleGetSentiment = (e) => {
    e.preventDefault();
    getSentiment();
  };

  if (result.error) {
    getSentiment();
  }

  const handleTextChange = (e) => {
    const textValue = e.target.value;
    const countValue = e.target.value.length;
    setText(textValue);
    setCount(countValue);
  };

  useEffect(() => {
    getSentiment();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-6 space-y-8">
      <div className="space-y-2">
        <h1 className="font-bold">Multilabel Text Classification</h1>
        <h3 className="">Describe how you are feeling lately.</h3>
        <form className="space-y-2" onSubmit={handleGetSentiment}>
          <input
            className="pt-4 pb-2 border-b border-gray-200 w-full text-base md:text-lg italic focus:outline-none"
            required
            value={text}
            onChange={handleTextChange}
            disabled={result.error}
            maxLength="75"
          />
          <div className="flex items-center justify-between">
            <button className="btn-outline" disabled={result.error}>
              Submit
            </button>
            <p>Limit: {count}/75</p>
          </div>
        </form>
      </div>

      {/* <div>
        <h1>Emotions conveyed</h1>
      </div>
      {!result[0] && (
        <div>
          {result.error ? "loading emotions..." : "no emotions detected"}
        </div>
      )} */}
      {/* <div>
        {result[0] &&
          result[0]
            .sort((a, b) => b.score - a.score)
            .map(
              (data, index) =>
                index < 5 && (
                  <div key={index}>
                    <div>
                      <p>
                        {data.label} {(data.score * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                )
            )}
      </div> */}
      <div className="sm:p-4 md:p-6">
        <Radar data={chartData} />
      </div>
    </div>
  );
}
