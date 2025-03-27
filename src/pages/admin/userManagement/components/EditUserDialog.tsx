import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
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

const EditUserDialog = ({
  isOpen,
  onOpenChange,
  user,
}: EditUserDialogProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const { updateUser } = useUserStore();

  useEffect(() => {
    if (!isOpen) {
      setUserData(null);
    } else {
      setUserData(user);
    }
  }, [isOpen, user]);

  const handleChange = (field: keyof User, value: string) => {
    setUserData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleClose = () => {
    setUserData(null);
    onOpenChange(false);
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
      handleClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Edit User
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    Update user information and preferences.
                  </p>
                </div>

                {userData && (
                  <div className="grid gap-4 py-4">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={userData.avatarUrl}
                          alt={userData.fullName}
                        />
                        <AvatarFallback>
                          {userData.fullName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>

                    {/* Name & Role */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-fullName">Full Name</Label>
                        <Input
                          id="edit-fullName"
                          value={userData.fullName}
                          onChange={(e) =>
                            handleChange("fullName", e.target.value)
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-role">Email</Label>
                        <Input
                          id="edit-role"
                          type="text"
                          value={userData.role}
                          onChange={(e) => handleChange("role", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div className="grid gap-2">
                      <Label htmlFor="edit-country">Country</Label>
                      <Select
                        value={userData.country.toLowerCase()}
                        onValueChange={(value) =>
                          handleChange("country", value)
                        }
                      >
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
                      <Textarea
                        id="edit-biography"
                        value={userData.biography ?? ""}
                        onChange={(e) =>
                          handleChange("biography", e.target.value)
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="border-gray-700 text-white hover:bg-red-500 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditUserDialog;
