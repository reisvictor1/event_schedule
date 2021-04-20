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



async function edit(id){

    let flag = 0

    let start_time = document.getElementById("start-time").value
    let start_date = document.getElementById("start-date").value
    let end_time = document.getElementById("end-time").value
    let end_date = document.getElementById("end-date").value

    let start = start_date + 'T' + start_time + ":00Z"
    let end = end_date + 'T' + end_time + ":00Z"

    let current_start = new Date(start)
    let current_end = new Date(end)

    let response = await fetch(`${URL}/user/token`,{
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
    
    let user = await response.json()

    response = await fetch(`${URL}/user/${user._id}/events`, {
        headers: {
            authorization: localStorage.getItem('token') 
        }
    })

    let data = await response.json()

    data.map((event) => {
            
        let event_end = new Date(event.end_hour)
        let event_start = new Date(event.start_hour)

        
        if(verifyDate(current_start.getTime(), current_end.getTime(), event_start.getTime(), event_end.getTime())){
            flag = 1
        }
        
    })

    if(flag){
        alert(`Este evento está sobrescrevendo outro evento`)
        return
    }

    data = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        start_hour: start,
        end_hour: end
    }

    response = fetch(`${URL}/event/${id}`,{
        method: 'PUT',
        headers: {
            'authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:  JSON.stringify(data)
    })

    window.location.href = "./schedule.html"
  

}