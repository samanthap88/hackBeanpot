import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div>
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      redirectUrl={"/home"} 
    />
    </div>
  );
}
