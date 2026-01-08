import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourModal } from "@/components/modules/Admin/TourType/AddTourModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourtypesQuery, useRemoveTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";


export default function AddTourTypes() {
    const {data: tourTypesDatas = []} = useGetTourtypesQuery(undefined);

    const [removeTourType] = useRemoveTourTypeMutation();

    const handleRemoveTourType = async (tourId: string) => {
      try {
        const toastId = toast.loading("Removing tour type...");
        const res = await removeTourType(tourId);
        if(res?.data?.success){
          toast.success("Tour type removed successfully!", { id: toastId });
        }
      } catch (error) {
        console.log(error)
      }
      
    }

    
    
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1>Tour types</h1>
        <AddTourModal />
      </div>
      <div className="mt-5 border-muted rounded-xl shadow-sm overflow-hidden">
        <Table className="w-full border-collapse ">        
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted font-semibold text-lg">
              <TableHead className="w-full p-3 text-center">Tour Type Name</TableHead>          
              <TableHead className=" text-right p-3 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tourTypesDatas.map((item : {name: string, _id: string}) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item?.name}</TableCell>        
                <TableCell className="font-medium">
                  <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4" />
                      </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> 
        </Table>
      </div>
    </div>
  )
}
