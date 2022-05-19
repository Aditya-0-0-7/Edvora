import './App.css';
import Header from './header/header';
import Filters from './filter/filter';
import Nav from './navigation/nav';
import { useEffect, useState } from 'react';
function App() {
  const[userlist,updateuser]=useState({name:"",url:""})
  const[ridelist,updaterides]=useState([])
  const[statelist,updatestate]=useState([])
  const[citylist,updatecity]=useState([])
  const[statestatus,updatestatus]=useState(null)
  const[citystatuses,updatestatuses]=useState(null)
  const[nearest,updatenearest]=useState({})
  const[upcoming,updateupcoming]=useState([])
  const[past,updatepast]=useState([])
  const[filterstatus,updatefilterstatus]=useState(false)

  function updatefilter()
  {
    if(filterstatus===false)
    updatefilterstatus(true)
    else
    updatefilterstatus(false)
  }

  function findstateride(z)
  {
    {
      let a={}
      let b=[]
      let c=[]
      for(let i=0;i<ridelist.length;i++)
      {
        if(z===null||ridelist[i].state===z)
        {
          let d=0
          for(let j=0;j<ridelist[i].station_path.length;j++)
          {
            if(ridelist[i].station_path[j]>=userlist.station_code)
            {
              if(j==0)
              {
                d=ridelist[i].station_path[j]-userlist.station_code
                break
              }
              let q=ridelist[i].station_path[j]-userlist.station_code
              if(q<d)
              d=q
              break
            }
            else
            {
              d=userlist.station_code-ridelist[i].station_path[j]
            }
          }
          if(`${d}`in a)
          {
            a[d].push(ridelist[i])
          }
          else
          {
            a[d]=[ridelist[i]]
          }
          let r=ridelist[i].date.split(" ")
          let r1=r[0].split("/")
          let r2=r[1].split(":")
          let da=new Date(parseInt(r1[2]),parseInt(r1[0])-1,parseInt(r1[1]),parseInt(r2[0]),parseInt(r2[1]))
          let dc=new Date()
          if(da.getTime()>dc.getTime())
          {
            b.push({...ridelist[i],distance:d})
          }
          else if(da.getTime()<dc.getTime())
          {
            c.push({...ridelist[i],distance:d})
          }
        }
      }
      updatenearest(a)
      updatepast(c)
      updateupcoming(b)
    }
  }

  function findcityride(z)
  {
    {
      let a={}
      let b=[]
      let c=[]
      for(let i=0;i<ridelist.length;i++)
      {
        if(ridelist[i].city===z)
        {
          let d=0
          for(let j=0;j<ridelist[i].station_path.length;j++)
          {
            if(ridelist[i].station_path[j]>=userlist.station_code)
            {
              if(j==0)
              {
                d=ridelist[i].station_path[j]-userlist.station_code
                break
              }
              let q=ridelist[i].station_path[j]-userlist.station_code
              if(q<d)
              d=q
              break
            }
            else
            {
              d=userlist.station_code-ridelist[i].station_path[j]
            }
          }
          if(`${d}`in a)
          {
            a[d].push(ridelist[i])
          }
          else
          {
            a[d]=[ridelist[i]]
          }
          let r=ridelist[i].date.split(" ")
          let r1=r[0].split("/")
          let r2=r[1].split(":")
          let da=new Date(parseInt(r1[2]),parseInt(r1[0])-1,parseInt(r1[1]),parseInt(r2[0]),parseInt(r2[1]))
          let dc=new Date()
          if(da.getTime()>dc.getTime())
          {
            b.push({...ridelist[i],distance:d})
          }
          else if(da.getTime()<dc.getTime())
          {
            c.push({...ridelist[i],distance:d})
          }
        }
      }
      updatenearest(a)
      updatepast(c)
      updateupcoming(b)
    }
  }

  function changestates(v)
  {
    updatestatuses(v)
  }
  function changestate(v)
  {
    updatestatus(v)
  }
  function findstate()
  {
    let sl=[]
    for(let i=0;i<ridelist.length;i++)
    {
      if(sl.indexOf(ridelist[i].state)===-1)
      {
        sl=[...sl,ridelist[i].state]
      }
    }
    updatestate(sl)
  }
  function findcity(z)
  {
    if(z===null)
    {
      let cl=[]
      for(let i=0;i<ridelist.length;i++)
      {
        if(cl.indexOf(ridelist[i].city)===-1)
        {
          cl=[...cl,ridelist[i].city]
        }
      }
      updatecity(cl)
    }
    else
    {
      let cl=[]
      for(let i=0;i<ridelist.length;i++)
      {
        if(ridelist[i].state===z&&cl.indexOf(ridelist[i].city)===-1)
        {
          cl=[...cl,ridelist[i].city]
        }
      }
      updatecity(cl)
    }
  }
    async function fetchuser()
    {
      const res = await fetch("https://assessment.api.vweb.app/user", {
          method: "GET",
          mode:'cors'
          })
        const obj=await res.json()
        updateuser(obj)
    }
    async function fetchride()
    {
      const res = await fetch("https://assessment.api.vweb.app/rides", {
        method: "GET",
        mode:'cors'
        })
      const obj=await res.json()
      updaterides(obj)
    }
  useEffect(()=>{
    fetchride()
    fetchuser()
  },[]);

  useEffect(()=>{
    findstate()
    findcity(statestatus)
    findstateride(statestatus)
  },[ridelist]);

  useEffect(()=>{
    if(statestatus!=='State')
    {
      if(citystatuses!==null&&statestatus===null)
      {
        findcityride(citystatuses)
      }
      else
      {
        findstateride(statestatus)
      }
      findcity(statestatus)
    }
    else
    {
      updatestatus(null)
    }
    
  },[statestatus]);

  useEffect(()=>{
    if(citystatuses!=='City')
    {
      if(citystatuses===null)
      {
        findstateride(statestatus)
      }
      else
      {
        findcityride(citystatuses)
      }
    }
    else
    updatestatuses(null)
  },[citystatuses]);
  return (
    <div className='main2'>
      <Header user={userlist}></Header>
      <Nav n={nearest} f={upcoming} p={past}></Nav>
      <button onClick={updatefilter} className='filtertext'>Filter</button>
      <div className='icons'></div>
      <Filters status={changestate} clist={citylist} slist={statelist} citystatus={changestates} stat={filterstatus}></Filters>
    </div>
  );
}

export default App;
