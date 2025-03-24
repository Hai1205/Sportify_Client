import { Mic2, Save, Shield, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const SettingPage = () => {
  const {
    isAdmin,
    isArtist,
    user: userAuth,
    isLoading: isAuthLoading,
    changePassword,
  } = useAuthStore();
  const { isLoading: isUserLoading, updateUser } = useUserStore();

  const handleChangePassword = () => {
    const formData = new FormData();
    if (!userAuth) {
      console.log("User not found");

      return;
    }
    changePassword(userAuth?.id, formData);
  };

  const handleUpdateUser = () => {
    const formData = new FormData();
    if (!userAuth) {
      console.log("User not found");

      return;
    }
    updateUser(userAuth?.id, formData);
    console.log("is", isUserLoading);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

        <p className="text-muted-foreground">
          Manage your account settings and platform preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <User className="h-4 w-4" />

            <span className="hidden sm:inline-block">General</span>
          </TabsTrigger>

          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />

            <span className="hidden sm:inline-block">Security</span>
          </TabsTrigger>

          {!(isArtist || isAdmin) && (
            <TabsTrigger value="artist" className="flex items-center gap-2">
              <Mic2 className="h-4 w-4" />

              <span className="hidden sm:inline-block">Artist</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>

              <CardDescription>
                Manage your basic account information and preferences.
              </CardDescription>
            </CardHeader>

            <CardContent className="h-[280px] space-y-4">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>

                <Input
                  id="username"
                  defaultValue={userAuth?.username}
                  readOnly
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>

                <Input id="email" defaultValue={userAuth?.email} readOnly />
              </div>

              <div className="space-y-1">
                <Label htmlFor="fullName">Full name</Label>

                <Input id="name" defaultValue={userAuth?.fullName} />
              </div>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => handleUpdateUser()}
                disabled={isUserLoading}
                className="gap-1"
              >
                {isUserLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>

              <CardDescription>
                Manage your account security and authentication methods.
              </CardDescription>
            </CardHeader>

            <CardContent className="h-[280px] space-y-4">
              <div className="space-y-1">
                <Label htmlFor="current-password">Current Password</Label>

                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="new-password">New Password</Label>

                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => handleChangePassword()}
                disabled={isAuthLoading}
                className="gap-1"
              >
                {isAuthLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="artist">
          <Card>
            <CardHeader>
              <CardTitle>Artist Application</CardTitle>

              <CardDescription>
                Apply to become a verified artist on Spotify
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* <Alert variant="info" className="bg-blue-50 dark:bg-blue-950">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>About Artist Accounts</AlertTitle>
                <AlertDescription>
                  Artist accounts allow you to upload music, access analytics,
                  and promote your content to a wider audience. Applications are
                  typically reviewed within 5-7 business days.
                </AlertDescription>
              </Alert> */}
              <ScrollArea className="h-[260px] w-full">
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="artist-name">Artist/Band Name</Label>

                    <Input
                      id="artist-name"
                      placeholder="Your artist or band name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="genres">Primary Genre</Label>

                      <Select>
                        <SelectTrigger id="genres">
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="pop">Pop</SelectItem>

                          <SelectItem value="rock">Rock</SelectItem>

                          <SelectItem value="hip-hop">Hip-Hop</SelectItem>

                          <SelectItem value="r&b">R&B</SelectItem>

                          <SelectItem value="country">Country</SelectItem>

                          <SelectItem value="electronic">Electronic</SelectItem>

                          <SelectItem value="jazz">Jazz</SelectItem>

                          <SelectItem value="classical">Classical</SelectItem>

                          <SelectItem value="folk">Folk</SelectItem>

                          <SelectItem value="indie">Indie</SelectItem>

                          <SelectItem value="alternative">
                            Alternative
                          </SelectItem>

                          <SelectItem value="metal">Metal</SelectItem>

                          <SelectItem value="latin">Latin</SelectItem>

                          <SelectItem value="k-pop">K-Pop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="secondary-genres">
                        Secondary Genres (Optional)
                      </Label>

                      <Select>
                        <SelectTrigger id="secondary-genres">
                          <SelectValue placeholder="Select genres" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="pop">Pop</SelectItem>

                          <SelectItem value="rock">Rock</SelectItem>

                          <SelectItem value="hip-hop">Hip-Hop</SelectItem>

                          <SelectItem value="r&b">R&B</SelectItem>

                          <SelectItem value="country">Country</SelectItem>

                          <SelectItem value="electronic">Electronic</SelectItem>

                          <SelectItem value="jazz">Jazz</SelectItem>

                          <SelectItem value="classical">Classical</SelectItem>

                          <SelectItem value="folk">Folk</SelectItem>

                          <SelectItem value="indie">Indie</SelectItem>

                          <SelectItem value="alternative">
                            Alternative
                          </SelectItem>

                          <SelectItem value="metal">Metal</SelectItem>

                          <SelectItem value="latin">Latin</SelectItem>

                          <SelectItem value="k-pop">K-Pop</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        You can select multiple genres
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="artist-bio">Artist Biography</Label>

                    <Textarea
                      id="artist-bio"
                      placeholder="Tell us about yourself, your music style, and your journey as an artist"
                      rows={4}
                    />

                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum 100 characters
                    </p>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="achievements">Notable Achievements</Label>

                    <Textarea
                      id="achievements"
                      placeholder="List any notable achievements, performances, or milestones in your music career"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Social Media Links</Label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="instagram" className="text-sm">
                          Instagram
                        </Label>

                        <Input id="instagram" placeholder="@username" />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="twitter" className="text-sm">
                          Twitter
                        </Label>

                        <Input id="twitter" placeholder="@username" />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="youtube" className="text-sm">
                          YouTube
                        </Label>

                        <Input id="youtube" placeholder="Channel URL" />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="website" className="text-sm">
                          Website (Optional)
                        </Label>

                        <Input
                          id="website"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Music Samples</Label>

                    <p className="text-sm text-muted-foreground">
                      Upload at least 3 music samples that represent your work
                    </p>

                    <div className="grid gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Sample 1</h4>

                          <Badge>Required</Badge>
                        </div>

                        <div className="grid gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="sample1-title">Track Title</Label>

                            <Input
                              id="sample1-title"
                              placeholder="Enter track title"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="sample1-file">Audio File</Label>

                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="sample1-file"
                                className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>

                                  <p className="text-xs text-muted-foreground">
                                    MP3, WAV or FLAC (max. 10MB)
                                  </p>
                                </div>

                                <Input
                                  id="sample1-file"
                                  type="file"
                                  accept="audio/*"
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Sample 2</h4>

                          <Badge>Required</Badge>
                        </div>

                        <div className="grid gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="sample2-title">Track Title</Label>

                            <Input
                              id="sample2-title"
                              placeholder="Enter track title"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="sample2-file">Audio File</Label>

                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="sample2-file"
                                className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>

                                  <p className="text-xs text-muted-foreground">
                                    MP3, WAV or FLAC (max. 10MB)
                                  </p>
                                </div>

                                <Input
                                  id="sample2-file"
                                  type="file"
                                  accept="audio/*"
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Sample 3</h4>
                          <Badge>Required</Badge>
                        </div>

                        <div className="grid gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="sample3-title">Track Title</Label>

                            <Input
                              id="sample3-title"
                              placeholder="Enter track title"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="sample3-file">Audio File</Label>

                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="sample3-file"
                                className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />

                                  <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>

                                  <p className="text-xs text-muted-foreground">
                                    MP3, WAV or FLAC (max. 10MB)
                                  </p>
                                </div>

                                <Input
                                  id="sample3-file"
                                  type="file"
                                  accept="audio/*"
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="application-reason">
                      Why do you want to become a verified artist?
                    </Label>

                    <Textarea
                      id="application-reason"
                      placeholder="Explain why you want to become a verified artist and how you plan to use the platform"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />

                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-spotify-green hover:underline"
                        >
                          Artist Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>

              <Button>Submit Application</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingPage;
