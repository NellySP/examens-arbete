import React from "react";
import * as S from "./CreateGroup.styled";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import AddFriendToGroup from "../AddFriendToGroup/AddFriendToGroup";
import ShowFriendsInGroup from "../ShowFriendsInGroup/ShowFriendsInGroup";

const CreateGroups = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [message, setMessage] = useState();
  const [createdGroup, setCreatedGroup] = useState([]);

  useEffect(() => {
    fetchCreatorsGroups();
  }, [session]);

  // Remove message after 5 seconds
  setTimeout(function () {
    if (message != null) {
      setMessage(null);
    }
  }, 5000);

  async function createGroup(event) {
    event.preventDefault();
    const groupname = event.target.groupname.value;
    const { data, error } = await supabase
      .from("groups")
      .insert({ creator: user.id, name: groupname });
    setMessage("Grupp skapad");
    fetchCreatorsGroups();
  }
  async function fetchCreatorsGroups() {
    const { data, error } = await supabase
      .from("groups")
      .select()
      .eq("creator", user.id);

    const emptyArray = [];
    if (!data.length) {
      return false;
    }

    if (data) {
      for (let i = 0; i < data.length; i++) {
        emptyArray.push(data[i]);
      }
    }
    setCreatedGroup(emptyArray);
  }

  return (
    <S.createGroupWrapper>
      <h2>Grupper</h2>
      <p>
        Här kan du skapa nya grupper för att se när flera av dina vänner är
        lediga samtidigt.
      </p>
      <S.createGroupForm onSubmit={createGroup}>
        <S.wrapperDiv>
          <h3>Skapa ny grupp</h3>
          <h4>Namnge gruppen</h4>
          <S.createGroupInput
            type="text"
            id="groupname"
            name="groupname"
          ></S.createGroupInput>
          <S.createGroupButton type="submit" inputWidth="100%">
            Skapa grupp
          </S.createGroupButton>
        </S.wrapperDiv>
      </S.createGroupForm>
      {message}
      <div>
        <h3>Dina grupper</h3>
        {createdGroup && (
          <div>
            {createdGroup.map((group) => (
              <div key={group.id}>
                <S.wrapperDiv>
                  <h4>{group.name}</h4>
                  <ShowFriendsInGroup
                    groupId={group.id}
                    groupName={group.name}
                  />
                  <AddFriendToGroup groupId={group.id} groupName={group.name} />
                </S.wrapperDiv>
              </div>
            ))}
          </div>
        )}
      </div>
    </S.createGroupWrapper>
  );
};

export default CreateGroups;
