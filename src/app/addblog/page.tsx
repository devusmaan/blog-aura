"use client"

import { saveBlog } from "@/firebase/firebasefirestore";
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function AddBlog() {

    const [title, setTitle] = useState("");
    const [description, setDescrition] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState('');
    const [date] = useState(new Date());

    // const [title, setTitle] = useState("");


    const router = useRouter()

    const addBlogBtn = async () => {
        if (title && description && category !== "None") {
            // setLoading(true);
            try {
                await saveBlog(title, description, category, date);
                setTitle('');
                setDescrition('');
                setCategory("None");

                router.push("/");
            } catch (err) {
                console.error("Error saving expense:", err);
                setError('Failed to save expense. Please try again.');
            } finally {
                // setLoading(false);
            }
        } else {
            setError('Please Fill in all fields');
            setTimeout(() => {
                setError('');
            }, 4000);
        }
    }


    return (
        <>
            <h3 className="mt-20">Add Blog</h3>

            <div className="flex justify-center">
                <div>

                    <label className="input input-bordered flex items-center gap-2">
                        Title:
                        <input type="text" className="grow"
                            value={title} onChange={(e) => { setTitle(e.target.value) }}
                        />

                    </label>
                    <select className="select select-info w-full max-w-xs"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>

                        <option disabled>None</option>
                        <option value={"Technology"}>Technology</option>
                        <option value={"Health"}>Health</option>
                        <option value={"Travel"}>Travel</option>
                        <option value="Sports">Sports</option>

                    </select>

                    <textarea value={description} onChange={(e) => { setDescrition(e.target.value) }}
                        className="textarea textarea-primary mt-3 w-full" placeholder="Description"></textarea>


                    <div className="flex items-center justify-center mb-4">
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </div>


                    <button onClick={addBlogBtn}
                        className="btn btn-xs h-10 w-28 sm:btn-sm md:btn-md lg:btn-lg">
                        Add Blog
                    </button>
                </div>
            </div>


        </>
    )
}