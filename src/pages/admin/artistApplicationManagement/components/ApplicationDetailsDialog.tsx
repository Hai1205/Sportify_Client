import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, User } from "lucide-react";
import { ArtistApplication } from "@/utils/types";

interface ApplicationDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedApplication: ArtistApplication | null;
  onApprove: (application: ArtistApplication) => void;
  onReject: (application: ArtistApplication) => void;
}

const ApplicationDetailsDialog = ({
  isOpen,
  onOpenChange,
  selectedApplication,
  onApprove,
  onReject,
}: ApplicationDetailsDialogProps) => {
  if (!selectedApplication) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>ArtistApplication Details</DialogTitle>
          <DialogDescription>
            Review the artist application from{" "}
            {selectedApplication.user.username}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-10rem)]">
          <div className="grid gap-6 py-4 px-1">
            <div className="flex gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={selectedApplication.user.avatarUrl}
                  alt={selectedApplication.user.fullName}
                />
                <AvatarFallback>
                  {selectedApplication.user.fullName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-2xl font-bold">
                  {selectedApplication.user.fullName}
                </h2>
                <p className="text-muted-foreground">
                  {selectedApplication.user.username} •{" "}
                  {selectedApplication.user.email}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedApplication.user.genres.map((genre, index) => (
                    <Badge key={index} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {selectedApplication.user.followers.length} followers
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Artist Bio</h3>
                <p className="text-sm">{selectedApplication.user.biography}</p>

                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Achievements
                </h3>
                <p className="text-sm">{selectedApplication.achievements}</p>

                <h3 className="text-lg font-semibold mt-4 mb-2">
                  ArtistApplication Reason
                </h3>
                <p className="text-sm">{selectedApplication.reason}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Music Samples</h3>
                <div className="space-y-3">
                  {selectedApplication.songs.map((song, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-md border"
                    >
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <div>
                          <p className="font-medium text-sm">{song.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {song.duration}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 gap-1">
                        <ExternalLink className="h-3 w-3" />
                        <span className="text-xs">Listen</span>
                      </Button>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Social Media
                </h3>
                <div className="space-y-2">
                  {Object.entries(selectedApplication.website).map(
                    ([platform, link]) => (
                      <div
                        key={platform}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm capitalize">{platform}:</span>
                        <span className="text-sm font-medium">{link}</span>
                      </div>
                    )
                  )}
                </div>

                <h3 className="text-lg font-semibold mt-4 mb-2">
                  ArtistApplication Info
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Submitted:</span>
                    <span className="text-sm font-medium">
                      {selectedApplication.created_at}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant="outline" className="capitalize">
                      {selectedApplication.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="destructive"
            onClick={() => onReject(selectedApplication)}
          >
            Reject
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={() => onApprove(selectedApplication)}>
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsDialog;
