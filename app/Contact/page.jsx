import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto my-20 w-1/3 border text-indigo-600 bg-white">
      <div className="p-5 space-y-5 shadow-xl">
        <h4 className="text-center text-3xl">Contact Us</h4>
        <form>
          <div className="grid grid-cols-2 gap-5">
            <input
              className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
              placeholder="First Name"
              type="text"
            />
            <input
              className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
              placeholder="Last Name"
              type="text"
            />
            <input
              className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
              placeholder="Email"
              type="email"
            />
            <input
              className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
              placeholder="Phone"
              type="number"
            />
            <textarea
              cols={10}
              rows={5}
              className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
              placeholder="Write your message..."
            />
          </div>
          <input
            className="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full cursor-pointer"
            type="submit"
            value="Send Message"
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;
