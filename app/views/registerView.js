export function registerView() {
    const main = document.getElementById("main");
    main.innerHTML = `<div class="container d-flex justify-content-center align-items-center py-5 ">
                    <div class="col-md-4">
                        <div class="card p-4">
                            <h2 class="fw-bold mb-4">Create your account</h2>
                            <form>
                                <div class="mb-3">
                                <label for="name" class="form-label">Full Name</label>
                                <input type="text" id="name" class="form-control form-control-lg" placeholder="Enter your full name" required>
                                </div>
                                <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" id="email" class="form-control form-control-lg" placeholder="Enter your email" required>
                                </div>
                                <div class="mb-4">
                                <label for="pword" class="form-label">Password</label>
                                <input type="password" id="pword" class="form-control form-control-lg" placeholder="Create a password" required>
                                </div>
                                <div class="mb-4">
                                <label for="pword" class="form-label">Password</label>
                                <input type="password" id="pword1" class="form-control form-control-lg" placeholder="Repeat the password" required>
                                </div>
                                <div class="d-grid mb-3">
                                <button type="button" class="btn primary btn-lg fw-bold" id="register">Register</button>
                                </div>
                                <div class="text-center">
                                <small class="text-muted">Already have an account? <a href="#/login" class="text-decoration-none">Sign in</a></small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;

    // Handle form submission
    document.getElementById('register').addEventListener('click', async function (event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const pword = document.getElementById('pword').value;
        const pword1 = document.getElementById('pword1').value;

        const res = await checkRegister(email, pword, pword1);

        if (res.error) {
            alert(res.error);
        } else {
            alert(res.success);

            const name = document.getElementById('name').value;
            registUser(name, email, pword);
            window.location.hash = '#/login'
        }
    });

}

// Check if the email or username exists
async function checkRegister(email, pword, pword1) {
    try {
        const emailResponse = await fetch(`http://localhost:3000/users?email=${email}`);
        const emailExists = await emailResponse.json();

        if (emailExists.length > 0) {
            return { error: 'The email is already registered.' };
        }

        if (pword !== pword1) {
            return { error: 'The password is not the same' };
        }

        return { success: 'Successful Register' };

    } catch (error) {
        console.log('An error occurred during verification:', error);
        return { error: 'There was a problem verifying the data.' };
    }
}


// Save user information in db.json
async function registUser(name, email, password) {
    const newUser = {
            name: name,
            email: email,
            role: 'user',
            password: password
        }

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });

    const data = await response.json();
    console.log('User registered:', data);
}