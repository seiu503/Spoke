import PropTypes from 'prop-types'
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { withStyles } from 'material-ui/styles'
import { StyleSheet, css } from 'aphrodite'

// This is because the Toolbar from material-ui seems to only apply the correct margins if the
// immediate child is a Button or other type it recognizes. Can get rid of this if we remove material-ui

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    marginLeft: 24,
    marginBottom: 10
  },
  mobileContainer: {
    display: 'inline-block',
    marginLeft: 24,
    marginBottom: 10,
    width: '135px',
    height: '56px'
  }
})
const inlineStyles = {
  raisedButtonMobile: {
    width: '135px',
    height: '56px'
  },
  buttonStyle: {
  },
  labelStyle: {
    fontSize: '18px',
    position: 'absolute',
    top: '14px',
    left: '30px'
  }
}

class SendButton extends Component {
  state = {
    clickStepIndex: 0
  }

  clickStepLabels = () => (this.props.threeClickEnabled ? ['Recipient ok?', 'Message ok?', 'Send message'] : ['Send'])

  handleTouchTap = () => {
    const { clickStepIndex } = this.state
    const { onFinalTouchTap } = this.props

    if (clickStepIndex < (this.clickStepLabels().length - 1)) {
      this.setState({
        clickStepIndex: clickStepIndex + 1
      })
    } else {
      onFinalTouchTap()
    }
  }

  render() {
    const size = document.documentElement.clientWidth
    const containerStyles = size <= 450 ? styles.mobileContainer : styles.container
    return (
      <div className={css(containerStyles)}>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          disabled={this.props.disabled}
          fullWidth
          buttonStyle={size <= 450 ? inlineStyles.buttonStyle : {}}
          labelStyle={size <= 450 ? inlineStyles.labelStyle : {}}
          style={size <= 450 ? inlineStyles.raisedButtonMobile : {}}
          label={this.clickStepLabels()[this.state.clickStepIndex]}
          primary
        />
      </div>
    )
  }
}

SendButton.propTypes = {
  threeClickEnabled: PropTypes.boolean,
  onFinalTouchTap: PropTypes.function,
  disabled: PropTypes.boolean
}

export default SendButton
