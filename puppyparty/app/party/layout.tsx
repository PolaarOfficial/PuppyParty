import Account from "@/app/ui/account";
import Notifications from "@/app/ui/notifications";
import Logo from "@/app/ui/logo";
import Search from "@/app/ui/search";

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <div className="flex flex-col h-screen justify-between">
            <div className="flex justify-items-center content-center place-content-center">
                <Search placeholder="Search for Puppy"/>
            </div>
            <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow bg-yellow-300">
                <div className="w-fixed w-full flex-shrink flex-grow-0 px-4">
                    <div className="sticky top-0 p-4 w-full h-full">
                        <Logo/>
                        <Notifications />
                    </div>
                </div>
                <main className="w-full flex-grow pt-1 px-3 bg-yellow-50">
                    {children}
                </main>
                <div className="w-fixed w-full flex-shrink flex-grow-0 px-2">
                    <div className="flex sm:flex-col px-2">
                        <Account />
                    </div>
                </div>
            </div>
            <footer>
            Chat
            </footer>
        </div>
    );
}