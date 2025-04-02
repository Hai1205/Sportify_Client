import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRY_CHOICE } from "@/utils/tuple";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading";
import { User } from "@/utils/types";

interface GeneralTabProps {
  userData: User;
  handleInfoChange: (field: keyof User, value: string) => void;
  handleSaveInfo: () => void;
  isUserLoading: boolean;
  previewAvatar: string;
  userAuth: User;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GeneralTab = ({
  userData,
  handleInfoChange,
  handleSaveInfo,
  isUserLoading,
  previewAvatar,
  userAuth,
  handleAvatarChange,
}: GeneralTabProps) => {
  return (
    <TabsContent value="general">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your profile informations.</CardDescription>
        </CardHeader>

        <CardContent className="h-[265px] space-y-6">
          <ScrollArea className="h-[35vh] pr-4 mt-4">
            {userAuth && (
              <div className="grid gap-4">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-20 w-20 rounded-full">
                    <AvatarImage
                      src={previewAvatar || userAuth.avatarUrl}
                      alt={userAuth.fullName}
                    />
                    <AvatarFallback>
                      {userAuth.fullName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="relative">
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("avatar-upload")?.click()
                      }
                    >
                      Change Avatar
                    </Button>
                  </div>
                </div>

                {/* Username and email */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Username</Label>
                    <Input value={userData?.username || ""} readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input value={userData?.email || ""} readOnly />
                  </div>
                </div>

                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="edit-fullName">Full Name</Label>
                  <Input
                    id="edit-fullName"
                    value={userData?.fullName || ""}
                    onChange={(e) =>
                      handleInfoChange("fullName", e.target.value)
                    }
                    placeholder="Enter full name"
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                  <Label>Social Media Links</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="edit-instagram" className="text-sm">
                        Instagram
                      </Label>
                      <Input
                        id="edit-instagram"
                        value={userData?.instagram || ""}
                        onChange={(e) =>
                          handleInfoChange("instagram", e.target.value)
                        }
                        placeholder="Enter Instagram link"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="edit-twitter" className="text-sm">
                        Twitter
                      </Label>
                      <Input
                        id="edit-twitter"
                        value={userData?.twitter || ""}
                        onChange={(e) =>
                          handleInfoChange("twitter", e.target.value)
                        }
                        placeholder="Enter Twitter link"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="edit-youtube" className="text-sm">
                        YouTube
                      </Label>
                      <Input
                        id="edit-youtube"
                        value={userData?.youtube || ""}
                        onChange={(e) =>
                          handleInfoChange("youtube", e.target.value)
                        }
                        placeholder="Enter YouTube link"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="edit-facebook" className="text-sm">
                        Facebook
                      </Label>
                      <Input
                        id="edit-facebook"
                        value={userData?.facebook || ""}
                        onChange={(e) =>
                          handleInfoChange("facebook", e.target.value)
                        }
                        placeholder="Enter Facebook link"
                      />
                    </div>
                  </div>
                </div>

                {/* Website (Optional) */}
                <div className="grid gap-2">
                  <Label htmlFor="edit-website">Website (Optional)</Label>
                  <Input
                    id="edit-website"
                    value={userData?.website || ""}
                    onChange={(e) =>
                      handleInfoChange("website", e.target.value)
                    }
                    placeholder="Enter website link"
                  />
                </div>

                {/* Country */}
                <div className="grid gap-2">
                  <Label htmlFor="edit-country">Country</Label>
                  <Select
                    value={userData?.country || ""}
                    onValueChange={(value) =>
                      handleInfoChange("country", value)
                    }
                  >
                    <SelectTrigger id="edit-country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRY_CHOICE.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Bio */}
                <div className="grid gap-2">
                  <Label htmlFor="edit-biography">Bio</Label>
                  <Textarea
                    id="edit-biography"
                    value={userData?.biography || ""}
                    onChange={(e) =>
                      handleInfoChange("biography", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleSaveInfo}
            disabled={isUserLoading}
            className="gap-1"
          >
            {isUserLoading ? (
              <>
                <LoadingSpinner />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default GeneralTab;
