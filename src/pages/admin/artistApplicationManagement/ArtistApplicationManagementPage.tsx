import { useState } from "react";
import {
  Check,
  X,
  MoreHorizontal,
  Search,
  Filter,
  Calendar,
  // User,
  // Music,
  // ExternalLink,
  FileText,
  Download,
  // Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useUserStore } from "@/stores/useUserStore";
import { ArtistApplication } from "@/utils/types";
import ApplicationDetailsDialog from "./components/ApplicationDetailsDialog";
import ApproveArtistDialog from "./components/ApproveArtistDialog";
import RejectApplicationDialog from "./components/RejectApplicationDialog";

export function ArtistApplicationManagementPage() {
  const { artistApplications } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<ArtistApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    genres: string[];
    dateRange: string;
    followers: string[];
  }>({
    genres: [],
    dateRange: "",
    followers: [],
  });

  // Filter applications based on search query and active filters
  const filteredApplications = artistApplications.filter((application) => {
    console.log(application)
  //   // Search functionality
  //   const matchesSearch =
  //     searchQuery === "" ||
  //     application.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     application.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     application.user.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     application.user.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase()))

  //   // Filter by genres
  //   const matchesGenres =
  //     activeFilters.genres.length === 0 ||
  //     application.user.genres.some((genre) => activeFilters.genres.includes(genre.toLowerCase()))

  //   // Filter by date range
  //   const matchesDateRange = () => {
  //     if (!activeFilters.dateRange) return true

  //     const submittedDate = new Date(application.submittedDate)
  //     const now = new Date()

  //     switch (activeFilters.dateRange) {
  //       case "today":
  //         return submittedDate.toDateString() === now.toDateString()
  //       case "this-week": {
  //         const oneWeekAgo = new Date()
  //         oneWeekAgo.setDate(now.getDate() - 7)
  //         return submittedDate >= oneWeekAgo
  //       }
  //       case "this-month": {
  //         return submittedDate.getMonth() === now.getMonth() && submittedDate.getFullYear() === now.getFullYear()
  //       }
  //       default:
  //         return true
  //     }
  //   }

  //   // Filter by followers
  //   const matchesFollowers = () => {
  //     if (activeFilters.followers.length === 0) return true

  //     const followerCount = Number.parseInt(application.followers.replace(/[^\d]/g, ""))

  //     return activeFilters.followers.some((range) => {
  //       if (range === "under-5k") return followerCount < 5000
  //       if (range === "5k-20k") return followerCount >= 5000 && followerCount < 20000
  //       if (range === "over-20k") return followerCount >= 20000
  //       return true
  //     })
  //   }

  //   return matchesSearch && matchesGenres && matchesDateRange() && matchesFollowers()
  })

  const toggleApplicationSelection = (applicationId: string) => {
    if (selectedApplications.includes(applicationId)) {
      setSelectedApplications(
        selectedApplications.filter((id) => id !== applicationId)
      );
    } else {
      setSelectedApplications([...selectedApplications, applicationId]);
    }
  };

  const toggleAllApplications = () => {
    // if (selectedApplications.length === filteredApplications.length) {
    //   setSelectedApplications([])
    // } else {
    //   setSelectedApplications(filteredApplications.map((app) => app.id))
    // }
  };

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

  // Function to toggle a filter value
  const toggleFilter = (
    category: keyof typeof activeFilters,
    value: string
  ) => {
    setActiveFilters((prev) => {
      const updated = { ...prev };

      if (category === "dateRange") {
        // Date range is a single selection
        updated.dateRange = prev.dateRange === value ? "" : value;
        return updated;
      }

      // For arrays (genres, followers)
      const categoryArray = updated[category] as string[];
      if (categoryArray.includes(value)) {
        updated[category] = categoryArray.filter((item) => item !== value);
      } else {
        updated[category] = [...categoryArray, value];
      }

      return updated;
    });
  };

  // Function to clear all filters
  const clearFilters = () => {
    setActiveFilters({
      genres: [],
      dateRange: "",
      followers: [],
    });
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Artist Applications
        </h2>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
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

                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedApplication.user.genres.map((genre, index) => (
                          <Badge key={index} variant="outline">
                            {genre}
                          </Badge>
                        ))}
                      </div>

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

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({artistApplications.length})
          </TabsTrigger>

          <TabsTrigger value="approved">Approved (0)</TabsTrigger>

          <TabsTrigger value="rejected">Rejected (0)</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Pending Applications</CardTitle>

                <div className="flex items-center gap-2">
                  <div className="relative w-60">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                    <Input
                      type="search"
                      placeholder="Search applications..."
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-[250px]">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      <div className="p-2">
                        <h4 className="mb-2 text-sm font-medium">Genres</h4>
                        <ScrollArea className="h-[150px]">
                          <div className="space-y-2 pr-3">
                            {[
                              "pop",
                              "hip-hop",
                              "rock",
                              "r&b",
                              "electronic",
                              "jazz",
                              "indie pop",
                              "folk",
                              "country",
                              "latin",
                              "k-pop",
                            ].map((genre) => (
                              <div key={genre} className="flex items-center">
                                <Checkbox
                                  id={`genre-${genre}`}
                                  checked={activeFilters.genres.includes(genre)}
                                  onCheckedChange={() =>
                                    toggleFilter("genres", genre)
                                  }
                                  className="mr-2"
                                />
                                <label
                                  htmlFor={`genre-${genre}`}
                                  className="capitalize"
                                >
                                  {genre}
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>

                      <DropdownMenuSeparator />

                      <div className="p-2">
                        <h4 className="mb-2 text-sm font-medium">
                          Submission Date
                        </h4>
                      
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox
                              id="date-today"
                              checked={activeFilters.dateRange === "today"}
                              onCheckedChange={() =>
                                toggleFilter("dateRange", "today")
                              }
                              className="mr-2"
                            />
                           
                            <label htmlFor="date-today">Today</label>
                          </div>
                       
                          <div className="flex items-center">
                            <Checkbox
                              id="date-this-week"
                              checked={activeFilters.dateRange === "this-week"}
                              onCheckedChange={() =>
                                toggleFilter("dateRange", "this-week")
                              }
                              className="mr-2"
                            />
                          
                            <label htmlFor="date-this-week">This Week</label>
                          </div>
                        
                          <div className="flex items-center">
                            <Checkbox
                              id="date-this-week"
                              checked={activeFilters.dateRange === "this-month"}
                              onCheckedChange={() =>
                                toggleFilter("dateRange", "this-month")
                              }
                              className="mr-2"
                            />
                            <label htmlFor="date-this-month">This Month</label>
                          </div>
                        </div>
                      </div>

                      <DropdownMenuSeparator />

                      <div className="p-2">
                        <h4 className="mb-2 text-sm font-medium">Followers</h4>
                   
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox
                              id="followers-under-5k"
                              checked={activeFilters.followers.includes(
                                "under-5k"
                              )}
                              onCheckedChange={() =>
                                toggleFilter("followers", "under-5k")
                              }
                              className="mr-2"
                            />
                            <label htmlFor="followers-under-5k">Under 5K</label>
                          </div>
                      
                          <div className="flex items-center">
                            <Checkbox
                              id="followers-5k-20k"
                              checked={activeFilters.followers.includes(
                                "5k-20k"
                              )}
                              onCheckedChange={() =>
                                toggleFilter("followers", "5k-20k")
                              }
                              className="mr-2"
                            />
                            <label htmlFor="followers-5k-20k">5K - 20K</label>
                          </div>
                     
                          <div className="flex items-center">
                            <Checkbox
                              id="followers-over-20k"
                              checked={activeFilters.followers.includes(
                                "over-20k"
                              )}
                              onCheckedChange={() =>
                                toggleFilter("followers", "over-20k")
                              }
                              className="mr-2"
                            />
                            <label htmlFor="followers-over-20k">Over 20K</label>
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
                      
                        <Button size="sm">Apply Filters</Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardHeader>
          
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
                   
                    <TableHead>Artist</TableHead>
                   
                    <TableHead>Genres</TableHead>
                 
                    <TableHead>Followers</TableHead>
                  
                    <TableHead>Submitted</TableHead>
                   
                    {/* <TableHead>Location</TableHead> */}
                 
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
                          <div className="flex flex-wrap gap-1">
                            {application.user.genres.map((genre, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        
                        <TableCell>{application?.user?.followers.length}</TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{application.created_at}</span>
                          </div>
                        </TableCell>
                      
                        {/* <TableCell>{application.location}</TableCell> */}
                  
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
                      <TableCell colSpan={7} className="h-24 text-center">
                        No applications found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Applications</CardTitle>
              <CardDescription>
                Artists who have been approved to join the platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <Check className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">
                  No approved applications yet
                </h3>
                <p className="text-muted-foreground mt-1 max-w-md">
                  When you approve artist applications, they will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Applications</CardTitle>
              <CardDescription>
                Artists whose applications have been rejected.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <X className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">
                  No rejected applications yet
                </h3>
                <p className="text-muted-foreground mt-1 max-w-md">
                  When you reject artist applications, they will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
