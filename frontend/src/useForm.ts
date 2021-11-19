import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router";

const useForm = (validateForm:any) => {

    const state = useSelector((state:any) => state.userInfo)
    const dispatch = useDispatch();
    const [pages, setPages] = useState("");
    const history = useHistory();
    const [values, setValues] = useState({
        username: '',
        password: '',
        email: '',
        errMsg: ''

    })

axios.defaults.withCredentials = true;
const register = () => {
        axios.post("http://localhost:3001/register", {
          username: values.username, 
          password: values.password,
          email: values.email
        }).then((response) => {
          if(response.data.usernameMsg) {
            setErrors({
                ...errors,
                "username":response.data.usernameMsg
            })
          } else if(response.data.passwordMsg) {
            setErrors({
                ...errors,
                "password":response.data.passwordMsg
            })
          }else if(response.data.emailMsg) {
            setErrors({
                ...errors,
                "email":response.data.emailMsg
            })
          }else if(response.data.messageFalse) {
            setErrors({
                ...errors,
                "errMsg":response.data.messageFalse
            })

          }else if(response.data.messageTrue) {
                history.push("/login");
          }
        })
    }




const updateEmail = () => {
      axios.post("http://localhost:3001/updateEmail", {
        username: state.username, 
        email: values.email
      }).then((response) => {
       if(response.data.emailMsg) {
          setErrors({
              ...errors,
              "email":response.data.emailMsg
          })
        } else if(response.data.messageTrue) {
            state["email"] = values.email

            dispatch({
              type: "ADD_USERID",
              data: state
            });

            dispatch({
              type: "CHANGE",
              data: "changedE"
            });

            setValues({
              username: '',
              password: '',
              email: '',
              errMsg: ''
            })
        }
  
      })
  }


  const updatePassword = () => {
    axios.post("http://localhost:3001/updatePassword", {
      username: state.username, 
      password: values.password
    }).then((response) => {
      if(response.data.passwordMsg) {
        setErrors({
            ...errors,
            "password":response.data.passwordMsg
        })
      } else if(response.data.messageTrue) {

          dispatch({
            type: "CHANGE",
            data: "changedP"
          });

          setValues({
            username: '',
            password: '',
            email: '',
            errMsg: ''
          })
      }

    })
}




    const login = () => {
        axios.post("http://localhost:3001/login", {
          username: values.username, 
          password: values.password,
        }).then((response) => {
          if(response.data.usernameMsg) {
            setErrors({
                ...errors,
                "username":response.data.usernameMsg
            })
          } else if(response.data.passwordMsg) {
            setErrors({
                ...errors,
                "password":response.data.passwordMsg
            })
          }else if(response.data.messageFalse) {
            setErrors({
                ...errors,
                "errMsg":response.data.messageFalse
            })
          }else if(response.data.length > 0 && response.data.length !== undefined) {
            
                  dispatch({
                        type: "ADD_USERID",
                        data: response.data[0]
                  });

                  history.push("/firstReactApp");
          }

        })
    }


const [isSubmit, setIsSubmit] = useState(false)   
const [errors, setErrors] = useState({})

const handleChange = (e:any) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value
        })

    }

const handleSubmit = (e:any, page:any) => {
    e.preventDefault();
    setErrors(validateForm(values,page));
    setPages(page);
    setIsSubmit(true)
}



useEffect(() => {

    if(Object.keys(errors).length === 0 && isSubmit === true) {

        if(pages === "register") {
            register();
        } else if(pages === "login") {
            login();
        } else if(pages === "changeEmail") {
          
            updateEmail();


        } else if(pages === "changePassword"){
          
            updatePassword();
        }


        setIsSubmit(false)
    } 
    
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [isSubmit, errors, pages])


    return {handleChange, values, handleSubmit, errors}

}

export default useForm