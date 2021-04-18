const URL = 'http://localhost:5000'


const login = async () => {

    const email = document.getElementById('email').value
    const pass = document.getElementById('password').value

    data = {
        email: email,
        password: pass
    }

    fetch(`${URL}/user/auth`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:  JSON.stringify(data)
    }).then((response) => {
        return response.text()
    }).then((data) => {
        console.log(data)
        localStorage.setItem('token', data)
        window.location.href = "./callendar.html"
    })

}