import React from "react";
import styled from "styled-components";
import Pagewrapper from "../../components/common/Pagewrapper";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
  background: #f9f9f9;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 2;
  min-width: 320px;
`;

const Right = styled.div`
  flex: 1;
  min-width: 280px;
  position: sticky;
  top: 75px;
  align-self: flex-start;

  @media (max-width: 768px) {
    position: relative;
    top: unset;
  }
`;

const Item = styled.div`
  display: flex;
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  align-items: center;
`;

const ItemImage = styled.img`
  width: 70px;
  height: auto;
  margin-right: 16px;
`;

const Info = styled.div`
  flex: 1;

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }

  p {
    margin: 4px 0;
    font-size: 14px;
    color: #666;
  }
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
`;

const MRP = styled.span`
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
`;

const Discount = styled.span`
  background: #e6f4ea;
  color: #00a859;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

const QtySelect = styled.select`
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 60px;
`;

const FreeDelivery = styled.div`
  background: #e6f4ea;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const CouponArea = styled.div`
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  font-weight: 500;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  margin-bottom: 16px;
`;

const CouponBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  input {
    flex: 1;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    padding: 8px 14px;
    background-color: #0066ff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #0052cc;
    }
  }
`;

const AppliedCoupon = styled.div`
  background: #e6f7e6;
  color: #1a861a;
  border: 1px solid #1a861a;
  border-radius: 6px;
  padding: 8px;
  margin-top: 10px;
  font-size: 14px;
`;

const Bill = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);

  h4 {
    margin-bottom: 12px;
  }
`;

const BillRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;

  &.green {
    color: #00a859;
  }
`;

const BillTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 12px;
  font-size: 16px;
`;

const TaxNote = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 8px;
`;

const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  background: #0052cc;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

// JSX Content (Replace below with your cart logic or render data)
const Cart = () => {
  return (
    <Pagewrapper>
      <Container>
        <Left>
          {/* Example Item */}
          <Item>
            <ItemImage src="https://via.placeholder.com/70" alt="Medicine" />
            <Info>
              <h4>Medicine Name</h4>
              <p>500mg | Strip of 10</p>
              <PriceSection>
                <span>₹90</span>
                <MRP>₹120</MRP>
                <Discount>25% OFF</Discount>
              </PriceSection>
            </Info>
            <Actions>
              <QtySelect>
                <option>1</option>
                <option>2</option>
              </QtySelect>
              <DeleteBtn>🗑</DeleteBtn>
            </Actions>
          </Item>
        </Left>

        <Right>
          <FreeDelivery>🎉 You’re eligible for free delivery</FreeDelivery>
          <CouponArea>🏷️ Apply Coupon</CouponArea>
          <CouponBox>
            <input type="text" placeholder="Enter Coupon" />
            <button>Apply</button>
          </CouponBox>
          <AppliedCoupon>✔️ Coupon Applied: SAVE10</AppliedCoupon>
          <Bill>
            <h4>Bill Summary</h4>
            <BillRow>
              <span>MRP Total</span>
              <span>₹120</span>
            </BillRow>
            <BillRow className="green">
              <span>Discount</span>
              <span>- ₹30</span>
            </BillRow>
            <BillRow>
              <span>Delivery Charges</span>
              <span>FREE</span>
            </BillRow>
            <BillTotal>
              <span>Total Amount</span>
              <span>₹90</span>
            </BillTotal>
            <TaxNote>Inclusive of all taxes</TaxNote>
            <Button>Continue</Button>
          </Bill>
        </Right>
      </Container>
    </Pagewrapper>
  );
};

export default Cart;
