/* eslint-disable @typescript-eslint/no-explicit-any */


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
import { useAddTourTypeMutation } from "@/redux/features/Tour/tour.api"
import { toast } from "sonner"




export function AddTourModal() {

     const [addTourType] = useAddTourTypeMutation();
    const form = useForm({
  defaultValues: {
    name: "", // <-- give an initial empty string
  },
})
    const onSubmit = async (data: { name: string }) => {       
      const res = await addTourType({ name: data.name });      
      if(res?.data?.success){
        toast.success("Tour Type added successfully!")
      }
    }
  return (
    <Dialog>     
        <DialogTrigger asChild>
          <Button >Add Tour Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            
          </DialogHeader>

            <Form {...form}>
                <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Tour Type</FormLabel>
                            <FormControl>
                                <Input placeholder="Tour Type" type="text"  {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                Tour Type Name.
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
            <Button type="submit" form="add-tour-type">Tour Type Save</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
  )
}

