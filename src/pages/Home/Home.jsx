import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import "./Home.css"



export const Home = () => {
    const [count, setCount] = useState(0)
    const [credentials, setCredentials] = useState({
      email: "", 
      password: "", 

    });

    
  
    const inputHandler = (event) => {
      setCredentials((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    };
  
    useEffect(() => { }, [count]);
  
    useEffect(() => {
      console.log(credentials);
    },[credentials]);

    return (
        < div className='homeDesing '>

            <h1> </h1>
            <h1> </h1>
            <h2></h2>

            <div className="card">
                <button onClick={bringProfileHandler}>Bring My PRofile</button>
              
                <CustomInput
                typeProp="email"
                nameProp="emailInput"
                placeholderProp="introduce tu email"
                handlerProp={inputHandler} 
                />
                <CustomInput
                typeProp="password"
                nameProp="password"
                placeholderProp="introduce tu contraseña"
                handlerProp={inputHandler}
                />
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>

        
        
        </div>
    )

}