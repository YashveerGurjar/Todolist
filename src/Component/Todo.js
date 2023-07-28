import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons'
import "./style.css";
import 'animate.css';

function getlocalStorage(){
    let LocalStorageData= localStorage.getItem("lists");
    if(LocalStorageData){
                return JSON.parse(localStorage.getItem("lists"));
    }
    else{
        return [];
    }
}

function Todo() {
    const [Input, setInput] = useState();
    const [InputList, setInputList] = useState(getlocalStorage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               );
    const [edit, setEdit] = useState();
    const [toggle, setToggle] = useState(true);

    useEffect(()=>{
            localStorage.setItem("lists",JSON.stringify(InputList))
    },[InputList])

    function deleteAllData(){
        setInputList([])
    }

    function deleteData(id) {
        let deletedData = InputList.filter((value) => {
            return value.id !== id
        })
        setInputList(deletedData);
    }
    function editData(id) {
        var editeAfterData = InputList.find((data) => {
            return data.id === id
        })

        setInput(editeAfterData.name);
        setEdit(id);
        setToggle(false);
    }

    function valueSet() {

        if (!Input) {
            alert("Please Enter Something");
        }
        else if (Input && !toggle) {
            setInputList(InputList.map((elem) => {
                if (elem.id === edit) {
                    return { ...elem, name: Input }
                }
                return elem;
            }))
            setInput("");
            setEdit(null);
            setToggle(true);
        }
        else {
            let newData = {
                id: new Date().getTime().toString(),
                name: Input
            }

            setInputList((data) => {

                return [...data, newData]
            })
        }
        setInput("");

    }
    return (
        <div className='container animate__animated animate__zoomInDown'>
            <div style={{ textAlign: "center" }}>
                <h1 className='animate__animated animate__rubberBand animate__delay-1s' >TodoList</h1>
            </div>

            <div>
                <p>
                    <label >Add Item</label>
                    <input type="text" value={Input} placeholder='Enter your list' onChange={(e) => { setInput(e.target.value) }} />
                    {toggle ? <FontAwesomeIcon icon={faCirclePlus} flip size="2xl" style={{ color: "#fff", backgroundColor: "blue", marginLeft: "10px", borderRadius: "100%" }} onClick={valueSet} />
                        : <FontAwesomeIcon icon={faFilePen} fade size="xl" style={{ color: "green", marginLeft: "10px" }} onClick={valueSet} />
                    
                   }
                  
                </p>
            </div>
            <div className='task' >
                <h3>Task todo: <button className='delete animate__animated animate__jello animate__delay-1s' type="submit" onClick={deleteAllData}>Remove All</button></h3>
                {
                    InputList.map((data) => {
                        return (

                            <div key={data.id}>
                                <div className='edit animate__animated animate__fadeInDown'>
                                    {data.name}

                                    <FontAwesomeIcon icon={faFilePen} fade size="l" style={{ float: 'right', color: "green" }} onClick={() => { editData(data.id) }} />
                                    <FontAwesomeIcon  icon={faTrash} fade size="l" style={{ float: 'right', marginRight: "10px", color: "red" }} onClick={() => { deleteData(data.id) }} />
                                </div>
                             
                            </div>
                            
                        )
                    })
                }
                   
            </div>
        </div>
    )
}
export default Todo;