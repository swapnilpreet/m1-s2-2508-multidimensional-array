// import React, { useState } from 'react';
// import '../css/FAQ.css';
// import { FaPlus, FaMinus } from 'react-icons/fa';

// const faqs = [
//   {
//     question: "What is Apna-Meds?",
//     answer: "Apna-Meds is an online platform to buy medicines and healthcare products with doorstep delivery."
//   },
//   {
//     question: "How can I track my order?",
//     answer: "Once your order is shipped, you'll receive an email and SMS with tracking details."
//   },
//   {
//     question: "Is my personal information secure?",
//     answer: "Absolutely. We use industry-standard encryption to protect your data."
//   },
//   {
//     question: "Can I return my medicines?",
//     answer: "Returns are accepted within 7 days for eligible products. Check our return policy for details."
//   }
// ];

// const FAQ = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="faq-container">
//       <h2 className="faq-title">Frequently Asked Questions</h2>
//       <div className="faq-list">
//         {faqs.map((faq, index) => (
//           <div className="faq-item" key={index}>
//             <div className="faq-question" onClick={() => toggleFAQ(index)}>
//               <span>{faq.question}</span>
//               <span className="faq-icon">
//                 {activeIndex === index ? <FaMinus /> : <FaPlus />}
//               </span>
//             </div>
//             <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>
//               <p>{faq.answer}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQ;
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  {
    question: "What is Apna-Meds?",
    answer: "Apna-Meds is an online platform to buy medicines and healthcare products with doorstep delivery."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive an email and SMS with tracking details."
  },
  {
    question: "Is my personal information secure?",
    answer: "Absolutely. We use industry-standard encryption to protect your data."
  },
  {
    question: "Can I return my medicines?",
    answer: "Returns are accepted within 7 days for eligible products. Check our return policy for details."
  }
];

const Container = styled.div`
  width: 100%;
  margin: 3rem auto;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #007bff;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Item = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  font-weight: 600;
  color: #333;
  transition: background 0.2s;

  &:hover {
    background-color: #f0f4ff;
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const Icon = styled.span`
  font-size: 1rem;
  color: #007bff;
`;

const Answer = styled.div`
  max-height: ${({ open }) => (open ? '1000px' : '0')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-10px)')};
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.4s ease, transform 0.4s ease, padding 0.4s ease;
  background-color: #fff;
  padding: ${({ open }) => (open ? '1rem' : '0 1rem')};

  p {
    margin: 0;
    color: #444;
    line-height: 1.6;
  }
`;

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container>
      <Title>Frequently Asked Questions</Title>
      <List>
        {faqs.map((faq, index) => (
          <Item key={index}>
            <Question onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <Icon>{activeIndex === index ? <FaMinus /> : <FaPlus />}</Icon>
            </Question>
            <Answer open={activeIndex === index}>
              <p>{faq.answer}</p>
            </Answer>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default FAQ;
