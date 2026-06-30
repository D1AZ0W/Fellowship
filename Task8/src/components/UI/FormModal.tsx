import { useState, type SubmitEvent } from "react";
import type { Post } from "../../data/data";

type FormModalProps = {
  mode: "create" | "edit";
  post?: Post | null;
  onClose: () => void;
  onCreate?: (data: Omit<Post, "id">) => Promise<void>;
  onEdit?: (post: Post) => Promise<void>;
};

export const FormModal = ({
  mode,
  post,
  onClose,
  onCreate,
  onEdit,
}: FormModalProps) => {
  const [formField, setFormField] = useState<Omit<Post, "id">>({
    userId: post?.userId ?? 1,
    title: post?.title ?? "",
    body: post?.body ?? "",
  });

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!formField.title.trim() || !formField.body.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (mode === "create") {
      await onCreate?.(formField);
    } else if (post) {
      await onEdit?.({
        ...post,
        ...formField,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create Post" : "Edit Post"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl font-bold text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">User ID</label>

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
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
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
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              {mode === "create" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
