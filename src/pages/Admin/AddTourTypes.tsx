import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import {  AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourtypesQuery, useRemoveTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";


export default function AddTourTypes() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    
    const { data } = useGetTourtypesQuery({ page: currentPage, limit });

    const tourTypesDatas = data?.data || [];
    const totalPages = data?.meta?.totalPage || 1;
    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;
  
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
        <AddTourTypeModal />
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
      {totalPages > 1 && (
        <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem className={`cursor-pointer ${
              isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}>
              <PaginationPrevious onClick={() => !isPrevDisabled && setCurrentPage(prev => Math.max(prev - 1, 1))} />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <PaginationItem key={page} className="cursor-pointer">
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}           
            <PaginationItem className="cursor-pointer">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className={`cursor-pointer ${
              isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}>
              <PaginationNext onClick={() => !isNextDisabled && setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      )}
    </div>
  )
}
