const SignIn = () => {
  return (
    <div>
      <div>
        <h1>Login</h1>
        <p> Access your Account</p>
      </div>
      <div>
        <div className="mb-3">
          <input type="email" className="form-control form-control-lg" placeholder="Email" />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control form-control-lg" placeholder="Password" />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
