const URL = 'http://localhost:5000'


const login = async () => {

    const email = document.getElementById('email').value
    const pass = document.getElementById('password').value

    data = {
        email: email,
        password: pass
    }

    let response = await fetch(`${URL}/user/auth`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:  JSON.stringify(data)
    })
    
    let json = await response.json() 

    let token = `"${json}"`

    localStorage.setItem('token', token)
    window.location.href = "./schedule.html"

}