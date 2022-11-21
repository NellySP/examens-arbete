import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./GetGroupDates.styled";
import Image from "next/image";
// import CommonGroupDates from "./CommonGroupDates/CommonGroupDates";

const GetGroupDates = ({ session, groupId }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [groupNames, setGroupNames] = useState([]);
  const [friendsInGroup, setFriendsInGroup] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [allDates, setAllDates] = useState([]);
  const [allInGroup, setAllInGroup] = useState();

  useEffect(() => {
    getGroupNames();
    // getMutualGroupDates();
  }, [session]);

  async function getGroupNames() {
    const { data, error } = await supabase
      .from("groups")
      .select()
      .eq("id", groupId);
    setGroupNames(data[0].name);
    getFriendsInGroup();
    // getMutualGroupDates();
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
    console.log(currentFriends);
    setAllInGroup(currentFriends.length + 1);
    getMutualGroupDates();
  }
  // Counting all your groupmembers, since were in a group of friends you have to + 1 to add yourself to the count.
  // console.log(allInGroup);
  // console.log(groupId);

  // Function to open a closed div.
  function setToTrue() {
    if (openAddUser == false) {
      setOpenAddUser(true);
    }
    if (openAddUser) {
      setOpenAddUser(false);
    }
  }

  async function getMutualGroupDates() {
    const { data, error } = await supabase.rpc("get_dates_from_group", {
      group_id_input: groupId,
      group_members_input: "3",
    });
    console.log(groupId);
    console.log(allInGroup);
    console.log("jag körs");

    const emptyArray = [];
    if (data.length) {
      console.log("1");
      for (let i = 0; i < data.length; i++) {
        console.log("2");
        const date = data[i].date;
        console.log("3");
        emptyArray.push(date);
      }

      setAllDates(emptyArray);
      console.log("4");
    }
    if (!data.length) {
      setAllDates(null);
    }
  }

  return (
    <S.Wrapper>
      <h4>{groupNames}</h4>
      {/* <CommonGroupDates allInGroup={allInGroup} groupId={groupId} /> */}
      <S.Wrapper>
        {allDates && (
          <>
            {allDates.map((date) => (
              <div key={date}>
                <p> {date} </p>
              </div>
            ))}
          </>
        )}
      </S.Wrapper>
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
  );
};

export default GetGroupDates;
