/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export default function App() {
  const [fileData, setFileData] = useState();
  const [jsonData, setJsonData] = useState([]);
  const [recordsData, setRecordsData] = useState([]);
  const [perPage, setPerPage] = useState(20);
  const [selectedLocalidade, setSelectedLocalidade] = useState('');
  const [filteredData, setFilteredData] = useState(recordsData);
  const [paginatedData, setPaginatedData] = useState(recordsData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        if (response.ok) {
          const data = await response.json();
          setRecordsData(data);
          setFilteredData([...data]); // Set filteredData to a copy of the recordsData state
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);  

  useEffect(() => {
      handlePageChange(1);
  }, [selectedLocalidade, recordsData]);  
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet, { range: 5 });
      setFileData(file);
      setJsonData(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleApiCall = async () => {
    if (!fileData) {
      alert('Please choose a file!');
      return;
    }
  
    const chunkSize = 100; // Maximum number of rows per chunk
    const chunks = [];
  
    // Split jsonData into chunks
    for (let i = 0; i < jsonData.length; i += chunkSize) {
      chunks.push(jsonData.slice(i, i + chunkSize));
    }
  
    // Send each chunk separately
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      try {
        const response = await fetch('http://localhost:5000/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(chunk)
        });
  
        if (response.ok) {
          console.log(await response.json());
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    alert('Data saved successfully!');
  };

  // Calculate total number of pages based on perPage and filteredData length
  const totalPages = Math.ceil(filteredData.length / perPage);

  // Slice the data based on current page and perPage
  const slicedData = filteredData.slice(0, perPage);

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const data = filteredData.slice(startIndex, endIndex); // Slice filteredData instead of recordsData
    setPaginatedData(data); // Set paginatedData to the sliced filtered data
  };  

  const handleLocalidadeChange = (event) => {
    const localidade = event.target.value;
    setSelectedLocalidade(localidade);
    const data = localidade ? recordsData.filter(item => item.LOCALIDADE === localidade) : recordsData;
    setFilteredData(data);
  };  

  return (
    <div className="App">
      {/* 
        <h1>File Uploader</h1>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleApiCall}>Upload and Save</button>
      */}
      <section className="filter">
        <label htmlFor="localidade">Filter by Localidade:</label>
        <select id="localidade" value={selectedLocalidade} onChange={handleLocalidadeChange}>
          <option value="">All</option>
          {Array.from(new Set(recordsData.map(item => item.LOCALIDADE))).map(localidade => (
            <option key={localidade} value={localidade}>{localidade}</option>
          ))}
        </select>
      </section>

      <section className="table">
        <ul>
          {paginatedData?.map((item) => (
            <li key={item._id}>
              <span>{item.NIF}</span>
              <span>{item.NOME}</span>
              <span>{item.LOCALIDADE}</span>
            </li>
          ))}
        </ul>
        <section className="pagination">
          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => handlePageChange(page)}>
                {page}
              </button>
            ))}
        </section>
      </section>
    </div>
  );
}  