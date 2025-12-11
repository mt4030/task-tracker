const Card=({name,age,avatar,isOnline})=>{



    return(
        <div className="card">
        <img src={avatar} alt="" />
        <h2>{name}</h2>
        <p>{age}</p>
       {isOnline?<span style={{color:'green'}}>●</span>:<span style={{color:'red'}}>.</span>} 
                </div>
    )
}
export default Card 