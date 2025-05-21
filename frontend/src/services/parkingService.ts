// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Input } from ".././components/ui/input";
// import { DialogContent } from "@radix-ui/react-dialog";
// interface CreateEditparkingProps {
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
//   parkingToEdit?: {
//     id?: string;
//     name: string;
//     location: string;
//     code: string;
//     feePerHour: number;
//   } | null;
//   onSuccess: () => void;
// }

// interface parkingFormData {
//   name: string;
//   location: string;
//   code: string;
//   feePerHour: number;
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
//     formState: { errors },
//   } = useForm<parkingFormData>();
//   const [loading, setLoading] = useState(false);

//   // Populate form when editing
//   useEffect(() => {
//     if (parkingToEdit) {
//       reset({
//         name: parkingToEdit.name,
//         location: parkingToEdit.location,
//         code: parkingToEdit.code,
//         feePerHour: parkingToEdit.feePerHour,
//       });
//     } else {
//       reset({
//         name: "",
//         location: "",
//         code: "",
//         feePerHour: 0,
//       });
//     }
//   }, [parkingToEdit, reset]);

//   const onSubmit = async (data: parkingFormData) => {
//     setLoading(true);
//     try {
//       if (parkingToEdit) {
//         await updateParking(parkingToEdit.id || "", data);
//       } else {
//         await createParking(data);
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
//           <DialogTitle>{parkingToEdit ? "Edit Parking" : "Create Parking"}</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block mb-1">Name</label>
//             <Input
//               {...register("name", { required: true })}
//               placeholder="Enter parking name"
//             />
//             {errors.name && <p className="text-red-600">Name is required</p>}
//           </div>

//           <div>
//             <label className="block mb-1">Location</label>
//             <Input
//               {...register("location", { required: true })}
//               placeholder="Enter location"
//             />
//             {errors.location && <p className="text-red-600">Location is required</p>}
//           </div>

//           <div>
//             <label className="block mb-1">Code</label>
//             <Input
//               {...register("code", { required: true })}
//               placeholder="Enter unique code"
//             />
//             {errors.code && <p className="text-red-600">Code is required</p>}
//           </div>

//           <div>
//             <label className="block mb-1">Fee Per Hour</label>
//             <Input
//               type="number"
//               step="0.01"
//               {...register("feePerHour", { required: true, valueAsNumber: true })}
//               placeholder="Enter fee per hour"
//             />
//             {errors.feePerHour && <p className="text-red-600">Fee per hour is required</p>}
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
// }
