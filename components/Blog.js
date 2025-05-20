import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

// Import the markdown editor dynamically (for Next.js SSR compatibility)
const MarkdownEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

import "react-markdown-editor-lite/lib/index.css";

export default function Blog({
  _id,
  title: existingTitle,
  slug: existingSlug,
  blogcategory: existingBlogcategory,
  description: existingDescription,
  tags: existingTags,
  status: existingStatus,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [blogcategory, setBlogcategory] = useState(existingBlogcategory || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [tags, setTags] = useState(existingTags || "");
  const [status, setStatus] = useState(existingStatus || "");

  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, slug, description, blogcategory, tags, status };
    try {
      if (_id) {
        await axios.put("/api/blogapi", { ...data, _id });
      } else {
        await axios.post("/api/blogapi", data);
      }
      setRedirect(true);
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  }

  if (redirect) {
    router.push("/");
    return null;
  }
  const handleSlugChange = (ev)=>{
    const inputValue = ev.target.value
    const newSlug=inputValue.replace(/\s+/g,'-')
    setSlug(newSlug)
  }



  return (
    <form onSubmit={createProduct} className="addWebsiteform">
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter small title"
        />
      </div>

      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={handleSlugChange}
          placeholder="Enter slug url"
          required
        />
      </div>

      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={blogcategory}
          onChange={(e) => setBlogcategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option>Html Css and Javascript</option>
          <option>ReactJs and NextJs</option>
          <option>Database</option>
          <option>Deployment</option>
        </select>
        {blogcategory && (
          <p className="existingcategory flex gap-1 mt-1 mb-1">
            Selected:{Array.isArray(existingBlogcategory)&&existingBlogcategory.map(category=>(<span>{blogcategory}</span>))} 
          </p>
        )}
      </div>

      <div className="description w-100 flex flex-col flex-left mb-2">
        <label htmlFor="description">Blog Content</label>
        <MarkdownEditor
          value={description}
          style={{ height: "400px" }}
          onChange={(ev) => setDescription(ev.text)}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
        />
      </div>

      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="tags">Tags</label>
        <select
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        >
          <option value="">Select a tag</option>
          <option>Html</option>
          <option>Css</option>
          <option>Javascript</option>
          <option>ReactJs</option>
          <option>NextJs</option>
          <option>Database</option>
          <option>Deployment</option>
        </select>
        {tags && (
          <p className="existingcategory flex gap-1 mt-1 mb-1">
            Selected: {Array.isArray(existingTags)&&existingTags.map(category=>(<span>{tags}</span>))}
          </p>
        )}
      </div>

      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">No select</option>
          <option value="draft">Draft</option>
          <option value="publish">Publish</option>
        </select>
        {status && (
          <p className="existingcategory flex gap-1 mt-1 mb-1">
            Selected: {Array.isArray(existingStatus)&&existingStatus.map(category=>(<span>{status}</span>))}
          </p>
        )}
      </div>

      <div className="w-100 mb-2">
        <button type="submit" className="w-100 addwebbtn flex-center">
          SAVE BLOG
        </button>
      </div>
    </form>
  );
}
