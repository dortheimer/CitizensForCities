import styled from "styled-components";
import Typography from "shared/typography";
import { device } from "style";
export const H2 = styled(Typography).attrs(() => ({
    as: "h2",
    variant: "planTitle",
    mobileVariant: "planTitle",
    color: "",
}))`
    padding-right: 16px;
    color: #999999;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;

    @media ${device.tablet} {
        padding-right: 80px;
        margin-bottom: 0;
    }
`;

export const CommonSection = styled.section``;
