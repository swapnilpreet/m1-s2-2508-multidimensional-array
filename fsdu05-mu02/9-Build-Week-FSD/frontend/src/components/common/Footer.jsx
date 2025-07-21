// import React from "react";
// import "../css/Footer.css";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaYoutube,
//   FaLinkedinIn,
// } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-top">
//         <div className="footer-column">
//           <h4>Company</h4>
//           <ul>
//             <li>About Us</li>
//             <li>Health Article</li>
//             <li>Health Stories</li>
//             <li>Diseases & Conditions</li>
//             <li>Ayurveda</li>
//             <li>All Medicines</li>
//             <li>All Brands</li>
//             <li>Need Help</li>
//             <li>FAQ</li>
//           </ul>
//         </div>

//         <div className="footer-column">
//           <h4>Social</h4>
//           <div className="social-icons">
//             <FaInstagram />
//             <FaFacebookF />
//             <FaYoutube />
//             <FaLinkedinIn />
//           </div>
//           <h4>Legal</h4>
//           <ul>
//             <li>Terms & Conditions</li>
//             <li>Privacy Policy</li>
//             <li>Editorial Policy</li>
//             <li>Returns & Cancellations</li>
//           </ul>
//         </div>

//         <div className="footer-column">
//           <h4>Subscribe</h4>
//           <p>
//             Claim your complimentary health and fitness tips subscription and
//             stay updated on our newest promotions.
//           </p>
//           <div className="subscribe-box">
//             <input type="email" placeholder="Enter your email ID" />
//             <button>Subscribe</button>
//           </div>

//           <div className="registered-address">
//             <h4>Registered Office Address</h4>
//             <p>
//               <strong>Intellihealth Solutions Private Limited</strong>
//               <br />
//               Office Unit no. 1, 2, 5, & 7, 6th floor Urmi Corporate Park
//               Solaris, Saki Vihar Rd, Opp. L&T Flyover, New Mhada Colony, Budhia
//               Jadhav Wadi, Mumbai, Maharashtra 400072.
//               <br />
//               <strong>CIN:</strong> U62099MH2019PTC320566
//               <br />
//               <strong>Telephone:</strong>{" "}
//               <span className="highlight">09240250346</span>
//             </p>
//             <h4>Grievance Officer</h4>
//             <p>
//               <strong>Name:</strong> Chandrasekhar Swaminathan
//               <br />
//               <strong>Email:</strong>{" "}
//               <span className="highlight">
//                 grievance-officer@truemeds.in
//               </span>
//             </p>
//           </div>
//         </div>

//         <div className="footer-column">
//           <h4>Download Truemeds</h4>
//           <p>
//             Get easy access to medicine refills, health information, and more.
//             Download now and start taking control of your health.
//           </p>
//           <div className="app-buttons">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
//               alt="Google Play"
//             />
//             <img
//               src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//               alt="App Store"
//             />
//           </div>

//           <h4>Contact Us</h4>
//           <p>
//             support@truemeds.in <br />
//             09240250346 <br />
//             Available 8:00 am - 10:00 pm
//             <br />
//             v4.0.2
//           </p>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <div>© 2025 - Truemeds | All rights reserved.</div>
//         <div className="payment-icons">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
//             alt="Visa"
//           />
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/349/349230.png"
//             alt="Mastercard"
//           />
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
//             alt="Paytm"
//           />
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/349/349236.png"
//             alt="Netbanking"
//           />
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import styled from "styled-components";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: #e6f1fa;
  color: #2c3e50;
  font-family: "Segoe UI", sans-serif;
  padding: 2rem 1rem;
  margin-top: 30px;
`;

const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const FooterColumn = styled.div`
  flex: 1 1 250px;
  min-width: 250px;

  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
    color: #2d2d2d;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul li {
    margin-bottom: 0.5rem;
    cursor: pointer;
    color: #555;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #3366cc;
`;

const SubscribeBox = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-direction: column;

  input {
    flex: 1;
    padding: 0.6rem;
    border: 1px solid #aaa;
    border-radius: 6px;
    outline: none;
  }

  button {
    padding: 0.6rem 1.2rem;
    background-color: #2a73f3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background-color: #1753c3;
    }
  }
`;

const RegisteredAddress = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;

  .highlight {
    color: #2a73f3;
    font-weight: bold;
  }
`;

const AppButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;

  img {
    width: 140px;
    height: auto;
  }
`;

const FooterBottom = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.85rem;
  color: #555;
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  text-align: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PaymentIcons = styled.div`
  img {
    width: 40px;
    margin-right: 1rem;
    vertical-align: middle;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterColumn>
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Health Article</li>
            <li>Health Stories</li>
            <li>Diseases & Conditions</li>
            <li>Ayurveda</li>
            <li>All Medicines</li>
            <li>All Brands</li>
            <li>Need Help</li>
            <li>FAQ</li>
          </ul>
        </FooterColumn>

        <FooterColumn>
          <h4>Social</h4>
          <SocialIcons>
            <FaInstagram />
            <FaFacebookF />
            <FaYoutube />
            <FaLinkedinIn />
          </SocialIcons>
          <h4>Legal</h4>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Editorial Policy</li>
            <li>Returns & Cancellations</li>
          </ul>
        </FooterColumn>

        <FooterColumn>
          <h4>Subscribe</h4>
          <p>
            Claim your complimentary health and fitness tips subscription and
            stay updated on our newest promotions.
          </p>
          <SubscribeBox>
            <input type="email" placeholder="Enter your email ID" />
            <button>Subscribe</button>
          </SubscribeBox>

          <RegisteredAddress>
            <h4>Registered Office Address</h4>
            <p>
              <strong>Intellihealth Solutions Private Limited</strong>
              <br />
              Office Unit no. 1, 2, 5, & 7, 6th floor Urmi Corporate Park
              Solaris, Saki Vihar Rd, Opp. L&T Flyover, New Mhada Colony, Budhia
              Jadhav Wadi, Mumbai, Maharashtra 400072.
              <br />
              <strong>CIN:</strong> U62099MH2019PTC320566
              <br />
              <strong>Telephone:</strong> <span className="highlight">09240250346</span>
            </p>
            <h4>Grievance Officer</h4>
            <p>
              <strong>Name:</strong> Chandrasekhar Swaminathan
              <br />
              <strong>Email:</strong>{" "}
              <span className="highlight">grievance-officer@truemeds.in</span>
            </p>
          </RegisteredAddress>
        </FooterColumn>

        <FooterColumn>
          <h4>Download Truemeds</h4>
          <p>
            Get easy access to medicine refills, health information, and more.
            Download now and start taking control of your health.
          </p>
          <AppButtons>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
              alt="Google Play"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
            />
          </AppButtons>

          <h4>Contact Us</h4>
          <p>
            support@truemeds.in <br />
            09240250346 <br />
            Available 8:00 am - 10:00 pm
            <br />
            v4.0.2
          </p>
        </FooterColumn>
      </FooterTop>

      <FooterBottom>
        <div>© 2025 - Truemeds | All rights reserved.</div>
        <PaymentIcons>
          <img
            src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
            alt="Visa"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/349/349230.png"
            alt="Mastercard"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
            alt="Paytm"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/349/349236.png"
            alt="Netbanking"
          />
        </PaymentIcons>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
