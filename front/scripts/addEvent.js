const URL = 'http://localhost:5000'


function add(){



    let start_time = document.getElementById("start-time").value
    let start_date = document.getElementById("start-date").value
    let end_time = document.getElementById("end-time").value
    let end_date = document.getElementById("end-date").value

    let start = start_date + 'T' + start_time + ":00Z"
    let end = end_date + 'T' + end_time + ":00Z"

    let data = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        start_hour: start,
        end_hour: end
    }

    fetch(`${URL}/event`,{
        method: 'POST',
        headers: {
            'authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:  JSON.stringify(data)
    }).then((response) => {
        return response.text()
    }).then((data) => {
        window.location.href = "./schedule.html"
    })

}   