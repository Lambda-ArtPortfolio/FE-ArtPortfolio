import styled from 'styled-components';

//* Alexis Panyathong's Styling */
//AppRouter 
export const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border: 1px solid lightgrey;
    height: 100px;
    width: 100%;
    align-items: center;
    box-shadow: 5px 5px 8px #BFBFBF;

    a {
        
        margin-left: 70px;
        text-decoration: none;
        color: #295420;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        cursor: pointer;
    }

`;

//Login
export const Form = styled.div`
    background-image: linear-gradient(to top, rgba(81,0,0, 0), rgba(81,6,102,1));

    }
    margin: 0 auto;
    margin-top: 80px;
    border: 2px solid #E3E1E1;
    border-radius: 12px;
    box-shadow: 5px 5px 8px #BFBFBF;
    width: 30%;
    align-items: center;
    height: 360px;
    display: flex;
    justify-content: center;
`;

export const Context = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;

    
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
    cursor: pointer;
`;
