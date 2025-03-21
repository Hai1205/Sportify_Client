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
import { User } from "@/utils/types";
import { useAuthStore } from "@/stores/useAuthStore";

interface AddUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddUserDialog = ({ isOpen, onOpenChange }: AddUserDialogProps) => {
  const { register } = useAuthStore();
  
  const [userData, setUserData] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  
  const handleChange = (field: keyof User, value: string) => {
    if (userData) {
      setUserData({ ...userData, [field]: value });
    }
  };
  const [role, setRole] = useState("");

  const handleCreateUser = () => {
    if (userData) {
      const data = new FormData();
      data.append("username", userData.username);
      data.append("fullName", userData.fullName);
      data.append("password", password);
      data.append("email", userData.email);
      data.append("role", role);

      register(data);
      onOpenChange(false);
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
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="Enter username"
              value={userData?.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>

            <Input
              id="fullName"
              type="fullName"
              placeholder="Enter full name"
              value={userData?.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Label htmlFor="role">Role</Label>

            <Select defaultValue={userData?.role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="user">User</SelectItem>

                <SelectItem value="artist">Artist</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleCreateUser}>Create User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
