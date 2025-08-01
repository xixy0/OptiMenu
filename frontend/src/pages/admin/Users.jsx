import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Edit, Trash, Plus, Users } from "lucide-react";

// Dummy data
const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "ADMIN" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "MANAGER" },
  { id: 3, name: "Mark Johnson", email: "mark@example.com", role: "COOK" },
  { id: 4, name: "Emily Brown", email: "emily@example.com", role: "WAITER" },
  { id: 5, name: "Michael Lee", email: "michael@example.com", role: "STEWARD" },
];

const roles = ["ADMIN", "MANAGER", "STEWARD", "COOK", "WAITER", "ACCOUNTANT"];

/*
const fetchUsers = async () => {
  const response = await fetch('/api/users')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    throw new Error('Failed to create user')
  }
  return response.json()
}

const updateUser = async (userData) => {
  const response = await fetch(`/api/users/${userData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    throw new Error('Failed to update user')
  }
  return response.json()
}

const deleteUser = async (id) => {
  const response = await fetch(`/api/users/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error('Failed to delete user')
  }
  return response.json()
}
*/

const AdminUserManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "WAITER",
  });

  // Commented out React Query hooks
  /*
  const queryClient = useQueryClient()

  const { data: users, isLoading, isError } = useQuery(['users'], fetchUsers)

  const createMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      toast.success("User created successfully")
    },
  })

  const updateMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      toast.success("User updated successfully")
    },
  })

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      toast.success("User deleted successfully")
    },
  })
  */

  const handleSaveUser = () => {
    if (currentUser) {
      // Edit existing user
      // updateMutation.mutate({ ...currentUser, ...newUser })
    } else {
      // Add new user
      // createMutation.mutate(newUser)
    }
    setIsDialogOpen(false);
    setCurrentUser(null);
    setNewUser({ name: "", email: "", role: "WAITER" });
  };

  const handleDelete = (id) => {
    // deleteMutation.mutate(id)
  };

  // Use dummy data instead of fetched data
  const users = dummyUsers;
  const isLoading = false;
  const isError = false;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Users className="mr-2 h-8 w-8 text-primary" />
          User Management
        </h1>
        <Button
          onClick={() => {
            setCurrentUser(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {isError ? (
        <div className="text-red-500">
          Error loading users. Please try again later.
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead className="w-[250px]">Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentUser(user);
                        setNewUser(user);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentUser ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              {currentUser
                ? "Make changes to the user here."
                : "Enter the details for the new user."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="name"
                className="text-right"
              >
                Name
              </label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="email"
                className="text-right"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="role"
                className="text-right"
              >
                Role
              </label>
              <Select
                value={newUser.role}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, role: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem
                      key={role}
                      value={role}
                    >
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveUser}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUserManagement;
