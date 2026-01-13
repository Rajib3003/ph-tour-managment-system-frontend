




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




export function AddDivisionModal() {

    const [image, setImage] = useState<File | null>(null)

    console.log("add division modal", image)

    //  const [addTourType] = useAddTourTypeMutation();
    const form = useForm({
  defaultValues: {
    name: "", // <-- give an initial empty string
    description: "", // <-- give an initial empty string
  },
})
    const onSubmit = async (data: { name: string, description: string }) => {       
    //   const res = await addTourType({ name: data.name, description: data.description });      
    //   if(res?.data?.success){
    //     toast.success("Tour Type added successfully!")
    //   }
    console.log(data)
    }
  return (
    <Dialog>     
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
            <Button type="submit" form="add-division">Division Save</Button>
          </DialogFooter>
        </DialogContent>      
    </Dialog>
  )
}

