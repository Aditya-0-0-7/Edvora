import React, { useState, useEffect } from 'react';
import './filter.css'
function Filter(prop)
{
    const [value1, setValue1] = useState('State');
    const [value2, setValue2] = useState('City');
    useEffect(()=>{
        prop.status(value1)
      },[value1]);
      useEffect(()=>{
        prop.citystatus(value2)
      },[value2]);
    const handler1=(event)=>{
        setValue1(event.target.value)
        setValue2('City')
    }
    const handler2=(event)=>{
        setValue2(event.target.value)
    }
    return(
        <div className={prop.stat?'filterboxv':'filterboxin'}>
            <div className='boxtxt' >Filters</div>
            <hr/>
            <select value={value1} onChange={handler1}>
            <option value="State">State</option>
            {prop.slist.map((v)=>{
                return(
                    <option value={v}>{v}</option>
                )
            })}

            </select>
            <select value={value2} onChange={handler2}>
            <option value="City">City</option>
            {prop.clist.map((v)=>{
                return(
                    <option value={v}>{v}</option>
                )
            })}
            </select>
        </div>
    )
}
export default Filter;