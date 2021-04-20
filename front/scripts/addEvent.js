const URL = 'http://localhost:5000'

function verifyDate(cur_start, cur_end, event_start, event_end){

    if(cur_start - event_start > 0 && cur_start < event_end)
        return true
    if(event_end - cur_end > 0 && cur_end > event_start)
        return true
    
    if(cur_start  < event_start && cur_end > event_end)
        return true

    return false

}

function add(){

    let flag = 0

    let start_time = document.getElementById("start-time").value
    let start_date = document.getElementById("start-date").value
    let end_time = document.getElementById("end-time").value
    let end_date = document.getElementById("end-date").value

    let start = start_date + 'T' + start_time + ":00Z"
    let end = end_date + 'T' + end_time + ":00Z"

    let current_start = new Date(start)
    let current_end = new Date(end)

    fetch(`${URL}/user/token`,{
        headers: {
            authorization: localStorage.getItem('token')
        }
    }).then((response) => {
        return response.json()
    }).then((user) => {

        return fetch(`${URL}/user/${user._id}/events`, {
            headers: {
                authorization: localStorage.getItem('token') 
            }
        })

    }).then((response) => {
        return response.json()
    }).then((data) => {

        data.map((event) => {
            
            let event_end = new Date(event.end_hour)
            let event_start = new Date(event.start_hour)

            
            if(verifyDate(current_start.getTime(), current_end.getTime(), event_start.getTime(), event_end.getTime())){
                flag = 1
            }
            
        })
        
    
    }).then((res) => {


        if(flag){
            alert(`Este evento está sobrescrevendo outro evento`)
            return
        }

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
            

    })

    
}   