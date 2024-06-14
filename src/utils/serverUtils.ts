export const parseError = (error: any) => {
  try {
    if (typeof error === "string") {
      return error;
    }
    if (error.response && error.response.status >= 500) {
      return "System error!";
    }
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error;
    }
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    if (error.response && error.response.data && error.response.data.errors) {
      if (error.response.data.errors.length > 0) {
        return error.response.data.errors[0].message;
      }
    }
    if (
      error.response &&
      error.response.data &&
      error.response.data.responseMessage
    ) {
      return error.response.data.responseMessage;
    }
    if (error.message) {
      return error.message;
    }
  } catch (err) {
    return "Sorry, service failed to process your request please try again";
  }
};

export const saveSession = ({
  accessToken,
  expiresIn,
}: {
  accessToken: string;
  expiresIn: number;
}) => {
  localStorage.setItem("accessToken", accessToken as string);
  localStorage.setItem("login_time", JSON.stringify(new Date().getTime()));
  localStorage.setItem("expiresIn", expiresIn.toString());
};

export const parseJwt = (token: string) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const getAuthFromLocalStorage = (strictCheckCoach: boolean = false) => {
  let auth = {
    user: null,
    isAuthenticated: false,
    coach: null,
  };

  try {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const user = parseJwt(accessToken);

      auth = {
        ...auth,
        user,
        isAuthenticated: user,
      };
    }
  } catch (error) {
  } finally {
    console.log(auth);
    if (!auth.isAuthenticated) {
      window.location.href = "/login";
    }
    return auth;
  }
};
