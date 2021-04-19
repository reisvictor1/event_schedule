const URL = 'http://localhost:5000'

function addEvent(){

    window.location.href = "./add_event.html"

}

function editEvent(){

    window.location.href = "./edit_event.html"
}

window.onload = () => {

    fetch(`${URL}/event`, {
        headers: {
            authorization: localStorage.getItem('token') 
        }
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
                console.log(event._id)
                let start = event.start_hour.split("T")
                let start_date = start[0].split("-")
                let start_clock = start[1].slice(0, start[1].length - 8)
                
                let end = event.end_hour.split("T")
                let end_clock = end[1].slice(0, end[1].length - 8)

                events_view.innerHTML += `
                <div id='${event._id}' class="card  m-1">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${event.description}</h6>
                    <p class="card-text">Data: ${start_date[1]}/${start_date[2]} </a>
                    <p class="card-text">Início: ${start_clock} </a>
                    <p class="card-text">Final: ${end_clock} </a>
                </div>
            </div>`
            })

        }


    })

    
}