import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Dataloading from "@/components/Dataloading";

export default function DraftTable({ loading, draftBlogs, indexOffset }) {
  return (
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
              <td>{indexOffset + index + 1}</td>
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
  );
}
