import { getCurrentAccountDetails } from "@/app/lib/data";
export default async function CurrentAccount(){
    const currentAccount = await getCurrentAccountDetails();
    return (
        <div>
            {currentAccount.map(()=>{
                return(
                    <div>

                    </div>
                );
                })}
        </div>
    );

}