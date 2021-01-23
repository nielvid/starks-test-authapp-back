import React from 'react'
import Btns from '../common/Btns'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'

const useStyles = makeStyles({
root:{
    background:'yellow',
    borderRadius: '15px'
}
})

function Allusers() {
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Btns);
    const classes = useStyles()
    return (
        <div>
          <Btns color='red' classes={{root:classes.root}}>Check</Btns>  
          <Button classes={{root:classes.root}}>Check</Button>
          <StyledButton color='red' classes={{root:classes.root}}>hi</StyledButton>
        </div>
    )
}

export default Allusers
