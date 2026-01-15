


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent, 
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useState } from "react"
import { useGetTourtypesQuery } from "@/redux/features/Tour/tour.api"
import { useGetDivisionsQuery } from "@/redux/features/division/division.api"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { setDate } from "date-fns/setDate"
import { format, formatISO } from "date-fns"
import { cn } from "@/lib/utils"




export function AddTourModal() {

    // const [open, setOpen] = useState(false);

    const {data: divisionDatas = []} = useGetDivisionsQuery(undefined);
    const {data: tourTypeDatas = []} = useGetTourtypesQuery(undefined);

    const [open, setOpen] = useState(false)
    

    const divisionOptions = divisionDatas.map((division : {name: string, _id: string}) => ({
        label: division.name,
        value: division._id,
    }))
    const tourTypeOptions = tourTypeDatas.map((tourType : {name: string, _id: string}) => ({
        label: tourType.name,
        value: tourType._id,
    }))



    

    const form = useForm({
        defaultValues: {
            name: "", 
            description: "",
            division: "",
            tourType: "",
            startDate: "",
            endDate: "",
        },
    })

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const tourData = {
            ... data,
            startDate:formatISO(data.startDate),
            endDate:formatISO(data.endDate),
        }
        console.log("tourData", tourData)
    }
    // const onSubmit = async (data) => {       
    //     console.log("data",data)
    // //   const res = await addTourType({ name: data.name });      
    // //   if(res?.data?.success){
    // //     toast.success("Tour Type added successfully!")
    // //   }
    // }
  return (
    <Dialog>     
        <DialogTrigger asChild>
          <Button >Add Tour</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]"aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Add Tour</DialogTitle>
            <DialogDescription>
              Add a new tour.
            </DialogDescription>
          </DialogHeader>

            <Form {...form}>
                <form id="add-tour-type" onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="flex gap-5 items-stretch ">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                            <FormLabel>Tour</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Tour" type="text"  {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                Tour Name.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />  
                    </div>
                    <div className="flex gap-5 items-stretch ">
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

                    </div>
                    <div className="flex gap-5 items-stretch ">
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                    >
                                        {field.value
                                        ? (format(field.value,"ppp"))
                                        : ("Select date")}
                                        <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                    mode="single"
                                    selected={new Date(field.value)}
                                    onSelect={field.onChange}
                                    disabled={(date) => 
                                        date > new Date() || date < new Date("1900-01-01")}
                                    captionLayout="dropdown"
                                    />
                                </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                    >
                                        {field.value
                                        ? (format(field.value,"ppp"))
                                        : ("Select date")}
                                        <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                    mode="single"
                                    selected={new Date(field.value)}
                                    onSelect={field.onChange}
                                    disabled={(date) => 
                                        date > new Date() || date < new Date("1900-01-01")}
                                    captionLayout="dropdown"
                                    />
                                </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-5 items-stretch ">
                          <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                            <FormLabel className="pt-3">Tour Description</FormLabel>
                            <FormControl>
                                <Textarea className="w-full" placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                Tour Description.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                                  
                   

                  
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

