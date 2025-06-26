import { useEffect, useRef } from "react";

export default function GoogleLoginButton({ onSuccess }) {
  const buttonDiv = useRef(null);

  useEffect(() => {
    if (window.google && buttonDiv.current) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: onSuccess,
      });
      window.google.accounts.id.renderButton(buttonDiv.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, [onSuccess]);

  return <div ref={buttonDiv}></div>;
} 