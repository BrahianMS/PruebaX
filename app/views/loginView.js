export function loginView() {
    const main = document.getElementById("main");
    main.innerHTML = `<div class="container d-flex justify-content-center align-items-center pt-5">
            <div class="card col-md-4">
            <h2 class="text-center fw-bold mb-4">Welcome</h2>
                <div class="card-body">
                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="pword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="pword">
                        </div>
                        <button type="submit" class="btn primary w-100" id="saveLog">Log in</button>
                    </form>
                </div>
            </div>
        </div>`;

        // Handle login form submission
        document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('pword').value;

        const resultado = await logIn(email, password);

        if (resultado.error) {
            alert(resultado.error);
        } else {
            alert(resultado.success);
            let user = resultado.user;
            let inf = { 'id': user.id, 'name': user.name, 'email': user.email, 'role': user.role};
            sessionStorage.setItem('user', JSON.stringify(inf));
            sessionStorage.setItem('Auth', 'true');
            window.location.href = '../#/dashboard';
        }
    });
        

}

// Check login with email or username
async function logIn(email, password) {
    try {
        const response = await fetch(`http://localhost:3000/users?email=${email}`);
        let user = await response.json();

        if (user.length === 0) {
            return { error: 'The email or username does not exist' };
        }

        if (user[0].password !== password) {
            return { error: 'Incorrect password' };
        }

        return { success: 'Successful login', user: user[0] };

    } catch (error) {
        console.log('Login failed:', error);
        return { error: 'There was a problem trying to log in.' };
    }
}

