import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./GetGroupDates.styled";
import Image from "next/image";
import CommonGroupDates from "../CommonGroupDates/CommonGroupDates";

const GetGroupDates = ({ session, groupId }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [groupNames, setGroupNames] = useState([]);
  const [friendsInGroup, setFriendsInGroup] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);

  useEffect(
    () => {
      getGroupNames();
    },
    [session],
    allDates
  );

  // fetch groupnames here
  async function getGroupNames() {
    const { data, error } = await supabase
      .from("groups")
      .select()
      .eq("id", groupId);
    setGroupNames(data[0].name);
    getFriendsInGroup();
  }

  // Get members of group
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
    // getMutualGroupDates();
  }

  // Get mutual group dates
  const allInGroup = friendsInGroup.length + 1;

  // const getMutualGroupDates = async () => {
  //   const { data, error } = await supabase.rpc("get_dates_from_group", {
  //     group_id_input: groupId,
  //     group_members_input: allInGroup,
  //   });
  //   console.log(allInGroup);
  //   const emptyArray = [];
  //   if (data.length) {
  //     for (let i = 0; i < data.length; i++) {
  //       const date = data[i].date;
  //       console.log(date);
  //       emptyArray.push(date);
  //     }
  //     setAllDates(emptyArray);
  //   }
  //   if (!data.length) {
  //     setAllDates(null);
  //   }
  // };
  // console.log(allDates);

  function setToTrue() {
    if (openAddUser == false) {
      setOpenAddUser(true);
    }
    if (openAddUser) {
      setOpenAddUser(false);
    }
  }

  return (
    <div>
      <h3>{groupNames}</h3>
      <p>Lediga datum </p>
      <CommonGroupDates />
      {allDates && (
        <>
          {allDates.map((date) => (
            <div key={date}>
              <p> {date} </p>
            </div>
          ))}
        </>
      )}
      <button onClick={setToTrue}>Se medlemmar i gruppen</button>
      {openAddUser && (
        <>
          {friendsInGroup && (
            <>
              {friendsInGroup.map((friend) => (
                <div key={friend.id}>
                  {friend.avatar_url ? (
                    <Image
                      src={`https://zsmobqgplqouebjzyqmy.supabase.co/storage/v1/object/public/avatars/${friend.avatar_url}`}
                      width={50}
                      height={50}
                    ></Image>
                  ) : (
                    <Image
                      src="/profilepicture.png"
                      width={50}
                      height={50}
                    ></Image>
                  )}
                  <p> {friend.username} </p>
                  <p>{friend.name}</p>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GetGroupDates;
