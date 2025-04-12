

export default function SplashPage() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
            <div className="flex flex-col items-center justify-center gap-8">
                {/* Logo */}
                <div className="relative w-24 h-24">
                    <img
                        src="/Logo.svg"
                        alt="Logo"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Custom spinner */}
                <div className="spinner h-8 w-8 relative">
                    <style jsx>{`
          .spinner:before {
            content: '';
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 32px;
            height: 32px;
            margin-top: -16px;
            margin-left: -16px;
            border-radius: 50%;
            border: 3px solid #ccc;
            border-top-color: #3b82f6;
            animation: spinner 0.8s linear infinite;
          }
          
          @keyframes spinner {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
                </div>
            </div>
        </div>
    )
}
