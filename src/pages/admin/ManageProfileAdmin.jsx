export default function ManageProfileAdmin() {
  return (
    <>
      {/* <Header />
      <Navigation /> */}
      <h1>My Profile</h1>
      <div>Username</div>
      <input type="text" className="form-control" />
      <div>Password</div>
      <input type="text" className="form-control" />
      <div>Confirm Password</div>
      <input type="text" className="form-control" />
      <button className="btn btn-sm btn-primary">Save</button>
      <button className="btn btn-sm btn-danger">Reset</button>
    </>
  );
}
