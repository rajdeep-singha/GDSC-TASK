import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { useState } from "react";

const Library = () => {
  const [value1, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["link", "image", "code-block"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "link",
    "image",
    "code-block",
  ];

  return (
    <div>
      <div className="font-extrabold text-2xl md:text-4xl text-blue-600 mb-6 md:mb-10 text-center md:mt-10 mt-8">
        Using React Library
      </div>
      <div className="md:p-[25px] flex gap-[2rem] justify-center items-center">
        <div className="md:w-1/2">
          <ReactQuill
            className="h-[150px]"
            value={value1}
            onChange={(content) => setValue(content)}
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
      {/* Preview Box */}
      <div className="md:mt-12 mt-16 p-4 border border-gray-300 rounded h-[200px] md:w-[900px] w-[330px] m-auto">
        <h2 className="text-lg font-semibold mb-2 text-center">Preview</h2>
        <div
          className="prose"
          style={{ overflowWrap: "break-word" }}
          dangerouslySetInnerHTML={{ __html: value1 }}
        />
      </div>
    </div>
  );
};

export default Library;