import React from "react";
import * as S from "./CreateGroup.styled";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";

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
  }
  async function fetchCreatorsGroups() {
    const { data, error } = await supabase
      .from("groups")
      .select()
      .eq("creator", user.id);

    console.log(data + "hej");
    const emptyArray = [];
    if (!data.length) {
      return false;
    }

    if (data) {
      emptyArray.push(data[0]);
    }
    setCreatedGroup(emptyArray);
  }

  return (
    <div>
      <S.createGroupForm onSubmit={createGroup}>
        <S.createGroupInput
          type="text"
          id="groupname"
          name="groupname"
        ></S.createGroupInput>
        <S.createGroupButton type="submit" inputWidth="100%">
          Skapa grupp
        </S.createGroupButton>
      </S.createGroupForm>
      {message}
      <div>
        {createdGroup && (
          <div>
            {createdGroup.map((group) => (
              <div key={group.id}>
                <p>{group.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGroups;
