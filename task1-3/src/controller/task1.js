const axios = require("axios");
const XLSX = require("xlsx");

const excelURL = "https://go.microsoft.com/fwlink/?LinkID=521962";

exports.saveFinancial = async (req, res) => {
  try {
    const response = await axios.get(excelURL, {
      responseType: "arraybuffer",
    });

    const workbook = XLSX.read(response.data, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet);

    const filteredData = data.filter((row) => row["  Sales "] > 50000);

    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(filteredData);

    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Filtered Data");

    XLSX.writeFile(newWorkbook, "filtered_data.xlsx");

    res.status(201).json("Filtered data saved successfully.");
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
