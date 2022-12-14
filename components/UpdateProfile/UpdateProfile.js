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
    setImage();

    if (data) {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, avatar_url: null });
      fetchUserData();
    }
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
    setImageMessage("Bild nya profilbild har laddats upp!");
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
    setUsernameMessage("Ditt anv??ndarnamn har uppdaterats!");
    fetchUserData();
  }

  // Updates the name!
  async function updateName(event) {
    event.preventDefault();
    const name = event.target.name.value;
    await supabase.from("profiles").upsert({ name: name, id: user.id });
    setNameMessage("Ditt namn har uppdaterats!");
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
    <S.updateProfileDiv>
      <h2>Uppdatera din profil</h2>
      <S.updateProfileText>
        H??r kan du ??ndra ditt namn, anv??ndarnamn och profilbild s?? att dina
        v??nner hittar dig l??ttare!
      </S.updateProfileText>
      <S.updateProfileSection>
        <S.Wrapper>
          <S.wrapperImageDiv>
            <h3>??ndra profilbild</h3>
            {imageMessage}
            <form onSubmit={updateImage}>
              {selectedImage ? (
                <S.imagePreview>
                  <Image
                    src={selectedImage}
                    width={200}
                    height={200}
                    alt="profilbild"
                  />
                </S.imagePreview>
              ) : (
                <div>
                  {userImage ? (
                    <S.imagePreview>
                      <Image
                        src={`https://zsmobqgplqouebjzyqmy.supabase.co/storage/v1/object/public/avatars/${userImage}`}
                        width={200}
                        height={200}
                        alt="profilbild"
                      />
                    </S.imagePreview>
                  ) : (
                    <S.imagePreview>
                      <Image
                        src="/profilepicture.png"
                        width={200}
                        height={200}
                        alt="profilbild"
                      />
                    </S.imagePreview>
                  )}
                </div>
              )}
              <S.updateProfileFileInput
                onChange={imageChange}
                type="file"
                id="image"
                className="file"
                name="image"
                accept="image/*"
              ></S.updateProfileFileInput>

              <S.updateProfileFileLabel htmlFor="image">
                V??lj ny bild
              </S.updateProfileFileLabel>
              {selectedImage ? (
                <S.updateProfileButton type="submit" inputWidth="100%">
                  Ladda upp
                </S.updateProfileButton>
              ) : (
                <div></div>
              )}
              {userImage ? (
                <S.updateProfileButton
                  onClick={deleteImage}
                  inputColor="#94716d"
                  inputWidth="100%"
                >
                  Ta bort bild
                </S.updateProfileButton>
              ) : (
                <div></div>
              )}
            </form>
          </S.wrapperImageDiv>
        </S.Wrapper>
        <S.Wrapper>
          <S.wrapperDiv>
            <S.updateProfileForm onSubmit={updateUsername}>
              <S.updateProfileLabel htmlFor="name">
                <h3>??ndra anv??ndarnamn</h3>
              </S.updateProfileLabel>
              <S.updateProfileInput
                type="text"
                id="username"
                name="username"
                placeholder={userName}
              ></S.updateProfileInput>
              {usernameMessage}
              <S.updateProfileButton type="submit">
                Skicka in
              </S.updateProfileButton>
            </S.updateProfileForm>
          </S.wrapperDiv>
          <S.wrapperDiv>
            <S.updateProfileForm onSubmit={updateName}>
              <S.updateProfileLabel htmlFor="name">
                <h3>??ndra namn</h3>
              </S.updateProfileLabel>
              <S.updateProfileInput
                type="text"
                id="name"
                name="name"
                placeholder={name}
              ></S.updateProfileInput>
              {nameMessage}
              <S.updateProfileButton type="submit">
                Skicka in
              </S.updateProfileButton>
            </S.updateProfileForm>
          </S.wrapperDiv>
        </S.Wrapper>
      </S.updateProfileSection>
    </S.updateProfileDiv>
  );
}
