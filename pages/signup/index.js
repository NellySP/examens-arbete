import { supabase } from "../../utils/supabaseClient";

const SignUp = () => {
  async function testSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value;
    const name = event.target.name.value;
    const password = event.target.password.value;

    const { data, error } = await supabase.from("users_nelly").insert({
      username: username,
      name: name,
      password: password,
      email: email,
    });
  }

  return (
    <div>
      <div>
        <h1>Sign Up!</h1>
        <form onSubmit={testSignUp}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Write your email here please"
          ></input>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Come up with an awesome username and write it here"
          ></input>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Write your name here"
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Dont put 123 here"
          ></input>
          <button type="submit">SIGN UP HERE</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
