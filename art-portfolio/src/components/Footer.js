import React from 'react';
import styled from 'styled-components';


export default function Footer() {
    return <StyledFooter className="footer">
            <p>Copyright - Art Portfolio 2019</p>
           </StyledFooter>
  }

  const StyledFooter = styled.div`
  background: #C6CFC4;
  height: 100px;
  text-align: center;

  `