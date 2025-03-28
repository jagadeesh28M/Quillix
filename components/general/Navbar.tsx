import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="py-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href={"/"}>
          <h1 className="text-3xl font-semibold">
            <span className="text-blue-500">Quillix</span>
          </h1>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          <Link
            href={"/"}
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href={"/dashboard"}
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          {user.picture && user.given_name ? (
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={user.picture}
                alt={user.given_name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div></div>
          )}

          <p>{user.given_name}</p>
          <LogoutLink className={buttonVariants({ variant: "destructive" })}>
            Logout
          </LogoutLink>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-4">
            <LoginLink className={buttonVariants()}>Login</LoginLink>
            <RegisterLink className={buttonVariants({ variant: "secondary" })}>
              Sign up
            </RegisterLink>
          </div>
        </div>
      )}
    </nav>
  );
}
