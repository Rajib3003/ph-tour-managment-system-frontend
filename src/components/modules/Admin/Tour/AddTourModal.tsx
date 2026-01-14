


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent, 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useState } from "react"
import { useGetTourtypesQuery } from "@/redux/features/Tour/tour.api"
import { useGetDivisionsQuery } from "@/redux/features/division/division.api"




export function AddTourModal() {

    // const [open, setOpen] = useState(false);

    const {data: divisionDatas = []} = useGetDivisionsQuery(undefined);
    const {data: tourTypeDatas = []} = useGetTourtypesQuery(undefined);
    

    const divisionOptions = divisionDatas.map((division : {name: string, _id: string}) => ({
        label: division.name,
        value: division._id,
    }))
    const tourTypeOptions = tourTypeDatas.map((tourType : {name: string, _id: string}) => ({
        label: tourType.name,
        value: tourType._id,
    }))

    console.log("divisionDatas",divisionOptions)
    console.log("tourTypesDatas",tourTypeOptions)

    const form = useForm({
        defaultValues: {
            name: "", 
            description: "",
            division: "",
            tourType: "",
        },
    })
    const onSubmit = async (data) => {       
        console.log("data",data)
    //   const res = await addTourType({ name: data.name });      
    //   if(res?.data?.success){
    //     toast.success("Tour Type added successfully!")
    //   }
    }
  return (
    <Dialog>     
        <DialogTrigger asChild>
          <Button >Add Tour</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tour</DialogTitle>
            
          </DialogHeader>

            <Form {...form}>
                <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Tour</FormLabel>
                            <FormControl>
                                <Input placeholder="Tour" type="text"  {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                Tour Name.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />                  
                    <FormField
                        control={form.control}
                        name="division"
                        render={({ field }) => (
                            <FormItem  className="flex-1">
                            <FormLabel className="pt-3">Division</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {divisionOptions.map((item : {label: string, value: string}) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}                                
                                </SelectContent>
                            </Select>

                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="tourType"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                            <FormLabel className="pt-3">Tour Types</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {tourTypeOptions.map((item : {label: string, value: string}) => (   
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="pt-3">Tour Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                Tour Description.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-tour-type">Tour Save</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
  )
}

