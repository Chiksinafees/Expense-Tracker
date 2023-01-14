import { Fragment } from "react"
import { useHistory } from "react-router-dom"

const DummyScreen=()=>{

    const history=useHistory()

const completeProfileHandler=()=>{
    history.replace('/CompleteProfile')
}

    return (
        <Fragment>
            <h1>Welcome to Expense Tracker!!!</h1>
        <h4 type="button" onClick={completeProfileHandler}>your profile is incomplete. Complete Now</h4>
        </Fragment>
        
    )
}
export default DummyScreen