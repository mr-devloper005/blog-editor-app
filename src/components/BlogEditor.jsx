import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Editor ka default style
import axios from "axios";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";



const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
];
function BlogEditor() {

  

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [fetchedDrafts, setFetchedDrafts] = useState([])
  const [fetchedBlogs, setFetchedBlogs] = useState([])
  const [editId, setEditId] = useState()



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blogs", {
          withCredentials: true,
        });

        const blogs = response.data.message;

       

        const publishedBlogs = blogs.filter((obj) => obj.status === "published")
        const drafts = blogs.filter((obj) => obj.status === "draft")



        setFetchedBlogs(publishedBlogs)
        setFetchedDrafts(drafts)


      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

  const getBlogById = async (item) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/blogs/${item._id}`);

      console.log("response.data:", response.data);

      const blog = response.data;


      setTitle(blog.message.title || "");
      setContent(blog.message.content || "");
      setTags(blog.message.tags || "");
      setEditId(prev =>blog.message._id)

    } catch (error) {
      console.error("Error while fetching blog:", error);
    }
  };

  const saveDraft = async (e) => {


    const updatedTags = typeof tags === "object" ? tags.join(",") : tags;


    const id = editId?.length > 1 ? editId : null;

  if (!title || !content || !tags) {
    toast.error("Plesae Provide All Details",{
        
  duration: 4000,
  position: 'top-left'

    })
      return;
    }


    try {

      const response = await axios.post("http://localhost:8000/api/blogs/savedraft", {
        title,
        content,
        tags: updatedTags,
        id
      }, { withCredentials: true })

      console.log(response)
    } catch (error) {
      console.log(error)
    }

  }

  const onSubmit = async (e) => {
  
  if (!title || !content || !tags) {
    toast.error("Plesae Provide All Details",{
        
  duration: 4000,
  position: 'top-left'

    })
      return;
    }


    const updatedTags = typeof tags === "object" ? tags.join(",") : tags;

    // const id = editId.length > 1 ? editId : null
    const id = editId?.length > 1 ? editId : null;

    try {
      e.preventDefault();
      const response = await axios.post("https://blog-backend-production-7b89.up.railway.app/api/blogs/publish", {
        title,
        content,
        tags: updatedTags, id
      }, { withCredentials: true })

      toast.success("Blog Published",{
        
          duration: 4000,
  position: 'top-left'

      })

      console.log(response)
    } catch (error) {
      

    toast.error(error,{
        
  duration: 4000,
  position: 'top-left'

    })
      console.log(error)
    }
  }


const debouncedAutoSave = useRef();

useEffect(() => {
  debouncedAutoSave.current = debounce(async (title, content, tags) => {
  
  if (!title && !content && !tags) {
    console.log("please provide all details")
      return;
    }


    try {
      await saveDraft(); // ya axios call

      toast.success("Draft Saved",{
        position:"top-left",
        duration:2000
      })
      console.log("Auto-saved draft");
    } catch (error) {
      console.error("Error auto-saving draft:", error);
    }
  }, 5000);

  return () => {
    debouncedAutoSave.current.cancel();
  };
}, [saveDraft]); // recreate only if saveDraft changes

useEffect(() => {

  if (!title && !content && !tags) {
    console.log("please provide all details")
      return;
    }


  debouncedAutoSave.current(title, content, tags);

  return () => {
    debouncedAutoSave.current.cancel();
  };
}, [title, content, tags]);




  return (
    <div className="p-8 bg-[#121212] h-screen text-white overflow-hidden flex">
      <div className=" w-1/4 h-full bg-slate-950">

        <div id="drafts" className="h-1/2 flex flex-col  bg-white"><h1 className="text-center text-black text-2xl font-bold bg-zinc-800">Drafts</h1><div className=" overflow-auto mt-4 h-full w-full">{fetchedDrafts.map(item => (<p onClick={() => getBlogById(item)} className="h-12  w-full justify-between p-4 cursor-pointer items-center rounded-lg   flex   font-bold text-orange-950  bg-white  hover:bg-slate-200 " key={item._id}><span>{item.title}</span> <span>{item.createdAt.split("T")[0]}</span> </p>))}</div></div>



        <div id="published" className="h-1/2  flex flex-col bg-white"><h1 className="text-center  text-black text-2xl font-bold   bg-gray-700">Published</h1><div className="cursor-pointer overflow-auto mt-4  h-full w-full">{fetchedBlogs.map(item => (<p onClick={() => getBlogById(item)} className="h-12 w-full   justify-between p-4  items-center rounded-lg   flex   font-bold text-orange-950   bg-white  hover:bg-slate-200 " key={item._id}><span className="overflow-x-hidden text-nowrap w-1/2 cursor-auto">{item.title}</span> <span>{item.createdAt.split("T")[0]}</span> </p>))}</div></div>

      </div>
      <form className="w-full h-full relative ml-2" onSubmit={onSubmit}>

        <input type="text" value={title || ""} onChange={e => setTitle(e.target.value)} placeholder="Enter Your Blog Title" className="h-16 w-1/3 p-1 text-black m-1 font-bold rounded-md pl-2" />
        <input type="text" value={tags || ""} onChange={e => setTags(e.target.value)} placeholder="Enter Tags Seprated By Comma" className="h-16 w-1/3 text-black p-1 m-1 font-bold rounded-md pl-2" />
        <ReactQuill
          theme="snow"
          value={content || ""}
          onChange={setContent}
          placeholder="Start writing your blog..."
          className="bg-white text-black mb-4 h-[91%] border-none text-5xl relative custom-quill-editor rounded-xl"
          modules={modules}
          formats={formats}
        />

        <div className="top-2 right-1 absolute text-white flex gap-3 items-center font-bold">

          <button
            type="submit"
            className="bg-blue-600 p-3 font-bold   rounded-xl  text-white hover:bg-blue-800 transition-all">
            Publish Blog
          </button>
          or
          <button
            type="button" onClick={(e) => { saveDraft(e) }}
            className="bg-gray-800 p-3 font-bold  rounded-xl  text-white hover:bg-black transition-all">
            save as Draft
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogEditor;
