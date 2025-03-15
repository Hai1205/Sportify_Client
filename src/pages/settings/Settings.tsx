import {
  Save,
  Shield,
  User,
  // Bell,
  // Globe,
  // Lock,
  // Wallet,
  //   Plus,
} from "lucide-react";
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
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";

const Settings = () => {
  const {
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
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>

              <CardDescription>
                Manage your basic account information and preferences.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>

                <Input id="username" defaultValue={userAuth?.username} />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>

                <Input id="email" defaultValue={userAuth?.email} />
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

            <CardContent className="space-y-4">
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
      </Tabs>
    </div>
  );
};

export default Settings;
