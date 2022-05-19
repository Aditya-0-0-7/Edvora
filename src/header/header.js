import './header.css'
function Header(prop)
{
    const st={
        backgroundSize:`contain`,
        backgroundImage:`url(${prop.user.url})`
    }
    return(
        <div className='header'>
            <div className='headtext'>Edvora</div>
            <div className='headname'>{prop.user['name']}</div>
            <div style={st} className='headpic'></div>
        </div>
    )
}
export default Header;