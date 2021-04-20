const URL = 'http://localhost:5000'

function exit(){
    window.location.href = "./login.html"
}


function selectCard(id){

    localStorage.setItem("selected", id)

    let cards = document.getElementsByClassName("card")

    for(let i = 0; i < cards.length; i++){
        if(cards[i].id != id){
            cards[i].style.borderColor = "#dfdfdf" 
        }else{
            cards[i].style.borderColor = "#007bff" 
        }
    }

}

function addEvent(){

    window.location.href = "./add_event.html"

}

function addAvailableEvent(){

    

}

function editEvent(){

    window.location.href = "./edit_event.html"
}

function deleteEvent(id){

    fetch(`${URL}/event/${id}`,{
        method: 'DELETE',
        headers: {
            authorization: localStorage.getItem('token'), 
          },
    }).then((response) => {
        return response.text()
    }).then(() => {

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
    
            let events_view = document.getElementById('my-events')
    
            let len = data.length
            
            if(!len){
                events_view.innerHTML = "<h6 class='mt-3 text-muted'>Não há nenhum evento para ser mostrado.</h6>"
            }else{
    
                events_view.innerHTML = ""
                data.map((event) => {
    
                    if(event){
                    
                            let start = event.start_hour.split("T")
                            let start_date = start[0].split("-")
                            let start_clock = start[1].slice(0, start[1].length - 8)
                            
                            let end = event.end_hour.split("T")
                            let end_clock = end[1].slice(0, end[1].length - 8)
    
                            events_view.innerHTML += `
                            <div onclick="selectCard('${event._id}')" id='${event._id}' class="card  m-1">
                            <div class="card-body">
                                <h5 class="card-title">${event.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${event.description}</h6>
                                <p class="card-text">Data: ${start_date[2]}/${start_date[1]} </a>
                                <p class="card-text">Início: ${start_clock} </a>
                                <p class="card-text">Final: ${end_clock} </a>
                            </div>
                        </div>`
                    }
                })
    
            }
    
    
        })

    })



}

window.onload = () => {

    let user_id

    fetch(`${URL}/user/token`,{
        headers: {
            authorization: localStorage.getItem('token')
        }
    }).then((response) => {
        return response.json()
    }).then((user) => {

        user_id = user._id

        return fetch(`${URL}/user/${user_id}/events`, {
            headers: {
                authorization: localStorage.getItem('token') 
            }
        })

    }).then((response) => {
        return response.json()
    }).then((data) => {

        let events_view = document.getElementById('my-events')

        let len = data.length
        
        if(!len){
            events_view.innerHTML = "<h6 class='mt-3 text-muted'>Não há nenhum evento para ser mostrado.</h6>"
        }else{

            events_view.innerHTML = ""
            data.map((event) => {

                if(event){
                
                        let start = event.start_hour.split("T")
                        let start_date = start[0].split("-")
                        let start_clock = start[1].slice(0, start[1].length - 8)
                        
                        let end = event.end_hour.split("T")
                        let end_clock = end[1].slice(0, end[1].length - 8)

                        events_view.innerHTML += `
                        <div onclick="selectCard('${event._id}')" id='${event._id}' class="card  m-1">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${event.description}</h6>
                            <p class="card-text">Data: ${start_date[2]}/${start_date[1]} </a>
                            <p class="card-text">Início: ${start_clock} </a>
                            <p class="card-text">Final: ${end_clock} </a>
                        </div>
                    </div>`
                }
            })

        }


    }).then(() => {
        
        fetch(`${URL}/event`, {
            headers: {
                authorization: localStorage.getItem('token') 
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {

            let events_view = document.getElementById('available-events')

            let events = new Set()

            for(let i = 0; i < data.length; i++){
            
                data[i].users.map((user) => {
                    
                   if(user_id != user){
                       events.add(data[i])
                   }

                })

            }



            let len = events.size
            
            if(!len){
                events_view.innerHTML = "<h6 class='mt-3 text-muted'>Não há nenhum evento para ser mostrado.</h6>"
            }else{
                
                events_view.innerHTML = ""
                for(let event of events){
                
                    let start = event.start_hour.split("T")
                    let start_date = start[0].split("-")
                    let start_clock = start[1].slice(0, start[1].length - 8)
                    
                    let end = event.end_hour.split("T")
                    let end_clock = end[1].slice(0, end[1].length - 8)

                    events_view.innerHTML += `
                        <div onclick="selectCard('${event._id}')" id='${event._id}' class="card  m-1">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${event.description}</h6>
                            <p class="card-text">Data: ${start_date[2]}/${start_date[1]} </a>
                            <p class="card-text">Início: ${start_clock} </a>
                            <p class="card-text">Final: ${end_clock} </a>
                        </div>
                    </div>`
                
                }

            }


        })

    })

    
}