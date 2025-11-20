export default function Register() {
  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Create Account</h2>

      <div className="card p-4 shadow-sm">
        <input className="form-control mb-3" placeholder="Full Name" />
        <input className="form-control mb-3" placeholder="Email" />
        <input className="form-control mb-3" placeholder="Password" type="password" />
        <button className="btn btn-success w-100">Register</button>
      </div>
    </div>
  );
}
