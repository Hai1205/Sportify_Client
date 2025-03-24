import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Filter, MoreHorizontal, Search, Trash, Pencil } from "lucide-react";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import EditUserDialog from "./components/EditUserDialog";
import AddUserDialog from "./components/AddUserDialog";
import { User } from "@/utils/types";
import { useUserStore } from "@/stores/useUserStore";
import { useAuthStore } from "@/stores/useAuthStore";

export default function UserManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const queryString = location.search;
  console.log(">>>> " + queryString);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[] | []>([]);
  const { getUserByRole, searchUsers, deleteUser } = useUserStore();
  const { resetPassword } = useAuthStore();

  const [openMenuFilters, setOpenMenuFilters] = useState(false);

  const closeMenuMenuFilters = () => setOpenMenuFilters(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUserByRole("user");
      setUsers(users);
    };

    fetchUsers();
  }, [getUserByRole]);

  useEffect(() => {
    setSearchQuery(query);
    searchUsers(query);
  }, [query, searchUsers]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      setSearchParams({ query: searchQuery.trim() });
    },
    [searchQuery, setSearchParams]
  );

  // Add these state variables at the beginning of the UsersPage component, after the existing state declarations
  const [activeFilters, setActiveFilters] = useState<{ status: string[] }>({
    status: [],
  });

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "locked":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const handleResetPassword = (user: User) => {
    if (!user) {
      return;
    }

    resetPassword(user.id);
    setIsEditUserOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    if (!user) {
      return;
    }

    deleteUser(user.id);
    setIsEditUserOpen(true);
  };

  // Function to toggle a filter value
  const toggleFilter = (
    category: keyof typeof activeFilters,
    value: string
  ) => {
    setActiveFilters((prev) => {
      const updated = { ...prev };

      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter((item) => item !== value);
      } else {
        updated[category] = [...updated[category], value];
      }

      return updated;
    });
  };

  // Function to clear all filters
  const clearFilters = () => {
    setActiveFilters({ status: [] });
    setSearchQuery("");
    setSearchParams({});

    getUserByRole("user").then(setUsers);

    closeMenuMenuFilters();
  };

  // Function to apply all filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    Object.keys(activeFilters).forEach((key) => {
      const values = activeFilters[key as keyof typeof activeFilters];
      if (values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);

    // searchUsers(searchQuery);

    closeMenuMenuFilters();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>

        <div className="flex items-center gap-2">
          {/* Add User Dialog */}
          <AddUserDialog
            isOpen={isAddUserOpen}
            onOpenChange={setIsAddUserOpen}
          />
        </div>
      </div>

      {/* Edit User Dialog */}
      <EditUserDialog
        isOpen={isEditUserOpen}
        onOpenChange={setIsEditUserOpen}
        user={selectedUser}
      />

      <Tabs defaultValue="all-users" className="space-y-4">
        <TabsContent value="all-users" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>

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
                              id="status-active"
                              checked={activeFilters.status.includes("active")}
                              onCheckedChange={() =>
                                toggleFilter("status", "active")
                              }
                              className="mr-2"
                            />

                            <label htmlFor="status-active">Active</label>
                          </div>

                          <div className="flex items-center">
                            <Checkbox
                              id="status-pending"
                              checked={activeFilters.status.includes("pending")}
                              onCheckedChange={() =>
                                toggleFilter("status", "pending")
                              }
                              className="mr-2"
                            />

                            <label htmlFor="status-pending">Pending</label>
                          </div>

                          <div className="flex items-center">
                            <Checkbox
                              id="status-lock"
                              checked={activeFilters.status.includes("locked")}
                              onCheckedChange={() =>
                                toggleFilter("status", "locked")
                              }
                              className="mr-2"
                            />

                            <label htmlFor="status-lock">Locked</label>
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

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={selectedUsers.length === users.length}
                        onCheckedChange={toggleAllUsers}
                      />
                    </TableHead>

                    <TableHead>User</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead>Country</TableHead>

                    <TableHead>Join Date</TableHead>

                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                        />
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={user.avatarUrl}
                              alt={user.fullName}
                            />
                            <AvatarFallback>
                              {user.fullName.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col">
                            <span className="font-medium">{user.fullName}</span>

                            <span className="text-sm text-muted-foreground">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${getStatusColor(
                              user.status
                            )}`}
                          />
                          <span className="capitalize">{user.status}</span>
                        </div>
                      </TableCell>

                      <TableCell>{user.country}</TableCell>

                      <TableCell>{user.created_at}</TableCell>

                      <TableCell className="text-right">
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

                            <DropdownMenuItem>
                              <Link to={`/profile/${user?.id}`}>
                                <span>View profile</span>
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => handleEditUser(user)}
                            >
                              <Pencil className="mr-2 h-4 w-4" /> Edit user
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => handleResetPassword(user)}
                            >
                              Reset password
                            </DropdownMenuItem>

                            <DropdownMenuItem className="text-red-600">
                              <Trash
                                onClick={() => handleDeleteUser(user)}
                                className="mr-2 h-4 w-4"
                              />{" "}
                              Delete user
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
