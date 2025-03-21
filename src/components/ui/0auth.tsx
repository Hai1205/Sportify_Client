import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { UserProfile } from "@/utils/types";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleLoginButton = () => {
  useEffect(() => {
    const loadGoogleScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => initializeGoogleLogin();
        document.body.appendChild(script);
      } else {
        initializeGoogleLogin();
      }
    };

    const initializeGoogleLogin = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "707903324299-u3vpk78j2q0vu1j2c5hgq59jlcbbui92.apps.googleusercontent.com",
          callback: handleSuccess,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-login-button"),
          { theme: "outline", size: "large" }
        );
      }
    };

    loadGoogleScript();
  }, []);

  const handleSuccess = (response: any) => {
    if (response.credential) {
      const decoded: UserProfile = jwtDecode<UserProfile>(response.credential);
      console.log("Decoded User:", decoded);
    }
  };

  return (
      <div id="google-login-button" className="mb-4  flex justify-center"></div>
  );
};

export { GoogleLoginButton };
