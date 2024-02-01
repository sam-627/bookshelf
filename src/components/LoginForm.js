import React, { useState } from 'react'

const LoginForm = ({ submitHandler, buttonText }) => {
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    })

    const changeHandler = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='login-form column'>
            <div class="input-group mb-3">
                <input
                    type="text" class="form-control" placeholder="Username" aria-label="Username"
                    name='username'
                    value={formState.username}
                    onChange={changeHandler}
                />
            </div>
            <div class="input-group mb-3">
                <input
                    type="password" class="form-control" placeholder="Password" aria-label="Password"
                    name='password'
                    value={formState.password}
                    onChange={changeHandler}
                />
            </div>
            <div class="col-12">
                <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={() => submitHandler(formState)}
                >{buttonText}</button>
            </div>
        </div>
    )
}

export default LoginForm