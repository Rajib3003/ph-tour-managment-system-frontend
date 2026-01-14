




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
import SingleImageUploader from "@/components/SingleImageUploader"
import { useState } from "react"
import { useAddDivisionMutation } from "@/redux/features/division/division.api"
import { toast } from "sonner"




export function AddDivisionModal() {

    const [open, setOpen] = useState(false);

    const [addDivision] = useAddDivisionMutation();

    const [image, setImage] = useState<File | null>(null)

    console.log("add division modal", image)

    //  const [addTourType] = useAddTourTypeMutation();
    const form = useForm({
  defaultValues: {
    name: "", // <-- give an initial empty string
    description: "", // <-- give an initial empty string
  },
})
    const onSubmit = async (data) => {      
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file",image as File); 

      try {
        const res = await addDivision(formData);
        toast.success("Division added successfully");
        setOpen(false);

      } catch (error) {
       console.log(error) 
      }

      

      
   
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>     
        <DialogTrigger asChild>
          <Button >Add Division</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>            
          </DialogHeader>
            <Form {...form}>
                <form id="add-division" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Division Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Division Name" type="text"  {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                Division Name.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                Division Description.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
                <SingleImageUploader onChange={setImage} />
            </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={!image} type="submit" form="add-division">Division Save</Button>
          </DialogFooter>
        </DialogContent>      
    </Dialog>
  )
}

