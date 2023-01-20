import React from 'react'
import ReactDOM from 'react-dom';
import styled from "@emotion/styled";
import axios from 'axios';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display:flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  margin: 5% auto;
  width: 30%;
  z-index: 2999;
  background: black;
  border-radius: 1em;
  padding: 1rem;
  min-height: 200px;
  min-width: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
`;

const Closed = styled.div`
  color: white;
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
  & span {
    cursor: pointer;
    padding-right: 0.5rem;
    &:hover {
      color: #d0d0d0;
    }
  }
`;

const ModalPaypal = ({ children, onClose, open }) => {

    if (!open) return null

    return ReactDOM.createPortal(
        <ModalWrapper>
            <ModalContainer>
                <Closed onClick={onClose}>
                    <span>&times;</span>
                </Closed>
                {children}
            </ModalContainer>
        </ModalWrapper>,
        document.body
    )
}

export default ModalPaypal