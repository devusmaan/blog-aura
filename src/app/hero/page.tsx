import Link from "next/link";

export default function Hero() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md w-full mx-auto px-4">
                    <img
                        src="/images/blogaura-logo.png"
                        alt="Hero image"
                        className="w-60 h-32 mx-auto sm:w-auto sm:h-auto"
                    />

                    <p className="text-sm sm:text-base md:text-lg lg:text-xl py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>

                    <Link href={"/"}>
                    <button className="btn btn-primary px-6 py-3 text-base sm:text-lg md:text-xl">
                        Get Started
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
