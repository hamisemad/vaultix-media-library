
function SignUpModal({isOpen, onClose}) {
    if(!isOpen) return(null);
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-slate-800 rounded-xl drop-shadow-[0_0_16px_rgba(59,130,246,0.8)] relative w-[30em] py-20 p-14 m-6">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded mb-3"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-400"
          >
            Sign Up
          </button>
        </form>
      </div>

    </div>
  )
}

export default SignUpModal;