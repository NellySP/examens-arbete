import React from "react";
import * as S from "./CreateGroup.styled";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
// import AddFriendToGroup from "../AddFriendToGroup/AddFriendToGroup";
// import ShowFriendsInGroup from "../ShowFriendsInGroup/ShowFriendsInGroup";
import ShowGroupContent from "./ShowGroupContent/ShowGroupContent";

const CreateGroups = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [message, setMessage] = useState();
  const [noGroupMessage, setNoGroupMessage] = useState();
  const [createdGroup, setCreatedGroup] = useState([]);

  useEffect(() => {
    fetchCreatorsGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setCreatedGroup("");
    insertCreatorInToGroup();
  }

  async function insertCreatorInToGroup() {
    const { data, error } = await supabase.rpc("fetch_last_group", {
      user_id_input: user.id,
    });
    const groupId = data.id;
    if (groupId) {
      const { data, error } = await supabase
        .from("group_relations")
        .insert({ group_id: groupId, user_id: user.id });
    }
  }

  async function fetchCreatorsGroups() {
    const { data, error } = await supabase
      .from("groups")
      .select()
      .eq("creator", user.id);

    const emptyArray = [];

    if (!data.length) {
      setNoGroupMessage("");
    }

    if (data) {
      for (let i = 0; i < data.length; i++) {
        emptyArray.push(data[i]);
        setCreatedGroup("");
      }
    }
    setCreatedGroup(emptyArray);
  }

  async function removeGroup(groupId) {
    const { data, error } = await supabase
      .from("groups")
      .delete()
      .eq("id", groupId);
    removeGroupRelations(groupId);
    fetchCreatorsGroups();
    setMessage("Grupp Borttagen!");
  }

  async function removeGroupRelations(groupId) {
    const { data, error } = await supabase
      .from("group_relations")
      .delete()
      .eq("group_id", groupId);
  }

  return (
    <S.createGroupWrapper>
      <h2>Grupper</h2>
      <p>
        H??r kan du skapa nya grupper f??r att se n??r flera av dina v??nner ??r
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
      <div>
        <h3>Dina grupper</h3>
        {message}
        {noGroupMessage}
        {createdGroup && (
          <div>
            {createdGroup.map((group) => (
              <div key={group.id}>
                <S.wrapperDiv>
                  <S.Container>
                    <h4>{group.name}</h4>
                    <button
                      onClick={() => {
                        removeGroup(group.id);
                      }}
                    >
                      Ta bort grupp
                    </button>
                  </S.Container>
                  <ShowGroupContent groupId={group.id}></ShowGroupContent>
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
