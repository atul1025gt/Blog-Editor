import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useEffect , useState} from "react";

export default function Aside() {
  const router = useRouter();
  const [clicked, setclicked] = useState(false);
  const [activelink, setactivelink] = useState("/");
  const handleClick = () => {
    setclicked(!clicked);
  };
  const handleLinkClick = (link) => {
    setactivelink(link);
    setclicked(false);
  };
  useEffect(() => {
    //updates active link state when the page is reloaded
    setactivelink(router.pathname);
  }, [router.pathname]);
  return (
    <>
      <aside className="asideleft">
        <ul>
          <Link href="/">
            <li className={activelink === '/' ? 'navactive' : ''} onClick={()=>handleLinkClick('/')}>
              <IoHome />
              <span>DashBoard</span>
            </li>
          </Link>
          <Link href="/blogs">
            <li className={activelink === '/blogs' ? 'navactive' : ''} onClick={()=>handleLinkClick('/blogs')}>
              <BsPostcard />
              <span>Blogs</span>
            </li>
          </Link>
          <Link href="/blogs/addblog">
            <li className={activelink === '/blogs/addblog' ? 'navactive' : ''} onClick={()=>handleLinkClick('/blogs/addblog')}>
              <MdOutlineAddPhotoAlternate />
              <span>AddBlog</span>
            </li>
          </Link>
          <Link href="/draft">
            <li className={activelink === '/draft' ? 'navactive' : ''} onClick={()=>handleLinkClick('/draft')}>
              <MdOutlinePending />
              <span>Pending</span>
            </li>
          </Link>
          <Link href="/setting">
            <li className={activelink === '/setting' ? 'navactive' : ''} onClick={()=>handleLinkClick('/setting')}>
              <IoSettingsOutline />
              <span>Settings</span>
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
}
