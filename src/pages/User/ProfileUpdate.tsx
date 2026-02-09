import { useState } from "react";



import { Button } from "@/components/ui/button";
import { useUserInfoQuery, useUserInfoUpdateMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";

export default function ProfileUpdate() {
  const { data:user, isLoading } = useUserInfoQuery(undefined);
  const [updateProfile] = useUserInfoUpdateMutation();  
  const navigate = useNavigate();


  const [phone, setPhone] = useState(user?.data?.phone || "");
  const [address, setAddress] = useState(user?.data?.address || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ _id: user?.data?._id, phone, address }).unwrap();      
      navigate(-1);
    } catch (err) {
      console.error(err);      
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
            required
          />
        </div>

        <Button type="submit" className="w-full mt-4" size="lg">
          Update Profile
        </Button>
      </form>
    </div>
  );
}
