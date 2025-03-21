import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/utils/types";
import { useUserStore } from "@/stores/useUserStore";

interface EditUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

const EditUserDialog = ({ isOpen, onOpenChange, user }: EditUserDialogProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const { updateUser } = useUserStore();

  // Reset dữ liệu khi mở dialog
  useEffect(() => {
    if (isOpen) {
      setUserData(user);
    }
  }, [isOpen, user]);

  const handleChange = (field: keyof User, value: string) => {
    setUserData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = () => {
    if (userData && user) {
      const data = new FormData();
      data.append("fullName", userData.fullName);
      data.append("role", userData.role);
      data.append("status", userData.status);
      data.append("country", userData.country);
      data.append("biography", userData.biography);

      updateUser(user.id, data);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information and preferences.</DialogDescription>
        </DialogHeader>

        {userData && (
          <div className="grid gap-4 py-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userData.avatarUrl} alt={userData.fullName} />
                <AvatarFallback>{userData.fullName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>

            {/* Name & Role */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-fullName">Full Name</Label>
                <Input id="edit-fullName" value={userData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Email</Label>
                <Input id="edit-role" type="text" value={userData.role} onChange={(e) => handleChange("role", e.target.value)} />
              </div>
            </div>

            {/* Country */}
            <div className="grid gap-2">
              <Label htmlFor="edit-country">Country</Label>
              <Select value={userData.country.toLowerCase()} onValueChange={(value) => handleChange("country", value)}>
                <SelectTrigger id="edit-country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="eg">Egypt</SelectItem>
                  <SelectItem value="mx">Mexico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bio */}
            <div className="grid gap-2">
              <Label htmlFor="edit-biography">Bio</Label>
              <Textarea id="edit-biography" value={userData.biography ?? ""} onChange={(e) => handleChange("biography", e.target.value)} rows={3} />
            </div>
          </div>
        )}

        {/* Footer */}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
