import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import imgSrc from "../images/upload.jpg";
import donutImg from "../images/donut.png";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [fileName, setFileName] = useState({});
  const [tempUrl, setTempUrl] = useState(null);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [category, setCategory] = useState("");
  const [quillText, setQuillText] = useState("");

  const categoryList = [
    "Agriculture",
    "Art",
    "Entertianment",
    "Business",
    "Investment",
    "Education",
    "Uncategorized",
    "Education",
    "Weather",
  ];

  const handleTextChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = { ...formData, [name]: value, category };
    setFormData(data);
  };
  const selectImg = useRef(null);

  const url = useLocation().pathname;
  const blogId = url.split("/")[3];

  const [preData, setPreData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://donut-a-blog-website.onrender.com/api/v1/blogs/${blogId}`
      );
      setFormData({
        category: response?.data?.data?.category,
        content: response?.data?.data?.content,
        title: response?.data?.data?.title,
      });
      setCategory(response?.data?.data?.category);
      setQuillText(response?.data?.data?.content);
      setTempUrl(response?.data?.data?.imgUrl);
    };
    fetchData();
  }, []);

  const handleInputImage = () => {
    selectImg.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { ...formData, coverImage: fileName };
    console.log(postData);
    try {
      const response = await axios.put(
        `https://donut-a-blog-website.onrender.com/api/v1/blogs/update/${blogId}`,
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status == "200") {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = () => {
    setCategoryMenu(!categoryMenu);
  };

  const handleCategoryChange = (e) => {
    const name = e.target.getAttribute("category");
    const data = { ...formData, category: name };
    setFormData(data);
    setCategory(name);
  };

  const handleFileChange = (e) => {
    const fileData = e.target.files[0];
    if (fileData) {
      console.log(fileData);
      setFileName(fileData);

      const tempUrl = URL.createObjectURL(fileData);
      setTempUrl(tempUrl);
    } else {
      setFileName({});
      setTempUrl(null);
    }
  };
  return (
    <div className="flex-1 flex items-center justify-center my-12">
      <div className="sm:w-[1200px] h-full flex flex-col ">
        <div className="flex gap-2 items-center justify-center">
          <span className="font-semibold font-Dosis text-3xl">
            Create Awsome Blogs And Eat Donuts.
          </span>
          <img src={logo} alt="not found" className="h-12" />
        </div>
        <form
          className="flex flex-1 justify-between gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex-[0.7]">
            <h1 className="text-[#6f6f6f] font-semibold text-xl font-oxygen mb-2">
              Blog Title
            </h1>
            <div className=" h-12 bg-[#fdfbec] rounded-sm overflow-hidden border border-[#efefe6] mb-2">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTextChange}
                className="h-full w-full overflow-hidden bg-inherit text-ellipsis outline-none px-4 text-[#6f6f6f] font-Dosis"
              />
            </div>

            <h1 className="text-[#6f6f6f] font-semibold text-xl font-oxygen mb-2">
              Blog Content
            </h1>
            <div className="bg-[#fafafa] rounded-sm border border-[#efefe6] mb-12 h-96">
              <ReactQuill
                className="h-[339px] w-full"
                value={quillText}
                onChange={(quillText) => {
                  const newFromData = { ...formData, content: quillText };
                  setQuillText(quillText);
                  setFormData(newFromData);
                }}
              />
            </div>

            <h1 className="text-[#6f6f6f] font-semibold text-xl font-oxygen mb-2">
              Blog Category
            </h1>
            <div
              className=" h-12 w-72 bg-[#fdfbec] rounded-sm overflow-hidden border border-[#efefe6] mb-2 flex items-center px-3 cursor-pointer"
              onClick={handleCategory}
            >
              <span className=" text-[#6f6f6f] font-Dosis text-xl">
                {category ? category : "Choose one from list..."}
              </span>
            </div>

            <div className="relative h-72 overflow-hidden">
              <div
                className={`w-72 h-72 bg-[#fafafa] border border-[#efefe6] overflow-scroll overflow-x-hidden flex flex-col gap-2 absolute ${
                  !categoryMenu
                    ? "animate-scrollIn bottom-72"
                    : "animate-scrollOut bottom-0"
                }`}
              >
                {categoryList.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="font-Dosis font-medium text-xl cursor-pointer p-3 hover:bg-[#2f72a4] hover:text-white"
                      category={item}
                      onClick={handleCategoryChange}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex-[0.3] flex flex-col justify-between">
            <div>
              <h1 className="text-[#6f6f6f] font-semibold text-xl font-oxygen mb-2">
                Blog Photo
              </h1>
              <div
                onClick={handleInputImage}
                className="cursor-pointer h-64 w-64 rounded-sm overflow-hidden border-[#efefe6] border-dashed border-2 mb-2"
              >
                {tempUrl ? (
                  <img
                    src={tempUrl}
                    alt="selected"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={imgSrc}
                    alt="not found"
                    className="w-full h-full object-cover"
                  />
                )}
                <input
                  type="file"
                  name="title"
                  accept="image/*"
                  ref={selectImg}
                  onChange={handleFileChange}
                  className="h-full hidden cursor-pointer w-full overflow-hidden bg-inherit text-ellipsis outline-none px-4 text-[#6f6f6f]"
                />
              </div>
              {fileName && (
                <h1 className="font-semibold text-[#6f6f6f] font-oxygen text-ellipsis">
                  <span className="font-bold text-black">Selected File : </span>
                  {fileName.name}
                </h1>
              )}
            </div>

            <button className="w-44 h-12 border bg-[#464646] text-white rounded-xl hover:shadow-lg hover:bg-[#ff6e94] mt-12">
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
