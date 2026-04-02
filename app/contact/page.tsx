"use client";
export default function Page() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phonenumber = e.target.phonenumber.value;
    const message = e.target.message.value;

    if (!email && !phonenumber) {
      alert("Please enter either Email or Phone Number");
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, phonenumber, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert("Thank you, We will Reply you Shortly.");

      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex h-50 w-50 flex-col gap-2">
        <div>
          <p className="font-comfortaa text-lg font-semibold">Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="rounded-lg border border-gray-500 px-2 py-1 placeholder:text-gray-600"
          />
        </div>
        <div>
          <p className="font-comfortaa text-lg font-semibold">Email</p>
          <input
            name="email"
            placeholder="Enter Email id.."
            className="rounded-lg border border-gray-500 px-2 py-1 placeholder:text-gray-600"
          />
        </div>
        <div>
          <p className="font-comfortaa text-lg font-semibold">Phone Number</p>
          <input
            type="number"
            name="phonenumber"
            placeholder="Enter phone number"
            className="rounded-lg border border-gray-500 px-2 py-1 placeholder:text-gray-600"
          />
        </div>
        <div>
          <p className="font-comfortaa text-lg font-semibold">Message</p>
          <textarea
            name="message"
            placeholder="Write your message"
            className="rounded-lg border border-gray-500 px-2 py-1 placeholder:text-gray-600"
          />
        </div>

        <button className="cursor-pointer rounded-2xl border bg-blue-600 p-2 text-lg font-semibold text-white duration-300 hover:scale-105">
          Submit
        </button>
      </form>
    </div>
  );
}
