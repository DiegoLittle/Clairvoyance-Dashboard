import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Login from "../../pages/login";

const layout = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // return (
  //     <div className="flex w-screen h-screen">
  //         <Sidebar current_item={router.pathname}></Sidebar>
  //         <div className="flex flex-col w-full">
  //             {children}
  //         </div>

  //     </div>
  // )

  if (status == "authenticated") {
    return (
      <div className="flex w-screen h-screen">
        <Sidebar current_item={router.pathname}></Sidebar>
        <div className="flex flex-col w-full">{children}</div>
      </div>
    );
  } else if (status == "loading") {
    return (
      <div class="h-screen flex justify-center items-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-200"></div>
      </div>
    );
  } else {
    return <Login></Login>;
  }
};

export default layout;

// export async function getInitialProps({ context }){
//     let test= document.cookie
//     console.log("HELLO")
//     return {
//         props:{test}
//         // props: // will be passed to the page component as props
//     }
// }
