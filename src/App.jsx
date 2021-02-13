import React,{useState,useEffect} from 'react'
import Usercontext from './Context/Usercontext'
import axiox from 'axios'
import { BrowserRouter, Route, Switch,Redirect} from "react-router-dom";
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './components/Home';

function App() {
  
  const [userData, setuserData] = useState({
    token:undefined,
    userName:undefined,
    userEmail:undefined,
    userId:undefined,
    
  })
  useEffect(() => {
 try {
   
  const checkLoginuser=async()=>{
    let token=window.localStorage.getItem('auth-token');
 
    if(token === null){ 
    window.localStorage.setItem("auth-token"," ");
    token=""
   }
    const tokenresponse=await axiox.post("/api/v1/user/tokenIsvalid",null,{headers:{"x-auth-token":token}})
   
  
    if(tokenresponse.data){
     const userRes=await axiox.get("/api/v1/user/",{headers:{"x-auth-token":token}})
    
     window.localStorage.setItem('id',userRes.data.id)
     setuserData({
       token,
       userName:userRes.data.name,
       userEmail:userRes.data.email,
       userId:userRes.data.id
       //userRes.data.name = return user name
       
     })
    
    }
  }
  checkLoginuser()
 } catch (error) {
   console.log(error);
 }
  }, [setuserData])

  return (
    <>
      <BrowserRouter>
    <Usercontext.Provider value={{userData,setuserData}} >
    {/* <Header/> */}
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/"exact component={Login}/>
        <Route path="/login" component={Login}/>
        <Route path="/accessuser" exact component={Home}/>
         <Redirect to="/accessuser" /> 
      </Switch>
      </Usercontext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
// userdata={userData.user.name}