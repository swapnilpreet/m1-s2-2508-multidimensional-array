// import React, { useState } from "react";
// import "../css/ShopByCategory.css";

// const categories = [
//   {
//     title: "Personal Care",
//     items: [
//       { name: "Skin Care", image: "https://i.imgur.com/FpzNLEN.png" },
//       { name: "Hair Care", image: "https://i.imgur.com/cctWkk4.png" },
//       { name: "Oral Care", image: "https://i.imgur.com/UR5VEsl.png" },
//     ],
//   },
//   {
//     title: "Health Conditions",
//     items: [
//       { name: "Bone and Joint", image: "https://i.imgur.com/4B7vULp.png" },
//       { name: "Pain Relief", image: "https://i.imgur.com/hVtYrbQ.png" },
//       { name: "Eye Care", image: "https://i.imgur.com/IuwV7PG.png" },
//     ],
//   },
//   {
//     title: "Diabetes Care",
//     items: [
//       { name: "Test Strips", image: "https://i.imgur.com/yhwDsfA.png" },
//       { name: "Tablets", image: "https://i.imgur.com/Bm7noUi.png" },
//     ],
//   },
//   {
//     title: "Homeopathic Medicine",
//     items: [
//       { name: "Pain Relief", image: "https://i.imgur.com/OJX6ZbM.png" },
//       { name: "Cold Relief", image: "https://i.imgur.com/cN0Nz1a.png" },
//     ],
//   },
// ];

// const ShopByCategory = () => {
//   const [active, setActive] = useState(0);
//   const current = categories[active];

//   return (
//     <div className="shop-container">
//       <div className="shop-sidebar">
//         {categories.map((cat, index) => (
//           <div
//             key={index}
//             className={`shop-tab ${active === index ? "active" : ""}`}
//             onClick={() => setActive(index)}
//           >
//             {cat.title}
//           </div>
//         ))}
//       </div>

//       <div className="shop-cards">
//         {current.items.map((item, i) => (
//           <div className="shop-card" key={i}>
//             <img src={item.image} alt={item.name} />
//             <p>{item.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopByCategory;


import React, { useState } from "react";
import styled from "styled-components";

const categories = [
  {
    title: "Personal Care",
    items: [
      { name: "Skin Care", image: "https://i.imgur.com/FpzNLEN.png" },
      { name: "Hair Care", image: "https://i.imgur.com/cctWkk4.png" },
      { name: "Oral Care", image: "https://i.imgur.com/UR5VEsl.png" },
    ],
  },
  {
    title: "Health Conditions",
    items: [
      { name: "Bone and Joint", image: "https://i.imgur.com/4B7vULp.png" },
      { name: "Pain Relief", image: "https://i.imgur.com/hVtYrbQ.png" },
      { name: "Eye Care", image: "https://i.imgur.com/IuwV7PG.png" },
    ],
  },
  {
    title: "Diabetes Care",
    items: [
      { name: "Test Strips", image: "https://i.imgur.com/yhwDsfA.png" },
      { name: "Tablets", image: "https://i.imgur.com/Bm7noUi.png" },
    ],
  },
  {
    title: "Homeopathic Medicine",
    items: [
      { name: "Pain Relief", image: "https://i.imgur.com/OJX6ZbM.png" },
      { name: "Cold Relief", image: "https://i.imgur.com/cN0Nz1a.png" },
    ],
  },
];

const ShopByCategory = () => {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <ShopContainer>
      <Sidebar>
        {categories.map((cat, index) => (
          <Tab
            key={index}
            onClick={() => setActive(index)}
            active={active === index}
          >
            {cat.title}
          </Tab>
        ))}
      </Sidebar>

      <CardGrid>
        {current.items.map((item, i) => (
          <Card key={i}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </Card>
        ))}
      </CardGrid>
    </ShopContainer>
  );
};

export default ShopByCategory;

// Styled Components

const ShopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 200px;

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
  }
`;

const Tab = styled.div`
  padding: 12px 16px;
  background-color: ${({ active }) => (active ? "#eef2ff" : "#ffffff")};
  border-radius: 10px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "600" : "500")};
  transition: all 0.3s;
  border-left: 5px solid ${({ active }) => (active ? "#1e40af" : "transparent")};
  color: ${({ active }) => (active ? "#1e40af" : "inherit")};
  min-width: ${({ active }) => (active ? "auto" : "150px")};
  text-align: center;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  flex: 1;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  transition: transform 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: 100px;
    object-fit: contain;
  }

  p {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
  }
`;
