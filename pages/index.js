import * as S from "./index.styled";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account/Account";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <S.wrapperDiv>
      {!session ? (
        <S.Div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            // theme="dark"
          />
        </S.Div>
      ) : (
        <Account session={session} />
      )}
    </S.wrapperDiv>
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
