import { useEffect, useActionState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Github, EyeOff } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../UI/Tabs.jsx';
import { logInAction, signUpAction } from '../../api/auth.js';
import { Label } from '../../UI/Label.jsx';
import { Checkbox } from '../../UI/Checkbox.jsx';
import Button from '../../UI/Button.jsx';
import Input from '../../UI/Input.jsx';
import Footer from '../Footer.jsx';

export default function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logInActionWithDispatch(prevFormState, formData) {
        return logInAction(prevFormState, dispatch, formData);
    }

    function signUpActionWithDispatch(prevFormState, formData) {
        return signUpAction(prevFormState, dispatch, formData);
    }

    const [logInFormActionState, logInFormActionFunction] = useActionState(logInActionWithDispatch, { error: new Set(), success: false });
    const [signUpFormActionState, signUpFormActionFunction] = useActionState(signUpActionWithDispatch, { error: new Set(), success: false });

    useEffect(() => {
        if (signUpFormActionState.success || logInFormActionState.success) {
            navigate('/');
        }
    }, [signUpFormActionState.success, logInFormActionState.success]);

    return <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <Link to="/">
                        <img src="/images/cyc-logo.png" alt="CYC Logo" width={120} height={50} className="h-14 w-auto" />
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList cssClasses="!grid !grid-cols-2 !w-full !rounded-none !bg-gray-50 !p-0">
                            <TabsTrigger
                                value="login"
                                cssClasses="!py-4 !rounded-none data-[state=active]:!bg-white data-[state=active]:!text-[#1a5e63] data-[state=active]:!shadow-none"
                            >
                                Login
                            </TabsTrigger>
                            <TabsTrigger
                                value="signup"
                                cssClasses="!py-4 !rounded-none data-[state=active]:!bg-white data-[state=active]:!text-[#1a5e63] data-[state=active]:!shadow-none"
                            >
                                Sign Up
                            </TabsTrigger>
                        </TabsList>

                        {/* Login Form */}
                        <form action={logInFormActionFunction}>
                            <TabsContent value="login" cssClasses="!p-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            cssClasses={`!border-gray-200 focus-visible:!ring-[#1a5e63] ${logInFormActionState.error.has('email') ? 'invalid-input' : ''}`}
                                            defaultValue={logInFormActionState.enteredValue?.email}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            <Link to="#" className="text-xs text-[#1a5e63] hover:underline">
                                                Forget Password
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                name="logInPassword"
                                                type={"text"}
                                                placeholder="••••••••"
                                                cssClasses="!border-gray-200 focus-visible:!ring-[#1a5e63]"
                                                defaultValue={logInFormActionState.enteredValue?.email}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => { }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                { }
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="remember" />
                                        <Label
                                            htmlFor="remember"
                                            cssClasses="!text-sm !font-medium !leading-none peer-disabled:!cursor-not-allowed peer-disabled:!opacity-70"
                                        >
                                            Remember me
                                        </Label>
                                    </div>

                                    <Button variant="default" size="default" cssClasses="!w-full !bg-[#1a5e63] order-button-hover">Login</Button>

                                    <div className="relative my-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Button variant="outline" size="default" cssClasses="!border-gray-200">
                                            <Facebook className="mr-2 h-4 w-4" />
                                            Facebook
                                        </Button>
                                        <Button variant="outline" size="default" cssClasses="!border-gray-200">
                                            <Github className="mr-2 h-4 w-4" />
                                            GitHub
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </form>

                        {/* SignUp Form */}
                        <form action={signUpFormActionFunction}>
                            <TabsContent value="signup" cssClasses="!p-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                placeholder="John"
                                                cssClasses={`!border-gray-200 focus-visible:!ring-[#1a5e63] ${signUpFormActionState.error.has('firstName') ? 'invalid-input' : ''}`}
                                                defaultValue={signUpFormActionState.enteredValue?.firstName}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Doe"
                                                cssClasses={`!border-gray-200 focus-visible:!ring-[#1a5e63] ${signUpFormActionState.error.has('lastName') ? 'invalid-input' : ''}`}
                                                defaultValue={signUpFormActionState.enteredValue?.lastName}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="signupEmail">Email</Label>
                                        <Input
                                            id="signUpEmail"
                                            name="signUpEmail"
                                            type="email"
                                            placeholder="your@email.com"
                                            cssClasses={`!border-gray-200 focus-visible:!ring-[#1a5e63] ${signUpFormActionState.error.has('email') ? 'invalid-input' : ''}`}
                                            defaultValue={signUpFormActionState.enteredValue?.email}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="signupPassword">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="signUpPassword"
                                                name="signUpPassword"
                                                type={"text"}
                                                placeholder="••••••••"
                                                cssClasses={`!border-gray-200 focus-visible:!ring-[#1a5e63] ${signUpFormActionState.error.has('password') ? 'invalid-input' : ''}`}
                                                defaultValue={signUpFormActionState.enteredValue?.signUpPassword}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => { }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {<EyeOff size={18} />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="signupPassword">Confirm Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="signUpConfirmPassword"
                                                name="signUpConfirmPassword"
                                                type={"text"}
                                                placeholder="••••••••"
                                                cssClasses={`!border-gray-200 focus-visible:!ring-[#1a5e63] ${signUpFormActionState.error.has('confirmPassword') ? 'invalid-input' : ''}`}
                                                defaultValue={signUpFormActionState.enteredValue?.signUpConfirmPassword}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => { }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {<EyeOff size={18} />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500">Password must match</p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="terms"
                                            name="terms"
                                            defaultChecked={signUpFormActionState.enteredValue?.terms}
                                            cssClasses={signUpFormActionState.error.has('terms') ? 'invalid-input' : ''}
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            I agree to the{" "}
                                            <Link to="/terms" className="text-[#1a5e63] hover:underline">
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link to="/privacy" className="text-[#1a5e63] hover:underline">
                                                Privacy Policy
                                            </Link>
                                        </label>
                                    </div>

                                    <Button variant="default" size="default" cssClasses="!w-full !bg-[#1a5e63] order-button-hover">Create Account</Button>

                                    <div className="relative my-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Button variant="outline" size="default" cssClasses="!border-gray-200">
                                            <Facebook className="mr-2 h-4 w-4" />
                                            Facebook
                                        </Button>
                                        <Button variant="outline" size="default" cssClasses="!border-gray-200">
                                            <Github className="mr-2 h-4 w-4" />
                                            GitHub
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </form>
                    </Tabs>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        By using CYC, you agree to our{" "}
                        <Link to="/terms" className="text-[#1a5e63] hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-[#1a5e63] hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        <Footer />
    </div>
}