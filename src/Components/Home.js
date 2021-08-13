import React,{useState,  useHistory} from 'react'
import {Header} from './Header'
import {auth, db} from '../Config/Config'
import { Todos } from './Todos';
import { Modal } from './Modal';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import WbSunny from '@material-ui/icons/WbSunny';
import Star from '@material-ui/icons/Star';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Person from '@material-ui/icons/Person';
//import Add from "@material-ui/icons/Add";
import AddAlert from '@material-ui/icons/AddAlert';
import EventAvailable from '@material-ui/icons/EventAvailable';
import Login  from './Login'
import {Link} from 'react-router-dom'
import './Home.css';

export const Home = ({currentUser, todos, deleteTodo,
editTodoValue, editModal, updateTodoHandler}) => {

  const [todo, setTodo]=useState('');
  const [todoError, setTodoError]=useState('');

  const handleTodoSubmit=(e)=>{
    e.preventDefault();
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('todos of ' + user.uid).add({
          Todo: todo
        }).then(setTodo('')).catch(err=>setTodoError(err.message))
      }
      else{
        console.log('user is not signed in to add todo to database');
      }
    })
  }



    return (
        <div className='wrapper'>
       
          <div className='container'>
            <form autoComplete='off' className='form-group'
            onSubmit={handleTodoSubmit}>

            {currentUser&&<div >
            <Grid item xs={12} container spacing={0}>
        <Grid
          item
          xs={2}
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            marginLeft: '120px',
            height: '500px',
            marginTop: '90px'
          }}
        >
          <TextField id="outlined-basic" label="Search" variant="outlined">
            {' '}
            <Search />
            Search{' '}
        </TextField>
     
         
         <p style={{marginRight:"10px" ,paddingBottom:"5px"}} > <WbSunny /> My Day</p>
         
         <p style={{marginRight:"10px" ,paddingBottom:"5px"}}> <Star />Important</p>
        
         
         
         <p style={{marginRight:"10px" ,paddingBottom:"5px"}} > <CalendarToday /> Planned</p>
        
         
        <p style={{marginRight:"10px" ,paddingBottom:"5px"}} >  <Person /> Assigned<br/> to you </p><br />
        </Grid>

        <Grid
          item
          xs={5}
          style={{
            height: '500px',
            marginTop: '90px',
            overflowY: 'scroll',
            background: '#3d7bdf'
          }}>
<div className="todo-app">
<div style={{display:"flex"}}>
          <input type="text" placeholder="Add to do"
          style={{maxWidth:"20vw",marginLeft:'75px'}}
                className='form-control' required
                onChange={(e)=>setTodo(e.target.value)}
                value={todo}
              />
            
             
                <button  style={{maxWidth:"20vw",marginRight:"80px",background:"blue" ,color:"white"}} type="submit" className='btn btn-success'
                 >
                   ADD
                </button>
          </div>
              {todoError&&<div className='error-msg'>{todoError}</div>}
            <Todos todos={todos} deleteTodo={deleteTodo}
             editModal={editModal}/>
              </div>
              </Grid>
              <Grid
          item
          xs={3}
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            height: '500px',
            marginTop: '90px'
          }}
        >
         
         
          <Header />
          <p style={{marginRight:"10px" ,paddingBottom:"5px"}} ><WbSunny /> add to My Day</p>
       
        
         <p style={{marginRight:"10px" ,paddingBottom:"5px"}}> <AddAlert /> Remind Me</p>
     
         
          <p  style={{marginRight:"10px" ,paddingBottom:"5px"}}><EventAvailable /> Add due Date</p>
         
        
          <TextField id="outlined-basic" label="Add note" variant="outlined" />
          <br />
         
          
        </Grid>
              
</Grid>
            

            </div>}

            {!currentUser&&<>
              
              <div className="welcome" >


         <h1 className="heading">HELLO & WELCOME </h1>


         <h3 style={{color:"white"}}>I am excited to have you get started</h3>
         
        
        

         <Link style={{cursor:"pointer",fontWeight:"bold",height:"30px", width:"100px", marginTop:"20px", marginLeft:"200px", color:"white",borderStyle:"none",background:"blue", textDecoration:"none", padding:"5px"}}   to="/Login" > Get started</Link>

         <h2 className="intro" style={{color:"white"}}> designed by Karabo Molepo<br/></h2>
       
         </div>
            </>}
          
            
            </form>
            
            </div>

            {editTodoValue&&<Modal editTodoValue={editTodoValue}
              editModal={editModal} updateTodoHandler={updateTodoHandler}
            />} 
              
        </div>
    )
}