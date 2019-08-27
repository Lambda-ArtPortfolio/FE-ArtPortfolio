import styled from 'styled-components';

//* Alexis Panyathong's Styling */
//AppRouter 
export const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

//Login
export const Form = styled.div`
    background-color: #510666;
    margin: 0 auto;
    margin-top: 40px;
    border: 2px solid #E3E1E1;
    border-radius: 12px;
    box-shadow: 5px 5px 8px #BFBFBF;
    width: 30%;
    align-items: center;
    height: 300px;
    display: flex;
    justify-content: center;
`;

export const Context = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;
    
    margin-bottom: 25px;
    .form-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        margin-left: 10px;
        label {
            color: #FFFFFF;
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
        }
    }
`;

export const Header = styled.h2`
    font-size: 18px;
    color: #FFFFFF;
    text-align: center;
`;

export const LoginBtn = styled.button`
    font-size: 14px;
    border-radius: 8px;
    box-shadow: 2px 2px 2px lightgrey;
    padding: 8px 8px;
    width: 40%;
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom: 20px;
`;
