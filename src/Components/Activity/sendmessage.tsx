import React, { useState } from 'react';
import { FaPaperPlane, FaUser } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const SendMessagePage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'John Doe',
      message: 'Hey, how are you?',
      time: '10:30 AM',
      type: 'received',
      image: '/pic1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'I am good, how about you?',
      time: '10:32 AM',
      type: 'sent',
      image: '/pic2.jpg',
    },
    {
      id: 3,
      name: 'John Doe',
      message: 'Doing great! What are you up to?',
      time: '10:35 AM',
      type: 'received',
      image: '/pic1.jpg',
    },
  ]);

  const onSubmit = async (data) => {
    setSending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const newMessage = {
        id: Date.now(),
        name: data.name,
        message: data.message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent',
        image: 'https://via.placeholder.com/40/ff0055/ff0055.png?text=JS',
      };
      setMessages([newMessage, ...messages]);
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className=" bg-gradient-to-r from-teal-500 to-blue-500 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Send Message Section */}
        <div className="bg-white rounded-lg shadow-md w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Send Message</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <FaUser className="text-md absolute left-3 text-gray-500 bottom-5" />
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className={`block w-full border border-gray-300 rounded-lg py-4 px-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                {...register('message', { required: 'Message is required' })}
                className={`block w-full border border-gray-300 rounded-lg py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Your Message"
                rows={6}
              />
              {errors.message && (
                <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-teal-500 ${sending ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={sending}
            >
              {sending ? (
                <span>Sending...</span>
              ) : (
                <>
                  <FaPaperPlane className="mr-3 text-lg" />
                  Send
                </>
              )}
            </button>
          </form>
        </div>

        {/* Chat Section */}
        <div className="bg-white rounded-lg shadow-md w-full md:w-1/2 p-6 overflow-y-auto max-h-96">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Chat</h2>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-center space-x-2 ${msg.type === 'sent' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-4 rounded-2xl max-w-xs ${msg.type === 'sent' ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    <p className="font-semibold">{msg.name}</p>
                    <p>{msg.message}</p>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <img
                    src={msg.image}
                    alt="Profile"
                    className="rounded-full w-10 h-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
