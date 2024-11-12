"use client";

// import JobCard from "@/components/job-card";
// import JobseekerCard from "@/components/jobseeker-job-card";
import { db } from "@/firebase/firebasefirestore";
import { collection, doc, DocumentData, getDoc, onSnapshot, } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllBlogs() {
    const [allBlogs, setAllBlogs] = useState<DocumentData[]>([]);
    useEffect(() => {
        fetchAllJobs();
    }, []);

    const fetchAllJobs = async () => {
        let blogsRef = collection(db, "blogs");
    

        const unsub = onSnapshot(blogsRef, async (blogsSnapshot) => {
            let allBlogsResolving = blogsSnapshot.docs.map(async (blog) => {
                let blogData = blog.data();

                let blogCreatorUID = blogData.uid;
                let blogCreatorRef = doc(db, "users", blogCreatorUID);
                let blogCreatorInfo = await getDoc(blogCreatorRef);
                let blogObject = {
                    ...blogData,
                    blogInfo: blogCreatorInfo.data(),
                    docId: blog.id,
                };

                return blogObject;
            });

            let allBlogsData = await Promise.all(allBlogsResolving);
            console.log(allBlogsData);
            setAllBlogs(allBlogsData);
        });

        return unsub;

    };
    return (
        <>
            {allBlogs.length > 0 &&
                allBlogs.map(
                    ({
                        title,
                        category,
                        description,
                        date
                    }, index) => (
                        <div
                            key={title + index}
                            className="card bg-base-100 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow-lg mb-4 border-4 border-brown-800 transition-transform transform hover:scale-105 hover:shadow-xl hover:border-brown-900"
                        >
                            <div className="card-body p-4 flex flex-col h-full">
                                <p className="font-bold text-sm sm:text-base">Title:</p>
                                <h2 className="pl-1 text-lg sm:text-xl md:text-2xl font-bold overflow-hidden">{title}</h2>



                                <p className="font-bold text-sm sm:text-base">Category:</p>
                                <div className="badge badge-secondary ml-1 sm:ml-3">{category}</div>

                                <p className="font-bold text-sm sm:text-base">Date:</p>

                                {/* <p className="pl-1 text-sm sm:text-base">{new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</p> */}
                                {/* <p className="pl-1 text-sm sm:text-base">{new Date().toLocaleDateString()}</p> */}

                                <p className="font-bold text-sm sm:text-base">Description:</p>
                                <p className="pl-1 break-words text-sm sm:text-base h-20 overflow-hidden">{description}</p>

                                <div className="card-actions justify-end mt-auto">
                                    <button
                                        className="btn bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        Delete
                                    </button>
                                    <div className="ml-2">
                                        <Link href={``}>
                                            <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
                                                Edit
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
        </>
    );
}