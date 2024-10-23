import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { XIcon, EyeIcon, EyeOffIcon, UserIcon, MailIcon, PhoneIcon } from '@heroicons/react/solid';

interface IUser {
  _id: string;
  name: string;
  email: string;
  profilepic?: string;
  mobile?: string;
  firstname?: string;
  lastname?: string;
}

Modal.setAppElement('#root'); // Set the root element for the modal

const Profile: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  // Modals visibility state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/user/admin/getuser');
        const userData = response.data.getaUser;
        setUser(userData);
        setFirstname(userData.firstname || '');
        setLastname(userData.lastname || '');
        setEmail(userData.email || '');
        setMobile(userData.mobile || '');
      } catch (error) {
        setError('Failed to load user profile.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('mobile', mobile);
    if (profilePicture) {
      formData.append('image', profilePicture);
    }

    try {
      const response = await axios.put('/user/admin/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile updated successfully!');
      setUser(response.data.user);
      setIsProfileModalOpen(false); // Close modal on success
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Failed to update profile.');
    }
  };

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await axios.put('/user/admin/updatepassword', {
        password,
      });
      alert('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
      setIsPasswordModalOpen(false); // Close modal on success
    } catch (error) {
      console.error('Error updating password', error);
      alert('Failed to update password.');
    }
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">User Profile</h2>
      {user && (
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Left side: Profile Details */}
          <div className="bg-white rounded-lg shadow p-6 w-full lg:w-1/2 mb-4 lg:mb-0">
            <div className="flex items-center mb-4">
              <img
                src={user.profilepic}
                alt="Profile"
                className="w-24 h-24 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{`${user.firstname} ${user.lastname}`}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.mobile}</p>
              </div>
            </div>
          </div>

          {/* Right side: Buttons for updating */}
          <div className="flex flex-col space-y-4 w-full lg:w-1/2">
            <div className="flex space-x-4">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex-1"
              >
                Update Profile
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded flex-1"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Update Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onRequestClose={() => setIsProfileModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
        style={{
          content: {
            maxWidth: '600px',
            maxHeight: '500px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            overflowY: 'auto'
          }
        }}
      >
        <button onClick={() => setIsProfileModalOpen(false)} className="absolute top-4 right-4">
          <XIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h3 className="text-2xl font-bold mb-4">Update Profile</h3>

        <label className="block text-sm font-bold mb-2">First Name:</label>
        <div className="relative mb-4">
          <UserIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="border rounded p-2 pl-10 w-full"
          />
        </div>

        <label className="block text-sm font-bold mb-2">Last Name:</label>
        <div className="relative mb-4">
          <UserIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="border rounded p-2 pl-10 w-full"
          />
        </div>

        <label className="block text-sm font-bold mb-2">Email:</label>
        <div className="relative mb-4">
          <MailIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 pl-10 w-full"
          />
        </div>

        <label className="block text-sm font-bold mb-2">Mobile:</label>
        <div className="relative mb-4">
          <PhoneIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border rounded p-2 pl-10 w-full"
          />
        </div>

        <label className="block text-sm font-bold mb-2">Profile Picture:</label>
        <input type="file" onChange={handleFileChange} className="mb-4" />

        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-6"
        >
          Save Changes
        </button>
      </Modal>

      {/* Password Update Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onRequestClose={() => setIsPasswordModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={() => setIsPasswordModalOpen(false)} className="absolute top-4 right-4">
          <XIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h3 className="text-2xl font-bold mb-4">Update Password</h3>

        <label className="block text-sm font-bold mb-2">New Password:</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2">
            {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
          </button>
        </div>

        <label className="block text-sm font-bold mb-2">Confirm Password:</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2">
            {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
          </button>
        </div>

        <button
          onClick={handleUpdatePassword}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Save Password
        </button>
      </Modal>
    </div>
  );
};

export default Profile;
