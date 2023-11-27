import CurrentAccount from '@/app/ui/currentaccount';
import { Suspense } from 'react';
import { CurrentAccountSkeleton } from '@/app/ui/skeletons';
export default function Page(){
    return (
        // <Suspense fallback={<CurrentAccountSkeleton />}>
            <CurrentAccount />
        // </Suspense>
    ); 
}