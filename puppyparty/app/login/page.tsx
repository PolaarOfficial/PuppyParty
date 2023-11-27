import Link from "next/link";

export default function Page(){
    return  (
        <main>
            <p> This is where we 
        login and get redirected to the dashboard page
    </p>
    <Link href='/party'>
        <span>Login!</span>
        </Link>
        </main>
);
 }