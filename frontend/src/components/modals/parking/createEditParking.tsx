// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "../../ui/dialog";
// import { useForm } from "react-hook-form";
// import { Button } from "../../ui/button";
// import { Input } from "../../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../ui/select";
// import { createParking, updateParking } from "../../../services/parkingService";
// interface CreateEditparkingProps {
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
//   parkingToEdit?: {
//     id?: string;
//     parkingNumber: number;
//     isAvailable: boolean;
//   } | null;
//   onSuccess: () => void;
// }

// interface parkingFormData {
//    name: string,
//     location: string,
//     code: string,
//     feePerHour: number
// }

// const CreateEditparking: React.FC<CreateEditparkingProps> = ({
//   isOpen,
//   onOpenChange,
//   parkingToEdit,
//   onSuccess,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm<parkingFormData>();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (parkingToEdit) {
//       reset({
//         parkingNumber: parkingToEdit.parkingNumber,
//         isAvailable: parkingToEdit.isAvailable ? "yes" : "no",
//       });
//     } else {
//       reset({
//         isAvailable: "yes",
//       });
//     }
//   }, [parkingToEdit, reset]);

//   const onSubmit = async (data: parkingFormData) => {
//     setLoading(true);
//     try {
//       const finalData = {
//         parkingNumber: data.parkingNumber,
//         isAvailable: data.isAvailable === "yes",
//       };
//       if (parkingToEdit) {
//         await updateParking(parkingToEdit.id || "", finalData);
//       } else {
//         await createParking(finalData);
//       }
//       onSuccess();
//       onOpenChange(false);
//     } catch (error) {
//       console.error("Failed to save parking", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onOpenChange}>
//       <DialogTrigger />
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{parkingToEdit ? "Edit parking" : "Create parking"}</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block mb-1">parking Number</label>
//             <Input
//               type="number"
//               {...register("parkingNumber", { required: true, valueAsNumber: true })}
//             />
//             {errors.parkingNumber && (
//               <p className="text-red-600">parking Number is required</p>
//             )}
//           </div>
//           <div>
//             <label className="block mb-1">Available</label>
//             <Select
//               value={parkingToEdit ? (parkingToEdit.isAvailable ? "yes" : "no") : "yes"}
//               onValueChange={(value) => setValue("isAvailable", value as "yes" | "no")}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select availability" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="yes">Yes</SelectItem>
//                 <SelectItem value="no">No</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <DialogFooter>
//             <Button type="submit" disabled={loading}>
//               {loading ? "Saving..." : "Save"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateEditparking;
