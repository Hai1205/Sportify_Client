import { useState } from "react";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/useUserStore";

interface AddUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddUserDialog = ({ isOpen, onOpenChange }: AddUserDialogProps) => {
  const { isLoading, createUser } = useUserStore();

  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    password: "",
    email: "",
    role: "",
  });

  const createUserData = (field: keyof typeof userData, value: any) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateUser = async () => {
    if (userData) {
      const isEmpty = Object.values(userData).some(
        (value) => value.trim() === ""
      );

      if (isEmpty) {
        toast.error("Please fill in all fields.");
        return;
      }

      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("fullName", userData.fullName);
      formData.append("password", userData.password);
      formData.append("email", userData.email);
      formData.append("role", userData.role);

      const res = await createUser(formData);

      if (res) {
        setUserData({
          username: "",
          fullName: "",
          password: "",
          email: "",
          role: "",
        });

        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>

          <DialogDescription>
            Create a new user account in the system.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={userData?.email}
              onChange={(e) => createUserData("email", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="Enter username"
              value={userData?.username}
              onChange={(e) => createUserData("username", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>

            <Input
              id="fullName"
              type="fullName"
              placeholder="Enter full name"
              value={userData?.fullName}
              onChange={(e) => createUserData("fullName", e.target.value)}
            />

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={userData?.password}
                onChange={(e) => createUserData("password", e.target.value)}
              />
            </div>

            <Label htmlFor="role">Role</Label>

            <Select
              value={userData?.role}
              onValueChange={(value) => createUserData("role", value)}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="user">User</SelectItem>

                <SelectItem value="artist">Artist</SelectItem>

                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setUserData({
                username: "",
                fullName: "",
                password: "",
                email: "",
                role: "",
              });

              onOpenChange(false);
            }}
          >
            Cancel
          </Button>

          <Button onClick={handleCreateUser} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Creating...
              </>
            ) : (
              <>Create User</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
