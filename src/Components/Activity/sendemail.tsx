import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPaperPlane, FaEnvelope, FaTag, FaEdit, FaPaperclip } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const SendEmail = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className=" shadow-2xl rounded-lg max-w-4xl w-full p-10 lg:p-12 ">
        <h2 className="text-4xl font-bold text-white mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4 ">Send Email</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaEnvelope className="absolute left-3 text-gray-500" />
              <input
                id="to"
                type="email"
                placeholder="Recipient's Email"
                {...register('to', { required: 'Recipient email is required' })}
                className="w-full pl-10 pr-4 py-3 border-none rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaTag className="absolute left-3 text-gray-500" />
              <input
                id="subject"
                type="text"
                placeholder="Email Subject"
                {...register('subject', { required: 'Subject is required' })}
                className="w-full pl-10 pr-4 py-3 border-none rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <div className="relative">
              <ReactQuill
                value={message}
                onChange={setMessage}
                placeholder="Type your message here..."
                className="h-48   rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              
            </div>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="attachment" className="block text-sm font-medium mt-18 text-gray-700 mb-4">Attachments</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaPaperclip className="absolute left-3 text-gray-500" />
              <input
                id="attachment"
                type="file"
                {...register('attachment')}
                className="w-full pl-10 pr-4 py-3 border-none rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-md shadow-sm hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            <FaPaperPlane className="mr-3 text-lg" />
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEmail;
