import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ProfileContainer,
  FormWrapper,
  Form,
  InputWrapper,
  Label,
  Input,
  Button,
  Error,
  ProfileTitle,
} from "../styles/Profile.styles";
import { profileValidation } from "../utilities/validations/profile";
import { updateProfile } from "../actions/user";

const INITIAL_PROFILE_INFO = {
  phone: "",
  presentAddress: "",
  permanentAddress: "",
  city: "",
  country: "",
  avatar: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(INITIAL_PROFILE_INFO);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const localStorageData = JSON.parse(localStorage.getItem("profile"));
  const { isSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      window.location.reload(false);
    }
  }, [isSuccess]);

  const handleProfile = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatar = (e) => {
    setProfile({ ...profile, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { phone } = profileValidation(profile.phone);

    if (phone) {
      setPhoneNumberError(phone);
    } else {
      const formData = new FormData();
      formData.append("phone", profile.phone);
      formData.append("presentAddress", profile.presentAddress);
      formData.append("permanentAddress", profile.permanentAddress);
      formData.append("city", profile.city);
      formData.append("country", profile.country);
      formData.append("avatar", profile.avatar);

      await dispatch(updateProfile(formData, localStorageData?.user?.id));
      if (isSuccess) {
        window.location.reload(false);
      }
    }
  };

  return (
    <ProfileContainer>
      <FormWrapper>
        <ProfileTitle>Profile Information</ProfileTitle>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <InputWrapper>
            <Label>Phone</Label>
            <Input
              type="text"
              name="phone"
              onChange={handleProfile}
              value={profile.phone}
            />
            {phoneNumberError && <Error>{phoneNumberError}</Error>}
          </InputWrapper>

          <InputWrapper>
            <Label>Present Address</Label>
            <Input
              type="text"
              name="presentAddress"
              onChange={handleProfile}
              value={profile.presentAddress}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>Permanent Address</Label>
            <Input
              type="text"
              name="permanentAddress"
              onChange={handleProfile}
              value={profile.permanentAddress}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              onChange={handleProfile}
              value={profile.city}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              onChange={handleProfile}
              value={profile.country}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>Profile Picture</Label>
            <Input
              type="file"
              name="avatar"
              accept=".png, .jpg, .jpeg"
              style={{ cursor: "pointer" }}
              onChange={handleAvatar}
            />
          </InputWrapper>

          <Button type="submit">Update Profile</Button>
        </Form>
      </FormWrapper>
    </ProfileContainer>
  );
};

export default Profile;
