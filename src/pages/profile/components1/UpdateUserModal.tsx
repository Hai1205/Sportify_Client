// import { useState } from "react";
// import { Edit } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { User } from "@/utils/types";

// interface EditProfileModalProps {
//   currentProfile: User;
//   onProfileUpdate: (
//     userId: string,
//     avatarFile: File | null,
//     formData: FormData
//   ) => Promise<void>;
// }

// export function EditProfileModal({
//   currentProfile,
//   onProfileUpdate,
// }: EditProfileModalProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const userId = currentProfile.id;
//   const [fullName, setFullName] = useState(currentProfile.fullName);
//   const [avatarFile, setAvatarFile] = useState(null);

//   const handleUpdateProfile = () => {
//     const formData = new FormData();
//     formData.append("fullName", fullName);

//     onProfileUpdate(userId, avatarFile, formData);
//     setIsOpen(false);
//   };

//   const handleImgChange = (e: any) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setAvatarFile(file);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <Button
//         onClick={() => setIsOpen(true)}
//         className="bg-gray-800 hover:bg-gray-700 text-white"
//       >
//         <Edit className="mr-2 h-4 w-4" />
//         Edit Profile
//       </Button>

//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
//           <DialogHeader>
//             <DialogTitle>Edit Profile</DialogTitle>

//             <DialogDescription className="text-gray-400">
//               Make changes to your profile here.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="avatarFile" className="text-white">
//                 Profile Picture
//               </Label>

//               <div className="flex items-center justify-center h-40 bg-gray-800 rounded-md border border-dashed border-gray-700 cursor-pointer hover:bg-gray-750">
//                 <div className="flex flex-col items-center gap-2 text-gray-400">
//                   {/* <Upload className="h-8 w-8" /> */}
//                   <input
//                     type="file"
//                     hidden
//                     accept="image/*"
//                     onChange={(e) => handleImgChange(e)}
//                   />

//                   <span>Upload new picture</span>
//                 </div>
//               </div>
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="fullName" className="text-white">
//                 Full name
//               </Label>

//               <Input
//                 id="fullName"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 className="bg-gray-800 border-gray-700 text-white"
//               />
//             </div>
//           </div>

//           <DialogFooter>
//             <Button
//               variant="ghost"
//               onClick={() => setIsOpen(false)}
//               className="text-gray-400 hover:text-white hover:bg-gray-800"
//             >
//               Cancel
//             </Button>

//             <Button
//               onClick={handleUpdateProfile}
//               className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium"
//             >
//               Save Changes
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
