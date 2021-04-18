const URL = 'http://localhost:5000'


function signup(){
   
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const pass = document.getElementById('password').value

    
    let data = {
        name: name,
        email: email,
        password: pass
    }

    fetch(`${URL}/user`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:  JSON.stringify(data)
    }).then((response) => {
        console.log(response)
        window.history.back()
    })

   
}