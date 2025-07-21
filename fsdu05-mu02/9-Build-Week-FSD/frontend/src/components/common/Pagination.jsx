// import React from "react";

// const Pagination = ({ totalPages, handlePageChange, currentPage }) => {
//   return (
//     <div>
//       {totalPages > 1 && (
//         <div className="pagination">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>
//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               className={currentPage === index + 1 ? "active" : ""}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pagination;


import React from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
   display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  flex: 0 0 auto; /* prevents button from stretching */
  background-color: ${({ active }) => (active ? "#007bff" : "#f0f0f0")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#0056b3" : "#e0e0e0")};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    color: #888;
  }
`;

const Pagination = ({ totalPages, handlePageChange, currentPage }) => {
  return (
    <>
      {totalPages > 1 && (
        <PaginationWrapper>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </PageButton>

          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index}
              onClick={() => handlePageChange(index + 1)}
              active={currentPage === index + 1}
            >
              {index + 1}
            </PageButton>
          ))}

          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </PaginationWrapper>
      )}
    </>
  );
};

export default Pagination;
