import * as GS from "../styles/index.styled";
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
                <h1>Ta kontroll över din tid!</h1>
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
