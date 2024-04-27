const axios = require("axios");

async function getInputData() {
  try {
    const response = await axios.get(
      "https://share.shub.edu.vn/api/intern-test/input"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching input data:", error);
    throw error;
  }
}

function processQueries(data, queries) {
  const results = [];
  for (const query of queries) {
    const [l, r] = query.range;
    let result = 0;
    if (query.type === "1") {
      for (let i = l; i <= r; i++) {
        result += data[i];
      }
    } else if (query.type === "2") {
      for (let i = l; i <= r; i++) {
        result += i % 2 === 0 ? data[i] : -data[i];
      }
    }
    results.push(result);
  }
  return results;
}

exports.calculateArray = async (req, res) => {
  try {
    const inputData = await getInputData();
    const { token, data, query } = inputData;
    const output = processQueries(data, query);
    const response = await axios.post(
      "https://share.shub.edu.vn/api/intern-test/output",
      output,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(201).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.message);
      res.status(500).json("Failed to connect to the API.");
    } else if (error.code === "ENOTFOUND") {
      console.error("URL Error:", error.message);
      res.status(500).json("Failed to access the Excel URL.");
    } else {
      console.error("Error:", error.message);
      res.status(500).json("Internal Server Error.");
    }
  }
};
