import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";

const SignUp = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Sign Up!</h1>
      </div>
    </div>
  );
};

export default SignUp;
