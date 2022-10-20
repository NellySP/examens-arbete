import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as S from "./index.styled";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          // theme="dark"
        />
      ) : (
        <Account session={session} />
      )}
    </div>
  );
};

export default Home;

// const Home = () => {
//   const [fetchError, setFetchError] = useState(null);
//   const [tests, setTest] = useState(null);

//   useEffect(() => {
//     const fetchTest = async () => {
//       const { data, error } = await supabase.from("profiles").select();

//       if (error) {
//         setFetchError("Something went wrong");
//         setTest(null);
//         console.log(error);
//       }

//       if (data) {
//         setTest(data);
//         setFetchError(null);
//       }
//     };
//     fetchTest();
//   }, []);
//   return (
//     <S.wrapperDiv>
//       <Link href="/signup">Sign up, step one</Link>
//       <Link href="/signupprofile">Sign up, step two</Link>
//       <Link href="/login">Startsida</Link>
//       {fetchError && <p>{fetchError}</p>}
//       {tests && (
//         <div>
//           {tests.map((test) => (
//             <p>{test.name}</p>
//           ))}
//         </div>
//       )}
//     </S.wrapperDiv>
//   );
// };

// export default Home;
