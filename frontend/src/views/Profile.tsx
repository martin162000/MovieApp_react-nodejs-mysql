import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useForm from '../useForm'
import { validateForm } from '../validateForm'



const Profile = () => {
    const state = useSelector((state:any) => state.userInfo)
    const changed = useSelector((state:any) => state.changeState)
    const historyMovies = useSelector((state:any) => state.historyMovies)
    const historyUserActions = useSelector((state:any) => state.historyUser)
    const {handleChange, values, handleSubmit, errors}:any = useForm(validateForm)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "CHANGE",data: ""})

        axios.get("http://localhost:3001/getMoviesHistory").then((response) => {
                let history = response.data.moviesHistory;
                history = history.reverse();
                history = history.slice(0, 10);
                dispatch({type: "SET_HISTORYMOVIES",data: history})
         })

         updateHisAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const updateHisAction = () => { 
            axios.get("http://localhost:3001/getUserHistory").then((response) => {
            let userHis:any = response.data.usersHistory;

            //console.log(dateHis.getMonth()+1)

            userHis = userHis.reverse();
            userHis = userHis.slice(0, 5);

            const userHistory = userHis.map((item:any) => {
                if (item.date) {
                    let dateHis = item.date.slice(0, 19).replace('T', ' ')
                    dateHis = new Date(dateHis);
                    dateHis.setHours(dateHis.getHours() + 1);
                    item.date = dateHis
                    return item;
                }
            });

            dispatch({type: "SET_HISTORYUSER",data: userHistory})
    })
}




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
            updateHisAction()
            return(
                <h3 className="successful fadeIn">Email was successfully changed</h3>
            )
        } else if(changed === "changedP"){
            updateHisAction()
            return(
                <h3 className="successful fadeIn">Password was successfully changed</h3>
            )
        } else {
            return (<> </>)
        }
    }


    const historyMoviesShow = () => {

        return (

            <table>
            <thead>
                <tr key="historyMovies">
                    <th>Title</th>
                    <th className='typeHistory'>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {historyMovies !== false ? historyMovies.map((history:any, index:number) => (

                    <tr key={index}>
                        <td className='titleHistory'>{history.title}</td>
                        <td className='typeHistory'>{history.type}</td>
                       <td className={history.action === "ADDED" ? "added" : "removed"  }>{history.action}</td>
                    </tr>

                )) : 
            <tr key="nothing">
                <th></th>
                <th></th>
                <th></th>
            </tr>
            }

            </tbody>
        </table>

        )

    }


    const historyUserShow = () => {

        return (
            <table>
            <thead>
                <tr key="historyUser">
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {historyUserActions !== false ? historyUserActions.map((historyUsr:any, index:number) => (

                    <tr key={index}>
                        <td>{historyUsr.date.getDate()}.{historyUsr.date.getMonth()+1}.{historyUsr.date.getFullYear()} {historyUsr.date.getHours()}:{historyUsr.date.getMinutes()}:{historyUsr.date.getSeconds()}</td>
                       <td className={historyUsr.action === "changeEmail" ? "added" : "removed"  }>{historyUsr.action}</td>
                    </tr>

                )) : 
            <tr key="nothingUser">
                <th></th>
                <th></th>
            </tr>
            }

            </tbody>
        </table>

        )

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


              {historyUserActions.length > 0 ? (
                <div className="profileHistory">
                    <h3>Last 5 user account actions</h3>
                    {historyUserShow()}
                </div>

            ):""}


            {historyMovies.length > 0 ? (
                <div className="profileMoviesHistory">
                    <h3>Last 10 actions with favourites</h3>
                    {historyMoviesShow()}
                </div>

            ):""}


        </div>
        </>
    )
}

export default Profile


