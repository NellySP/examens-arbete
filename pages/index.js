import * as GS from "./index.styled";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account/Account";
import Menu from "../components/Menu/Menu";
import Image from "next/image";
import Head from "next/head";
import HamburgerMenu from "../components/HamburgerMenu/HamburgerMenu";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div>
      <Head>
        <title>Datum-hittare</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        <GS.LoginWrapper>
          <GS.loginContainer>
            <GS.header>
              <GS.infoDiv>
                <GS.imgDiv>
                  <Image
                    src="/Union4.png"
                    width={110}
                    height={100}
                    alt="backgroundimage"
                  ></Image>
                </GS.imgDiv>
                <h1>Här står det något käckt!</h1>
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
            </GS.header>
          </GS.loginContainer>
        </GS.LoginWrapper>
      ) : (
        <GS.Wrapper>
          <Menu session={session} />
          <HamburgerMenu session={session} open={open} setOpen={setOpen} />
          <GS.Div>
            <BurgerMenu open={open} setOpen={setOpen} />
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
