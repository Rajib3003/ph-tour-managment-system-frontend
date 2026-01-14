import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetDivisionsQuery, useRemoveDivisionMutation } from "@/redux/features/division/division.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";




export default function AddDivision() {
  const {data: divisionDatas = []} = useGetDivisionsQuery(undefined);
console.log("data",divisionDatas);
  const [removeDivision] = useRemoveDivisionMutation();

  const handleRemoveDivision = async (divisionId: string) => {
    try {
      const toastId = toast.loading("Removing division...");
      const res = await removeDivision(divisionId);
      
        if(res?.data?.success){
          toast.success("Division removed successfully!", { id: toastId });
        }
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
    <div className="flex justify-between my-8">
        <h1>Add Division Page</h1>
        <AddDivisionModal />
    </div>
    <div className="mt-5 border-muted rounded-xl shadow-sm overflow-hidden">
      <Table className="w-full border-collapse ">        
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted font-semibold text-lg">
            <TableHead className="w-full p-3 text-center">Division name</TableHead>          
            <TableHead className="w-full p-3 text-center">Division slug</TableHead>          
            <TableHead className="w-full p-3 text-center">Division image</TableHead>          
            <TableHead className=" text-right p-3 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {divisionDatas?.map((item : {name: string, _id: string, slug: string, thumbnail: string}) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{item?.name}</TableCell>        
              <TableCell className="font-medium">{item?.slug}</TableCell>        
              <TableCell className="font-medium">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-20 h-14 object-cover rounded-md border"
                />
              </TableCell>        
              <TableCell className="font-medium">
                <DeleteConfirmation onConfirm={() => handleRemoveDivision(item._id)}>
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
