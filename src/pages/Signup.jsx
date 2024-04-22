import { LuLayoutDashboard as DashboardIcon } from "react-icons/lu";
import { IoEyeSharp as ShowPassword } from "react-icons/io5";
import { FaEyeSlash as HidePassword } from "react-icons/fa6";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

function Signup() {
  const [user, setUser] = useState({
    id: uuid(),
    name: "",
    email: "",
    password: "",
  });
  const [cpassword, setCPassword] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("password");

  const formController = (event) => {
    const isNameValid = user.name.length >= 3;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(user.password);
    const arePasswordsMatched = user.password === cpassword;
    if(!isNameValid || !isEmailValid || !isPasswordValid || !arePasswordsMatched){
      alert("Devi compilare bene tutto");
      return;
    } else {
      handleSubmit(event);
    }
  };

  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const changePasswordInputType = () => {
    setPasswordInputType((prevType) => (prevType === "text" ? "password" : "text"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === user.email) {
      alert("Un utente con lo stesso email è già registrato. Si prega di utilizzare un altro email.");
      return; // Esce dalla funzione handleSubmit senza salvare i dati
    }
    // Salvataggio dei dati nel localStorage
    localStorage.setItem("user", JSON.stringify(user));
    // Reindirizzamento alla pagina di login
    window.location.href = "/login";
  };

  return (
    <div>
      <Header title="Signup" icon={<DashboardIcon />} to="/" />
      <Card>
        <h1 className="text-2xl">Sign up</h1>
        <hr className="h-1 w-32 bg-dark-green" />
        <form className="w-full" onSubmit={formController}>
          <div className="w-full">
            <Input
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="w-full">
            <Input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div className="w-full flex relative">
            <Input
              type={passwordInputType}
              placeholder="Password"
              value={user.password}
              name="password"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <span className="absolute right-3 top-3.5 cursor-pointer" onClick={changePasswordInputType}>
              {passwordInputType === "text" ? <HidePassword /> : <ShowPassword />}
            </span>
          </div>
          <div className="w-full flex relative">
            <Input
              type={passwordInputType}
              placeholder="Confirm Password"
              value={cpassword}
              name="cpassword"
              onChange={(e) => setCPassword(e.target.value)}
            />
            <span className="absolute right-3 top-3.5 cursor-pointer" onClick={changePasswordInputType}>
              {passwordInputType === "text" ? <HidePassword /> : <ShowPassword />}
            </span>
          </div>
          <div className="w-full">
            <Button title="Sign up" type="submit" disabled={user.name.length === 0 || user.email.length === 0 || user.password.length === 0 || cpassword.length === 0} />
          </div>
        </form>
        <div>
          <h2>La password deve avere almeno:</h2>
          <span>8 caratteri</span>
          <hr className={`h-1 w-32 ${user.password.length >= 8 ? "bg-dark-green" : "bg-red-500"}`} />
          <span>Una lettera maiuscola</span>
          <hr className={`h-1 w-32 ${/^(?=.*[A-Z])/.test(user.password) ? "bg-dark-green" : "bg-red-500"}`} />
          <span>Una lettera muniscola</span>
          <hr className={`h-1 w-32 ${/^(?=.*[a-z])/.test(user.password) ? "bg-dark-green" : "bg-red-500"}`} />
          <span>Un numero</span>
          <hr className={`h-1 w-32 ${/^(?=.*[0-9])/.test(user.password) ? "bg-dark-green" : "bg-red-500"}`} />
        </div>
      </Card>
    </div>
  );
}

export default Signup;
