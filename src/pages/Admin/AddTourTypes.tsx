/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourtypesQuery } from "@/redux/features/Tour/tour.api";


export default function AddTourTypes() {
    const {data: tourTypesDatas = []} = useGetTourtypesQuery(undefined);
    
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Tour Type Name</TableHead>          
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tourTypesDatas.map((item : {name: string, id: string}) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item?.name}</TableCell>        
            <TableCell className="font-medium"></TableCell>        
            
          </TableRow>
        ))}
      </TableBody> 
    </Table>
    </div>
  )
}
