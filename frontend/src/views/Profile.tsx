import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useForm from '../useForm'
import { validateForm } from '../validateForm'



const Profile = () => {
    const state = useSelector((state:any) => state.userInfo)
    const changed = useSelector((state:any) => state.changeState)
    const {handleChange, values, handleSubmit, errors}:any = useForm(validateForm)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "CHANGE",data: ""})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const showChange = (changeWhat:string) => {
        if(changeWhat === "email"){
            return (
            <form className="changeForm leftFadeInLight" onSubmit={e => handleSubmit(e, "changeEmail")}>
                <div className="inputs">
                    <label className="changeLabel">Change e-mail:</label>
                    <input type="email"  className={(errors.email) ? "inputText changeInput inputTextErr" : "inputText changeInput "}  name="email" placeholder="Type your new email" onChange={handleChange} value={values.email} />
                    {errors.email  && <span className="changeSpanError fadeInFaster ">{errors.email}</span>}
                    <button className="changeBtnSub" type="submit">Change</button>
                </div>
            </form>
            )
        } else if(changeWhat === "password"){
            return(
            <form className="changeForm rightFadeInLight" onSubmit={e => handleSubmit(e, "changePassword")}>
                <div className="inputs">
                    <label className="changeLabel">Change password:</label>
                    <input type="password"  className={(errors.password) ? "inputText changeInput inputTextErr" : "inputText changeInput "}  name="password" placeholder="Type your new password" onChange={handleChange} value={values.password} />
                    {errors.password  && <span className="changeSpanError fadeInFaster ">{errors.password}</span>}
                    <button className="changeBtnSub" type="submit">Change</button>
                </div>
            </form>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }


    const success = () => {
        if(changed === "changedE"){
            return(
                <h3 className="successful fadeIn">Email was successfully changed</h3>
            )
        } else if(changed === "changedP"){
            return(
                <h3 className="successful fadeIn">Password was successfully changed</h3>
            )
        } else {
            return (<> </>)
        }
    }
 
    return (
        <>
        <h1 className="titleLog ">Profile</h1>
        <div className="profile zoomfadein">
            <div className="profileInfo">
                <h4>Username: <span> {state.username} </span> </h4>
                <h4>E-mail: <span>{state.email}</span></h4>
             </div>

             <div className="profileChange">
                <span className="btn changeBtn changeEmail"  onClick={() => {  dispatch({type: "CHANGE",data: "email"})}}>Change email</span>
                <span className="btn changeBtn changePassword" onClick={() => { dispatch({type: "CHANGE",data: "password"})}}>Change password</span>
             </div>


              {showChange(changed)}
              {success()}

        </div>
        </>
    )
}

export default Profile


