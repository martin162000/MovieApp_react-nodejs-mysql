import React from 'react'
import useForm from '../useForm'
import { validateForm } from '../validateForm'


const Login = () => {
    const {handleChange, values, handleSubmit, errors}:any = useForm(validateForm)
    return (
        <>
        <h1 className="titleLog ">Login</h1>
        <form className="zoomfadein" onSubmit={e => handleSubmit(e, "login")}>
            <div className="inputs">
                <label>Username:</label>
                {errors.username  && <span className="spanError fadeInFaster ">{errors.username}</span>}
                <input type="text" className={(errors.username) ? "inputText inputTextErr" : "inputText "} name="username" placeholder="Type your username"  onChange={handleChange} value={values.username}/>
             </div>

             <div className="inputs">
                <label>Password:</label>
                {errors.password  && <span className="spanError fadeInFaster ">{errors.password}</span>}
                <input type="password" className={(errors.password) ? "inputText inputTextErr" : "inputText "} name="password" placeholder="Type your password"  onChange={handleChange} value={values.password}/>
             </div>

            <div className="btnDiv">
                {errors.errMsg && <span className="errmsg fadeInFaster">{errors.errMsg}</span>}
                 <button className="logBtn" type="submit">Login</button>
            </div>
        </form>
        </>
    )
}

export default Login
