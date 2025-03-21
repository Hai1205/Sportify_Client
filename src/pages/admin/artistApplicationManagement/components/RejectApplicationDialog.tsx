import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface User {
  fullName: string;
  email: string;
  avatarUrl: string;
}

interface Application {
  user: User;
}

interface RejectApplicationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
  application?: Application | null;
}

const RejectApplicationDialog: React.FC<RejectApplicationDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  application,
}) => {
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState<string>("");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Artist Application</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting{" "}
            {application?.user.fullName}'s application.
          </DialogDescription>
        </DialogHeader>

        {application && (
          <div className="py-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={application.user.avatarUrl}
                  alt={application.user.fullName}
                />
                <AvatarFallback>
                  {application.user.fullName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{application.user.fullName}</h3>
                <p className="text-sm text-muted-foreground">{application.user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Select onValueChange={setRejectionReason}>
                  <SelectTrigger id="rejection-reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="insufficient-content">Insufficient content</SelectItem>
                    <SelectItem value="quality-issues">Quality issues</SelectItem>
                    <SelectItem value="incomplete-information">Incomplete profile</SelectItem>
                    <SelectItem value="copyright-concerns">Copyright concerns</SelectItem>
                    <SelectItem value="platform-fit">Not a good fit</SelectItem>
                    <SelectItem value="other">Other (please specify)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="rejection-details">Additional Details</Label>
                <Textarea
                  id="rejection-details"
                  placeholder="Provide additional feedback"
                  rows={4}
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="allow-reapply" defaultChecked />
                <label htmlFor="allow-reapply" className="text-sm font-medium">
                  Allow reapplication after 30 days
                </label>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => onConfirm(rejectionReason)} disabled={!rejectionReason}>
            Reject Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectApplicationDialog;
