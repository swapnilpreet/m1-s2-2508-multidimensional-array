// import React, { useRef, useState } from "react";
// import "../css/ProductTabs.css";

// const ProductTabs = () => {
//   const [activeTab, setActiveTab] = useState("description");

//   const descriptionRef = useRef(null);
//   const ingredientsRef = useRef(null);
//   const usesRef = useRef(null);
//   const usageRef = useRef(null);
//   const safetyRef = useRef(null);

//   const scrollToSection = (ref, tabKey) => {
//     setActiveTab(tabKey);
//     // ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <div className="product-details-container">
//       <div className="tabs">
//         <button
//           className={activeTab === "description" ? "active" : ""}
//           onClick={() => scrollToSection(descriptionRef, "description")}
//         >
//           Product Description
//         </button>
//         <button
//           className={activeTab === "ingredients" ? "active" : ""}
//           onClick={() => scrollToSection(ingredientsRef, "ingredients")}
//         >
//           Ingredients
//         </button>
//         <button
//           className={activeTab === "uses" ? "active" : ""}
//           onClick={() => scrollToSection(usesRef, "uses")}
//         >
//           Key Uses
//         </button>
//         <button
//           className={activeTab === "usage" ? "active" : ""}
//           onClick={() => scrollToSection(usageRef, "usage")}
//         >
//           How To Use
//         </button>
//         <button
//           className={activeTab === "safety" ? "active" : ""}
//           onClick={() => scrollToSection(safetyRef, "safety")}
//         >
//           Safety Information
//         </button>
//       </div>

//       <div className="tab-content">
//         <section ref={descriptionRef}>
//           <h3>📝 Product Description of Oligocare Tablet 15</h3>
//           <p>
//             <strong>Oligocare Tablet</strong> is used for maintaining overall health and wellness...
//           </p>
//         </section>

//         <section ref={ingredientsRef}>
//           <h3>🔬 Ingredients of Oligocare Tablet 15</h3>
//           <ul>
//             <li><strong>Vitamins (A, B1, B6, B12, D, E):</strong> This formulation contains essential vitamins...</li>
//             <li><strong>Amino Acids (L-Arginine, L–Glutathione, Levocarnitine):</strong> Supports energy and detox...</li>
//             <li><strong>Minerals (Zinc, Selenium, Copper, Manganese, Iron):</strong> These minerals support...</li>
//             <li><strong>Lycopene:</strong> A natural antioxidant that helps cellular protection and reduces oxidative stress.</li>
//           </ul>
//         </section>

//         <section ref={usesRef}>
//           <h3>📌 Key Uses</h3>
//           <p>Maintains energy, immunity, and promotes overall well-being.</p>
//         </section>

//         <section ref={usageRef}>
//           <h3>🕒 How To Use</h3>
//           <p>Take one tablet daily after a meal or as prescribed by your physician.</p>
//         </section>

//         <section ref={safetyRef}>
//           <h3>⚠️ Safety Information</h3>
//           <ul>
//             <li>Keep out of reach of children</li>
//             <li>Store in a cool, dry place</li>
//             <li>Do not exceed recommended dose</li>
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ProductTabs;

import React, { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 100%;
  margin: auto;
  position: relative;
`;

const Tabs = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  white-space: nowrap;
  background-color: #fff;
  z-index: 10;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button`
  background: transparent;
  border: none;
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
  flex: 0 0 auto;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;

  color: ${({ active }) => (active ? "#007bff" : "#333")};
  border-color: ${({ active }) => (active ? "#007bff" : "transparent")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;

const Section = styled.section`
  margin-bottom: 40px;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
`;

const Heading = styled.h3`
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
`;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #555;
`;

const List = styled.ul`
  padding-left: 20px;
  list-style-type: disc;
`;

const ListItem = styled.li`
  font-size: 15px;
  line-height: 1.6;
  color: #555;
`;

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("description");

  const descriptionRef = useRef(null);
  const ingredientsRef = useRef(null);
  const usesRef = useRef(null);
  const usageRef = useRef(null);
  const safetyRef = useRef(null);

  const scrollToSection = (ref, tabKey) => {
    setActiveTab(tabKey);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Container>
      <Tabs>
        <TabButton
          active={activeTab === "description"}
          onClick={() => scrollToSection(descriptionRef, "description")}
        >
          Product Description
        </TabButton>
        <TabButton
          active={activeTab === "ingredients"}
          onClick={() => scrollToSection(ingredientsRef, "ingredients")}
        >
          Ingredients
        </TabButton>
        <TabButton
          active={activeTab === "uses"}
          onClick={() => scrollToSection(usesRef, "uses")}
        >
          Key Uses
        </TabButton>
        <TabButton
          active={activeTab === "usage"}
          onClick={() => scrollToSection(usageRef, "usage")}
        >
          How To Use
        </TabButton>
        <TabButton
          active={activeTab === "safety"}
          onClick={() => scrollToSection(safetyRef, "safety")}
        >
          Safety Information
        </TabButton>
      </Tabs>

      <div>
        <Section ref={descriptionRef}>
          <Heading>📝 Product Description of Oligocare Tablet 15</Heading>
          <Paragraph>
            <strong>Oligocare Tablet</strong> is used for maintaining overall health and wellness...
          </Paragraph>
        </Section>

        <Section ref={ingredientsRef}>
          <Heading>🔬 Ingredients of Oligocare Tablet 15</Heading>
          <List>
            <ListItem><strong>Vitamins:</strong> A, B1, B6, B12, D, E...</ListItem>
            <ListItem><strong>Amino Acids:</strong> L-Arginine, L–Glutathione...</ListItem>
            <ListItem><strong>Minerals:</strong> Zinc, Selenium, Copper...</ListItem>
            <ListItem><strong>Lycopene:</strong> Natural antioxidant...</ListItem>
          </List>
        </Section>

        <Section ref={usesRef}>
          <Heading>📌 Key Uses</Heading>
          <Paragraph>
            Maintains energy, immunity, and promotes overall well-being.
          </Paragraph>
        </Section>

        <Section ref={usageRef}>
          <Heading>🕒 How To Use</Heading>
          <Paragraph>
            Take one tablet daily after a meal or as prescribed by your physician.
          </Paragraph>
        </Section>

        <Section ref={safetyRef}>
          <Heading>⚠️ Safety Information</Heading>
          <List>
            <ListItem>Keep out of reach of children</ListItem>
            <ListItem>Store in a cool, dry place</ListItem>
            <ListItem>Do not exceed recommended dose</ListItem>
          </List>
        </Section>
      </div>
    </Container>
  );
};

export default ProductTabs;
