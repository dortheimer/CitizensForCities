import React from "react"
import FormHelperText from "@material-ui/core/FormHelperText"
import PropTypes from "prop-types"
import styled from "styled-components"

const StyledHelperText = styled(FormHelperText)`
  font-family: Assistant;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
	line-height: 1.5;
	text-align: right;
  letter-spacing: normal;
  color: #8f5de2;
`

const HelperText = ({ text }) => {
	return (
		<>
			<StyledHelperText>{text}</StyledHelperText>
		</>
	)
}

HelperText.propTypes = {
	text: PropTypes.string.isRequired
}

export default HelperText