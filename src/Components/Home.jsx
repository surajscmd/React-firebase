import { useState, useRef , useEffect} from 'react'
import TodoCar from './Todocar';


function Home(){
    const taskInput = useRef();
    const [LoaderStatus, setLoderstatus] = useState(false);
    const [Alertstatus, setAlertstatus] = useState(false);
  
    const [Todos, setTodos] = useState([]);

    function closeAlert(){
        setAlertstatus(false);
      }
    
    
      function addTaskHandler(){
        setLoderstatus(true);
        let title = taskInput.current.value;
        console.log(title)
    
        let todoData = {
          title: title,
        }
        fetch('https://todoapp-dbc8e-default-rtdb.firebaseio.com/Todos.json',{
            method: 'POST' ,
            body: JSON.stringify(todoData)
          }).then(()=>{
             setLoderstatus(false);
            setAlertstatus(true);
      
             setTodos((pretodos)=>[...pretodos, todoData] )
          })}
       
  useEffect(()=>{
    fetch('https://todoapp-dbc8e-default-rtdb.firebaseio.com/Todos.json').then((data)=>{
      return data.json()}).then((data)=>{
        let tempTodos = []
        for(const key in data){
          let todo ={
            id : key,
            ...data[key]
          }
          tempTodos.push(todo)
        }
        setTodos(tempTodos);
      })  
  },[])

  useEffect(()=>{
    console.log(Todos);
  },[Todos])   

    return(
        <>
        <div className='container'>
          <div className={Alertstatus == true? "Alert":"d-none"}>
            <p>Your ToDo's Saved Succesfully  </p>
            <button  className='close-btnn' onClick={closeAlert}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
           <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg></button>
          </div>
    
           <h1 className='hedline'>Manage Your task in one page</h1>
            <p className='paragraph'>Lorem ipsum, dolor sit amet consectetur adipisicin Lorem ipsum 
              dolor sit amet consectetur adipisicing elit. Suscipit, nisi 
             </p>
        </div>
          
         
          <div className='flexx'>
               <input ref={taskInput} className='inputt' type="text" placeholder='Enter the task'/>
               <button className='btn' onClick={addTaskHandler}>
                    <div>Add task</div>
                    <div className={LoaderStatus== true? "loader":" "}></div>
               </button>
          </div>
    
          {
            Todos.map((data)=>{
              return <TodoCar title={data.title} id={data.id} />
              }
            )
          }
    
        </>
      )
      }



export default Home