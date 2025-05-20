import Blog from "@/components/Blog"
import Loading from "@/components/Loading"
import axios from "axios"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BsPostcard } from "react-icons/bs"

export default function DeleteBlog(){


const router = useRouter()
const {data:session,status}=useSession() 
useEffect(()=>{
    if (!session) {
      router.push('/login')
    }
  },[session,router])

if (status==="loading") {
    return <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading/>
        <h1>Loading...</h1>
    </div>
} 
const {id}=router.query;
const [productInfo,setProductInfo]=useState(null)
useEffect(()=>{
    if (!id) {
        return
    }else{
        axios.get('/api/blogapi?id='+id).then(response=>{
            setProductInfo(response.data)
        })

    }

},{id})

function goback(){
    router.push('/')
}
async function deleteOneblog() {
    await axios.delete('/api/blogapi?id='+id)
    goback()
    
}

if (session) {
    return <>
    <Head>
        <title>Update Blog</title>
    </Head>
    <div className="blogpage">
    <div className="titledashboard flex flex-sb">
        <div>
          <h2>Delete <span>{productInfo?.title}</span></h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="breadcrumb">
          <BsPostcard/><span></span><span>Delete Blog</span>
        </div>
        
      </div>
      <div className="deletesec flex flex-center wh_100">
      
       <div className="deletecard">
      




       <p className="cookieHeading">Are you sure?</p>
       <p className="cookieDescription">It will Permanently erase your blog</p>
       <div className="buttonContainer">
        
        <button onClick={deleteOneblog} className="acceptButton">Delete</button>
        <button onClick={goback} className="declineButton">Cancel</button>
       </div>
       </div>
       
      </div>

    </div>



    </>
}


}
