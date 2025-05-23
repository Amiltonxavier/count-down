"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { ArrowRight } from "lucide-react"

export default function SignIn() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 text-white">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Entrar</h1>
                    <p className="mt-2 text-gray-400">Acesse sua conta para continuar</p>
                </div>

                <div className="mt-8 space-y-4">
                    <SignedOut>
                        <div className="space-y-4">
                            <button
                                type="button"
                                onClick={() => (window.location.href = "/sign-in/email")}
                                className="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-left transition-colors hover:bg-gray-700"
                            >
                                <div className="flex items-center">
                                    <div className="h-6 w-6 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-3 font-medium">Continuar com Email</span>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400" />
                            </button>

                            <button
                                onClick={() => (window.location.href = "/sign-in/google")}
                                className="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-left transition-colors hover:bg-gray-700"
                            >
                                <div className="flex items-center">
                                    <div className="h-6 w-6 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-3 font-medium">Continuar com Google</span>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400" />
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-700" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-gray-950 px-2 text-gray-400">ou</span>
                                </div>
                            </div>

                            <SignInButton mode="modal">
                                <button type="button" className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-3 font-medium text-white transition-colors hover:bg-purple-700">
                                    Entrar com Clerk
                                </button>
                            </SignInButton>
                        </div>
                    </SignedOut>

                    <SignedIn>
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-center text-gray-400">Você já está conectado</p>
                            <div className="flex items-center space-x-2">
                                <UserButton />
                                <span className="text-sm text-gray-400">Gerenciar conta</span>
                            </div>
                            <a
                                href="/"
                                className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-3 font-medium text-white transition-colors hover:bg-purple-700"
                            >
                                Ir para o Dashboard
                            </a>
                        </div>
                    </SignedIn>
                </div>

                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>
                        Não tem uma conta?{" "}
                        <a href="/sign-up" className="font-medium text-purple-400 hover:text-purple-300">
                            Registre-se
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

