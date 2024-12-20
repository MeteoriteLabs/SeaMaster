import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    // router.push("/sign-in");
  }, []);

  return <div>fsjhfeuhS</div>;
};

export default page;
