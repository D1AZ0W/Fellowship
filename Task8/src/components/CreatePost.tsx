import { useState, type SubmitEvent } from "react";
import { type Post } from "../data/data";

type CreatePostProps = {
  handleCreate: (formField: Omit<Post, "id">) => void;
};

export const CreatePost = ({ handleCreate }: CreatePostProps) => {
  const [open, setOpen] = useState(false);

  const [formField, setFormField] = useState({
    userId: 1,
    title: "",
    body: "",
  });

  const resetForm = () => {
    setFormField({ userId: 1, title: "", body: "" });
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    await handleCreate(formField);
    resetForm();
    setOpen(false);
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-950 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
      >
        Create Post
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-full md:max-w-lg rounded-xl bg-white p-6  ">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Create Post</h2>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
                className="text-xl font-bold text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  User ID
                </label>

                <input
                  type="number"
                  min={1}
                  max={10}
                  value={formField.userId}
                  onChange={(e) =>
                    setFormField((prev) => ({
                      ...prev,
                      userId: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Title</label>

                <input
                  type="text"
                  value={formField.title}
                  onChange={(e) =>
                    setFormField((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Enter post title"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={formField.body}
                  onChange={(e) =>
                    setFormField((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }))
                  }
                  placeholder="Enter post description"
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setOpen(false);
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
