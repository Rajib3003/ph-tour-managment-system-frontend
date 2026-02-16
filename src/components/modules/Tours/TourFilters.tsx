import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourtypesQuery } from "@/redux/features/Tour/tour.api";
import { useSearchParams } from "react-router";
// import { useState } from "react";

export default function TourFilters() {

const [searchParams, setSearchParams] = useSearchParams();

const selectedDivision = searchParams.get("division") || undefined;
const selectedTourType = searchParams.get("tourType") || undefined;

     const {data: divisionData, isLoading:divisionIsLoading} = useGetDivisionsQuery(undefined)
  const {data, isLoading:tourTypeIsLoading} = useGetTourtypesQuery({limit: 1000, fields: "_id,name"})
  const tourTypesDatas = data?.data || [];

  
  const divisionOption = divisionData?.map((item: {_id: string, name: string})=>({
    label: item.name,
    value: item._id,
  }))
  const tourTypeOption = tourTypesDatas?.map((item: {_id:string, name:string})=>({
    label: item.name,
    value: item._id,
  }))
  const handleDivisionChange = (value : string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division",value);
    setSearchParams(params);
  }
  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType",value);
    setSearchParams(params);
  }

  const handleRefresh = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    setSearchParams(params)
   }
  return (
    <div className="col-span-12 md:col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4">
          <div className="flex justify-between items-center ">
            <h1>Filter</h1>
            <Button className="cursor-pointer" onClick={handleRefresh}>Clear Filter</Button>
          </div>
          <div>
            <label className="mb-2">Division to visit</label>            
           <Select 
           onValueChange={handleDivisionChange}
           value={selectedDivision ? selectedDivision : ""}
           disabled={divisionIsLoading}
           >
            <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Select a division" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel
                
                >Divisions</SelectLabel>
                {divisionOption?.map((item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
          <div>
            <label className="mb-2">Tour Type to visit</label>
            {/* <Select disabled={tourTypeIsLoading}> */}
            <Select 
            onValueChange={handleTourTypeChange}
            value={selectedTourType ? selectedTourType : ""}
            disabled={tourTypeIsLoading}
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Select a tour type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tour Type</SelectLabel>
                   {
                    tourTypeOption?.map((item: {value: string, label: string})=>(
                        <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
  )
}
