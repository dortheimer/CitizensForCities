import styled from "styled-components";
import { device } from "../../style";

export const Titles = styled.div`
    padding: 0 1.5em 0;
    @media ${device.tablet} {
        padding: 0 3.45em 0;
    }
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    font-family: Assistant !important;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    margin-bottom: 1.3em;
    letter-spacing: normal;
    color: #29244a;
    @media ${device.tablet} {
        font-size: 2em;
        font-weight: 600;
        margin-bottom: 1em;
    }
`;

export const ForgotPasswordButton = styled.div`
    cursor: pointer;
    text-align: left;
`;

export const SubTitle = styled.h2`
    font-family: Assistant !important;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    line-height: 1.5;
    text-align: center;
    color: #000000;
    margin-bottom: 0;
    > span {
        font-family: Assistant !important;
    }
`;

export const SubTitleWrapper = styled.div`
    padding-bottom: 3em;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    @media ${device.tablet} {
        padding-bottom: 2.5em;
    }
`;

export const InputsWrapper = styled.div`
    background-color: #f1eef2;
    padding: 1.5em 1.5em 0.5em;
    @media ${device.tablet} {
        padding: 1.5em 3.7em 1em;
    }
`;

export const MainWrapper = styled.div``;

export const InputWrapper = styled.div`
    margin-bottom: 1.5em;
    .MuiFormControl-root {
        width: 100%;
    }
`;

export const InputsTitle = styled.div`
    font-family: Assistant !important;
    font-size: 20px;
    font-weight: normal;
    padding-bottom: 0;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: #3e385c;
    margin-bottom: 1.2em;
`;

export const ButtonWrapper = styled.div`
    border-radius: 0 0 12px 12px;
    background-color: #f1eef2;
    display: grid;
    padding: 0 1.5em 2.45em;
    @media ${device.tablet} {
        max-width: initial;
        padding-right: 3.7em;
        padding-left: 3.7em;
    }
`;

export const Label = styled.div`
    font-family: Assistant !important;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: right;
    color: #665d71;
`;

export const Star = styled.span`
    color: red;
`;

export const ForgotPassword = styled.div`
    text-align: left;
    a {
        margin-bottom: 0.5rem;
        font-family: Assistant;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        color: #51465e;
    }
`;
