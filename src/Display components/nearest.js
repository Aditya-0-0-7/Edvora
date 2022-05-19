import './display.css'
function Nearest(prop)
{
    let k1=Object.keys(prop.nn)
    let k= []
    k1.forEach(str => {
        k.push(Number(str));
      });
    k.sort(function(a, b) {
        return a - b;
      })
    return(
        <div className='outcontainer'>
            {k.map((v)=>{
                return(
                    prop.nn[v].map((q)=>{
                        return(
                            <div className='incontainer'>
                                <div className='image'></div>
                                <div className='data'>
                                    <div className='in'>Ride Id: {q.id}</div>
                                    <div className='in'>Origin Station: {q.origin_station_code}</div>
                                    <div className='ina'>station_path: [{q.station_path.map((v)=>{
                                        if(v!==q.station_path[q.station_path.length-1])
                                        return(<div className='inn'>{v},</div>)
                                        else
                                        return(<div className='inn'>{v}</div>)
                                        })}]</div>
                                    <div className='in'>Date: {q.date}</div>
                                    <div className='in'>Distance: {v}</div>
                                </div>
                                <div className='data1'><div>{q.city}</div><div className='empty'></div><div>{q.state}</div></div>
                            </div>
                        )
                    })
                )
            })}
        </div>
    )
}
export default Nearest;