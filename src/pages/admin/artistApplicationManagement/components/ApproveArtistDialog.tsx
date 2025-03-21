import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface ApproveArtistDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedApplication: {
    user: {
      fullName: string;
      avatarUrl: string;
      email: string;
    };
  } | null;
  confirmApprove: () => void;
}

export default function ApproveArtistDialog({
  isOpen,
  onOpenChange,
  selectedApplication,
  confirmApprove
}: ApproveArtistDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Artist Application</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve{" "}
            {selectedApplication?.user.fullName}'s application?
          </DialogDescription>
        </DialogHeader>

        {selectedApplication && (
          <div className="py-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={selectedApplication.user.avatarUrl}
                  alt={selectedApplication.user.fullName}
                />
                <AvatarFallback>
                  {selectedApplication.user.fullName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-medium">{selectedApplication.user.fullName}</h3>
                <p className="text-sm text-muted-foreground">{selectedApplication.user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="artist-tier">Artist Tier</Label>
                <Select defaultValue="standard">
                  <SelectTrigger id="artist-tier">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Artist</SelectItem>
                    <SelectItem value="verified">Verified Artist</SelectItem>
                    <SelectItem value="featured">Featured Artist</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This determines the artist's visibility and features
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="approval-notes">Approval Notes (Optional)</Label>
                <Textarea
                  id="approval-notes"
                  placeholder="Add any notes or special instructions for this artist"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="send-welcome" defaultChecked />
                <label
                  htmlFor="send-welcome"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Send welcome email with onboarding instructions
                </label>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={confirmApprove}>Approve Application</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
