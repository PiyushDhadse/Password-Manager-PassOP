import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwords, setPasswords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const getPasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      let passwords = await req.json();

      console.log(passwords);
      // Filter out invalid entries
      const validPasswords = passwords.filter(
        (p) => p && p.site && p.username && p.password
      );
      setPasswords(validPasswords);
    } catch (error) {
      console.error("Failed to fetch passwords:", error);
      setPasswords([]);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showSuccessToast = (message) => {
    const toastContent = React.isValidElement(message) ? (
      message
    ) : (
      <div className="flex items-center">
        <span className="material-icons mr-2">check</span>
        <div>{message}</div>
      </div>
    );

    toast.success(toastContent, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: false,
    });
  };

  const showErrorToast = (message) => {
    const toastContent = React.isValidElement(message) ? (
      message
    ) : (
      <div className="flex items-center">
        <span className="material-icons mr-2">error</span>
        <div>{message}</div>
      </div>
    );

    toast.error(toastContent, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: false,
    });
  };

  const showInfoToast = (message) => {
    const toastContent = React.isValidElement(message) ? (
      message
    ) : (
      <div className="flex items-center">
        <span className="material-icons mr-2">info</span>
        <div>{message}</div>
      </div>
    );

    toast.info(toastContent, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: false,
    });
  };

  const savePassword = async () => {
    // Validation
    if (!form.site || !form.username || !form.password) {
      showErrorToast("Please fill in all fields!");
      return;
    }

    console.log("Saved credentials:", form);

    if (editingIndex !== null) {
      // Update existing password
      const updatedPasswords = [...passwords];
      updatedPasswords[editingIndex] = form;
      setPasswords(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setEditingIndex(null);
      showSuccessToast(`Password for ${form.site} updated successfully!`);
    } else {
      // Add new password (persist to server and include returned id)
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      const data = await response.json();
      const added = { ...form };
      if (data && data.insertedId) {
        added.id = data.insertedId;
      }
      const newArray = [...passwords, added];
      setPasswords(newArray);
      showSuccessToast(`Password for ${form.site} added successfully!`);
    }

    // Clear form after saving
    setform({ site: "", username: "", password: "" });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = (index) => {
    const siteName = passwords[index].site;

    // Show confirmation toast instead of native alert
    toast.warning(
      <div>
        <p className="font-bold">Delete Password?</p>
        <p>
          Are you sure you want to delete password for{" "}
          <strong>{siteName}</strong>?
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss();
              performDelete(index, siteName);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
    );
  };

  const performDelete = async (index, siteName) => {
    // Determine id for the document
    const id = passwords[index]?.id || passwords[index]?._id;
    if (!id) {
      showErrorToast("Unable to delete: missing id for this password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok || !data || !data.success) {
        showErrorToast("Failed to delete password on server.");
        return;
      }

      const newPasswords = passwords.filter((_, i) => i !== index);
      setPasswords(newPasswords);

      if (editingIndex === index) {
        setform({ site: "", username: "", password: "" });
        setEditingIndex(null);
      }

      showSuccessToast(`Password for ${siteName} deleted successfully!`);
    } catch (err) {
      console.error("Delete request failed:", err);
      showErrorToast("Network error while deleting password.");
    }
  };

  const handleEdit = (index) => {
    // Load the password data into the form
    setform(passwords[index]);
    setEditingIndex(index);

    showInfoToast(`Editing password for ${passwords[index].site}`);

    // Scroll to the form for better UX
    document
      .querySelector(".mycontainer")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = async (index) => {
    try {
      await navigator.clipboard.writeText(passwords[index].password);
      setCopiedIndex(index);

      showSuccessToast("Password copied to clipboard!");

      // Reset copied indicator after 2 seconds
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = passwords[index].password;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedIndex(index);

      showSuccessToast("Password copied to clipboard!");

      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const cancelEdit = () => {
    if (form.site || form.username || form.password) {
      showInfoToast("Edit cancelled");
    }
    setform({ site: "", username: "", password: "" });
    setEditingIndex(null);
  };

  return (
    <>
      {/* Toast Container with themed class names */}
      <ToastContainer
        className="toastify-container"
        toastClassName={({ type }) =>
          `Toastify__toast Toastify__toast--${type} flex items-center`
        }
        bodyClassName={() => `toast-body`}
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <div className="mx-auto mycontainer px-3 sm:px-4 md:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center pt-2">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/ &gt;</span>
        </h1>
        <p className="text-green-900 text-sm sm:text-base md:text-lg text-center mb-6">
          Your personal Password Manager
        </p>

        {/* Edit mode indicator */}
        {editingIndex !== null && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 sm:p-4 mb-4 rounded mt-2">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <span className="font-bold text-sm sm:text-base">
                  Edit Mode
                </span>
                <p className="text-xs sm:text-sm truncate">
                  Editing: {passwords[editingIndex]?.site}
                </p>
              </div>
              <button
                onClick={cancelEdit}
                className="text-gray-600 hover:text-gray-800 shrink-0"
              >
                <span className="material-icons text-lg sm:text-xl">close</span>
              </button>
            </div>
          </div>
        )}

        <div className="text-black flex flex-col p-3 sm:p-4 gap-4 md:gap-6 items-center">
          <input
            className="rounded-full border border-green-700 w-full p-3 sm:p-4 py-2 text-sm sm:text-base"
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 md:gap-6">
            <input
              className="rounded-full border border-green-700 w-full p-3 sm:p-4 py-2 text-sm sm:text-base"
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative w-full">
              <input
                className="rounded-full border border-green-700 w-full p-3 sm:p-4 py-2 pr-12 text-sm sm:text-base"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-icons text-lg sm:text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={savePassword}
              className="bg-green-500 flex justify-center items-center gap-2 border-2 rounded-full hover:bg-green-400 px-4 sm:px-6 md:px-8 py-2 text-sm sm:text-base"
            >
              <span className="material-icons font-bold text-lg">
                {editingIndex !== null ? "save" : "add"}
              </span>
              {editingIndex !== null ? "Save Changes" : "Add Password"}
            </button>

            {editingIndex !== null && (
              <button
                onClick={cancelEdit}
                className="bg-gray-300 flex justify-center items-center gap-2 border-2 rounded-full hover:bg-gray-400 px-4 sm:px-6 md:px-8 py-2 text-sm sm:text-base"
              >
                <span className="material-icons font-bold text-lg">cancel</span>
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        <div className="bg-purple-200 rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
          <h2 className="text-xl sm:text-2xl font-bold p-4">Your Passwords</h2>
          {passwords.length === 0 && (
            <div className="p-4 text-center font-bold text-lg sm:text-xl text-green-600">
              No Passwords To Show
            </div>
          )}
          {passwords.length !== 0 && (
            <>
              {/* Mobile Card View */}
              <div className="block md:hidden divide-y divide-gray-200">
                {passwords.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white p-4 ${
                      editingIndex === index ? "bg-yellow-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <a
                          href={
                            item.site && item.site.startsWith("http")
                              ? item.site
                              : item.site
                              ? `https://${item.site}`
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm truncate block"
                        >
                          {item.site || "N/A"}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className={`${
                            editingIndex === index
                              ? "text-yellow-600"
                              : "text-blue-500"
                          } p-1`}
                          type="button"
                          title="Edit"
                        >
                          <span className="material-icons text-lg">
                            {editingIndex === index ? "edit_note" : "edit"}
                          </span>
                        </button>
                        <button
                          onClick={() => handleCopy(index)}
                          className={`${
                            copiedIndex === index
                              ? "text-green-500"
                              : "text-gray-400"
                          } p-1`}
                          type="button"
                          title="Copy"
                        >
                          <span className="material-icons text-base">
                            {copiedIndex === index ? "check" : "content_copy"}
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-gray-500 hover:text-red-700 p-1"
                          type="button"
                          title="Delete"
                        >
                          <span className="material-icons text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-500 text-xs block mb-1">
                          Username
                        </span>
                        <p className="text-gray-900 text-sm truncate bg-gray-50 p-2 rounded">
                          {item.username}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs block mb-1">
                          Password
                        </span>
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-gray-600 text-sm">
                            ••••••••
                          </span>
                          <span className="text-gray-400 text-xs">Hidden</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Website
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Username
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Password
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {passwords.map((item, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-50 ${
                          editingIndex === index ? "bg-yellow-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3 max-w-[200px]">
                          <a
                            href={
                              item.site.startsWith("http")
                                ? item.site
                                : `https://${item.site}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline text-sm truncate block"
                            title={item.site}
                          >
                            {item.site}
                          </a>
                        </td>
                        <td className="px-4 py-3 max-w-[180px]">
                          <span
                            className="text-gray-900 text-sm truncate block"
                            title={item.username}
                          >
                            {item.username}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-600 text-sm">
                              ••••••••
                            </span>
                            <button
                              onClick={() => handleCopy(index)}
                              className={`${
                                copiedIndex === index
                                  ? "text-green-500"
                                  : "text-gray-400"
                              } hover:text-gray-600`}
                              type="button"
                              title="Copy password"
                            >
                              <span className="material-icons text-base">
                                {copiedIndex === index
                                  ? "check"
                                  : "content_copy"}
                              </span>
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(index)}
                              className={`${
                                editingIndex === index
                                  ? "text-yellow-600"
                                  : "text-blue-500"
                              } hover:opacity-80`}
                              type="button"
                              title="Edit"
                            >
                              <span className="material-icons text-base">
                                {editingIndex === index ? "edit_note" : "edit"}
                              </span>
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-gray-500 hover:text-red-700"
                              type="button"
                              title="Delete"
                            >
                              <span className="material-icons text-base">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
