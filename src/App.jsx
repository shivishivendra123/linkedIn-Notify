import { use, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [myTemplates, setMyTemplates] = useState([])
  const [saveTemplate,setSaveTemplate] = useState("")
  const [d ,setD] = useState("")
  const title = useRef();
  //const note = useRef();
  const getMyTemplates = ()=>{
    
    
    let s = JSON.parse(localStorage.getItem('myTemp'))
    if(s){
      setMyTemplates(s?.key)
      console.log(myTemplates)
    }
    
    
  }

  const handleCopy = (id)=>{
      const data = document.getElementById(id).innerHTML
      navigator.clipboard
        .writeText(data) // Write the text to the clipboard
        .then(() => {
          alert('Text copied to clipboard!'); // Show a success message
        })
        .catch((error) => {
          console.error('Failed to copy text:', error); // Handle errors
        });

  } 

  const saveTemplatehandler = ()=>{

    console.log("yes")

    let tobeSaved = [...myTemplates,{
      title: title.current.value,
      note: saveTemplate
    }]
    localStorage.setItem('myTemp', JSON.stringify({ key: tobeSaved }));
    setMyTemplates(tobeSaved)
    chrome.storage.local.set({ myDataKey: tobeSaved }, () => {
      console.log("Data saved to chrome storage");
    });
    



    // chrome.storage.local.set({ tobeSaved }, () => {
    //   console.log({
    //     title: title,
    //     note: note
    //   })
    // });  
    
  
  }
  

  useEffect(()=>{
    getMyTemplates()

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        alert('Text copied to clipboard!');
      }
      if (event.key === 'ArrowDown') {
        alert('Text copied to clipboard!');
      }
    };

    // Adding the event listener when the component mounts
    window.addEventListener('keydown', handleKeyDown);
    
  },[])

  return (
    <>
        <div style={{ marginLeft:"20px", overflow:"auto"}}>
          <label><h3>Title:</h3></label><br/>
          <input type='text' placeholder='Write a title' ref={title}  style={{ marginBottom:"20px"}} ></input><br></br>
          <textarea placeholder='Type your template here'  onChange= {(e)=>{setSaveTemplate(e.target.value)}} style={{height:'200px',width:"200px"}}></textarea><br></br>
          <button style={{ marginTop:"20px"}} onClick={()=>saveTemplatehandler()}>Save Template</button><br></br>
          <div style={{ marginTop:"20px"}}>
          <label>Your Saved Templates </label><br></br>
          {
            myTemplates.map((item,index)=>{
              return (
                <>
                <div style={{ border:"solid 2px",marginBottom:"10px",margin:"20px"}} id = {index} >
                  <button onClick={()=>handleCopy(index)}>copy</button><br></br>
                Title:{item.title}<br></br>
                Template:{item.note.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ))}
                </div>
                
                </>
              )
            })
          }
          </div>
          


          {
            d
          }

        </div>
    </>
  )
}

export default App
