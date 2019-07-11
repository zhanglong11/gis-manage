import React,{useState} from 'react';
const User=()=>{
    const [name,setName]=useState('john');

    return (<div>
        <input type="text" onChange={e=>{setName(e.target.value)}}/>
        {name}
    </div>)
}
export default User