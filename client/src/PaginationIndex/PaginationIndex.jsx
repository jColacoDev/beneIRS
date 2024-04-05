/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './PaginationIndex.scss'

export default function PaginationIndex({page, setPage, totalPages}) {
    const [maxPagination, setMaxPagination] = useState(paginationFromWidth());

    useEffect(() => {
        const handleResize = () => {
            setMaxPagination(paginationFromWidth());
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function handleNextClick(e){
        e.preventDefault();
        page < totalPages && setPage(page + 1);
    }

    function paginationFromWidth(){
        return window.innerWidth > 690 ? 8 : 
        window.innerWidth > 590 ? 6 : 
        window.innerWidth > 390 ? 4 : 2;
    }
    function handlePrevClick(e){
        e.preventDefault();
        page > 1 && setPage(page - 1)
    }
    function handlePageClick(e){
        e.preventDefault();
        setPage(parseInt(e.currentTarget.dataset.index))
    }

    const pagination = () =>{

        let pages = [];
        for(let i = 1; i <= totalPages; i++){
            if( 
                i === 1 || i === totalPages ||
                page > (i - maxPagination / 2) &&
                page < (i + maxPagination / 2) ||
                pages.length <= maxPagination && page < (i + maxPagination / 2) ||
                pages.length <= maxPagination && (i >= totalPages - maxPagination)
            ){
                pages.push(
                    <li key={i} data-index={i} onClick={handlePageClick}>
                        <button 
                            className={i === page ? `active` : undefined}
                            title={`page ${i}`}
                        >{i}</button>
                    </li>
                )
            }

            totalPages > maxPagination && (
                (i===1 && page +1 > maxPagination) || 
                (i===(totalPages-1) && page < ((totalPages -1) - maxPagination / 2))
            ) && pages.push(<li key={`${i}-dots`} className='dots'><span>...</span></li>)
        }

        return pages;
    }

  return <div className="PaginationIndex">
        <ul className="pagination">
            <li>
            {page !== 1 &&
                    <button 
                        onClick={handlePrevClick}
                        className="prev" 
                        title="previous page"
                        >&#10094;
                    </button>
            }
            </li>
            
            {pagination()}
            <li>
            {page !== totalPages &&
                    <button 
                        onClick={handleNextClick} 
                        className="next" 
                        title="next page"
                    >&#10095;</button>
                }
                </li>
        </ul>
    </div>


}
