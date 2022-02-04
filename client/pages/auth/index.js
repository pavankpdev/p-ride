import React from "react";
import { useRouter } from 'next/router'

export default function AuthHome() {
    const router = useRouter();

    React.useEffect(() => {
        router.push("/auth/login");
    },[])
    

  return (
    <div>

    </div>
  );
}
