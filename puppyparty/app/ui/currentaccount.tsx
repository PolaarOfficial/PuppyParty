import { getCurrentAccountDetails } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
export default async function CurrentAccount(){
    const currentEmail = "test@test.com"
    const currentAccount = await getCurrentAccountDetails(currentEmail);
    console.log("got the account",currentAccount.birthday)
    return(
        <div>
            ID: {currentAccount.id}<br/>
            Name: {currentAccount.name}<br/>
            Birthday {formatDateToLocal(currentAccount.birthday)}<br/>
            Sex: {currentAccount.sex}<br/>
            Email: {currentAccount.email}<br/>
        </div>
    );
}