import React from 'react'
import '../StyleSheets/Login.css';
export default function Login() {
    return (
        <>
            <div className='front container' ref={frontRef}>
                            <form>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="First name" />
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="Last name" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1" className="label">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1" className="label">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                            </form>
                            <button className="fill btn" onClick={() => { cardFlip(backRef,frontRef) }}>SIGN UP</button>
                        </div>
        </>
    )
}
