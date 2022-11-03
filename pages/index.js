import * as GS from "./index.styled";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account/Account";
import Menu from "../components/Menu/Menu";
import Image from "next/image";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      {!session ? (
        <GS.LoginWrapper>
          <GS.loginContainer>
            <GS.header>
              <Image src="/testingTwo.jpg" height={500} width={1000}></Image>
            </GS.header>
            <GS.contentWrapper>
              <GS.infoDiv>
                <GS.imgDiv>
                  <Image src="/Union.png" width={100} height={100}></Image>
                </GS.imgDiv>
                <h1>Placeholder</h1>
                <p>
                  Svårt att hitta lediga dagar där alla i kompisgänget kan
                  träffas? Lugn, vi löser det åt dig!
                </p>
                <br></br>
                <p>Logga in eller bli medlem för att komma igång direkt!</p>
              </GS.infoDiv>
              <GS.LoginDiv>
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  // theme="dark"
                />
              </GS.LoginDiv>
            </GS.contentWrapper>
          </GS.loginContainer>
        </GS.LoginWrapper>
      ) : (
        <GS.Wrapper>
          <Menu session={session} />
          <GS.Div>
            <Account session={session} />
          </GS.Div>
        </GS.Wrapper>
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
