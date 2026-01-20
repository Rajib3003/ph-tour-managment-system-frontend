import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourModal } from "@/components/modules/Admin/Tour/AddTourModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourQuery, useRemoveTourMutation} from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";

import { toast } from "sonner";


export default function AddTour() {
 
    const {data: tourDatas = [], isLoading} = useGetTourQuery(undefined);    

    const [removeTour] = useRemoveTourMutation();

    const handleRemoveTour = async (tourId: string) => {
      try {
        const toastId = toast.loading("Removing tour...");
        const res = await removeTour(tourId);
        if(res?.data?.success){
          toast.success("Tour removed successfully!", { id: toastId });
        }
      } catch (error) {
        console.log(error)
      }
      
    }


    
    
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1>Tour</h1>
        <AddTourModal />
      </div>
      <div className="mt-5 border-muted rounded-xl shadow-sm overflow-hidden">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted font-semibold text-lg">
              <TableHead className="w-1/4 p-3 text-center">Tour Name</TableHead>
              <TableHead className="w-1/6 p-3 text-center">Start Date</TableHead>
              <TableHead className="w-1/6 p-3 text-center">End Date</TableHead>
              <TableHead className="w-1/4 p-3 text-center">Images</TableHead>
              <TableHead className="w-1/6 p-3 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (              
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <span className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 inline-block"></span>
                </TableCell>
              </TableRow>
            ) : (
            tourDatas.map((item: { title: string; _id: string; startDate: string; endDate: string; images: string[] }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-1/4">{item?.title}</TableCell>
                <TableCell className="font-medium w-1/6">{new Date(item?.startDate).toLocaleDateString("en-GB")}</TableCell>
                <TableCell className="font-medium w-1/6">{new Date(item?.endDate).toLocaleDateString("en-GB")}</TableCell>
                <TableCell className="font-medium w-1/4">
                  <div className="flex flex-row gap-2 overflow-x-auto">
                    {item?.images?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${item?.title} ${index + 1}`}
                        className="w-20 h-12 object-cover rounded-md flex-shrink-0"
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-medium w-1/6 text-center">
                  <DeleteConfirmation onConfirm={() => handleRemoveTour(item._id)}>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>

      </div>
    </div>
  )
}
