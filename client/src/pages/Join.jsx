import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ClipLoader from "react-spinners/ClipLoader";
import { GoogleLogin } from "react-google-login";

import {
  Container,
  JoinWrapper,
  JoinTitle,
  FormWrapper,
  Form,
  InputWrapper,
  Input,
  Label,
  Button,
  Devider,
  SignupWithGoogle,
  GoogleText,
  Image,
  PasswordWrapper,
  PasswordInput,
  AuthState,
  Error,
  RadioWrapper,
  Radio,
  AccountType,
} from "../styles/Join.styles";
import { signupValidation } from "../utilities/validations/join";
import { signup, signupWithGoogle } from "../actions/user";
import { login } from "../actions/auth";

const Join = () => {
  const initialField = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  };

  const [passwordVisibility, setPsswordVisibility] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState(initialField);
  const [errors, setErrors] = useState(initialField);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (user?.errors) {
      setErrors(user.errors);
    } else if (auth?.errors) {
      setErrors({ ...errors, email: auth?.errors?.email });
    }
  }, [user.errors, auth.errors]);

  const handleChange = (event) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value });
  };

  const handleBlur = () => {
    setErrors(initialField);
  };

  const handleFocus = () => {
    setErrors(initialField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, accountType } =
      signupValidation(signupData);

    if (isSignup) {
      if (name || email || password || confirmPassword || accountType) {
        setErrors({ name, email, password, confirmPassword, accountType });
      } else {
        await dispatch(signup(signupData));
        if (user.isSuccess) {
          navigate("/dashboard");
        }
      }
    } else {
      setErrors(errors);
      await dispatch(login(signupData));
      if (auth.isSuccess) {
        navigate("/dashboard");
      }
    }

    setSignupData({
      ...signupData,
      password: "",
      confirmPassword: "",
    });
  };

  const errorInlineStyle = errors
    ? (fieldName = { email: "" }) => ({
        outline: errors[fieldName] && "red 2px solid",
      })
    : () => {};

  const googleSuccess = (res) => {
    const { email, googleId, name, imageUrl } = res?.profileObj;

    if (email) {
      dispatch(signupWithGoogle({ email, googleId, name, imageUrl }, navigate));
    }
  };

  const googleFailure = () => {
    // alert("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <Container data-testid="join">
      <ClipLoader
        loading={user.isLoading || auth.isLoading}
        css={{ display: "block", margin: "0 auto", borderColor: "#0a66c2" }}
        size={150}
      />
      {!(user.isLoading || auth.isLoading) ? (
        <JoinWrapper>
          <JoinTitle>{!isSignup ? "Signin" : "Create an Account"}</JoinTitle>
          <FormWrapper>
            <Form onSubmit={handleSubmit}>
              {!isSignup || (
                <InputWrapper>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signupData?.name}
                    onChange={handleChange}
                    style={errorInlineStyle("name")}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                  />
                  {errors?.name && <Error>{errors?.name}</Error>}
                  {/* {user.errors?.name && <Error>{user.errors?.name}</Error>} */}
                </InputWrapper>
              )}

              <InputWrapper>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupData?.email}
                  onChange={handleChange}
                  style={errorInlineStyle("email")}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                {errors?.email && <Error>{errors?.email}</Error>}
                {/* {user.errors?.email && <Error>{user.errors?.email}</Error>} */}
              </InputWrapper>

              <InputWrapper>
                <Label>Password (8 or more characters)</Label>
                <PasswordWrapper style={errorInlineStyle("password")}>
                  <PasswordInput
                    type={passwordVisibility ? "text" : "password"}
                    name="password"
                    value={signupData?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onCopy={(event) => {
                      event.preventDefault();
                      return false;
                    }}
                    onPaste={(event) => {
                      event.preventDefault();
                      return false;
                    }}
                  />
                  {passwordVisibility ? (
                    <VisibilityOff
                      style={{ cursor: "pointer" }}
                      onClick={() => setPsswordVisibility((prev) => !prev)}
                    />
                  ) : (
                    <Visibility
                      style={{ cursor: "pointer" }}
                      onClick={() => setPsswordVisibility((prev) => !prev)}
                    />
                  )}
                </PasswordWrapper>
                {errors?.password && <Error>{errors?.password}</Error>}
                {/* {auth?.errors?.password && (
                  <Error>{auth?.errors?.password}</Error>
                )} */}
              </InputWrapper>

              {!isSignup || (
                <InputWrapper>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={signupData?.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onCopy={(event) => {
                      event.preventDefault();
                      return false;
                    }}
                    onPaste={(event) => {
                      event.preventDefault();
                      return false;
                    }}
                  />
                </InputWrapper>
              )}

              {!isSignup || (
                <>
                  <Label>Select your account category</Label>
                  <RadioWrapper>
                    <AccountType>Student</AccountType>
                    <Radio
                      type="radio"
                      name="accountType"
                      value="student"
                      onChange={handleChange}
                    />
                    <AccountType>Teacher</AccountType>
                    <Radio
                      type="radio"
                      name="accountType"
                      value="teacher"
                      onChange={handleChange}
                    />
                    <AccountType>Admin</AccountType>
                    <Radio
                      type="radio"
                      name="accountType"
                      value="admin"
                      onChange={handleChange}
                    />
                  </RadioWrapper>
                  {errors?.accountType && <Error>{errors?.accountType}</Error>}
                  {/* {user.errors?.accountType && (
                    <Error>{user.errors?.accountType}</Error>
                  )} */}
                </>
              )}

              <Button
                type="submit"
                disabled={(user.isLoading || auth.isLoading) && true}
              >
                {isSignup ? "Signup & Join" : "Signin"}
              </Button>
              <Devider />
            </Form>

            <GoogleLogin
              clientId="941476254173-b10p0mmrngfrkjie8e4h9d8dur7o3a9q.apps.googleusercontent.com"
              render={(renderProps) => (
                <SignupWithGoogle onClick={renderProps.onClick}>
                  <Image src="https://img.icons8.com/color/30/000000/google-logo.png" />
                  <GoogleText>Continue with Google</GoogleText>
                </SignupWithGoogle>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </FormWrapper>
          <AuthState
            onClick={() => {
              setIsSignup((prev) => !prev);
              setSignupData(initialField);
              setErrors(initialField);
            }}
          >
            {!isSignup
              ? "Don't have an account ? Signup"
              : "Already signup ? Signin"}
          </AuthState>
        </JoinWrapper>
      ) : null}
    </Container>
  );
};

export default Join;
