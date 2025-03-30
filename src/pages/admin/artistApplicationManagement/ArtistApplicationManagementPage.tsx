import { useCallback, useState, useEffect } from "react";
import {
  Check,
  X,
  MoreHorizontal,
  Search,
  Filter,
  Calendar,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserStore } from "@/stores/useUserStore";
import { ArtistApplication } from "@/utils/types";
import ApplicationDetailsDialog from "./components/ApplicationDetailsDialog";
import ApproveArtistDialog from "./components/ApproveArtistDialog";
import RejectApplicationDialog from "./components/RejectApplicationDialog";
import { ApplicationsEmptyState } from "@/layout/components/EmptyState";
import { useSearchParams } from "react-router-dom";

export default function ArtistApplicationManagementPage() {
  const { artistApplications } = useUserStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const queryString = location.search;
  console.log(queryString);

  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<ArtistApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ status: string[] }>({
    status: [],
  });

  const filteredApplications = artistApplications.filter((application) => {
    // Filter by search query
    const matchesSearch =
      application.user.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.user.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by status
    const matchesStatus =
      activeFilters.status.length === 0 ||
      activeFilters.status.includes(application.status);

    return matchesSearch && matchesStatus;
  });

  const toggleApplicationSelection = (applicationId: string) => {
    if (selectedApplications.includes(applicationId)) {
      setSelectedApplications(
        selectedApplications.filter((id) => id !== applicationId)
      );
    } else {
      setSelectedApplications([...selectedApplications, applicationId]);
    }
  };

  const toggleAllApplications = () => {};

  const handleViewDetails = (application: (typeof artistApplications)[0]) => {
    setSelectedApplication(application);
    setIsViewDetailsOpen(true);
  };

  const handleApprove = (application: (typeof artistApplications)[0]) => {
    setSelectedApplication(application);
    setIsApproveDialogOpen(true);
  };

  const handleReject = (application: (typeof artistApplications)[0]) => {
    setSelectedApplication(application);
    setRejectionReason("");
    setIsRejectDialogOpen(true);
  };

  const confirmApprove = () => {
    // In a real app, this would send an API request to approve the application
    console.log(`Approved application: ${selectedApplication?.id}`);
    setIsApproveDialogOpen(false);
    // You would typically update the application status here
  };

  const confirmReject = () => {
    // In a real app, this would send an API request to reject the application with the reason
    console.log(
      `Rejected application: ${selectedApplication?.id}, Reason: ${rejectionReason}`
    );
    setIsRejectDialogOpen(false);
    // You would typically update the application status here
  };

  const toggleFilter = (value: string) => {
    setActiveFilters((prev) => {
      const updated = { ...prev };
      if (updated.status.includes(value)) {
        updated.status = updated.status.filter((item) => item !== value);
      } else {
        updated.status = [...updated.status, value];
      }
      return updated;
    });
  };

  const clearFilters = () => {
    setActiveFilters({ status: [] });
    setSearchQuery("");
    setSearchParams({});
    closeMenuMenuFilters();
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (activeFilters.status.length > 0) {
      params.set("status", activeFilters.status.join(","));
    } else {
      params.delete("status");
    }

    setSearchParams(params);
    closeMenuMenuFilters();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const [openMenuFilters, setOpenMenuFilters] = useState(false);
  const closeMenuMenuFilters = () => setOpenMenuFilters(false);
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (searchQuery.trim()) {
        setSearchParams({ query: searchQuery.trim() });
      } else {
        setSearchParams();
      }
    },
    [searchQuery, setSearchParams]
  );

  useEffect(() => {
    const status = searchParams.get("status");
    if (status) {
      setActiveFilters({ status: status.split(",") });
    }
  }, [searchParams]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Artist Applications
        </h2>
      </div>

      {/* View Application Details Dialog */}
      {/* <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>

            <DialogDescription>
              Review the artist application from{" "}
              {selectedApplication?.user?.username}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <ScrollArea className="max-h-[calc(85vh-10rem)]">
              <div className="grid gap-6 py-4 px-1">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="h-32 w-32">
                      <AvatarImage
                        src={selectedApplication.user.avatarUrl}
                        alt={selectedApplication.user.fullName}
                      />

                      <AvatarFallback>
                        {selectedApplication.user.fullName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedApplication.user.fullName}
                      </h2>

                      <p className="text-muted-foreground">
                        {selectedApplication.user.username} •{" "}
                        {selectedApplication.user.email}
                      </p>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-muted-foreground" />

                          <span className="text-sm">
                            {selectedApplication?.user?.followers.length}{" "}
                            followers
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Music className="h-4 w-4 text-muted-foreground" />
                       
                          <span className="text-sm">{selectedApplication.monthlyListeners} monthly listeners</span>
                        </div>
                    
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                    
                          <span className="text-sm">{selectedApplication.experience} experience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Artist Bio</h3>

                    <p className="text-sm">{selectedApplication.user.bio}</p>

                    <h3 className="text-lg font-semibold mt-4 mb-2">
                      Achievements
                    </h3>

                    <p className="text-sm">
                      {selectedApplication.achievements}
                    </p>

                    <h3 className="text-lg font-semibold mt-4 mb-2">
                      Application Reason
                    </h3>

                    <p className="text-sm">{selectedApplication.reason}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Music Samples
                    </h3>

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
                              <p className="font-medium text-sm">
                                {song.title}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {song.duration}
                              </p>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1"
                          >
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
                            <span className="text-sm capitalize">
                              {platform}:
                            </span>

                            <span className="text-sm font-medium">{link}</span>
                          </div>
                        )
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mt-4 mb-2">
                      Application Info
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Submitted:</span>
                        <span className="text-sm font-medium">
                          {selectedApplication.created_at}
                        </span>
                      </div>
                      {/* <div className="flex items-center justify-between">
                        <span className="text-sm">Location:</span>
                        <span className="text-sm font-medium">{selectedApplication.location}</span>
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
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() => {
                  setIsViewDetailsOpen(false);
                  handleReject(selectedApplication!);
                }}
              >
                Reject
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsViewDetailsOpen(false)}
              >
                Close
              </Button>

              <Button
                onClick={() => {
                  setIsViewDetailsOpen(false);
                  handleApprove(selectedApplication!);
                }}
              >
                Approve
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      <ApplicationDetailsDialog
        isOpen={isViewDetailsOpen}
        onOpenChange={() => setIsViewDetailsOpen(false)}
        selectedApplication={selectedApplication}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Approve Application Dialog */}
      {/* <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
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
                  <h3 className="font-medium">
                    {selectedApplication.user.fullName}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.user.email}
                  </p>
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
                  <Label htmlFor="approval-notes">
                    Approval Notes (Optional)
                  </Label>

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
                    Send welcome user.email with onboarding instructions
                  </label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsApproveDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button onClick={confirmApprove}>Approve Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      <ApproveArtistDialog
        isOpen={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
        selectedApplication={selectedApplication}
        confirmApprove={confirmApprove}
      />

      {/* Reject Application Dialog */}
      {/* <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Artist Application</DialogTitle>

            <DialogDescription>
              Please provide a reason for rejecting{" "}
              {selectedApplication?.user.fullName}'s application.
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
                  <h3 className="font-medium">
                    {selectedApplication.user.fullName}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.user.email}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="rejection-reason">Rejection Reason</Label>

                  <Select onValueChange={(value) => setRejectionReason(value)}>
                    <SelectTrigger id="rejection-reason">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="insufficient-content">
                        Insufficient content or samples
                      </SelectItem>

                      <SelectItem value="quality-issues">
                        Quality issues with submitted music
                      </SelectItem>

                      <SelectItem value="incomplete-information">
                        Incomplete profile information
                      </SelectItem>

                      <SelectItem value="copyright-concerns">
                        Copyright or ownership concerns
                      </SelectItem>

                      <SelectItem value="platform-fit">
                        Not a good fit for our platform at this time
                      </SelectItem>

                      <SelectItem value="other">
                        Other (please specify)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="rejection-details">Additional Details</Label>

                  <Textarea
                    id="rejection-details"
                    placeholder="Provide specific feedback to help the applicant understand the decision"
                    rows={4}
                    value={rejectionReason === "other" ? "" : rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="allow-reapply" defaultChecked />
                  <label
                    htmlFor="allow-reapply"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow reapplication after 30 days
                  </label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={confirmReject}
              disabled={!rejectionReason}
            >
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      <RejectApplicationDialog
        isOpen={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        onConfirm={confirmReject}
        application={selectedApplication}
      />

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Application Management</CardTitle>

              <div className="flex items-center gap-2">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2"
                >
                  <div className="relative w-60">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                    <Input
                      type="search"
                      placeholder="Search users..."
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>

                <DropdownMenu
                  open={openMenuFilters}
                  onOpenChange={closeMenuMenuFilters}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => setOpenMenuFilters((prev) => !prev)}
                    >
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-[250px]">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <div className="p-2">
                      <h4 className="mb-2 text-sm font-medium">Status</h4>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox
                            id="status-approved"
                            checked={activeFilters.status.includes("approved")}
                            onCheckedChange={() => toggleFilter("approved")}
                            className="mr-2"
                          />

                          <label htmlFor="status-approved">Approved</label>
                        </div>

                        <div className="flex items-center">
                          <Checkbox
                            id="status-pending"
                            checked={activeFilters.status.includes("pending")}
                            onCheckedChange={() => toggleFilter("pending")}
                            className="mr-2"
                          />

                          <label htmlFor="status-pending">Pending</label>
                        </div>

                        <div className="flex items-center">
                          <Checkbox
                            id="status-rejected"
                            checked={activeFilters.status.includes("rejected")}
                            onCheckedChange={() => toggleFilter("rejected")}
                            className="mr-2"
                          />

                          <label htmlFor="status-rejected">Rejected</label>
                        </div>
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <div className="p-2 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>

                      <Button size="sm" onClick={applyFilters}>
                        Apply Filters
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-340px)] w-full  rounded-xl">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={
                          selectedApplications.length ===
                            filteredApplications.length &&
                          filteredApplications.length > 0
                        }
                        onCheckedChange={toggleAllApplications}
                      />
                    </TableHead>

                    <TableHead>User</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead>Followers</TableHead>

                    <TableHead>Submitted</TableHead>

                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedApplications.includes(
                              application.id
                            )}
                            onCheckedChange={() =>
                              toggleApplicationSelection(application.id)
                            }
                          />
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={application.user.avatarUrl}
                                alt={application.user.fullName}
                              />

                              <AvatarFallback>
                                {application.user.fullName.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                              <span className="font-medium">
                                {application.user.fullName}
                              </span>

                              <span className="text-sm text-muted-foreground">
                                {application.user.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${getStatusColor(
                                application.status
                              )}`}
                            />
                            <span className="capitalize">
                              {application.status}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          {application?.user?.followers.length}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{application.created_at}</span>
                          </div>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8"
                              onClick={() => handleViewDetails(application)}
                            >
                              View
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => handleViewDetails(application)}
                                >
                                  <FileText className="mr-2 h-4 w-4" /> View
                                  details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleApprove(application)}
                                >
                                  <Check className="mr-2 h-4 w-4 text-green-500" />{" "}
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleReject(application)}
                                >
                                  <X className="mr-2 h-4 w-4 text-red-500" />{" "}
                                  Reject
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <ApplicationsEmptyState />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
