import { FC } from "react";
import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/button";
import { getAuthSession } from "@/lib/auth";
import {UserAccountNav} from "./UserAccountNav";

const Navbar: FC = async () => {
    const session = await getAuthSession();

    return (
        <div className="fixed top-0 inset-x-0 h-fit bg-danger-400 border-zinc-100 z-[10] py-2">
            <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
                
                {/* logo */}
                <Link href='/' className="flex gap-2 items-center">
                    <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6"></Icons.logo>
                    <p className="hidden text-zinc-700 text-sm font-medium md:block">
                       Reddit
                    </p>
                </Link>
                

                {/* search bar? */}
                {session?.user ? (
                    <UserAccountNav user={session.user}/>
                ) : (
                    <Link href={'/sign-in'} className={buttonVariants()}>Sign In</Link>
                )}
            </div> 
        </div>
    )
}

export default Navbar;