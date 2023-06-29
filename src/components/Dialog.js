<section className="vh-100" style={{backgroundColor:'#FAF9F6'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius:"1rem"}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={companyimage}
                      alt="login form" className="img-fluid" style={{borderRadius:"1rem 0 0 1rem",height:"100%"}} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                        <div className="d-flex align-items-center mb-3 pb-1">
                          
                          <img src={companyimage} alt={'logo'} style={{width:"50px",height:"50px"}}/>
                          <span className="h1 fw-bold mb-0">Marula Life Style</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Sign into your account</h5>

                        <form onSubmit={(e)=>handleSubmit(e,emailfield,passwordfield)}>
                            <div className="form-outline mb-4">
                              <input 
                              onChange={(e)=>{setEmail(e.target.value)}}
                              type="email"
                              required
                              name="editemail"
                              id="formemail" className="form-control form-control-lg" />
                              <label className="form-label" htmlFor="formemail">Email address</label>
                            </div>
                            
                            <div className="form-outline mb-4">
                              <input
                              onChange={(e)=>{setpassword(e.target.value)}}
                              type="password"
                              required
                              name="editpass"
                              id="formpassword" className="form-control form-control-lg" />
                              <label className="form-label" htmlFor="formpassword">Password</label>
                            </div>
                            
                            <div className="pt-1 mb-4">
                              <button type="submit" className="btn btn-lg btn-block"
                              style={{backgroundColor:'#306832',color:"white"}}>Login</button>
                            </div>

                        </form>
                       
                        

                        <Link className="small text-muted" to={'/Forgotpassword'}>Forgot password?</Link>
                        <p className="mb-5 pb-lg-2" style={{color:"#393f81"}}>Don't have an account? <Link to={'/SignUp'}
                            style={{color:"#393f81"}}>Register here</Link></p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>