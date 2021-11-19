import React from 'react'
import useForm from '../useForm'
import { validateForm } from '../validateForm'



const Register = () => {
    const {handleChange, values, handleSubmit, errors}:any = useForm(validateForm)

    return (
        <>
        <h1 className="titleLog">Register</h1>
        <form className="zoomfadeOut" onSubmit={e => handleSubmit(e, "register")}>
            <div className="inputs">
                <label>Username:</label>
                {errors.username  && <span className="spanError fadeInFaster ">{errors.username}</span>}
                <input type="text"  className={(errors.username) ? "inputText inputTextErr" : "inputText "} name="username" placeholder="Type your username"   onChange={handleChange}  value={values.username}/>
             </div>

             <div className="inputs">
                <label>Password:</label>
                {errors.password  && <span className="spanError fadeInFaster ">{errors.password}</span>}
                <input type="password" className={(errors.password) ? "inputText inputTextErr" : "inputText "} name="password" placeholder="Type your password" onChange={handleChange} value={values.password}/>
             </div>

             <div className="inputs">
                <label>Email:</label>
                {errors.email  && <span className="spanError fadeInFaster ">{errors.email}</span>}
                <input type="email" className={(errors.email) ? "inputText inputTextErr" : "inputText "} name="email" placeholder="Type your email" onChange={handleChange} value={values.email}/>
             </div>

            <div className="btnDiv">
            {errors.errMsg && <span className="errmsg fadeInFaster">{errors.errMsg}</span>}
                 <button className="regBtn" type="submit">Register</button>
            </div>
        </form>
        </>
    )
}

export default Register
