/* eslint-disable no-unused-vars */
import './BeneList.scss'
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import BlobBtn from './BlobBtn/BlobBtn';
import PaginationIndex from './PaginationIndex/PaginationIndex';

export default function BeneList() {
  const [page, setPage] = useState(1);
  const [fileData, setFileData] = useState();
  const [jsonData, setJsonData] = useState([]);
  const [recordsData, setRecordsData] = useState([]);
  const [originalRecordsData, setOriginalRecordsData] = useState([]);
  const [perPage, setPerPage] = useState(20);
  const [selectedLocalidade, setSelectedLocalidade] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('asc');
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState(recordsData);
  const [nomeSearchTerm, setNomeSearchTerm] = useState('');
  const [localidadeSearchTerm, setLocalidadeSearchTerm] = useState('');
  const [nifSearchTerm, setNifSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setRecordsData(data);
            setOriginalRecordsData([...data]); // Set originalRecordsData to a copy of the recordsData state
            setFilteredData(data); // Update filteredData here
          }
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
    const normalizedLocalidadeSearchTerm = localidadeSearchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedNomeSearchTerm = nomeSearchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedNifSearchTerm = nifSearchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const searchedData = originalRecordsData.filter(record =>
      record.LOCALIDADE.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedLocalidadeSearchTerm) &&
      record.NOME.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedNomeSearchTerm) &&
      record.NIF.toString().includes(normalizedNifSearchTerm)
    );
    setFilteredData(searchedData);
    orderObjects(searchedData, selectedOrder);
  }, [localidadeSearchTerm, nomeSearchTerm, nifSearchTerm, originalRecordsData, selectedOrder]);
  
  useEffect(() => {
    setPaginatedData([...filteredData].slice(0, perPage));
  }, [filteredData, perPage]);
  
  function orderObjects(data = [], order = 'asc') {
    let sortedData = [];
    if (order === 'asc') {
      sortedData = [...data].sort((a, b) => a.LOCALIDADE.localeCompare(b.LOCALIDADE));
    } else if (order === 'desc') {
      sortedData = [...data].sort((a, b) => b.LOCALIDADE.localeCompare(a.LOCALIDADE));
    }
    setFilteredData(sortedData);
    setPaginatedData([...sortedData].slice(0, perPage));
  }
  
  
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

  const handlePageChange = (page) => {
    setPage(page);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const data = filteredData.slice(startIndex, endIndex);
    setPaginatedData(data);
  };
  const handleChange = event => {
    setLocalidadeSearchTerm(event.target.value);
  };
  
  const handleRandomClick = filtered => {
    const randomObject = getRandomObjectFromArray(filtered ? filteredData : originalRecordsData);
    setFilteredData(randomObject);
  };

  function getRandomObjectFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return [arr[randomIndex]];
  }

  
  const handleLocalidadeChange = (event) => {
    const localidade = event.target.value;
    setSelectedLocalidade(localidade);
    const data = localidade ? recordsData.filter(item => item.LOCALIDADE === localidade) : recordsData;
    setFilteredData(data);
    setLocalidadeSearchTerm(localidade); // set the search term to the selected localidade
  };

  function normalize(str) {
    return str.normalize("NFD")  // convert accented characters to their basic forms
              .replace(/[\u0300-\u036f]/g, "")  // remove accents
              .replace(/[^\w\s]/g, "")  // remove punctuation
              .toLowerCase();  // convert to lowercase
  }
  
  return (
    <div className="BeneList">
      {/* 
        <h1>File Uploader</h1>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleApiCall}>Upload and Save</button>
      */}
<section className="filter">
  <label htmlFor="nifFilter">Filtrar por NIF:&nbsp; </label>
<input
  id='nifFilter'
  type="number"
  placeholder="...NIF"
  value={nifSearchTerm}
  onChange={(e) => setNifSearchTerm(e.target.value)}
  pattern="[0-9]{1,9}"
  onInput={(e) => {
    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,9)
  }}
/>
  <br />
  <br />

  <label htmlFor="nameFilter">Filtrar por Nome:&nbsp; </label>
  <input
    id="nameFilter"
    type="text"
    value={nomeSearchTerm}
    onChange={(event) => setNomeSearchTerm(event.target.value)}
    placeholder="...nome"
  />
  <br />
  <br />

  <section className="localidadeFilter">
    <label htmlFor="localidade">Filtrar por Localidade:&nbsp; </label>
    <input type="text" value={localidadeSearchTerm} onChange={handleChange} 
      placeholder="...localidade"
    />
    <select id="localidade" value={selectedLocalidade} onChange={handleLocalidadeChange}>
    <option value="">All</option>
    { filteredData &&
      Array.from(new Set(filteredData?.map(item => normalize(item?.LOCALIDADE)))) 
        ?.map(localidade => (
          <option key={localidade} value={localidade}>{localidade}</option>
      ))
    }
    </select>
    <section className="orderBtns">
      <button className={selectedOrder === 'asc' ? "selected" : ""} onClick={()=>setSelectedOrder('asc')}>Ordem Ascendente</button>
      <button className={selectedOrder === 'desc' ? "selected" : ""} onClick={()=>setSelectedOrder('desc')}>Ordem Descendente</button>
    </section>
  </section>

<section className="resetBtn">
  <BlobBtn text={"Reset todos os filtros"} handleClick={()=>setFilteredData(originalRecordsData)} />
</section>
<section className="blobBtns">
  <BlobBtn text={"Escolher um beneficiário ao calhas de todos"} handleClick={()=>handleRandomClick(false)} />
  <BlobBtn text={"Escolher um beneficiário ao calhas com os filtros"} handleClick={()=>handleRandomClick(true)} />
</section>

</section>


      <section className="table">
        <span className="tableInfo">Todas as entidades: {originalRecordsData.length}</span>
        <span className="tableInfo">Entidades filtradas: {filteredData.length}</span>
        <ul>
          {paginatedData?.map((item) => (
            <li key={item._id}>
              <span>{item.NIF}</span>
              <span>{item.NOME}</span>
              <span>{item.LOCALIDADE}</span>
            </li>
          ))}
        </ul>
        <PaginationIndex 
          page={page}
          setPage={handlePageChange}
          totalPages={totalPages}
        />

        {/* <section className="pagination">
          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
              <button key={page} onClick={() => handlePageChange(page)}>
                {page}
              </button>
            ))}
        </section> */}
      </section>
    </div>
  );
}  