import Blog from "@/components/Blog";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Addblog() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (session) {
    return (
      <>
        <div className="addblogspage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Add <span>Blog</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <MdOutlineAddPhotoAlternate />
              <span></span>
              <span>AddBlog</span>
            </div>
          </div>
          <div className="blogsadd">
            <Blog/>
          </div>
        </div>
      </>
    );
  }

  return null; // fallback return if session is null and status is not "loading"
}
