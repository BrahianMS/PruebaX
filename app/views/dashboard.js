export function dashboard() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const main = document.getElementById("main");

    if (user.role === 'user') {
    main.innerHTML =`<div class="dashboard w-100 h-100 row">
                        <div class="col-md-2 d-flex flex-column gap-5 ms-2 pt-5 align-items-center bg-dark">
                            <h4 class="text-light">Eventos</h4>
                            <div class="row g-0 m-2">
                                <div class="col-md-4">
                                <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" class="img-fluid rounded-circle" alt="avatar">
                                </div>
                                <div class="col-md-8">
                                <div class="card-body ps-3">
                                    <h5 class="card-title text-light" id="userName">UserName</h5>
                                    <p class="card-text text-light" id="userRole">User role</p>
                                </div>
                                </div>
                            </div>
                            <nav class="w-100">
                                <ul class="nav flex-column gap-2 w-100">
                                    <li class="nav-item">
                                        <a class="btn primary w-100" id="events" aria-current="page" href="#">Events</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="btn primary w-100" id="enroll" href="#">Enrollment</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="btn primary w-100" id="logOut" href="">Log-out</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <main class="col-md-9 m-5" id="eventContent">
                            
                        </main>
                    </div>`;
    }
    if (user.role === 'admin') {
    main.innerHTML =`<div class="dashboard w-100 h-100 row">
                        <div class="col-md-2 d-flex flex-column gap-5 ms-2 pt-5 align-items-center bg-dark">
                            <h4 class="text-light">Eventos</h4>
                            <div class="row g-0 m-2">
                                <div class="col-md-4">
                                <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" class="img-fluid rounded-circle" alt="avatar">
                                </div>
                                <div class="col-md-8">
                                <div class="card-body ps-3">
                                    <h5 class="card-title text-light" id="userName">UserName</h5>
                                    <p class="card-text text-light" id="userRole">User role</p>
                                </div>
                                </div>
                            </div>
                            <nav class="w-100">
                                <ul class="nav flex-column gap-2 w-100">
                                    <li class="nav-item">
                                        <a class="btn primary w-100" id="events" aria-current="page" href="#">Events</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="btn primary w-100" id="logOut" href="">Log-out</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <main class="col-md-9 m-5" id="eventContent">
                            
                        </main>
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">New Event</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="form" id="content">
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="newEvent" type="text" placeholder="Event" required>
                                        <label for="newEvent">Event name</label>
                                    </div>
                                    <div class="form-floating">
                                        <div class="mb-4" style="max-width: 600px;">
                                            <textarea class="form-control form-control-lg" rows="5" placeholder="Write the event description" id="eventDesc"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="eventCuote" type="number" placeholder="Capacity" required>
                                        <label for="eventCuote">Event capacity</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="eventDate" type="date" placeholder="Date" required>
                                        <label for="eventDate">Event date</label>
                                    </div>
                                </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary" id="saveNote">Save</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    setTimeout(() => {
                        const saveNew = document.getElementById('saveNote');
                        if (saveNew) {
                            saveNew.addEventListener('click', (e) => {
                                e.preventDefault();
                                saveEvent();
                            });
                        };
                    }, 0);
    }
    
    const name = document.getElementById("userName");
    const role = document.getElementById('userRole')
    name.innerHTML = user.name
    role.innerHTML = user.role
    const events = document.getElementById("events");
    const enroll = document.getElementById("enroll")
    eventsCont(user.role)

    if (events) {
    events.addEventListener('click', (e) => {
        e.preventDefault();
        eventsCont(user.role)}
    )}
    if (enroll) {
        enroll.addEventListener('click', (e) => {
            e.preventDefault();
            eventsEnroll(user.id)}
        )};
    document.getElementById('logOut').addEventListener('click', () =>{
    sessionStorage.removeItem('user');
    sessionStorage.setItem('Auth', 'false');
    window.location.href = '../../index.html';
    })
}


async function eventsCont(role) {
    const eventContent = document.getElementById('eventContent');
    try {
        let res = await fetch('http://localhost:3000/events');
        let events = await res.json();
        if (role == 'admin') {
            eventContent.innerHTML = `<table class="table">
                                        <button type="button" class="btn primary" id="add" data-bs-toggle="modal" data-bs-target="#staticBackdrop">ADD</button>
                                        <thead>
                                            <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">Capacidad</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tableBody">
                                        </tbody>
                                    </table>`;
            const tbody = document.getElementById('tableBody');
            if (tbody){
                events.forEach(event => {
                tbody.innerHTML += `<tr>
                                        <th scope="row">${event.name}</th>
                                        <td>${event.desc}</td>
                                        <td>${event.capacity}</td>
                                        <td>${event.date}</td>
                                        <td><button class="btn btn-warning edit" data-id="${event.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                                        <button class="btn btn-danger del" data-id="${event.id}">Delete</button></td>
                                    </tr>
                                    `
                })
                
                tbody.addEventListener('click', (e) => {
                if (e.target && e.target.classList.contains('edit')) {
                    const id = e.target.dataset.id;
                    editEvent(id);
                }
                if (e.target && e.target.classList.contains('del')) {
                    const id = e.target.dataset.id;
                    destroy(id);
                }
                });
            }
        }
        if (role == 'user') {
            eventContent.innerHTML = `<table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Capacidad</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                </tbody>
                            </table>`;
            const tbody = document.getElementById('tableBody');
            if (tbody){
                events.forEach(event => {
                tbody.innerHTML += `<tr>
                                        <th scope="row">${event.name}</th>
                                        <td>${event.desc}</td>
                                        <td>${event.capacity}</td>
                                        <td>${event.date}</td>
                                        <td><button class="btn btn-primary join" data-id="${event.id}">Join</button></td>
                                    </tr>
                                    `
                })
                tbody.addEventListener('click', (e) => {
                if (e.target && e.target.classList.contains('join')) {
                    const id = e.target.dataset.id;
                    const user = JSON.parse(sessionStorage.getItem('user'));
                    const userId = user.id;
                    
                    joinEvent(id, userId);
                }
            });
            }
        }
    }
    catch (error) {
        console.log('Error:', error)
    }
    
        
};

async function eventsEnroll(userId) {
    const eventContent = document.getElementById('eventContent');
    try {
        let res = await fetch('http://localhost:3000/events');
        let all = await res.json();
        const events = all.filter(event => event.register.includes(userId))
        
        eventContent.innerHTML = `<table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Capacidad</th>
                                    <th scope="col">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                </tbody>
                            </table>`;
        const tbody = document.getElementById('tableBody');
        events.forEach(event => {
        tbody.innerHTML += `<tr>
                                <th scope="row">${event.name}</th>
                                <td>${event.desc}</td>
                                <td>${event.capacity}</td>
                                <td>${event.date}</td>
                            </tr>`
        });
    }
    catch (error) {
            console.log('Error:', error)
        }
}


// Delete note    
function destroy(eventId) {
    const confirmDelete = confirm(`Are you sure you want to delete this event?`);
    if (!confirmDelete) return;
    try {
        fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
        })
        if (response.ok) {
            alert('Event successfully deleted');
            console.log('Event successfully deleted');
        } else {
            alert('Delete error');
            console.error('Delete error');
        }
    }
    catch (error) {
        (console.error('Web error:', error));
    };
};

async function saveEvent() {
    const title = document.getElementById('newEvent').value;
    const desc = document.getElementById('eventDesc').value;
    const cuote = document.getElementById('eventCuote').value;
    const date = document.getElementById('eventDate').value;

    if (!title || !desc || !cuote || !date) {
        return alert('You must fill in all fields')
    }
    const event = {
        name: title,
        desc: desc,
        capacity: cuote,
        date: date,
        register: []
    }
    try {
        const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
        });
        if (response.ok) {
            alert(`Event added succefully`);
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (error) {
      console.error("Error adding the event:", error);
      alert('There were a problem adding the event.');
    }
}
async function editEvent(eventId) {
    try {
        let res = await fetch(`http://localhost:3000/events/${eventId}`);
        let event = await res.json();
        document.getElementById('newEvent').value = event.name;
        document.getElementById('eventDesc').value = event.desc;
        document.getElementById('eventCuote').value = event.capacity;
        document.getElementById('eventDate').value = event.date;
        document.getElementById('staticBackdropLabel').textContent = "Edit Event";
        setTimeout(() => {
        const saveButton = document.getElementById('saveNote');
        if (saveButton) {
            const newButton = saveButton.cloneNode(true);
            saveButton.parentNode.replaceChild(newButton, saveButton);

            newButton.addEventListener('click', () => updateEvent(eventId, event.register));
        }
        },);
    } catch (error) {
        console.log('Error fetching event data for editing:', error);
    }
}

async function updateEvent(eventId, asist) {
    const title = document.getElementById('newEvent').value;
    const desc = document.getElementById('eventDesc').value;
    const cuote = document.getElementById('eventCuote').value;
    const date = document.getElementById('eventDate').value;
    if (!title || !desc || !cuote || !date) {
        return alert('You must fill in all fields');
    }
    const updatedEvent = {
        name: title,
        desc: desc,
        capacity: cuote,
        date: date,
        register: asist
    };
    try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEvent)
        });

        if (response.ok) {
            alert('Event updated successfully');
            eventsCont('admin');
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (error) {
        console.error('Error updating the event:', error);
        alert('There was a problem updating the event.');
    }
}

async function joinEvent(eventId, userId) {
    try {
        let res = await fetch(`http://localhost:3000/events/${eventId}`);
        let event = await res.json();
        if (event.register.includes(userId)) {
            return alert("You've already joined")
        }
        event.register.push(userId);
        const updateRes = await fetch(`http://localhost:3000/events/${eventId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ register: event.register })
        });
        if (updateRes.ok) {
            alert("You have successfully joined the event.");
        } else {
            alert("There was an error joining the event.");
        }

    } catch (error) {
        console.log('Error:', error);
        alert("Could not join the event.");
    }
}