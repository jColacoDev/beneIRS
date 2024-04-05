import { useState } from 'react';
import axios from 'axios';

export default function UploadEntitiesExcel() {
    const [file, setFile] = useState(null);
    const [year, setYear] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleSubmit = async () => {
        if (!file || !year) {
            console.error('Please select a file and specify the year');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('year', year);

        try {
            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Enter year" value={year} onChange={handleYearChange} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
}
