import Image from "next/image";
import {useSession,signIn,signOut} from "next-auth/react"
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

export default function Login(){
    const {data:session,status}=useSession()
    if (status==="loading") {
        return <div className="loadingdata flex flex-col flex-center wh_100">
            <Loading/>
            <h1>Loading...</h1>
        </div>

    }
    const router = useRouter()
    async function login() {
        await router.push('/')
        await signIn()
    }
    if (session) {
        router.push('/')
        return null
    }
    if (!session) {
        return <>
    <div className="loginfront flex flex-center flex-col full-w">
        <Image src='/img/coder.png' width={250} height={250}/>
        <h1>Welcome Admin👋</h1>
        <button onClick={login} className="mt-2">Login With Google</button>
    </div>
    </>
    }
    
} 