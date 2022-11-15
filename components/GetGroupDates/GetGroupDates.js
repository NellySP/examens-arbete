import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./GetGroupDates.styled";
import Image from "next/image";
import GroupDates from "../GroupDates/GroupDates";

const GetGroupDates = ({ session, groupId }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [groupNames, setGroupNames] = useState([]);
  const [friendsInGroup, setFriendsInGroup] = useState([]);
  const [message, setMessage] = useState();
  const [membersCount, setMembersCount] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [usersDates, setUsersDates] = useState([]);
  const [commonDates, setCommonDates] = useState([]);

  useEffect(() => {
    getGroupNames();
    getUserDates();
  }, [session]);

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
    getMutualGroupDates();
  }
  async function getUserDates() {
    const { data, error } = await supabase
      .from("available_dates")
      .select("date")
      .eq("user_id", user.id);

    for (let i = 0; i < data.length; i++) {
      const date = JSON.stringify(data[i].date);
      emptyArray.push(date);
    }
  }

  //Get mutual dates from group
  const emptyArray = [];
  async function getMutualGroupDates() {
    if (friendsInGroup) {
      for (let i = 0; i < friendsInGroup.length; i++) {
        const { data, error } = await supabase
          .from("available_dates")
          .select("date")
          .eq("user_id", friendsInGroup[0].id);

        for (let i = 0; i < data.length; i++) {
          const date = JSON.stringify(data[i].date);
          emptyArray.push(date);
        }
      }
    }
    setAllDates(emptyArray);
  }

  const allInGroup = friendsInGroup.length + 1;

  // Testing
  if (allDates) {
    const emptyArray = [];
    for (let i = 0; i < allDates.length; i++) {
      let count = 0;

      allDates.forEach((date) => {
        if (date === allDates[i]) {
          count += 1;
          if (count == allInGroup) {
            emptyArray.push(date);
            setCommonDates(emptyArray);
          }
        }
      });
    }
  }

  console.log(commonDates + "bajskorv");
  return (
    <div>
      {message}
      <p>{groupNames}</p>
      <p>Lediga datum </p>
      {/* <p>{commonDates}</p> */}
      <p>Se medlemmar i grupp</p>
      <button>+</button>
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
                <Image src="/profilepicture.png" width={50} height={50}></Image>
              )}
              <p> {friend.username} </p>
              <p>{friend.name}</p>
            </div>
          ))}
        </>
      )}
      {/* <div>
        {friendsInGroup.map((friend) => (
          <div key={friend.id}>
            <GroupDates friendId={friend.id}></GroupDates>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default GetGroupDates;
