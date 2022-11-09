import { useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./UpdateProfile.styled";
import Image from "next/image";

export default function UpdateProfile({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [nameMessage, setNameMessage] = useState();
  const [usernameMessage, setUsernameMessage] = useState();
  const [imageMessage, setImageMessage] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [image, setImage] = useState();
  const [userImage, setUserImage] = useState();

  useEffect(() => {
    fetchUserData();
  }, [session]);

  // Fetch user data from profiles!
  async function fetchUserData() {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id);
    setName(data[0].name);
    setUserName(data[0].username);
    setUserImage(data[0].avatar_url);
  }

  // Delete user image from database

  async function deleteImage(event) {
    event.preventDefault();
    const { data, error } = await supabase.storage
      .from("avatars")
      .remove(userImage);

    setUserImage();
  }
  // Delete user image from database

  async function deleteImageWhenUploadingNew() {
    const { data, error } = await supabase.storage
      .from("avatars")
      .remove(userImage);
  }

  // update user image!
  async function updateImage(event) {
    event.preventDefault();
    const inavatar_url = event.target.image.value;
    let inavatarUrl = "";

    if (userImage) {
      deleteImageWhenUploadingNew();
    }

    if (image) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${Date.now()}_${image.name}`, image);

      if (error) {
        console.log(error);
      }

      if (data) {
        setAvatarUrl(data.path);
        inavatarUrl = data.path;
      }
    }

    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, avatar_url: inavatarUrl });
    setImageMessage("Bild uppladdad");
    fetchUserData();

    if (error) {
      console.log(error);
    }
  }
  // Updates the username!
  async function updateUsername(event) {
    event.preventDefault();
    const username = event.target.username.value;
    await supabase.from("profiles").upsert({ username: username, id: user.id });
    setUsernameMessage("Användarnamn uppdaterat!");
    fetchUserData();
  }

  // Updates the name!
  async function updateName(event) {
    event.preventDefault();
    const name = event.target.name.value;
    await supabase.from("profiles").upsert({ name: name, id: user.id });
    setNameMessage("Namn uppdaterat!");
    fetchUserData();
  }

  // Remove message after 5 seconds
  setTimeout(function () {
    if (usernameMessage != null) {
      setUsernameMessage(null);
    }
  }, 5000);

  setTimeout(function () {
    if (nameMessage != null) {
      setNameMessage(null);
    }
  }, 5000);

  setTimeout(function () {
    if (imageMessage != null) {
      setImageMessage(null);
    }
  }, 5000);

  // Preview Image
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  return (
    <S.signUpDiv>
      <button onClick={deleteImage}>_ta bort bild</button>

      <S.signUpSection>
        <h2>Uppdatera din profil</h2>
        <S.signUpText>
          Lägg till profilbild eller ändra användarnamn
        </S.signUpText>
        <S.signUpForm onSubmit={updateImage}>
          {selectedImage ? (
            <S.imagePreview>
              <Image src={selectedImage} width={200} height={200} />
            </S.imagePreview>
          ) : (
            <div>
              {" "}
              {userImage ? (
                <S.imagePreview>
                  <Image
                    src={`https://zsmobqgplqouebjzyqmy.supabase.co/storage/v1/object/public/avatars/${userImage}`}
                    width={200}
                    height={200}
                  />
                </S.imagePreview>
              ) : (
                <S.imagePreview>
                  <Image src="/profilepicture.png" width={200} height={200} />
                </S.imagePreview>
              )}
            </div>
          )}
          <S.signUpFileInput
            onChange={imageChange}
            type="file"
            id="image"
            className="file"
            name="image"
            accept="image/*"
          ></S.signUpFileInput>
          {imageMessage}
          <S.signUpFileLabel htmlFor="image">Välj bild</S.signUpFileLabel>
          <S.signUpButton type="submit">Ladda upp</S.signUpButton>
        </S.signUpForm>
        <S.signUpForm onSubmit={updateUsername}>
          <S.signUpLabel htmlFor="name">Användarnamn</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="username"
            name="username"
            placeholder={userName}
          ></S.signUpInput>
          {usernameMessage}
          <S.signUpButton type="submit">Skicka in</S.signUpButton>
        </S.signUpForm>
        <S.signUpForm onSubmit={updateName}>
          <S.signUpLabel htmlFor="name">Namn</S.signUpLabel>
          <S.signUpInput
            type="text"
            id="name"
            name="name"
            placeholder={name}
          ></S.signUpInput>
          {nameMessage}
          <S.signUpButton type="submit">Skicka in</S.signUpButton>
        </S.signUpForm>
      </S.signUpSection>
    </S.signUpDiv>
  );
}
