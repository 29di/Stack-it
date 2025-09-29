import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Question submitted:", {
      title: title.trim(),
      description: description.trim(),
      tags: tags
    });
    navigate("/");
  };

  // ReactQuill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block', 'list', 'bullet',
    'link', 'image'
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-elevation border border-surface-border-light dark:border-surface-border-dark p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-content-primary mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., How to center a div using CSS?"
                className="w-full px-4 py-3 border border-surface-border-light dark:border-surface-border-dark rounded-lg bg-surface-light dark:bg-surface-dark text-content-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-content-primary mb-2">
                Description
              </label>
              <div className="border border-surface-border-light dark:border-surface-border-dark rounded-lg overflow-hidden">
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  modules={modules}
                  formats={formats}
                  placeholder="Provide more details about your question..."
                  style={{
                    backgroundColor: 'white',
                    color: '#374151'
                  }}
                  className="bg-surface-light dark:bg-surface-dark"
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-content-secondary">Rich Text Editor</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-content-primary mb-2">
                Tags
              </label>
              <div className="border border-surface-border-light dark:border-surface-border-dark rounded-lg p-2 bg-surface-light dark:bg-surface-dark">
                <TagInput
                  tags={tags}
                  onChange={setTags}
                  placeholder="Type a tag and press enter..."
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-content-secondary">
                  Press Enter to add tags
                </span>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-gradient-primary hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-soft"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;