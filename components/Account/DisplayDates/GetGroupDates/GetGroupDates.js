import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./GetGroupDates.styled";
import Image from "next/image";

const GetGroupDates = ({ session, groupId }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [groupNames, setGroupNames] = useState([]);
  const [friendsInGroup, setFriendsInGroup] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [allDates, setAllDates] = useState([]);

  useEffect(() => {
    getGroupNames();
  }, [session]);

  async function getGroupNames() {
    const { data, error } = await supabase
      .from("groups")
      .select()
      .eq("id", groupId);
    setGroupNames(data[0].name);
    getFriendsInGroup();
  }

  async function getFriendsInGroup() {
    const { data, error } = await supabase
      .from("group_relations")
      .select("user_id")
      .eq("group_id", groupId);

    if (!data) {
      return false;
    }

    const currentFriends = [];

    for (let i = 0; i < data.length; i++) {
      const friend = data[i].user_id;
      if (friend != user.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", friend);
        currentFriends.push(data[0]);
      }
    }
    setFriendsInGroup(currentFriends);
    const allInGroup = currentFriends.length + 1;
    console.log(allInGroup);
    if (allInGroup > 1) {
      const { data, error } = await supabase.rpc("get_dates_from_group", {
        group_id_input: groupId,
        group_members_input: allInGroup,
      });

      const emptyArray = [];
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          const date = data[i].date;
          emptyArray.push(date);
        }

        setAllDates(emptyArray);
      }
      if (!data.length) {
        setAllDates(null);
      }
    }
    if (allInGroup == 1) {
      setAllDates(false);
    }
  }

  // Function to open a closed div.
  function setToTrue() {
    if (openAddUser == false) {
      setOpenAddUser(true);
    }
    if (openAddUser) {
      setOpenAddUser(false);
    }
  }

  return (
    <>
      {allDates && (
        <S.Wrapper>
          <h4>{groupNames}</h4>
          <S.dateContainer>
            {allDates.map((date) => (
              <S.dateWrapper key={date}>
                <p> {date} </p>
              </S.dateWrapper>
            ))}
          </S.dateContainer>
          <S.showFriendsInGroup onClick={setToTrue}>
            Se medlemmar i gruppen
          </S.showFriendsInGroup>
          {openAddUser && (
            <>
              {friendsInGroup && (
                <>
                  {friendsInGroup.map((friend) => (
                    <S.friendWrapper key={friend.id}>
                      {friend.avatar_url ? (
                        <S.imageWrapper>
                          <Image
                            src={`https://zsmobqgplqouebjzyqmy.supabase.co/storage/v1/object/public/avatars/${friend.avatar_url}`}
                            width={50}
                            height={50}
                            alt="profilbild"
                          ></Image>
                        </S.imageWrapper>
                      ) : (
                        <S.imageWrapper>
                          <Image
                            src="/profilepicture.png"
                            width={50}
                            height={50}
                            alt="profilbild"
                          ></Image>
                        </S.imageWrapper>
                      )}
                      <S.textWrapper>
                        <h4> {friend.username} </h4>
                        <p>{friend.name}</p>
                      </S.textWrapper>
                    </S.friendWrapper>
                  ))}
                </>
              )}
            </>
          )}
        </S.Wrapper>
      )}
    </>
  );
};

export default GetGroupDates;
