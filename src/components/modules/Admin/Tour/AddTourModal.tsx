


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
import { useForm, type FieldValues, type SubmitHandler, useFieldArray } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAddTourMutation, useGetTourtypesQuery } from "@/redux/features/Tour/tour.api"
import { useGetDivisionsQuery } from "@/redux/features/division/division.api"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDownIcon, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { format, formatISO } from "date-fns"
import { cn } from "@/lib/utils"
import MultipleImageUploader from "@/components/MultipleImageUploader"
import { toast } from "sonner"
import type { FileMetadata } from "@/hooks/use-file-upload"





export function AddTourModal() {

    const [open, setOpen] = useState(false);

    const {data: divisionDatas = []} = useGetDivisionsQuery(undefined);
    const {data} = useGetTourtypesQuery({limit: 1000, fields: "_id,name"});
    const tourTypesDatas = data?.data || [];
    const [addTour] = useAddTourMutation();

    const [images, setImages] = useState<(File | FileMetadata)[]>([])
    

    const divisionOptions = divisionDatas.map((division : {name: string, _id: string}) => ({
        label: division.name,
        value: division._id,
    }))
    const tourTypeOptions = tourTypesDatas.map((tourType : {name: string, _id: string}) => ({
        label: tourType.name,
        value: tourType._id,
    }))



    

    const form = useForm({
        defaultValues: {
            title: "", 
            location: "",
            costFrom: 0,
            departureLocation: "",
            arrivalLocation: "",
            maxGuest: 0,
            minAge: 0,
            description: "",
            division: "",
            tourType: "",
            startDate: "",
            endDate: "",
            included: [{value: ""}],
            excluded: [{value: ""}],
            amenities: [{value: ""}],
            tourPlan: [{value: ""}],
        },
    })

    const {
  fields: includedFields,
  append: appendIncluded,
  remove: removeIncluded,
} = useFieldArray({
  control: form.control,
  name: "included",
});
const {
  fields: excludedFields,
  append: appendExcluded,
  remove: removeExcluded,
} = useFieldArray({
  control: form.control,
  name: "excluded",
});
const {
  fields: amenitiesFields,
  append: appendAmenities,
  remove: removeAmenities,
} = useFieldArray({
  control: form.control,
  name: "amenities",
});
const {
  fields: tourPlanFields,
  append: appendTourPlan,
  remove: removeTourPlan,
} = useFieldArray({
  control: form.control,
  name: "tourPlan",
});
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const tourData = {
            ... data,
            maxGuest: Number(data.maxGuest),
            minAge: Number(data.minAge),
            costFrom: Number(data.costFrom),
            startDate:formatISO(data.startDate),
            endDate:formatISO(data.endDate),
            included : data.included.map((item: {value: string}) => item.value),
            excluded : data.excluded.map((item: {value: string}) => item.value),
            amenities : data.amenities.map((item: {value: string}) => item.value),
            tourPlan : data.tourPlan.map((item: {value: string}) => item.value),
        }
        

        const formData = new FormData();
        formData.append("data", JSON.stringify(tourData));
        images.forEach(image => formData.append("files", image as File));
        try {
            const res = await addTour(formData);
            toast.success("Tour added successfully");
            console.log("res",res)
            setOpen(false);
        } catch (error) {
            console.log(error)
        }
        console.log("formData", formData)
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>     
        <DialogTrigger asChild>
          <Button >Add Tour</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-1/2 max-h-[90vh] overflow-y-auto"aria-describedby={undefined}>
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
                            name="title"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormLabel>Tour Title</FormLabel>
                                <FormControl>
                                    <Input className="w-full" placeholder="Tour Title" type="text"  {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    Tour Title.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />  
                    </div>
                    <div className="flex gap-5 items-stretch ">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormLabel className="pt-3">Location</FormLabel>
                                <FormControl>
                                    <Input className="w-full" placeholder="Location" type="text"  {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    Location.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />                              
                        <FormField
                            control={form.control}
                            name="costFrom"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormLabel className="pt-3">Cost From</FormLabel>
                                <FormControl>
                                    <Input className="w-full" placeholder="costFrom" type="number"  {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    Cost From.
                                </FormDescription>                                
                                <FormMessage />
                                </FormItem>
                            )}
                        />   
                    </div>
                    <div className="flex gap-5 items-stretch ">
                        <FormField
                            control={form.control}
                            name="departureLocation"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormLabel className="pt-3">Departure Location</FormLabel>
                                <FormControl>
                                    <Input className="w-full" placeholder="Departure Location" type="text"  {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    Departure Location
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />                              
                        <FormField
                            control={form.control}
                            name="arrivalLocation"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormLabel className="pt-3">Arrival Location</FormLabel>
                                <FormControl>
                                    <Input className="w-full" placeholder="Arrival Location" type="text"  {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    Arraival Location
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
                            name="maxGuest"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormLabel className="pt-3">Max Guest</FormLabel>
                                <FormControl>
                                    <Input className="w-full" placeholder="Max Guest" type="number"  {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    Max Guest
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />                              
                        <FormField
                            control={form.control}
                            name="minAge"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormLabel className="pt-3">Minimum Age</FormLabel>
                                <FormControl>
                                    <Input className="w-full" placeholder="Minimum Age" type="number"  {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    Minimum Age
                                </FormDescription>                                
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
                                <FormLabel className="pt-3">Start Date</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                    >
                                        {field.value
                                        ? (format(field.value,"dd MMM yyyy"))
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
                                    disabled={(date) => date < new Date() || date > new Date("2100-01-01")}
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
                                <FormLabel className="pt-3">End Date</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                    >
                                        {field.value
                                        ? (format(field.value,"dd MMM yyyy"))
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
                                        date < new Date() || date > new Date("2100-01-01")}
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
                                <FormLabel >Tour Description</FormLabel>
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
                        <div className="flex-1 ">
                            <MultipleImageUploader onChange={setImages} />
                        </div>                    
                    </div>
                    <div className="flex gap-5 items-stretch "> 
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <FormLabel className="pt-3 font-bold">Tour Included Items</FormLabel>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="mt-3 border-green-500 text-green-500 hover:bg-green-50"
                                    onClick={() => appendIncluded({ value: "" })}
                                    >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="space-y-4 mt-4">
                                {
                                    includedFields.map((item, index) => (
                                        <div key={item.id} className="flex gap-2 items-center">
                                            <FormField
                                                control={form.control}
                                                name={`included.${index}.value`}   
                                                key={item.id}                                 
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">                                       
                                                    <FormControl>
                                                        <Input  {...field} />
                                                    </FormControl>                                        
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                            /> 
                                            <Button
                                                type="button"
                                                variant="outline"        
                                                size="icon"              
                                                className="border-red-500 text-red-500 hover:bg-red-50"
                                                onClick={() => removeIncluded(index)}
                                                >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>                                   
                                    ))
                                }
                            </div>
                        </div> 
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <FormLabel className="pt-3 font-bold">Tour Excluded Items</FormLabel>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="mt-3 border-green-500 text-green-500 hover:bg-green-50"
                                    onClick={() => appendExcluded({ value: "" })}
                                    >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="space-y-4 mt-4">
                                {
                                    excludedFields.map((item, index) => (
                                        <div key={item.id} className="flex gap-2 items-center">
                                            <FormField
                                                control={form.control}
                                                name={`excluded.${index}.value`}   
                                                key={item.id}                                
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">                                       
                                                    <FormControl>
                                                        <Input  {...field} />
                                                    </FormControl>                                        
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                            /> 
                                            <Button
                                                type="button"
                                                variant="outline"        
                                                size="icon"              
                                                className="border-red-500 text-red-500 hover:bg-red-50"
                                                onClick={() => removeExcluded(index)}
                                                >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>                                   
                                    ))
                                }
                            </div>
                        </div> 
                    </div>                    
                    <div className="flex gap-5 items-stretch "> 
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <FormLabel className="pt-3 font-bold">Tour Amenities Items</FormLabel>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="mt-3 border-green-500 text-green-500 hover:bg-green-50"
                                    onClick={() => appendAmenities({ value: "" })}
                                    >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="space-y-4 mt-4">
                                {
                                    amenitiesFields.map((item, index) => (
                                        <div key={item.id} className="flex gap-2 items-center">
                                            <FormField
                                                control={form.control}
                                                name={`amenities.${index}.value`}   
                                                key={item.id}                                 
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">                                       
                                                    <FormControl>
                                                        <Input  {...field} />
                                                    </FormControl>                                        
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                            /> 
                                            <Button
                                                type="button"
                                                variant="outline"        
                                                size="icon"              
                                                className="border-red-500 text-red-500 hover:bg-red-50"
                                                onClick={() => removeAmenities(index)}
                                                >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>                                   
                                    ))
                                }
                            </div>
                        </div> 
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <FormLabel className="pt-3 font-bold">Tour Plan Items</FormLabel>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="mt-3 border-green-500 text-green-500 hover:bg-green-50"
                                    onClick={() => appendTourPlan({ value: "" })}
                                    >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="space-y-4 mt-4">
                                {
                                    tourPlanFields.map((item, index) => (
                                        <div key={item.id} className="flex gap-2 items-center">
                                            <FormField
                                                control={form.control}
                                                name={`tourPlan.${index}.value`}   
                                                key={item.id}                                
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">                                       
                                                    <FormControl>
                                                        <Input  {...field} />
                                                    </FormControl>                                        
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                            /> 
                                            <Button
                                                type="button"
                                                variant="outline"        
                                                size="icon"              
                                                className="border-red-500 text-red-500 hover:bg-red-50"
                                                onClick={() => removeTourPlan(index)}
                                                >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>                                   
                                    ))
                                }
                            </div>
                        </div> 
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

