import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BsPostcard } from "react-icons/bs";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import DraftTable from "@/components/DraftTable";

export default function Draft() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perpage] = useState(4);

  const { alldata, loading } = useFetchData("/api/blogapi");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexofLastblog = currentPage * perpage;
  const indexofFirstblog = indexofLastblog - perpage;
  const currentBlogs = alldata.slice(indexofFirstblog, indexofLastblog);
  const draftBlogs = currentBlogs.filter((ab) => ab.status === "Draft");

  const allblog = alldata.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perpage); i++) {
    pageNumbers.push(i);
  }

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

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
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All Draft <span>Blogs</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard />
            <span></span>
            <span>Draft Blogs</span>
          </div>
        </div>

        <div className="blogstable">
          <h3 className="mt-8 mb-2">Draft Blogs</h3>
          <DraftTable
            loading={loading}
            draftBlogs={draftBlogs}
            indexOffset={indexofFirstblog}
          />

          {draftBlogs.length > 0 && (
            <div className="blogpagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {pageNumbers
                .slice(
                  Math.max(currentPage - 3, 0),
                  Math.min(currentPage + 2, pageNumbers.length)
                )
                .map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </button>
                ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentBlogs.length < perpage}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
