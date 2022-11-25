import React, { useState } from 'react'

const Hero = () => {
    const initialData = {
        number: "",
        email: "",
        name: ""
    }
    const [formData, setFormData] = useState(initialData);
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(false);
    const [loader, setLoader] = useState(false);

    function handleChanges(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleForm(e) {
        e.preventDefault();
        let obj = validation(formData)


        setError(obj);
        if (Object.keys(obj).length === 0) {
            setLoader(true);
            setTimeout(() => {
                setLoader(false);
                setSubmit(true)
            }, 1500);
        }
    }

    function validation(data) {
        let res = {};

        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (data.number.trim() === "") {
            res.number = "Please enter a number"
        } else if (data.number.length !== 10) {
            res.number = "Number must be 10 latters"
        }

        if (data.email.trim() === "") {
            res.email = "Please enter a email"
        } else if (!emailReg.test(data.email)) {
            res.email = "Please enter Valid Email"
        }

        if (data.name.trim() === "") {
            res.name = "Please enter a name"
        }
        return res
    }

    return (
        <section>
            <div>
                <div className='hero-left-right'>
                    <div className='hero-left'>
                        <img src="./images/hero.png" alt="form" />
                    </div>
                    <div className='hero-right'>
                        <h1>Hi, let's get in touch</h1>
                        {
                            Object.keys(error).length === 0 && submit ? <h1 style={{ textDecoration: "underline" }}>Your Form is Submitted</h1> :

                                <form>
                                    <label>Phone No.</label>
                                    <input type="number" style={{ paddingLeft: "70px" }}
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChanges}
                                    />
                                    <p>{error.number}</p>
                                    <label>Select Country</label>
                                    <select>
                                        <option>India</option>
                                    </select>
                                    <span className='number-flag'><img src="./images/india.svg" alt="india" style={{ width: "25px", marginRight: "5px" }} /><i className="fa-solid fa-chevron-down"></i></span>
                                    <span className='select-flag'><img src="./images/india.svg" alt="india" style={{ width: "25px", marginRight: "5px" }} /></span>

                                    <label>Enter Name</label>
                                    <input type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChanges}
                                    />
                                    <p>{error.name}</p>
                                    <label>Email Address</label>
                                    <input type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChanges}
                                    />
                                    <p>{error.email}</p>
                                    <textarea placeholder="Message" />
                                    <button onClick={handleForm}>{loader ? <div className='loader'></div> : "Submit"}</button>
                                </form>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero