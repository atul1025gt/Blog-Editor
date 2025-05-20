import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BsPostcard } from "react-icons/bs";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";
import Dataloading from "@/components/Dataloading";

export default function Blogs() {
  const [searchquery, setsearchquery] = useState("");
  const { alldata, loading } = useFetchData("/api/blogapi");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  // Filter blogs based on status and search query
  const publishedBlog = alldata.filter(
    (blog) =>
      blog.status === "publish" &&
      blog.title.toLowerCase().includes(searchquery.toLowerCase())
  );

  const draftBlogs = alldata.filter(
    (blog) =>
      blog.status === "draft" &&
      blog.title.toLowerCase().includes(searchquery.toLowerCase())
  );

  if (status === "loading") {
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!session) return null;

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All <span>Blogs</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard />
            <span></span>
            <span>Blogs</span>
          </div>
        </div>

        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Blogs:</h2>
            <input
              type="text"
              value={searchquery}
              onChange={(e) => setsearchquery(e.target.value)}
              placeholder="search by title..."
            />
          </div>

          <h3 className="mt-4 mb-2">Published Blogs</h3>
          <table className="table table-styling">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>
                    <Dataloading />
                  </td>
                </tr>
              ) : publishedBlog.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Published Blogs
                  </td>
                </tr>
              ) : (
                publishedBlog.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{index + 1}</td>
                    <td>
                      <h3>{blog.title}</h3>
                    </td>
                    <td>
                      <pre>{blog.slug}</pre>
                    </td>
                    <td>
                      <div className="flex gap-2 flex-center">
                        <Link href={`/blogs/edit/${blog._id}`}>
                          <button title="edit">
                            <FaEdit />
                          </button>
                        </Link>
                        <Link href={`/blogs/delete/${blog._id}`}>
                          <button title="delete">
                            <RiDeleteBin6Fill />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <h3 className="mt-8 mb-2">Draft Blogs</h3>
          <table className="table table-styling">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>
                    <Dataloading />
                  </td>
                </tr>
              ) : draftBlogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Draft Blogs
                  </td>
                </tr>
              ) : (
                draftBlogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{index + 1}</td>
                    <td>
                      <h3>{blog.title}</h3>
                    </td>
                    <td>
                      <pre>{blog.slug}</pre>
                    </td>
                    <td>
                      <div className="flex gap-2 flex-center">
                        <Link href={`/blogs/edit/${blog._id}`}>
                          <button title="edit">
                            <FaEdit />
                          </button>
                        </Link>
                        <Link href={`/blogs/delete/${blog._id}`}>
                          <button title="delete">
                            <RiDeleteBin6Fill />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
