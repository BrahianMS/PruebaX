export function landingView() {
    const main = document.getElementById("main");
    main.innerHTML = `<div class="container d-flex justify-content-center align-items-center pt-5">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Welcome to my event page</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Where the dreams come true</h6>
                                        <p class="card-text">Here you'll know about new events and can join us</p>
                                        <a href="#/login" class="btn primary fw-bold">Log-in</a>
                                        <a href="#/register" class="btn secondary fw-bold">Register</a>
                                    </div>
                                </div>
                            </div>
                        </div>`

}